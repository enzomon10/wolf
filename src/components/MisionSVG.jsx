// src/components/VegvisirScatterBase.jsx
import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ---------- utils ----------
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (t) => t * t * (3 - 2 * t); // smoothstep
const mix = (a, b, t) => a + (b - a) * t;

function hash01(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

// seed + seedIdx => piezas comparten EXACTAMENTE el mismo movimiento
function getPartVector(seed, seedIdx) {
  const a = hash01(seed + "|a");
  const b = hash01(seed + "|b");
  const c = hash01(seed + "|c");

  const theta = a * Math.PI * 2;
  const r = 0.35 + (1 - b) * 0.65;
  const sign = seedIdx % 2 === 0 ? 1 : -1;
  const rot = sign * (6 + c * 18);

  return { theta, r, rot, c, sign };
}

function arcPath(cx, cy, r, a0, a1) {
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const large = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return `M ${x0.toFixed(3)} ${y0.toFixed(3)} A ${r} ${r} 0 ${large} ${sweep} ${x1.toFixed(
    3
  )} ${y1.toFixed(3)}`;
}

function circleParts({ cx, cy, r, pieces = 24, idPrefix = "c" }) {
  const parts = [];
  for (let i = 0; i < pieces; i++) {
    const a0 = (i / pieces) * Math.PI * 2;
    const a1 = ((i + 1) / pieces) * Math.PI * 2;
    parts.push({ id: `${idPrefix}_${i}`, d: arcPath(cx, cy, r, a0, a1) });
  }
  return parts;
}

function polarLine(cx, cy, r0, r1, a) {
  const x0 = cx + r0 * Math.cos(a);
  const y0 = cy + r0 * Math.sin(a);
  const x1 = cx + r1 * Math.cos(a);
  const y1 = cy + r1 * Math.sin(a);
  return `M ${x0.toFixed(3)} ${y0.toFixed(3)} L ${x1.toFixed(3)} ${y1.toFixed(3)}`;
}

function spikeTriangle(cx, cy, rInner, rOuter, a, w = 0.14) {
  const a0 = a - w;
  const a1 = a + w;
  const x0 = cx + rInner * Math.cos(a0);
  const y0 = cy + rInner * Math.sin(a0);
  const x1 = cx + rOuter * Math.cos(a);
  const y1 = cy + rOuter * Math.sin(a);
  const x2 = cx + rInner * Math.cos(a1);
  const y2 = cy + rInner * Math.sin(a1);
  return `M ${x0.toFixed(3)} ${y0.toFixed(3)} L ${x1.toFixed(3)} ${y1.toFixed(
    3
  )} L ${x2.toFixed(3)} ${y2.toFixed(3)} Z`;
}

function spikeDetailPaths(cx, cy, rA, rB, a, w = 0.1) {
  const a0 = a - w;
  const a1 = a + w;

  const xMid = cx + rB * Math.cos(a);
  const yMid = cy + rB * Math.sin(a);

  const xL = cx + rA * Math.cos(a0);
  const yL = cy + rA * Math.sin(a0);

  const xR = cx + rA * Math.cos(a1);
  const yR = cy + rA * Math.sin(a1);

  const chevron = `M ${xL.toFixed(3)} ${yL.toFixed(3)} L ${xMid.toFixed(3)} ${yMid.toFixed(
    3
  )} L ${xR.toFixed(3)} ${yR.toFixed(3)}`;

  const tick = polarLine(cx, cy, rA - 2.2, rA + 0.6, a);

  return { chevron, tick };
}

function vegArmPath(cx, cy, r0, r1) {
  const x0 = cx + r0;
  const x1 = cx + r1;

  const stem = `M ${x0.toFixed(3)} ${cy.toFixed(3)} L ${x1.toFixed(3)} ${cy.toFixed(3)}`;

  const t1 = `M ${(cx + mix(r0, r1, 0.55)).toFixed(3)} ${(cy - 2.0).toFixed(
    3
  )} L ${(cx + mix(r0, r1, 0.55)).toFixed(3)} ${(cy + 2.0).toFixed(3)}`;
  const t2 = `M ${(cx + mix(r0, r1, 0.68)).toFixed(3)} ${(cy - 2.0).toFixed(
    3
  )} L ${(cx + mix(r0, r1, 0.68)).toFixed(3)} ${(cy + 2.0).toFixed(3)}`;
  const t3 = `M ${(cx + mix(r0, r1, 0.55)).toFixed(3)} ${(cy - 2.0).toFixed(
    3
  )} L ${(cx + mix(r0, r1, 0.68)).toFixed(3)} ${(cy - 2.0).toFixed(3)}`;

  const prA = `M ${x1.toFixed(3)} ${cy.toFixed(3)} L ${(x1 + 2.3).toFixed(3)} ${cy.toFixed(
    3
  )}`;
  const prB = `M ${x1.toFixed(3)} ${cy.toFixed(3)} L ${(x1 + 1.8).toFixed(3)} ${(cy - 2.3).toFixed(
    3
  )}`;
  const prC = `M ${x1.toFixed(3)} ${cy.toFixed(3)} L ${(x1 + 1.8).toFixed(3)} ${(cy + 2.3).toFixed(
    3
  )}`;

  return [stem, t1, t2, t3, prA, prB, prC].join(" ");
}

export default function VegvisirScatterBase({
  className = "",
  stroke = "currentColor",

  strokeWidth = 0.8,
  opacity = 0.9,

  start = -0.6,
  end = 0.7,

  floatPx = 30,     // (en Vision era grande: 30). Acá subí un poco para que se note
  floatRot = 10,
  floatScale = 0.05,

  ringFill = "#050505",
  ringStroke = "#D4AF37",
  paper = "transparent",

  innerStroke = "#D4AF37",

  // ✅ control “cuántas piezas”
  outerPieces = 6,
  innerPieces = 5,
  centerPieces = 6,
  tickGroups = 4,
}) {
  const wrapRef = useRef(null);

  const { scrollYProgress: local } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });

  const t = useTransform(local, (v) => clamp01((v - start) / (end - start)));
  const tf = useTransform(t, (x) => smooth(x));

  // ---------------------------
  // PARTS (mismo SVG)
  // ---------------------------
  const parts = useMemo(() => {
    const CX = 50;
    const CY = 50;

    const spikeAngles = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2);

    const spikes = spikeAngles.map((a, i) => {
      const isDiagonal = i % 2 === 1;
      const rOuter = isDiagonal ? 45.5 : 49.0;
      const width = isDiagonal ? 0.1 : 0.155;

      return {
        id: `spike_${i}`,
        d: spikeTriangle(CX, CY, 37.5, rOuter, a, width),
        group: "spikes",
        fill: ringStroke,
        seed: `spike_${i}`,
        seedIdx: i,
      };
    });

    // 1 SOLO PATH por punta
    const spikeDetails = spikeAngles.map((a, i) => {
      const isDiagonal = i % 2 === 1;
      const rA = isDiagonal ? 41.5 : 43.0;
      const rB = isDiagonal ? 44.0 : 46.0;
      const { chevron, tick } = spikeDetailPaths(CX, CY, rA, rB, a, isDiagonal ? 0.08 : 0.1);
      const seed = `spike_${i}`;

      return {
        id: `spike_detail_${i}`,
        d: `${chevron} ${tick}`,
        group: "spikeDetail",
        seed,
        seedIdx: i,
      };
    });

    const outerRing = circleParts({ cx: CX, cy: CY, r: 32.2, pieces: outerPieces, idPrefix: "outer" }).map(
      (p) => ({ ...p, group: "outer" })
    );

    const innerRing = circleParts({ cx: CX, cy: CY, r: 27.4, pieces: innerPieces, idPrefix: "inner" }).map(
      (p) => ({ ...p, group: "inner" })
    );

    const armBase = vegArmPath(CX, CY, 4.0, 20.5);
    const arms = spikeAngles.map((a, i) => ({
      id: `arm_${i}`,
      d: armBase,
      group: "arms",
      rotate: (a * 180) / Math.PI,
      cx: CX,
      cy: CY,
    }));

    const centerRing = circleParts({ cx: CX, cy: CY, r: 4.0, pieces: centerPieces, idPrefix: "ctr" }).map(
      (p) => ({ ...p, group: "centerRing" })
    );

    // ticks agrupados
    const tickAngles = Array.from({ length: 16 }, (_, i) => (i / 16) * Math.PI * 2);
    const tickDs = tickAngles.map((a, i) =>
      polarLine(CX, CY, i % 4 === 0 ? 33.0 : 33.7, 35.0, a)
    );

    const perGroup = Math.ceil(tickDs.length / tickGroups);
    const ticks = Array.from({ length: tickGroups }, (_, g) => {
      const s = g * perGroup;
      const e = s + perGroup;
      const d = tickDs.slice(s, e).join(" ");
      return { id: `tick_g_${g}`, d, group: "ticks" };
    });

    return [
      ...spikes,
      ...spikeDetails,
      ...outerRing,
      ...innerRing,
      ...ticks,
      ...arms,
      ...centerRing,
    ];
  }, [ringStroke, outerPieces, innerPieces, centerPieces, tickGroups]);

  // ---------------------------
  // VECTORES (igual lógica Vision: ux/uy + side + lift)
  // ---------------------------
  const vectors = useMemo(() => {
    return parts.map((p, idx) => {
      const seed = p.seed ?? p.id;
      const seedIdx = typeof p.seedIdx === "number" ? p.seedIdx : idx;

      const v = getPartVector(seed, seedIdx);
      const ux = Math.cos(v.theta);
      const uy = Math.sin(v.theta);

      const amp = mix(0.55, 1.15, v.r);
      const drot = (v.rot / 24) * floatRot;

      const side = (hash01(seed + "|side") - 0.5) * 0.55;
      const lift = (v.c - 0.5) * 0.25;

      const fx = ux + side;
      const fy = uy + lift;

      return { fx, fy, amp, drot };
    });
  }, [parts, floatRot]);

  const groupStyle = (group) => {
    switch (group) {
      case "spikes":
        // spikes son fill, pero igual usamos op para que “suban” al armar
        return { sw: 0, op: 0.98 * opacity, fill: ringStroke };
      case "spikeDetail":
        return { sw: strokeWidth * 0.9, op: 0.55 * opacity };
      case "outer":
        return { sw: strokeWidth * 1.15, op: 0.55 * opacity };
      case "inner":
        return { sw: strokeWidth * 0.95, op: 0.45 * opacity, dash: "2 6" };
      case "ticks":
        return { sw: strokeWidth * 0.9, op: 0.22 * opacity };
      case "arms":
        return { sw: strokeWidth * 0.6, op: 0.92 * opacity };
      case "centerRing":
        return { sw: strokeWidth * 1.05, op: 0.40 * opacity };
      default:
        return { sw: strokeWidth, op: opacity };
    }
  };

  // breathing igual
  const globalScale = useTransform(tf, (x) => 1 + Math.sin(x * Math.PI) * floatScale);

  const runePathId = "veg_rune_path";
  const clipId = "veg_clip";

  // -----------------------------------
  // helper: movimiento EXACTO Vision
  // -----------------------------------
const pieceMotion = (idx, baseSt, origin = "50px 50px", mul = 1.0) => {
  const v = vectors[idx];

  const st = Math.min(idx * baseSt, 0.46);

  // ✅ clave: denom depende de st, así al final f -> 1
  const denom = Math.max(1e-6, 1 - st);

  const f = useTransform(tf, (x) => smooth(clamp01((x - st) / denom)));
  const fInv = useTransform(f, (ff) => 1 - ff);

  const x = useTransform(fInv, (ff) => ff * floatPx * mul * v.amp * v.fx);
  const y = useTransform(fInv, (ff) => ff * floatPx * mul * v.amp * v.fy);
  const rot = useTransform(fInv, (ff) => ff * v.drot);

  return { f, x, y, rot, origin };
};

  return (
    <div ref={wrapRef} className={className} style={{ overflow: "visible" }}>
      <motion.svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        overflow="visible"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          overflow: "visible",
          transformOrigin: "50px 50px",
          scale: globalScale,
          willChange: "transform",
        }}
      >
        <defs>
          <path
            id={runePathId}
            d="
              M 50 50
              m -28.0 0
              a 28.0 28.0 0 1 1 56 0
              a 28.0 28.0 0 1 1 -56 0
            "
          />

          <clipPath id={clipId}>
            <circle cx="50" cy="50" r="27.8" />
          </clipPath>

          {/* ✅ igual idea que Vision */}
          <filter id="softGlowThin" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.35" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* fondo */}
        <circle cx="50" cy="50" r="50" fill={paper} />

        {/* Spikes (fill) — mismo SVG, movimiento Vision */}
        {parts
          .filter((p) => p.group === "spikes")
          .map((p, k) => {
            // idx real en parts:
            const idx = parts.findIndex((x) => x.id === p.id);
            const m = pieceMotion(idx, 0.01, "50px 50px", 1.1);

            const gs = groupStyle("spikes");
            const op = useTransform(m.f, (ff) => gs.op * (0.92 + ff * 0.08));

            return (
              <motion.g
                key={p.id}
                style={{
                  x: m.x,
                  y: m.y,
                  rotate: m.rot,
                  transformOrigin: m.origin,
                }}
              >
                <path d={p.d} fill={p.fill} opacity={op} />
              </motion.g>
            );
          })}

        {/* Spike detail (stroke) */}
        {parts
          .filter((p) => p.group === "spikeDetail")
          .map((p) => {
            const idx = parts.findIndex((x) => x.id === p.id);
            const m = pieceMotion(idx, 0.006, "50px 50px", 1.0);

            const gs = groupStyle("spikeDetail");
            const strokeCol = ringFill === "transparent" ? ringStroke : ringFill;
            const op = useTransform(m.f, (ff) => gs.op * (0.92 + ff * 0.08));

            return (
              <motion.g
                key={p.id}
                style={{
                  x: m.x,
                  y: m.y,
                  rotate: m.rot,
                  transformOrigin: m.origin,
                }}
              >
                <path
                  d={p.d}
                  stroke={strokeCol}
                  strokeWidth={gs.sw * 1.75}
                  opacity={useTransform(op, (o) => o * 0.08)}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#softGlowThin)"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={p.d}
                  stroke={strokeCol}
                  strokeWidth={gs.sw}
                  opacity={op}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </motion.g>
            );
          })}

        {/* Outer ring base (fijo, igual tu SVG) */}
        <circle cx="50" cy="50" r="33.2" fill="none" stroke={ringStroke} strokeWidth="1.45" />
        <circle cx="50" cy="50" r="32.7" fill="none" stroke={ringStroke} strokeWidth="0.85" opacity="0.9" />

        {/* Runes (fijas) */}
        <text fontSize="5.3" fill={ringStroke} fontFamily="Noto Sans Runic, serif" letterSpacing="1.0">
          <textPath href={`#${runePathId}`} startOffset="50%" textAnchor="middle">
            ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛟᛞ ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛟᛞ
          </textPath>
        </text>

        {/* Inner disk (fijo) */}
        <circle cx="50" cy="50" r="27.8" fill={ringFill} />

        {/* Outer/Inner segments + ticks — movimiento Vision */}
        {parts
          .filter((p) => ["outer", "inner", "ticks"].includes(p.group))
          .map((p) => {
            const idx = parts.findIndex((x) => x.id === p.id);
            const m = pieceMotion(idx, 0.0065, "50px 50px", 1.0);

            const gs = groupStyle(p.group);
            const op = useTransform(m.f, (ff) => gs.op * (0.92 + ff * 0.08));

            return (
              <motion.g
                key={p.id}
                style={{
                  x: m.x,
                  y: m.y,
                  rotate: m.rot,
                  transformOrigin: m.origin,
                }}
              >
                <path
                  d={p.d}
                  stroke={ringStroke}
                  strokeWidth={gs.sw * 1.75}
                  opacity={useTransform(op, (o) => o * 0.08)}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#softGlowThin)"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={p.d}
                  stroke={ringStroke}
                  strokeWidth={gs.sw}
                  opacity={op}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={gs.dash}
                  vectorEffect="non-scaling-stroke"
                />
              </motion.g>
            );
          })}

        {/* Arms + center ring (clipped) — movimiento Vision */}
        <g clipPath={`url(#${clipId})`}>
          {parts
            .filter((p) => ["arms", "centerRing"].includes(p.group))
            .map((p) => {
              const idx = parts.findIndex((x) => x.id === p.id);
              const m = pieceMotion(idx, 0.0065, "50px 50px", p.group === "arms" ? 0.95 : 1.0);

              const gs = groupStyle(p.group);
              const op = useTransform(m.f, (ff) => gs.op * (0.92 + ff * 0.08));
              const extraRotate = p.group === "arms" ? p.rotate || 0 : 0;

              return (
                <motion.g
                  key={p.id}
                  style={{
                    x: m.x,
                    y: m.y,
                    rotate: m.rot,
                    transformOrigin: m.origin,
                  }}
                >
                  <g transform={`rotate(${extraRotate} 50 50)`}>
                    <path
                      d={p.d}
                      stroke={innerStroke}
                      strokeWidth={gs.sw * 1.7}
                      opacity={useTransform(op, (o) => o * 0.09)}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#softGlowThin)"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      d={p.d}
                      stroke={innerStroke}
                      strokeWidth={gs.sw}
                      opacity={op}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                </motion.g>
              );
            })}

          <circle cx="50" cy="50" r="1.25" fill={innerStroke} opacity="0.95" />
          <circle cx="50" cy="50" r="4.3" fill="none" stroke={innerStroke} strokeWidth="0.95" opacity="0.55" />
        </g>
      </motion.svg>
    </div>
  );
}
