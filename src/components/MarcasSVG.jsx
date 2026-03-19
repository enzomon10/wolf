// src/components/VigasAssembleScroll.jsx
import React, { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ---------------- utils ----------------
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (t) => t * t * (3 - 2 * t); // smoothstep
const seg = (p, a, b) => smooth(clamp01((p - a) / (b - a)));

const GOLD = "#DEBB35";

// ---------------- SVG parts (m1.svg) ----------------
const PARTS = [
  // beams
  { id: "beam_tr", kind: "beam", d: "M88.8098 5.76852L86.6467 7.94141L213.069 133.793L215.232 131.62L88.8098 5.76852Z", fill: GOLD },
  { id: "beam_mid", kind: "beam", d: "M48.512 46.4586L46.3492 48.6318L172.789 174.465L174.952 172.292L48.512 46.4586Z", fill: GOLD },
  { id: "beam_bl", kind: "beam", d: "M8.03782 86.9577L5.87476 89.1309L132.315 214.982L134.478 212.809L8.03782 86.9577Z", fill: GOLD },

  { id: "beam_tl", kind: "beam", d: "M133.598 7.51663L7.87146 134.063L10.0465 136.224L135.773 9.67755L133.598 7.51663Z", fill: GOLD },
  { id: "beam_mid2", kind: "beam", d: "M172.274 46.1566L46.4581 172.614L48.6316 174.777L174.447 48.3191L172.274 46.1566Z", fill: GOLD },
  { id: "beam_br", kind: "beam", d: "M211.3 84.7377L85.4849 211.195L87.6584 213.358L213.474 86.9001L211.3 84.7377Z", fill: GOLD },

  // caps
  { id: "cap_tr_a", kind: "cap", d: "M87.8441 4.13813e-05L80.767 7.11328L87.8802 14.1904L94.9573 7.07716L87.8441 4.13813e-05Z", fill: GOLD },
  { id: "cap_tr_b", kind: "cap", d: "M213.989 125.741L206.912 132.854L214.026 139.932L221.103 132.818L213.989 125.741Z", fill: GOLD },

  { id: "cap_mid_a", kind: "cap", d: "M47.5569 40.6905L40.4797 47.8037L47.593 54.8808L54.6701 47.7676L47.5569 40.6905Z", fill: GOLD },
  { id: "cap_mid_b", kind: "cap", d: "M173.707 166.045L166.63 173.158L173.743 180.235L180.82 173.122L173.707 166.045Z", fill: GOLD },

  { id: "cap_bl_a", kind: "cap", d: "M7.07712 81.1905L0 88.3037L7.11325 95.3808L14.1904 88.2676L7.07712 81.1905Z", fill: GOLD },
  { id: "cap_bl_b", kind: "cap", d: "M133.42 206.738L126.343 213.852L133.456 220.929L140.533 213.815L133.42 206.738Z", fill: GOLD },

  { id: "cap_tl_a", kind: "cap", d: "M134.482 1.70612L127.404 8.81836L134.517 15.8965L141.595 8.78425L134.482 1.70612Z", fill: GOLD },
  { id: "cap_tl_b", kind: "cap", d: "M9.12985 127.855L2.05273 134.968L9.16598 142.045L16.2431 134.932L9.12985 127.855Z", fill: GOLD },

  { id: "cap_br_a", kind: "cap", d: "M212.341 79.0909L205.263 86.2031L212.375 93.2812L219.453 86.169L212.341 79.0909Z", fill: GOLD },
  { id: "cap_br_b", kind: "cap", d: "M86.7854 205.036L79.7083 212.149L86.8215 219.227L93.8986 212.113L86.7854 205.036Z", fill: GOLD },

  { id: "cap_mid2_a", kind: "cap", d: "M173.504 40.293L166.427 47.4062L173.54 54.4834L180.618 47.3701L173.504 40.293Z", fill: GOLD },
  { id: "cap_mid2_b", kind: "cap", d: "M47.7578 166.442L40.6807 173.556L47.7939 180.633L54.871 173.52L47.7578 166.442Z", fill: GOLD },

  // center
  { id: "center", kind: "center", d: "M110.791 140.345L80.688 110.522L110.512 80.4189L140.614 110.243L110.791 140.345ZM84.8689 110.522L110.512 136.164L136.155 110.522L110.512 84.8786L84.8689 110.522Z", fill: GOLD },
];

export default function VigasAssembleScroll({
  height = "160vh",
  stickyTop = "12vh",
  inline = false,

  // horizontal común donde quedan las puntas (tip) en t=0
  startY = -180,

  // fade: en qué porcentaje de avance de cada viga empieza / termina el fade-in
  fadeStart = 0.45,
  fadeEnd = 0.60,

  className = "",
}) {
  const wrapRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: inline ? ["start 100%", "end 80%"] : ["start end", "end start"],
  });

  const p = useTransform(scrollYProgress, (v) => clamp01(v));

  // Orden pedido
  const beamTimeline = useMemo(() => {
    const slots = [
      { id: "beam_br", a: 0.12, b: 0.24 },
      { id: "beam_bl", a: 0.24, b: 0.36 },
      { id: "beam_tr", a: 0.36, b: 0.50 },
      { id: "beam_tl", a: 0.50, b: 0.64 },
      { id: "beam_mid", a: 0.64, b: 0.78 },
      { id: "beam_mid2", a: 0.78, b: 0.92 },
    ];
    const map = new Map();
    for (const s of slots) map.set(s.id, s);
    return map;
  }, []);

  // direcciones de línea
  const beamDirs = useMemo(() => {
    return new Map([
      ["beam_tr", { x: +1, y: +1 }],
      ["beam_mid", { x: +1, y: +1 }],
      ["beam_bl", { x: +1, y: +1 }],

      ["beam_tl", { x: -1, y: +1 }],
      ["beam_mid2", { x: -1, y: +1 }],
      ["beam_br", { x: -1, y: +1 }],
    ]);
  }, []);

  // centros de caps “superiores” (punta a alinear) + qué cap corresponde a cada viga
  const beamTipRef = useMemo(() => {
    return new Map([
      ["beam_tr", { x: 87.86, y: 7.09, capId: "cap_tr_a" }],
      ["beam_mid", { x: 47.58, y: 47.79, capId: "cap_mid_a" }],
      ["beam_bl", { x: 7.10, y: 88.27, capId: "cap_bl_a" }],

      ["beam_tl", { x: 134.50, y: 8.80, capId: "cap_tl_a" }],
      ["beam_mid2", { x: 173.52, y: 47.39, capId: "cap_mid2_a" }],
      ["beam_br", { x: 212.36, y: 86.19, capId: "cap_br_a" }],
    ]);
  }, []);

  // caps que ahora “viajan” con cada viga (los de arriba, *_a)
  const travelingCapIds = useMemo(
    () =>
      new Set([
        "cap_tr_a",
        "cap_mid_a",
        "cap_bl_a",
        "cap_tl_a",
        "cap_mid2_a",
        "cap_br_a",
      ]),
    []
  );

  // acceso rápido a path de caps por id
  const capById = useMemo(() => {
    const map = new Map();
    for (const it of PARTS) if (it.kind === "cap") map.set(it.id, it);
    return map;
  }, []);

  const Svg = (
    <motion.svg
      height="100%"
      width="auto"
      viewBox="0 0 222 221"
      xmlns="http://www.w3.org/2000/svg"
      className={`block ${className}`}
      style={{
        overflow: "visible",
        shapeRendering: "geometricPrecision",
        textRendering: "geometricPrecision",
      }}
    >
      {/* centro siempre visible */}
      {PARTS.filter((x) => x.kind === "center").map((it) => (
        <path key={it.id} d={it.d} fill={it.fill} opacity={1} />
      ))}

      {/* ✅ caps fijos: todos menos los caps SUPERIORES (que viajan con la viga) */}
      {PARTS.filter((x) => x.kind === "cap" && !travelingCapIds.has(x.id)).map(
        (it) => <path key={it.id} d={it.d} fill={it.fill} opacity={1} />
      )}

      {/* beams + cap superior viajando: comparten x,y,opacity */}
      {PARTS.filter((x) => x.kind === "beam").map((it) => {
        const slot = beamTimeline.get(it.id);
        const dir = beamDirs.get(it.id) || { x: 0, y: 1 };
        const tip = beamTipRef.get(it.id);

        if (!slot || !tip) return null;

        const t = useTransform(p, (pv) => seg(pv, slot.a, slot.b));

        // mover sobre su propia línea para alinear tip.y = startY en t=0
        const dy0 = startY - tip.y;
        const dx0 = dir.y !== 0 ? dy0 * (dir.x / dir.y) : 0;

        const x = useTransform(t, (tv) => (1 - tv) * dx0);
        const y = useTransform(t, (tv) => (1 - tv) * dy0);

        // opacity: 0 al inicio, aparece aprox a mitad de camino
        const opacity = useTransform(t, (tv) => seg(tv, fadeStart, fadeEnd));

        const cap = capById.get(tip.capId);

        return (
          <g key={it.id}>
            <motion.path
              d={it.d}
              fill={it.fill}
              style={{
                opacity,
                x,
                y,
              }}
            />
            {cap && (
              <motion.path
                d={cap.d}
                fill={cap.fill}
                style={{
                  opacity,
                  x,
                  y,
                }}
              />
            )}
          </g>
        );
      })}
    </motion.svg>
  );

  if (inline) {
    return (
      <div ref={wrapRef} className="w-full h-full flex items-center justify-center">
        {Svg}
      </div>
    );
  }

  return (
    <section ref={wrapRef} style={{ height }} className="relative w-full">
      <div className="sticky left-0 right-0" style={{ top: stickyTop }}>
        <div className="mx-auto w-full flex items-center justify-center">{Svg}</div>
      </div>
    </section>
  );
}
