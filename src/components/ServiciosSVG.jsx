// src/components/SpiralCircleAssemble.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

import serviciosSvgText from "/assets/Servicios.svg?raw";

// ==============================
// utils
// ==============================
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
function rot(vx, vy, angRad) {
  const c = Math.cos(angRad);
  const s = Math.sin(angRad);
  return { x: vx * c - vy * s, y: vx * s + vy * c };
}

// multiplica 1→0 SOLO en el tramo final (sin teletransporte)
function suctionMul(tRaw, zone = 0.12) {
  const start = 1 - zone;
  if (tRaw <= start) return 1;
  const u = clamp01((tRaw - start) / zone); // 0..1
  return 1 - easeOutQuart(u); // 1..0
}

function parseSvgParts(svgText) {
  const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
  const svg = doc.querySelector("svg");
  if (!svg) return null;

  const viewBox = svg.getAttribute("viewBox") || "0 0 100 100";
  const [minX, minY, w, h] = viewBox.split(/\s+/).map(Number);

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
    }))
    .filter((p) => !!p.d);

  const center = { x: minX + w / 2, y: minY + h / 2 };
  return { viewBox, parts, defsInner, groupFilter, center };
}

// ==============================
// TornadoPiece (termina SIEMPRE armado)
// local=0 => desarmado
// local=1 => armado (x=0,y=0,scale=1,rotate=0)
// ==============================
function TornadoPiece({
  id,
  i,
  factor,
  center,
  dx,
  dy,

  delay = 0,
  dur = 0.95,
  stagger = 0.016,
  staggerMax = 0.45,

  orbits = 2.0,
  orbitJitter = 0.55,

  radialExtra = 0.26,
  radialJitter = 0.14,

  driftPx = 3.5,
  driftJitter = 5.5,
  wobblePx = 1.2,
  wobbleFreq = 1.1,

  selfRotDeg = 5,
  selfRotJitter = 5,
  selfTwistDeg = 30,

  startScale = 0.06,
  startOpacity = 0,
  endOpacity = 1,
  startBlur = 3,

  // ✅ “succión” final (sin romper armado)
  SUCTION_ZONE = 1,
  SUCTION_POWER = 0.2,
  SUCTION_CURVE = 0.5,

  children,
}) {
  const st = Math.min(i * stagger, staggerMax);

  const local = useTransform(factor, (t) => {
    const td = (t - (delay + st)) / dur;
    return td < 0 ? 0 : td > 1 ? 1 : td;
  });

  const a = hash01(id + "|a");
  const b = hash01(id + "|b");
  const c = hash01(id + "|c");
  const d = hash01(id + "|d");
  const e = hash01(id + "|e");

  const loops = orbits + (c - 0.5) * orbitJitter;
  const phase0 = a * Math.PI * 2;

  const driftR = driftPx + driftJitter * (0.15 + 0.85 * b);
  const driftAng = d * Math.PI * 2;

  const wAmp = wobblePx * (0.4 + 0.6 * e);
  const wPhase = (b + d) * Math.PI * 2;

  const baseSelf =
    (selfRotDeg + (e - 0.5) * selfRotJitter) * (0.9 + 0.2 * b);
  const twist = (hash01(id + "|tw") - 0.5) * 2 * selfTwistDeg;
  const selfRotTotal = baseSelf + twist;

  // ✅ NO uses px (unidades del viewBox)
  const selfOrigin = `${center.x + dx} ${center.y + dy}`;

  function baseOffset(tRaw) {
    const t = easeOutCubic(tRaw);
    const inv = 1 - t;

    const ang = phase0 + inv * loops * Math.PI * 2;
    const radMul = 1 + inv * (radialExtra + (a - 0.5) * radialJitter);

    const fv = { x: dx, y: dy };
    const rv = rot(fv.x, fv.y, ang);
    const startV = { x: rv.x * radMul, y: rv.y * radMul };

    const settle = inv * inv;
    const drift = {
      x: Math.cos(driftAng) * driftR * settle,
      y: Math.sin(driftAng) * driftR * settle,
    };
    const wob = {
      x: Math.cos(wPhase + tRaw * Math.PI * 2 * wobbleFreq) * wAmp * settle,
      y: Math.sin(wPhase + tRaw * Math.PI * 2 * wobbleFreq) * wAmp * settle,
    };

    return {
      x: startV.x - fv.x + drift.x + wob.x,
      y: startV.y - fv.y + drift.y + wob.y,
    };
  }

  const x = useTransform(local, (tRaw) => {
    const off = baseOffset(tRaw);

    const m0 = suctionMul(tRaw, SUCTION_ZONE);
    const m = Math.pow(m0, SUCTION_POWER);

    if (m0 < 1) {
      const u = clamp01((tRaw - (1 - SUCTION_ZONE)) / SUCTION_ZONE);
      const swirlAmt = easeOutQuart(u) * SUCTION_CURVE;
      const perp = { x: -off.y, y: off.x };
      return off.x * m + perp.x * swirlAmt * m;
    }

    return off.x * m;
  });

  const y = useTransform(local, (tRaw) => {
    const off = baseOffset(tRaw);

    const m0 = suctionMul(tRaw, SUCTION_ZONE);
    const m = Math.pow(m0, SUCTION_POWER);

    if (m0 < 1) {
      const u = clamp01((tRaw - (1 - SUCTION_ZONE)) / SUCTION_ZONE);
      const swirlAmt = easeOutQuart(u) * SUCTION_CURVE;
      const perp = { x: -off.y, y: off.x };
      return off.y * m + perp.y * swirlAmt * m;
    }

    return off.y * m;
  });

  const rotateSelf = useTransform(local, (tRaw) => {
    const m0 = suctionMul(tRaw, SUCTION_ZONE);
    const m = Math.pow(m0, SUCTION_POWER);
    return (1 - tRaw) * selfRotTotal * m;
  });

  const scale = useTransform(local, (tRaw) => {
    const t = easeOutCubic(tRaw);
    const base = startScale + t * (1 - startScale);

    const m0 = suctionMul(tRaw, SUCTION_ZONE);
    const m = Math.pow(m0, SUCTION_POWER);

    return 1 - (1 - base) * m;
  });

  const opacity = useTransform(local, (tRaw) => {
    const t = easeOutCubic(tRaw);
    const base = startOpacity + t * (endOpacity - startOpacity);

    const m0 = suctionMul(tRaw, SUCTION_ZONE);
    const m = Math.pow(m0, SUCTION_POWER);

    return 1 - (1 - base) * m;
  });

  const filter = useTransform(local, (tRaw) => {
    const m0 = suctionMul(tRaw, SUCTION_ZONE);
    const m = Math.pow(m0, SUCTION_POWER);
    const blur = (1 - tRaw) * startBlur * m;
    return blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : "none";
  });

  return (
    <motion.g style={{ x, y, scale, opacity, filter }}>
      <motion.g style={{ rotate: rotateSelf, transformOrigin: selfOrigin }}>
        {children}
      </motion.g>
    </motion.g>
  );
}

// ==============================
// componente principal
// ==============================
export default function SpiralCircleAssemble({
  className = "",

  offset = ["start 105%", "end 50%"],
  IN_START = 0.0,
  IN_END = 0.90,

  dur = 0.95,
  delay = 0,
  stagger = 0.016,
  staggerMax = 0.45,

  orbits = 3.0,
  orbitJitter = 0.55,
  radialExtra = 0.26,
  radialJitter = 0.14,

  driftPx = 3.5,
  driftJitter = 5.5,
  wobblePx = 1.2,
  wobbleFreq = 1.1,

  selfRotDeg = 5,
  selfRotJitter = 5,
  selfTwistDeg = 20,

  startScale = 0.06,
  startOpacity = 0,
  startBlur = 5,

  // ✅ tuning de succión
  SUCTION_ZONE = 0.9,
  SUCTION_POWER = 0.01,
  SUCTION_CURVE = 1,

  outerId = null,
  originOverride = null,

  // ✅ NUEVO: control de overflow (por defecto lo dejamos visible)
  overflow = "visible", // "visible" | "hidden"
  useFilter = false,
}) {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);

  const parsed = useMemo(() => parseSvgParts(serviciosSvgText), []);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset });

  const factor = useMotionValue(0);
  const [bboxMap, setBboxMap] = useState(null);

  useEffect(() => {
    if (!svgRef.current || !parsed) return;

    const el = svgRef.current;
    const map = new Map();

    const nodes = el.querySelectorAll("path[id]");
    nodes.forEach((node) => {
      try {
        const bb = node.getBBox();
        map.set(node.getAttribute("id"), {
          cx: bb.x + bb.width / 2,
          cy: bb.y + bb.height / 2,
        });
      } catch {
        // ignore
      }
    });

    setBboxMap(map);
  }, [parsed]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const totalNeed = delay + staggerMax + dur;
    const t = clamp01((v - IN_START) / (IN_END - IN_START));
    factor.set(t * totalNeed);
  });

  const commonStroke = useMemo(
    () => ({
      vectorEffect: "non-scaling-stroke",
    }),
    []
  );

  if (!parsed) return null;

  const center = originOverride || parsed.center;

  const outer = outerId ? parsed.parts.find((p) => p.id === outerId) : null;
  const inner = outerId
    ? parsed.parts.filter((p) => p.id !== outerId)
    : parsed.parts;

  const ready = !!bboxMap;

  return (
    // ✅ IMPORTANTE:
    // - overflow-visible acá permite que lo que se salga del box se vea
    // - y el "min-h-0" evita algunos recortes raros en grids/flex
    <div
      ref={wrapRef}
      className={`${className} ${overflow === "visible" ? "overflow-visible" : "overflow-hidden"} min-h-0`}
      style={{ overflow: overflow }} // por si algún parent pisa tailwind
    >
      <motion.svg
        ref={svgRef}
        viewBox={parsed.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
        style={{
          overflow: "visible", // ✅ clave para que el SVG no clippee
        }}
      >
        {parsed.defsInner ? (
          <defs dangerouslySetInnerHTML={{ __html: parsed.defsInner }} />
        ) : null}

<g filter={useFilter ? (parsed.groupFilter || undefined) : undefined}>
          {outer && (
            <path
              id={outer.id}
              d={outer.d}
              fill={outer.fill ?? "none"}
              fillOpacity={outer.fillOpacity ?? undefined}
              stroke={outer.stroke ?? undefined}
              strokeWidth={outer.strokeWidth ?? undefined}
              strokeDasharray={outer.strokeDasharray ?? undefined}
              strokeMiterlimit={outer.strokeMiterlimit ?? undefined}
              strokeLinecap={outer.strokeLinecap ?? undefined}
              strokeLinejoin={outer.strokeLinejoin ?? undefined}
              style={commonStroke}
            />
          )}

          {inner.map((p, idx) => {
            const bb = bboxMap?.get(p.id);
            const dx = bb ? bb.cx - center.x : 0;
            const dy = bb ? bb.cy - center.y : 0;

            if (!ready) {
              return (
                <path
                  key={p.id}
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
            }

            return (
              <TornadoPiece
                key={p.id}
                id={p.id}
                i={idx}
                factor={factor}
                center={center}
                dx={dx}
                dy={dy}
                delay={delay}
                dur={dur}
                stagger={stagger}
                staggerMax={staggerMax}
                orbits={orbits}
                orbitJitter={orbitJitter}
                radialExtra={radialExtra}
                radialJitter={radialJitter}
                driftPx={driftPx}
                driftJitter={driftJitter}
                wobblePx={wobblePx}
                wobbleFreq={wobbleFreq}
                selfRotDeg={selfRotDeg}
                selfRotJitter={selfRotJitter}
                selfTwistDeg={selfTwistDeg}
                startScale={startScale}
                startOpacity={startOpacity}
                startBlur={startBlur}
                SUCTION_ZONE={SUCTION_ZONE}
                SUCTION_POWER={SUCTION_POWER}
                SUCTION_CURVE={SUCTION_CURVE}
              >
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
              </TornadoPiece>
            );
          })}
        </g>
      </motion.svg>
    </div>
  );
}
