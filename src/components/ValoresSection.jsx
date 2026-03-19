// src/components/ValoresSection.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import ValoresAssemble from "./ValoresAssemble";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { VikingRuneFrame } from "./Marco";

const valuesData = [
  {
    id: 1,
    title: "IDENTIDAD",
    text: "Respetamos y reflejamos la esencia de cada marca. Nuestras soluciones digitales están diseñadas para capturar la personalidad y los valores de cada cliente.",
    delay: 0.2,
  },
  {
    id: 2,
    title: "INNOVACIÓN",
    text: "Estamos comprometidos con la búsqueda constante de mejora y sorpresa. Nos esforzamos por estar al tanto de las últimas tendencias.",
    delay: 0.4,
  },
  {
    id: 3,
    title: "INDEPENDENCIA",
    text: "Valoramos la autonomía y la toma de decisiones informadas. Creemos que nuestros clientes deben tener la libertad de alinear sus objetivos.",
    delay: 0.2,
  },
  {
    id: 4,
    title: "SIMPLICIDAD Y ESTILO",
    text: "Diseñamos experiencias digitales intuitivas y visualmente atractivas. Nuestro objetivo es crear soluciones que sean tanto funcionales como estéticas.",
    delay: 0.4,
  },
];

function clamp01(x) {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function degToRad(d) {
  return (d * Math.PI) / 180;
}
function rotatePoint(p, c, deg) {
  const r = degToRad(deg);
  const cos = Math.cos(r);
  const sin = Math.sin(r);
  const dx = p.x - c.x;
  const dy = p.y - c.y;
  return { x: c.x + dx * cos - dy * sin, y: c.y + dx * sin + dy * cos };
}

// ===== Helpers para posicionar labels en el contenedor (viewBox 700) =====
function toPctPos(p, view = 700) {
  return { left: `${(p.x / view) * 100}%`, top: `${(p.y / view) * 100}%` };
}

function labelFromPoint(point, center, tune = {}) {
  const dx = point.x - center.x;
  const dy = point.y - center.y;

  const isRight = dx >= 0;
  const isBottom = dy >= 0;

  const OFFSET = 18;
  const base = toPctPos(point);

  const forceLeft = tune.forceLeft ?? false;
  const forceRight = tune.forceRight ?? false;
  const forceTop = tune.forceTop ?? false;
  const forceBottom = tune.forceBottom ?? false;

  const _isRight = forceLeft ? false : forceRight ? true : isRight;
  const _isBottom = forceTop ? false : forceBottom ? true : isBottom;

  const anchorX = _isRight ? "translateX(0%)" : "translateX(-100%)";
  const anchorY = _isBottom ? "translateY(0%)" : "translateY(-100%)";

  return {
    ...base,
    transform: `${anchorX} ${anchorY} translate(${_isRight ? OFFSET : -OFFSET}px, ${_isBottom ? OFFSET : -OFFSET
      }px)`,
    marginLeft: tune.ml ?? 0,
    marginTop: tune.mt ?? 0,
  };
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ✅ Mobile card: entra cuando la card llega al MISMO punto del viewport
function MobileRevealCard({ children }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 65%"],
  });

  const p = useTransform(scrollYProgress, (v) => clamp01(v));

  const opacity = useTransform(p, [0, 1], [0, 1]);
  const y = useTransform(p, [0, 1], [16, 0]);

  const blurPx = useTransform(p, [0, 1], [6, 0]);
  const blurStr = useTransform(blurPx, (b) => `blur(${b}px)`);

  const scale = useTransform(p, [0, 1], [0.985, 1]);

  return (
    <motion.div ref={ref} style={{ opacity, y, scale, filter: blurStr }}>
      {children}
    </motion.div>
  );
}

// ===== Tri helper =====
function makeTriangle(CX, CY, R) {
  const A = (Math.sqrt(3) / 2) * R;
  const top = { x: CX, y: CY - R };
  const br = { x: CX + A, y: CY + R / 2 };
  const bl = { x: CX - A, y: CY + R / 2 };
  const path = `M ${top.x} ${top.y} L ${br.x} ${br.y} L ${bl.x} ${bl.y} Z`;
  return { top, br, bl, path };
}

// ===== Runas: (Unicode) distribuido sobre un círculo =====
const RUNES_TEXT = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛋᛏᛒᛖᛗᛚᛜᛟᛞ";

function makeRunesOnCircle({
  cx,
  cy,
  r,
  text,
  startDeg = -110,
  endDeg = 250,
  count = 28,
}) {
  const chars = Array.from(text.replace(/\s+/g, ""));
  const N = Math.max(10, count);
  const used = Array.from({ length: N }, (_, i) => chars[i % chars.length]);

  const start = degToRad(startDeg);
  const end = degToRad(endDeg);
  const span = end - start;

  return used.map((ch, i) => {
    const t = N === 1 ? 0 : i / (N - 1);
    const ang = start + span * t;
    const x = cx + Math.cos(ang) * r;
    const y = cy + Math.sin(ang) * r;
    const rot = (ang * 180) / Math.PI + 90;
    return { ch, x, y, rot, t };
  });
}

export default function ValoresSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const CX = 350;
  const CY = 350;
  const CENTER = useMemo(() => ({ x: CX, y: CY }), [CX, CY]);

  const START = 0.18;
  const END = 0.4;

  const DEG2 = 40;
  const DEG3 = 80;

  const [a2, setA2] = useState(0);
  const [a3, setA3] = useState(0);

  const [showIndep, setShowIndep] = useState(false);
  const [showPack, setShowPack] = useState(false);

  // ✅ stroke más grueso en mobile (<720px)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 719px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const TRI_STROKE_BASE = isMobile ? 1.35 : 0.75;
  const TRI_STROKE_STEP = isMobile ? 0.14 : 0.08;

  // ===== Runas: ya entré? y progreso dentro de zona
  const [runesT, setRunesT] = useState(0); // 0..1
  const [enteredRunes, setEnteredRunes] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const t = clamp01((v - START) / (END - START));
    const te = easeInOutCubic(t);

    setA2(lerp(0, DEG2, te));
    setA3(lerp(0, DEG3, te));

    setShowIndep(v >= END);
    setShowPack(v >= 0.05 && v <= 0.92);

    // ✅ runas:
    const Z_START = 0.18;
    const Z_END = 1.5;

    const hasEntered = t >= Z_START;
    setEnteredRunes(hasEntered);

    if (!hasEntered) {
      setRunesT(0);
    } else {
      const rt = clamp01((t - Z_START) / (Z_END - Z_START));
      setRunesT(easeInOutCubic(rt));
    }
  });

  // === 5 triángulos (5 líneas juntitas) ===
  const R_BASE = 295;
  const TRI_GAP = 20;
  const triSet = useMemo(() => {
    const t0 = makeTriangle(CX, CY, R_BASE - 2 * TRI_GAP);
    const t1 = makeTriangle(CX, CY, R_BASE - 1 * TRI_GAP);
    const t2 = makeTriangle(CX, CY, R_BASE);
    const t3 = makeTriangle(CX, CY, R_BASE + 1 * TRI_GAP);
    const t4 = makeTriangle(CX, CY, R_BASE + 2 * TRI_GAP);
    const list = [t0, t1, t2, t3, t4];
    return { list, outer: t4 };
  }, [CX, CY]);

  // === 5 círculos hacia afuera (alrededor de la cara del lobo) ===
  const CIRCLE_BASE = isMobile ? 128 : 150;
  const CIRCLE_GAP = isMobile ? 6 : 8;
  const circles = useMemo(
    () => Array.from({ length: 5 }, (_, i) => CIRCLE_BASE + i * CIRCLE_GAP),
    [CIRCLE_BASE, CIRCLE_GAP]
  );

  // ✅ Puntos sobre el último triángulo (outer)
  const pointIdentidad = triSet.outer.top;
  const pointSimplicidad = triSet.outer.bl;
  const pointInnovacion = triSet.outer.br;

  const pointIndependencia = useMemo(
    () => rotatePoint(triSet.outer.top, CENTER, a3),
    [triSet.outer.top, CENTER, a3]
  );

  const identidad = valuesData.find((v) => v.title === "IDENTIDAD");
  const independencia = valuesData.find((v) => v.title === "INDEPENDENCIA");
  const innovacion = valuesData.find((v) => v.title === "INNOVACIÓN");
  const simple = valuesData.find((v) => v.title === "SIMPLICIDAD Y ESTILO");

  const CARD_LEFT_TOP = "left-[8%] top-[-8%]";
  const CARD_RIGHT_TOP = "right-[-5%] top-[22%] translate-x-2 translate-y-2";
  const CARD_LEFT_BOTTOM = "left-0 bottom-[1%]";
  const CARD_RIGHT_BOTTOM = "right-0 bottom-[2%]";
  const CARD_W = "w-[min(380px,42vw)] lg:w-[min(420px,46vw)]";

  const labelIdentidadStyle = useMemo(
    () =>
      labelFromPoint(pointIdentidad, CENTER, {
        forceLeft: true,
        ml: 70,
        mt: 0,
      }),
    [pointIdentidad, CENTER]
  );

  const labelInnovacionStyle = useMemo(
    () => labelFromPoint(pointInnovacion, CENTER, { ml: 0, mt: 0 }),
    [pointInnovacion, CENTER]
  );

  const labelSimplicidadStyle = useMemo(
    () =>
      labelFromPoint(pointSimplicidad, CENTER, {
        ml: 0,
        mt: 10,
      }),
    [pointSimplicidad, CENTER]
  );

  const labelIndependenciaStyle = useMemo(
    () =>
      labelFromPoint(pointIndependencia, CENTER, {
        forceRight: true,
        ml: 50,
        mt: -15,
      }),
    [pointIndependencia, CENTER]
  );

  // ===== ✅ RUNAS SOBRE EL CÍRCULO NEGRO CENTRAL =====
  const RUNES_R = isMobile ? 132 : 132;
  const runeCount = isMobile ? 22 : 26;

  const runes = useMemo(() => {
    return makeRunesOnCircle({
      cx: CX,
      cy: CY,
      r: RUNES_R,
      text: RUNES_TEXT,
      startDeg: -90,
      endDeg: 256,
      count: runeCount,
    });
  }, [CX, CY, RUNES_R, runeCount]);

  const reveal = clamp01(runesT * 2.0);
  const N = runes.length;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#050505] text-white flex items-center justify-center"
    >
      <div
        className="
          absolute inset-0 z-0
          max-[719px]:bg-[radial-gradient(circle_at_50%_46%,rgba(212,175,55,0.15)_0%,rgba(0,0,0,1)_70%)]
          min-[720px]:bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,rgba(0,0,0,1)_70%)]
        "
      />

      {/* ===== VIGNETTE TOP/BOTTOM ===== */}
      <div className="absolute inset-0 z-25 pointer-events-none">
        <div
          className="absolute left-0 right-0 top-0 h-[22%]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.65) 35%, rgba(5,5,5,0) 100%)",
          }}
        />
        <div
          className="absolute left-0 right-0 bottom-0 h-[22%]"
          style={{
            background:
              "linear-gradient(to top, rgba(7,6,5,0.96) 0%, rgba(10,9,7,0.62) 35%, rgba(5,5,5,0) 100%)",
          }}
        />
        <div
          className="absolute left-0 right-0 bottom-0 h-[18%]"
          style={{
            background:
              "linear-gradient(to top, rgba(212,175,55,0.14) 0%, rgba(212,175,55,0) 100%)",
            mixBlendMode: "soft-light",
            opacity: 0.35,
          }}
        />
      </div>

      <div className="relative z-10 w-[min(1200px,96vw)]">
        <div className="relative mx-auto w-full max-w-[92vw] sm:max-w-[520px] md:max-w-[620px] lg:max-w-[700px] aspect-square">
          {/* ✅ wrapper: baja TODO el dibujo (SVG + centro + labels) en mobile 16px */}
          <div
            className="absolute inset-0"
            style={{ top: isMobile ? 40 : 0 }}
          >
            {/* SVG */}
            <div className="absolute inset-0 pointer-events-none opacity-40 z-30">
              <svg
                className="w-full h-full overflow-visible"
                style={{ overflow: "visible" }}
                viewBox="0 0 700 700"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter
                    id="glowGold"
                    x="-60%"
                    y="-60%"
                    width="220%"
                    height="220%"
                  >
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <filter
                    id="glowWhite"
                    x="-80%"
                    y="-80%"
                    width="260%"
                    height="260%"
                  >
                    <feGaussianBlur stdDeviation="1.1" result="blurW" />
                    <feMerge>
                      <feMergeNode in="blurW" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* ===== MARCO VIKINGO DORADO ===== */}
                <VikingRuneFrame
                  cx={CX}
                  cy={CY}
                  rOuter={R_BASE + 2 * TRI_GAP + (isMobile ? 34 : 40)}
                  rInner={R_BASE + 2 * TRI_GAP + (isMobile ? 18 : 22)}
                  rKnot={R_BASE + 2 * TRI_GAP + (isMobile ? 28 : 32)}
                  isMobile={isMobile}
                />

                {/* ===== 0°: 5 triángulos ===== */}
                {triSet.list.map((t, i) => (
                  <path
                    key={`t0-${i}`}
                    d={t.path}
                    stroke="#D4AF37"
                    strokeWidth={TRI_STROKE_BASE + i * TRI_STROKE_STEP}
                    opacity={0.18 + i * 0.07}
                  />
                ))}

                {/* ===== a2: 5 triángulos ===== */}
                <g transform={`rotate(${a2} ${CX} ${CY})`}>
                  {triSet.list.map((t, i) => (
                    <path
                      key={`t2-${i}`}
                      d={t.path}
                      stroke="#D4AF37"
                      strokeWidth={TRI_STROKE_BASE + i * TRI_STROKE_STEP}
                      opacity={0.18 + i * 0.07}
                    />
                  ))}
                </g>

                {/* ===== a3: 5 triángulos ===== */}
                <g transform={`rotate(${a3} ${CX} ${CY})`}>
                  {triSet.list.map((t, i) => (
                    <path
                      key={`t3-${i}`}
                      d={t.path}
                      stroke="#D4AF37"
                      strokeWidth={TRI_STROKE_BASE + i * TRI_STROKE_STEP}
                      opacity={0.18 + i * 0.07}
                    />
                  ))}
                </g>

                {/* punteado adentro */}
                <circle
                  cx={CX}
                  cy={CY}
                  r="100"
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  opacity="0.35"
                />

                {/* ✅ RUNAS */}
                {enteredRunes && (
                  <g filter="url(#glowWhite)">
                    {runes.map((it, idx) => {
                      const BASE = N <= 1 ? 0 : idx / (N - 1);
                      const FIRST_DELAY = 0.02;
                      const threshold = idx === 0 ? BASE + FIRST_DELAY : BASE;
                      if (reveal + 1e-6 < threshold) return null;

                      return (
                        <text
                          key={`r-${idx}`}
                          x={it.x}
                          y={it.y}
                          fill="#D4AF37"
                          opacity={0.95}
                          fontSize={isMobile ? 18 : 18}
                          fontWeight={100}
                          fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${it.rot} ${it.x} ${it.y})`}
                          style={{
                            letterSpacing: "0.2px",
                            textRendering: "geometricPrecision",
                            paintOrder: "stroke fill",
                            stroke: "rgba(0,0,0,0.9)",
                            strokeWidth: isMobile ? 2.4 : 2.6,
                            strokeLinejoin: "round",
                          }}
                        >
                          {it.ch}
                        </text>
                      );
                    })}
                  </g>
                )}

                {/* ✅ 5 círculos hacia afuera */}
                {circles.map((r, i) => (
                  <circle
                    key={`c-${i}`}
                    cx={CX}
                    cy={CY}
                    r={r}
                    stroke="#D4AF37"
                    strokeWidth={i === 0 ? 1 : 0.8}
                    opacity={0.52 - i * 0.07}
                  />
                ))}

                {/* puntos */}
                <circle
                  cx={pointIdentidad.x}
                  cy={pointIdentidad.y}
                  r="6"
                  fill="#D4AF37"
                  opacity="0.95"
                  filter="url(#glowGold)"
                />
                <circle
                  cx={pointSimplicidad.x}
                  cy={pointSimplicidad.y}
                  r="6"
                  fill="#D4AF37"
                  opacity="0.95"
                  filter="url(#glowGold)"
                />
                <circle
                  cx={pointInnovacion.x}
                  cy={pointInnovacion.y}
                  r="6"
                  fill="#D4AF37"
                  opacity="0.95"
                  filter="url(#glowGold)"
                />
                <circle
                  cx={pointIndependencia.x}
                  cy={pointIndependencia.y}
                  r="6"
                  fill="#D4AF37"
                  opacity="0.95"
                  filter="url(#glowGold)"
                />
              </svg>
            </div>

            {/* Labels desktop */}
            <motion.div
              className="absolute inset-0 z-30 pointer-events-none hidden min-[720px]:block"
              initial={{ opacity: 0, y: 10 }}
              animate={showPack ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="absolute" style={labelIdentidadStyle}>
                <span className="bg-[#D4AF37] text-black font-bold uppercase tracking-widest inline-block shadow-[0_0_15px_rgba(212,175,55,0.4)] text-[10px] lg:text-xs px-3 py-1">
                  IDENTIDAD
                </span>
              </div>

              <div className="absolute" style={labelInnovacionStyle}>
                <span className="bg-[#D4AF37] text-black font-bold uppercase tracking-widest inline-block shadow-[0_0_15px_rgba(212,175,55,0.4)] text-[10px] lg:text-xs px-3 py-1">
                  INNOVACIÓN
                </span>
              </div>

              <div className="absolute" style={labelSimplicidadStyle}>
                <span className="bg-[#D4AF37] text-black font-bold uppercase tracking-widest inline-block shadow-[0_0_15px_rgba(212,175,55,0.4)] text-[10px] lg:text-xs px-3 py-1">
                  SIMPLICIDAD Y ESTILO
                </span>
              </div>

              <motion.div
                className="absolute"
                style={labelIndependenciaStyle}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  showIndep && showPack
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="bg-[#D4AF37] text-black font-bold uppercase tracking-widest inline-block shadow-[0_0_15px_rgba(212,175,55,0.4)] text-[10px] lg:text-xs px-3 py-1">
                  INDEPENDENCIA
                </span>
              </motion.div>
            </motion.div>

            {/* Centro */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div
                className="
                  relative flex items-center justify-center bg-[#050505] rounded-full
                  border border-[#D4AF37]/20 shadow-[0_0_50px_rgba(212,175,55,0.1)]
                  w-32 h-32 md:w-56 md:h-56
                "
              >
                <img
                  src="/logoApp2.png"
                  alt="Wulfnet Logo"
                  className="
                    object-contain opacity-90 drop-shadow-[0_0_10px_#D4AF37]
                    w-24 h-24 md:w-32 md:h-32
                  "
                />
              </div>
            </div>
          </div>

          {/* Cartel Valores (queda fijo) */}
          {/* Cartel Valores (CENTRADO ABSOLUTO) */}
          <div
            className="absolute z-30 pointer-events-none
            /* POSICIÓN: Centrado horizontal perfecto */
            left-1/2 -translate-x-1/2
            
            /* ALTURA: Ajusta esto si lo quieres más arriba o abajo */
            top-[-96px] md:top-[-180px] 
            
            /* DISTRIBUCIÓN: Columna en móvil, Fila en PC */
            flex flex-col md:flex-row items-center justify-center gap-4
            w-max"
          >
            {/* ÍCONO */}
            <div className="flex justify-center opacity-90">
              <div className="relative w-16 md:w-24 h-16 md:h-24 overflow-visible">
                <ValoresAssemble
                  className="absolute inset-0 overflow-visible"
                  SUCTION_ZONE={1}
                  SUCTION_POWER={0.2}
                  SUCTION_CURVE={0.5}
                />
              </div>
            </div>

            {/* TEXTO */}
            <h2 className="font-garamond text-white tracking-wider uppercase 
              text-2xl md:text-3xl text-center whitespace-nowrap"
            >
              Valores
            </h2>
          </div>
        </div>

        {/* Desktop cards */}
        <motion.div
          className="absolute inset-0 pointer-events-none hidden min-[720px]:block"
          initial={{ opacity: 0, y: 12 }}
          animate={showPack ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={`absolute ${CARD_LEFT_TOP} ${CARD_W} pointer-events-auto`}>
            <ValueCard item={identidad} size="responsive" hideTitle />
          </div>

          <motion.div
            className={`absolute ${CARD_RIGHT_TOP} ${CARD_W} pointer-events-auto`}
            initial={{ opacity: 0, y: 18 }}
            animate={
              showIndep && showPack
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 18 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ValueCardStatic item={independencia} size="responsive" hideTitle />
          </motion.div>

          <div className={`absolute ${CARD_LEFT_BOTTOM} ${CARD_W} pointer-events-auto`}>
            <ValueCard item={simple} size="responsive" hideTitle />
          </div>

          <div className={`absolute ${CARD_RIGHT_BOTTOM} ${CARD_W} pointer-events-auto`}>
            <ValueCard item={innovacion} size="responsive" hideTitle />
          </div>
        </motion.div>

        {/* Mobile */}
        <div className="hidden max-[719px]:block">
          <div className="mt-10 mx-auto w-full max-w-[520px] px-2">
            <div className="space-y-6">
              <MobileRevealCard>
                <ValueCardStatic item={identidad} size="mobile" />
              </MobileRevealCard>

              <MobileRevealCard>
                <ValueCardStatic item={innovacion} size="mobile" />
              </MobileRevealCard>

              <MobileRevealCard>
                <ValueCardStatic item={simple} size="mobile" />
              </MobileRevealCard>

              <MobileRevealCard>
                <ValueCardStatic item={independencia} size="mobile" />
              </MobileRevealCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueCard({ item, size = "responsive", hideTitle = false }) {
  if (!item) return null;

  const titleClass =
    size === "mobile"
      ? "text-[11px] px-3 py-1 mb-3"
      : "text-[10px] lg:text-xs px-3 py-1 mb-3 lg:mb-4";
  const boxClass = size === "mobile" ? "p-5" : "p-5 lg:p-6";
  const textClass =
    size === "mobile"
      ? "text-sm leading-relaxed"
      : "text-xs md:text-sm leading-relaxed";

  const alignWrap =
    size === "mobile" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.6, delay: item.delay }}
      className={`flex flex-col ${alignWrap}`}
    >
      {!hideTitle && (
        <span
          className={`bg-[#D4AF37] text-black font-bold uppercase tracking-widest inline-block shadow-[0_0_15px_rgba(212,175,55,0.4)] ${titleClass}`}
        >
          {item.title}
        </span>
      )}

      <div
        className={`border border-[#333] bg-[#0a0a0a]/90 backdrop-blur-md relative group hover:border-[#D4AF37]/50 transition-colors duration-500 w-full ${boxClass}`}
      >
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#D4AF37]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#D4AF37]" />
        <p className={`text-gray-300 font-light ${textClass}`}>{item.text}</p>
      </div>
    </motion.div>
  );
}

function ValueCardStatic({ item, size = "responsive", hideTitle = false }) {
  if (!item) return null;

  const titleClass =
    size === "mobile"
      ? "text-[11px] px-3 py-1 mb-3"
      : "text-[10px] lg:text-xs px-3 py-1 mb-3 lg:mb-4";
  const boxClass = size === "mobile" ? "p-5" : "p-5 lg:p-6";
  const textClass =
    size === "mobile"
      ? "text-sm leading-relaxed"
      : "text-xs md:text-sm leading-relaxed";

  const alignWrap =
    size === "mobile" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignWrap}`}>
      {!hideTitle && (
        <span
          className={`bg-[#D4AF37] text-black font-bold uppercase tracking-widest inline-block shadow-[0_0_15px_rgba(212,175,55,0.4)] ${titleClass}`}
        >
          {item.title}
        </span>
      )}

      <div
        className={`border border-[#333] bg-[#0a0a0a]/90 backdrop-blur-md relative group hover:border-[#D4AF37]/50 transition-colors duration-500 w-full ${boxClass}`}
      >
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#D4AF37]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#D4AF37]" />
        <p className={`text-gray-300 font-light ${textClass}`}>{item.text}</p>
      </div>
    </div>
  );
}
