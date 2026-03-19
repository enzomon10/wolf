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

function getPartVector(id, idx) {
  const a = hash01(id + "|a");
  const b = hash01(id + "|b");
  const c = hash01(id + "|c");

  const theta = a * Math.PI * 2;
  const r = 0.35 + (1 - b) * 0.65;

  const sign = idx % 2 === 0 ? 1 : -1;
  const rot = sign * (6 + c * 18);

  return { theta, r, rot, c };
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

function triangleParts({ A, B, C, segmentsPerSide = 3, idPrefix = "tri" }) {
  const seg = (P, Q, n, sideName) => {
    const parts = [];
    for (let i = 0; i < n; i++) {
      const t0 = i / n;
      const t1 = (i + 1) / n;
      const x0 = P.x + (Q.x - P.x) * t0;
      const y0 = P.y + (Q.y - P.y) * t0;
      const x1 = P.x + (Q.x - P.x) * t1;
      const y1 = P.y + (Q.y - P.y) * t1;
      parts.push({
        id: `${idPrefix}_${sideName}_${i}`,
        d: `M ${x0.toFixed(3)} ${y0.toFixed(3)} L ${x1.toFixed(3)} ${y1.toFixed(3)}`,
      });
    }
    return parts;
  };

  return [
    ...seg(A, B, segmentsPerSide, "ab"),
    ...seg(B, C, segmentsPerSide, "bc"),
    ...seg(C, A, segmentsPerSide, "ca"),
  ];
}

function circleParts({ cx, cy, r, pieces = 8, idPrefix = "c" }) {
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

// helper: agrupa N paths en M grupos (menos “vectores”)
function groupDs(items, groups, idPrefix, groupName) {
  const per = Math.ceil(items.length / groups);
  return Array.from({ length: groups }, (_, g) => {
    const start = g * per;
    const end = start + per;
    const d = items.slice(start, end).map((it) => it.d).join(" ");
    return {
      id: `${idPrefix}_${g}`,
      d,
      group: groupName,
    };
  }).filter((x) => x.d && x.d.trim().length > 0);
}

// ======================================================
// ✅ INVERTIDO: arranca desarmado y se arma con el scroll
// - Antes: ff iba 0→1 y multiplicabas por ff (se desarma con scroll)
// - Ahora: usamos ffInv = 1 - ff, y multiplicamos por ffInv
//   => al inicio (ff=0) => ffInv=1 => máximo desplazamiento (desarmado)
//   => al final (ff=1) => ffInv=0 => desplazamiento 0 (armado)
// ======================================================

export function VisionScatterExplode({
  className = "",
  stroke = "currentColor",

  strokeWidth = 0.55,
  opacity = 0.78,

  start = -0.4,
  end = 0.70,

  floatPx = 30,
  floatRot = 10,
  floatScale = 0.06,

  // knobs para “menos partes”
  outerPieces = 5,
  outer2Pieces = 8,
  innerPieces = 6,
  triSeg = 2,
  tri2Seg = 2,
  tickGroups = 2,
}) {
  const wrapRef = useRef(null);

  const { scrollYProgress: local } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });

  const t = useTransform(local, (v) => clamp01((v - start) / (end - start)));
  const tf = useTransform(t, (x) => smooth(x)); // progreso 0→1 (cuando entra hasta que pasa)

  const parts = useMemo(() => {
    const CX = 50;
    const CY = 41.33;

    const outer = circleParts({ cx: CX, cy: CY, r: 38, pieces: outerPieces, idPrefix: "outer" }).map((p) => ({
      ...p,
      group: "outer",
    }));

    const outer2 = circleParts({ cx: CX, cy: CY, r: 33.2, pieces: outer2Pieces, idPrefix: "outer2" }).map((p) => ({
      ...p,
      group: "outer2",
    }));

    // ticks: 6 -> 2 paths
    const tickAngles = [
      0,
      Math.PI / 3,
      (2 * Math.PI) / 3,
      Math.PI,
      (4 * Math.PI) / 3,
      (5 * Math.PI) / 3,
    ];
    const tickItems = tickAngles.map((a, i) => ({
      id: `tick_${i}`,
      d: polarLine(CX, CY, 39.4, 41.2, a),
    }));
    const ticks = groupDs(tickItems, tickGroups, "tickG", "ticks");

    const tri = triangleParts({
      A: { x: 10, y: 16 },
      B: { x: 90, y: 16 },
      C: { x: 50, y: 92 },
      segmentsPerSide: triSeg,
      idPrefix: "tri",
    }).map((p) => ({ ...p, group: "tri" }));

    const triInner = triangleParts({
      A: { x: 18, y: 22.5 },
      B: { x: 82, y: 22.5 },
      C: { x: 50, y: 84.5 },
      segmentsPerSide: tri2Seg,
      idPrefix: "tri2",
    }).map((p) => ({ ...p, group: "tri2" }));

    const inner1 = circleParts({ cx: 39, cy: 34.5, r: 20, pieces: innerPieces, idPrefix: "i1" });
    const inner2 = circleParts({ cx: 61, cy: 34.5, r: 20, pieces: innerPieces, idPrefix: "i2" });
    const inner3 = circleParts({ cx: 50, cy: 55.0, r: 20, pieces: innerPieces, idPrefix: "i3" });
    const inner = [...inner1, ...inner2, ...inner3].map((p) => ({ ...p, group: "inner" }));

    const pupil = [
      { id: "pupil_main", d: "M 50 41.5 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0", group: "pupilFill" },
      { id: "pupil_shine", d: "M 48.8 40.2 m -0.7 0 a 0.7 0.7 0 1 0 1.4 0 a 0.7 0.7 0 1 0 -1.4 0", group: "pupilShine" },
      { id: "pupil_ring", d: arcPath(50, 41.5, 5.2, 0, Math.PI * 2), group: "pupilRing" },
    ];

    return [...outer, ...outer2, ...ticks, ...tri, ...triInner, ...inner, ...pupil];
  }, [outerPieces, outer2Pieces, innerPieces, triSeg, tri2Seg, tickGroups]);

  const vectors = useMemo(() => {
    return parts.map((p, idx) => {
      const v = getPartVector(p.id, idx);
      const ux = Math.cos(v.theta);
      const uy = Math.sin(v.theta);

      const amp = mix(0.55, 1.15, v.r);
      const lift = (v.c - 0.5) * 0.25;
      const drot = (v.rot / 24) * floatRot;

      const side = (hash01(p.id + "|side") - 0.5) * 0.55;
      const fx = ux + side;
      const fy = uy + lift;

      return { fx, fy, amp, drot };
    });
  }, [parts, floatRot]);

  const groupStyle = (group) => {
    switch (group) {
      case "outer":
        return { sw: strokeWidth * 1.25, op: 0.55 * opacity };
      case "outer2":
        return { sw: strokeWidth * 0.85, op: 0.25 * opacity, dash: "2.2 6.2" };
      case "ticks":
        return { sw: strokeWidth * 0.9, op: 0.28 * opacity };
      case "tri":
        return { sw: strokeWidth * 1.0, op: 0.72 * opacity };
      case "tri2":
        return { sw: strokeWidth * 0.75, op: 0.26 * opacity, dash: "1.2 5.2" };
      case "inner":
        return { sw: strokeWidth * 0.9, op: 0.68 * opacity };
      case "pupilRing":
        return { sw: strokeWidth * 0.85, op: 0.26 * opacity };
      default:
        return { sw: strokeWidth, op: opacity };
    }
  };

  // (Opcional) mantengo el “breathing” igual.
  const globalScale = useTransform(tf, (x) => 1 + Math.sin(x * Math.PI) * floatScale);

  const clipId = "triClipPremiumLong";

  return (
    <div ref={wrapRef} className={className} style={{ overflow: "visible" }}>
      <motion.svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        overflow="visible"
        style={{
          overflow: "visible",
          transformOrigin: "50px 41.33px",
          scale: globalScale,
          willChange: "transform",
        }}
      >
        <defs>
          <clipPath id={clipId}>
            <path d="M10 16 H90 L50 92 Z" />
          </clipPath>

          <filter id="softGlowThin" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.35" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* OUTER + TRI (sin clip) */}
        {parts
          .filter((p) => ["outer", "outer2", "ticks", "tri", "tri2"].includes(p.group))
          .map((p, idx) => {
            const v = vectors[idx];
            const st = Math.min(idx * 0.0065, 0.42);

            // progreso “local” por pieza: 0→1
            const f = useTransform(tf, (x) => smooth(clamp01((x - st) / 0.95)));
            // ✅ invertimos: 1→0 (desarmado→armado)
            const fInv = useTransform(f, (ff) => 1 - ff);

            const x = useTransform(fInv, (ff) => ff * floatPx * v.amp * v.fx);
            const y = useTransform(fInv, (ff) => ff * floatPx * v.amp * v.fy);
            const rot = useTransform(fInv, (ff) => ff * v.drot);

            const gs = groupStyle(p.group);

            // (Opcional) opacidad: un pelín menor cuando está desarmado, y sube al armarse
            const op = useTransform(f, (ff) => gs.op * (0.92 + ff * 0.08));

            return (
              <motion.g
                key={p.id}
                style={{
                  x,
                  y,
                  rotate: rot,
                  transformOrigin: "50px 41.33px",
                }}
              >
                <path
                  d={p.d}
                  stroke={stroke}
                  strokeWidth={gs.sw * 1.75}
                  opacity={useTransform(op, (o) => o * 0.08)}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#softGlowThin)"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d={p.d}
                  stroke={stroke}
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

        {/* INNER + PUPIL (con clip) */}
        <g clipPath={`url(#${clipId})`}>
          {parts
            .filter((p) => ["inner", "pupilFill", "pupilShine", "pupilRing"].includes(p.group))
            .map((p, idx) => {
              const v = vectors[idx];
              const st = Math.min(idx * 0.0065, 0.46);

              const f = useTransform(tf, (x) => smooth(clamp01((x - st) / 0.95)));
              const fInv = useTransform(f, (ff) => 1 - ff);

              const isPupil =
                p.group === "pupilFill" || p.group === "pupilShine" || p.group === "pupilRing";
              const mul = isPupil ? 1.25 : 1.0;

              const x = useTransform(fInv, (ff) => ff * floatPx * mul * v.amp * v.fx);
              const y = useTransform(fInv, (ff) => ff * floatPx * mul * v.amp * v.fy);
              const rot = useTransform(fInv, (ff) => ff * (v.drot * 0.85));

              const gs = groupStyle(
                p.group === "pupilRing" ? "pupilRing" : p.group === "inner" ? "inner" : "inner"
              );

              // opacidad sube un toque al armar
              const op = useTransform(f, (ff) => {
                if (p.group === "pupilShine") return 0.65 + ff * 0.10;
                if (p.group === "pupilFill") return 0.85 + ff * 0.13;
                if (p.group === "pupilRing") return gs.op * (0.9 + ff * 0.1);
                return gs.op * (0.9 + ff * 0.1);
              });

              const isFill = p.group === "pupilFill" || p.group === "pupilShine";
              const fillColor = p.group === "pupilShine" ? "white" : stroke;

              return (
                <motion.g
                  key={p.id}
                  style={{
                    x,
                    y,
                    rotate: rot,
                    transformOrigin: "50px 41.33px",
                  }}
                >
                  {!isFill && (
                    <path
                      d={p.d}
                      stroke={stroke}
                      strokeWidth={gs.sw * 1.7}
                      opacity={useTransform(op, (o) => o * 0.07)}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#softGlowThin)"
                      vectorEffect="non-scaling-stroke"
                    />
                  )}

                  <path
                    d={p.d}
                    fill={isFill ? fillColor : "none"}
                    stroke={isFill ? "none" : stroke}
                    strokeWidth={gs.sw}
                    opacity={op}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </motion.g>
              );
            })}
        </g>
      </motion.svg>
    </div>
  );
}
