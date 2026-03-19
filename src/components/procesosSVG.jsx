// src/components/ProcessIconAssemble.jsx
import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Piece } from "./ProcesoSVG";

// ==============================
// utils
// ==============================
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (t) => t * t * (3 - 2 * t);

function splitByMoveTo(d) {
  return d
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?=M)/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function hash01(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

function getPartVector(id, idx) {
  const a = hash01(id + "|a");
  const b = hash01(id + "|b");
  const c = hash01(id + "|c");

  const theta = a * Math.PI * 2;
  const r = 0.35 + (1 - b) * 0.65;

  const sign = idx % 2 === 0 ? 1 : -1;
  const rot = sign * (6 + c * 18); // 6..24

  return { theta, r, rot };
}

function parseViewBox(svgText) {
  const m = svgText.match(/viewBox="([^"]+)"/i);
  return m ? m[1] : "0 0 100 100";
}

function viewBoxCenter(viewBox) {
  const parts = viewBox.split(/\s+/).map(Number);
  const [x, y, w, h] = parts.length === 4 ? parts : [0, 0, 100, 100];
  return { cx: x + w / 2, cy: y + h / 2 };
}

function extractPathBlocks(svgText) {
  const out = [];
  const re = /<path\b[^>]*>/gi;
  let m;
  while ((m = re.exec(svgText))) out.push(m[0]);
  return out;
}

function getAttr(tag, name) {
  const re = new RegExp(`${name}="([^"]*)"`, "i");
  const m = tag.match(re);
  return m ? m[1] : null;
}

function extractDefs(svgText) {
  const m = svgText.match(/<defs[\s\S]*?<\/defs>/i);
  return m ? m[0] : null;
}

/**
 * Reduce “parts” a un máximo sin perder distribución:
 * - Si no supera max, devuelve tal cual
 * - Si supera, toma índices a intervalo para cubrir toda la forma
 */
function downsampleParts(parts, maxPieces) {
  const M = Math.max(1, Math.floor(maxPieces || 0));
  if (!Number.isFinite(M) || M <= 0) return parts;
  if (parts.length <= M) return parts;

  const step = parts.length / M;
  const picked = [];
  for (let i = 0; i < M; i++) {
    picked.push(parts[Math.floor(i * step)]);
  }
  return picked;
}

// ==============================
// Factory: crea 3 componentes para p1/p2/p3
// ==============================
function makeAssembleIcon(svgText) {
  const viewBox = parseViewBox(svgText);
  const { cx, cy } = viewBoxCenter(viewBox);

  const defsRaw = extractDefs(svgText);
  const pathBlocks = extractPathBlocks(svgText);

  // Convertimos cada <path> en "pieza" y si tiene d con varios M, lo partimos
  const partsAll = [];
  let k = 0;

  for (let pi = 0; pi < pathBlocks.length; pi++) {
    const tag = pathBlocks[pi];
    const d = getAttr(tag, "d");
    if (!d) continue;

    const fillRule = getAttr(tag, "fill-rule");
    const clipRule = getAttr(tag, "clip-rule");

    const subDs = splitByMoveTo(d);

    for (let si = 0; si < subDs.length; si++) {
      partsAll.push({
        id: `part_${pi}_${si}_${k++}`,
        d: subDs[si],
        attrs: {
          fillRule,
          clipRule,
        },
      });
    }
  }

  return function AssembleIcon({
    // tamaño
    className = "h-16 w-auto",

    // scroll
    offset = ["start 100%", "end 55%"],

    // efecto
    scatterPx = 20,
    rotateDeg = 18,
    delay = 0.10,
    dur = 0.35,
    stagger = 0.010,
    staggerMax = 0.18,
    startBlur = 1,
    startOpacity = 0.5,

    // ✅ NEW: limitar cantidad de vectores/piezas
    // probá 90–160 según el SVG (menos = más liviano)
    maxPieces = 140,

    // ✅ defaults para evitar “bloque amarillo”
    keepFill = false,
    forceStroke = "#DEBB35",
    forceStrokeWidth = 0.9,
  }) {
    const wrapRef = useRef(null);

    const { scrollYProgress } = useScroll({
      target: wrapRef,
      offset,
    });

    const factor = useTransform(scrollYProgress, (v) => smooth(clamp01(v)));

    // ✅ reducimos piezas (determinístico) para bajar carga
    const parts = useMemo(
      () => downsampleParts(partsAll, maxPieces),
      [maxPieces]
    );

    const vectors = useMemo(
      () =>
        parts.map((p, idx) => {
          const v = getPartVector(p.id, idx);
          return {
            dx: Math.cos(v.theta) * scatterPx * v.r,
            dy: Math.sin(v.theta) * scatterPx * v.r,
            drot: (v.rot / 24) * rotateDeg,
          };
        }),
      [parts, scatterPx, rotateDeg]
    );

    return (
      <div ref={wrapRef} className="inline-block h-full w-auto">
        <motion.svg
          className={`block ${className}`}
          width="auto"
          height="100%"
          viewBox={viewBox}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            overflow: "visible",
            shapeRendering: "geometricPrecision",
            textRendering: "geometricPrecision",
          }}
        >
          {/* defs (gradients/masks) del SVG original */}
          {defsRaw ? (
            <g
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: defsRaw }}
            />
          ) : null}

          {parts.map((p, idx) => {
            const st = Math.min(idx * stagger, staggerMax);

            const localFactor = useTransform(factor, (t) => {
              const td = (t - (delay + st)) / dur;
              return td < 0 ? 0 : td > 1 ? 1 : td;
            });

            const blurPx = useTransform(localFactor, (x) => (1 - x) * startBlur);
            const filter = useTransform(blurPx, (b) => `blur(${b}px)`);

            const op = useTransform(localFactor, (x) => startOpacity + x * (1 - startOpacity));

            const v = vectors[idx];

            // ✅ Wireframe por defecto
            const fill = keepFill ? "currentColor" : "none";
            const stroke = forceStroke ?? "#DEBB35";
            const strokeWidth = forceStrokeWidth ?? 0.9;

            return (
              <Piece
                key={p.id}
                i={idx}
                factor={localFactor}
                origin={`${cx}px ${cy}px`}
                scatterX={v.dx}
                scatterY={v.dy}
                rotateBy={v.drot}
              >
                <motion.path
                  d={p.d}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  fillRule={p.attrs.fillRule ?? undefined}
                  clipRule={p.attrs.clipRule ?? undefined}
                  vectorEffect="non-scaling-stroke"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeMiterlimit="2"
                  style={{
                    opacity: op,
                    filter,
                  }}
                />
              </Piece>
            );
          })}
        </motion.svg>
      </div>
    );
  };
}

// ==============================
// Export: 3 componentes listos
// ==============================
import p1SvgText from "/assets/p1.svg?raw";
import p2SvgText from "/assets/p2.svg?raw";
import p3SvgText from "/assets/p3.svg?raw";

export const P1AssembleIcon = makeAssembleIcon(p1SvgText);
export const P2AssembleIcon = makeAssembleIcon(p2SvgText);
export const P3AssembleIcon = makeAssembleIcon(p3SvgText);
