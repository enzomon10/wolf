// src/components/ProyectosAssemble.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

import proyectosSvgText from "/assets/proyectos.svg?raw";

// -----------------------------
// Utils
// -----------------------------
function clamp01(x) {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function hash01(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function parseSvgParts(svgText) {
  const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
  const svg = doc.querySelector("svg");
  if (!svg) return null;

  const viewBox = svg.getAttribute("viewBox") || "0 0 100 100";
  const [, , w, h] = viewBox.split(/\s+/).map(Number);

  const defsEl = svg.querySelector("defs");
  const defsInner = defsEl ? defsEl.innerHTML : "";

  const groupWithFilter = svg.querySelector("g[filter]");
  const groupFilter = groupWithFilter?.getAttribute("filter") || null;

  const paths = [...svg.querySelectorAll("path")];

  const parts = paths
    .map((p, idx) => ({
      id: p.getAttribute("id") || `path_${idx}`,
      d: p.getAttribute("d"),
      fill: p.getAttribute("fill"),
      fillOpacity: p.getAttribute("fill-opacity"),
      stroke: p.getAttribute("stroke"),
      strokeWidth: p.getAttribute("stroke-width"),
      strokeDasharray: p.getAttribute("stroke-dasharray"),
      strokeMiterlimit: p.getAttribute("stroke-miterlimit"),
      strokeLinecap: p.getAttribute("stroke-linecap"),
      strokeLinejoin: p.getAttribute("stroke-linejoin"),
      index: idx,
    }))
    .filter((p) => !!p.d);

  return {
    viewBox,
    parts,
    defsInner,
    groupFilter,
    width: w,
    height: h,
  };
}

// -----------------------------
// Pieza animada
// -----------------------------
function ScatterPiece({
  id,
  factor,
  startX,
  startY,
  delay = 0,
  dur = 0.9,
  staggerMax = 0.3,
  startScale = 0.72,
  startOpacity = 0,
  endOpacity = 1,
  startBlur = 3,
  rotateStart = 0,
  children,
}) {
  const randomOrder = hash01(id + "|order");
  const st = randomOrder * staggerMax;

  const local = useTransform(factor, (t) => {
    const td = (t - (delay + st)) / dur;
    return clamp01(td);
  });

  const x = useTransform(local, (t) => lerp(startX, 0, easeOutCubic(t)));
  const y = useTransform(local, (t) => lerp(startY, 0, easeOutCubic(t)));
  const scale = useTransform(local, (t) => lerp(startScale, 1, easeOutQuart(t)));
  const opacity = useTransform(local, (t) =>
    lerp(startOpacity, endOpacity, easeOutCubic(t))
  );
  const rotate = useTransform(local, (t) =>
    lerp(rotateStart, 0, easeOutQuart(t))
  );

  const filter = useTransform(local, (t) => {
    const blur = lerp(startBlur, 0, easeOutQuart(t));
    return blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : "none";
  });

  return (
    <motion.g style={{ x, y, scale, opacity, rotate, filter }}>
      {children}
    </motion.g>
  );
}

// -----------------------------
// Principal
// -----------------------------
export default function ProyectosAssemble({
  className = "",
  offset = ["start 105%", "end 50%"],
  IN_START = 0.0,
  IN_END = 0.90,

  delay = 0,
  dur = 0.9,
  staggerMax = 0.3,

  scatterRadiusMin = 0,
  scatterRadiusMax = 230,

  startScale = 0.72,
  startOpacity = 0,
  startBlur = 3,
  maxRotate = 3,

  overflow = "visible",
  useFilter = false,
}) {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);

  const parsed = useMemo(() => parseSvgParts(proyectosSvgText), []);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset,
  });

  const factor = useMotionValue(0);

  // ids de los 2 paths más grandes
  const [fixedIds, setFixedIds] = useState(null);

  useEffect(() => {
    if (!svgRef.current || !parsed) return;

    const nodes = [...svgRef.current.querySelectorAll("path[id]")];
    const measured = [];

    nodes.forEach((node, idx) => {
      try {
        const bb = node.getBBox();
        measured.push({
          idx,
          id: node.getAttribute("id"),
          area: bb.width * bb.height,
        });
      } catch {
        // ignore
      }
    });

    measured.sort((a, b) => b.area - a.area);

    const top2 = new Set(measured.slice(0, 2).map((m) => m.id));
    setFixedIds(top2);
  }, [parsed]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const totalNeed = delay + staggerMax + dur;
    const t = clamp01((v - IN_START) / (IN_END - IN_START));
    factor.set(t * totalNeed);
  });

  const commonStroke = useMemo(
    () => ({ vectorEffect: "non-scaling-stroke" }),
    []
  );

  // posiciones dispersas iniciales
  const scatterMap = useMemo(() => {
    if (!parsed) return new Map();

    const map = new Map();
    const w = parsed.width || 1000;
    const h = parsed.height || 1000;

    parsed.parts.forEach((p) => {
      const a = hash01(p.id + "|angle") * Math.PI * 2;
      const rSeed = hash01(p.id + "|radius");
      const r = lerp(scatterRadiusMin, scatterRadiusMax, rSeed);

      const extraX = (hash01(p.id + "|ex") - 0.5) * w * 0.12;
      const extraY = (hash01(p.id + "|ey") - 0.5) * h * 0.12;

      map.set(p.id, {
        startX: Math.cos(a) * r + extraX,
        startY: Math.sin(a) * r + extraY,
        rotateStart: (hash01(p.id + "|rot") - 0.5) * 2 * maxRotate,
      });
    });

    return map;
  }, [parsed, scatterRadiusMin, scatterRadiusMax, maxRotate]);

  if (!parsed) return null;

  const ready = !!fixedIds;

  return (
    <div
      ref={wrapRef}
      className={`${className} ${
        overflow === "visible" ? "overflow-visible" : "overflow-hidden"
      } min-h-0`}
      style={{ overflow }}
    >
      <motion.svg
        ref={svgRef}
        viewBox={parsed.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
      >
        {parsed.defsInner ? (
          <defs dangerouslySetInnerHTML={{ __html: parsed.defsInner }} />
        ) : null}

        <g filter={useFilter ? parsed.groupFilter || undefined : undefined}>
          {parsed.parts.map((p) => {
            const piece = (
              <path
                id={p.id}
                d={p.d}
                fill={p.fill ?? "none"}
                fillOpacity={p.fillOpacity ?? undefined}
                stroke={p.stroke ?? undefined}
                strokeWidth={p.strokeWidth ?? undefined}
                strokeDasharray={p.strokeDasharray ?? undefined}
                strokeMiterlimit={p.strokeMiterlimit ?? undefined}
                strokeLinecap={p.strokeLinecap ?? undefined}
                strokeLinejoin={p.strokeLinejoin ?? undefined}
                style={commonStroke}
              />
            );

            if (!ready) {
              return <React.Fragment key={p.id}>{piece}</React.Fragment>;
            }

            // Los 2 más grandes quedan fijos
            if (fixedIds.has(p.id)) {
              return <React.Fragment key={p.id}>{piece}</React.Fragment>;
            }

            const scatter = scatterMap.get(p.id) || {
              startX: 0,
              startY: 0,
              rotateStart: 0,
            };

            return (
              <ScatterPiece
                key={p.id}
                id={p.id}
                factor={factor}
                startX={scatter.startX}
                startY={scatter.startY}
                rotateStart={scatter.rotateStart}
                delay={delay}
                dur={dur}
                staggerMax={staggerMax}
                startScale={startScale}
                startOpacity={startOpacity}
                startBlur={startBlur}
              >
                {piece}
              </ScatterPiece>
            );
          })}
        </g>
      </motion.svg>
    </div>
  );
}