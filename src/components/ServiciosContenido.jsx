// src/components/ServiciosContenido.jsx
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, Star } from 'lucide-react';

// --- HELPERS PARA EL DIAGRAMA RADIAL ---
function getPoint(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function makeTriangle(CX, CY, R) {
  const A = (Math.sqrt(3) / 2) * R;
  const top = { x: CX, y: CY - R };
  const br = { x: CX + A, y: CY + R / 2 };
  const bl = { x: CX - A, y: CY + R / 2 };
  return `M ${top.x} ${top.y} L ${br.x} ${br.y} L ${bl.x} ${bl.y} Z`;
}

const CONFIG_RADIAL = {
  web: [
    { angle: 230, cardPos: 'left' },
    { angle: 110, cardPos: 'bottom' },
    { angle: 350, cardPos: 'right' }
  ],
  seo: [
    { angle: 150, cardPos: 'left' },
    { angle: 270, cardPos: 'right' },
    { angle: 30, cardPos: 'right' }
  ],
  social: [
    { angle: 210, cardPos: 'left' },
    { angle: 330, cardPos: 'right' },
    { angle: 90, cardPos: 'bottom' }
  ]
};

export const ServiciosRadialHero = ({ content, categoria }) => {
  const CX = 400;
  const CY = 300;
  const R_STAR = 240;
  const R_NODES = 170;

  const bgRotations = [0, 40, 80];
  const bgTrianglePath = makeTriangle(CX, CY, R_STAR);
  const pointsData = CONFIG_RADIAL[categoria].map(pt => getPoint(CX, CY, R_NODES, pt.angle));
  const goldenTrianglePath = `M ${pointsData[0].x} ${pointsData[0].y} L ${pointsData[1].x} ${pointsData[1].y} L ${pointsData[2].x} ${pointsData[2].y} Z`;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 95%", "center center"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-25, 0]);
  const counterRotate = useTransform(scrollYProgress, [0, 1], [25, 0]);

  return (
    <div className="w-full flex flex-col items-center mt-2 mb-8 lg:mb-24">
      <motion.h2
        key={`title-${categoria}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white text-lg sm:text-xl md:text-3xl tracking-[0.25em] uppercase font-garamond text-center mb-6 md:mb-8 z-20 leading-relaxed"
      >
        {content.label}
      </motion.h2>

      <div ref={containerRef} className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-md lg:max-w-5xl mx-auto aspect-[4/3] flex items-center justify-center">
        <motion.div className="absolute inset-0" style={{ rotate }}>
          <div className="absolute inset-0 pointer-events-none z-10">
            <svg viewBox="0 0 800 600" className="w-full h-full overflow-visible">
              <motion.circle cx={CX} cy={CY} r={R_STAR} stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 8" fill="none" initial={{ opacity: 0 }} animate={{ opacity: 0.25 }} transition={{ duration: 4, ease: "easeInOut" }} />
              <motion.circle cx={CX} cy={CY} r={R_NODES} stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 6" fill="none" initial={{ opacity: 0 }} animate={{ opacity: 0.25 }} transition={{ duration: 4, ease: "easeInOut" }} />
              {bgRotations.map((rot, i) => (
                <g key={i} transform={`rotate(${rot} ${CX} ${CY})`}>
                  <motion.path d={bgTrianglePath} stroke="#D4AF37" strokeWidth="1" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.3 }} transition={{ duration: 4, ease: "easeInOut" }} />
                </g>
              ))}
              <motion.path d={goldenTrianglePath} stroke="#D4AF37" strokeWidth="2" fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1, d: goldenTrianglePath }} transition={{ duration: 1.5, ease: "easeInOut" }} />
              {pointsData.map((pt, i) => (
                <motion.circle key={`dot-${i}`} r="6" fill="#050505" stroke="#D4AF37" strokeWidth="2" initial={{ scale: 0, opacity: 0, cx: pt.x, cy: pt.y }} animate={{ scale: 1, opacity: 1, cx: pt.x, cy: pt.y }} transition={{ duration: 1.5, ease: "easeInOut" }} style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.6))" }} />
              ))}
            </svg>
          </div>

          <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} style={{ rotate: counterRotate }}>
            <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-24 md:h-24 opacity-90 drop-shadow-[0_0_10px_#D4AF37]">
              <img src="/assets/valores.svg" alt="Ícono" className="w-full h-full object-contain" />
            </div>
          </motion.div>

          <div className="absolute inset-0 z-30 pointer-events-none hidden lg:block">
            {content.services.map((service, idx) => {
              const pt = CONFIG_RADIAL[categoria][idx];
              const pos = getPoint(CX, CY, R_NODES, pt.angle);
              const leftPct = (pos.x / 800) * 100;
              const topPct = (pos.y / 600) * 100;
              let transform = "";
              let lineClasses = "";
              let transformOrigin = "";
              if (pt.cardPos === 'right') { transform = "translate(2rem, -50%)"; lineClasses = "absolute top-1/2 right-full w-8 h-[1px] bg-[#D4AF37]/50"; transformOrigin = "-2rem 50%"; }
              else if (pt.cardPos === 'left') { transform = "translate(calc(-100% - 2rem), -50%)"; lineClasses = "absolute top-1/2 left-full w-8 h-[1px] bg-[#D4AF37]/50"; transformOrigin = "calc(100% + 2rem) 50%"; }
              else if (pt.cardPos === 'bottom') { transform = "translate(-50%, 2rem)"; lineClasses = "absolute left-1/2 bottom-full w-[1px] h-8 bg-[#D4AF37]/50"; transformOrigin = "50% -2rem"; }
              return (
                <div key={`card-${categoria}-${idx}`} className="absolute pointer-events-auto" style={{ left: `${leftPct}%`, top: `${topPct}%`, transform }}>
                  <motion.div className="relative w-[260px] xl:w-[320px] group" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 + (idx * 0.2), duration: 0.6 }} style={{ rotate: counterRotate, transformOrigin }}>
                    <div className={lineClasses} />
                    <div className={`flex flex-col ${pt.cardPos === 'right' ? 'items-start' : pt.cardPos === 'left' ? 'items-end' : 'items-center'}`}>
                      <div className="bg-[#D4AF37] text-black inline-block px-3 py-1.5 text-[10px] xl:text-xs uppercase tracking-widest font-bold mb-3 shadow-[0_0_10px_rgba(212,175,55,0.2)]">{service.title}</div>
                      <div className="border border-[#1a1a1a] bg-[#0b0b0b]/90 backdrop-blur-sm p-5 relative transition-colors duration-300 hover:border-[#D4AF37]/50 w-full text-left">
                        <p className="text-gray-400 text-xs xl:text-sm leading-relaxed">{service.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const WebProcessDiagram = () => (
  <div className="relative w-full max-w-xs mx-auto aspect-square">
    <svg viewBox="0 0 200 200" className="w-full h-full text-white/10">
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <rect x="45" y="45" width="110" height="110" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="45" cy="45" r="8" fill="none" stroke="currentColor" strokeWidth="1" /><circle cx="155" cy="45" r="8" fill="none" stroke="currentColor" strokeWidth="1" /><circle cx="155" cy="155" r="8" fill="none" stroke="currentColor" strokeWidth="1" /><circle cx="45" cy="155" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="45" cy="45" r="3" fill="#D4AF37" /><circle cx="155" cy="45" r="3" fill="#D4AF37" /><circle cx="155" cy="155" r="3" fill="#D4AF37" /><circle cx="45" cy="155" r="3" fill="#D4AF37" />
      <path d="M100 75 L122 88 L122 112 L100 125 L78 112 L78 88 Z" fill="none" stroke="#D4AF37" strokeWidth="2" />
      <path d="M100 75 L100 125 M122 88 L78 112 M122 112 L78 88" stroke="#D4AF37" strokeWidth="1" />
      <line x1="45" y1="45" x2="155" y2="155" stroke="currentColor" strokeWidth="0.5" /><line x1="155" y1="45" x2="45" y2="155" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  </div>
);

export const SEOProcessDiagram = () => (
  <div className="relative w-full max-w-xs mx-auto aspect-square">
    <svg viewBox="0 0 200 200" className="w-full h-full text-white/10">
      <path d="M100 10 L178 55 L178 145 L100 190 L22 145 L22 55 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <path d="M100 10 L100 190 M178 55 L22 145 M178 145 L22 55" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
      <path d="M100 70 L135 90 L135 130 L100 150 L65 130 L65 90 Z" fill="none" stroke="#D4AF37" strokeWidth="2" />
      <path d="M100 70 L100 150 M135 90 L65 130 M135 130 L65 90" stroke="#D4AF37" strokeWidth="1" />
      <circle cx="100" cy="10" r="4" fill="#D4AF37" /><circle cx="178" cy="55" r="4" fill="#D4AF37" /><circle cx="178" cy="145" r="4" fill="#D4AF37" /><circle cx="100" cy="190" r="4" fill="#D4AF37" /><circle cx="22" cy="145" r="4" fill="#D4AF37" /><circle cx="22" cy="55" r="4" fill="#D4AF37" />
      <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" /><circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  </div>
);

export const SocialProcessDiagram = () => (
  <div className="relative w-full max-w-xs mx-auto aspect-square">
    <svg viewBox="0 0 200 200" className="w-full h-full text-white/10">
      <path d="M100 10 L190 100 L100 190 L10 100 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <path d="M100 10 L100 190 M10 100 L190 100" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
      <path d="M100 70 L130 120 L70 120 Z" fill="#050505" stroke="#D4AF37" strokeWidth="2" />
      <circle cx="100" cy="10" r="6" fill="#050505" stroke="#D4AF37" strokeWidth="2" /><circle cx="190" cy="100" r="6" fill="#050505" stroke="#D4AF37" strokeWidth="2" /><circle cx="100" cy="190" r="6" fill="#050505" stroke="#D4AF37" strokeWidth="2" /><circle cx="10" cy="100" r="6" fill="#050505" stroke="#D4AF37" strokeWidth="2" />
      <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  </div>
);

export const DiferencialesDiagram = () => (
  <div className="relative w-full max-w-xs mx-auto aspect-square">
    <svg viewBox="0 0 200 200" className="w-full h-full text-white/10">
      <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <path d="M100 15 L185 100 L100 185 L15 100 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <line x1="100" y1="15" x2="100" y2="185" stroke="currentColor" strokeWidth="0.5" /><line x1="15" y1="100" x2="185" y2="100" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="12" fill="#050505" stroke="#D4AF37" strokeWidth="1" />
      <path d="M100 145 L135 85 L65 85 Z" fill="none" stroke="#D4AF37" strokeWidth="2" />
      <path d="M100 40 L135 85 L65 85 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="15" r="5" fill="#050505" stroke="#D4AF37" strokeWidth="2" /><circle cx="185" cy="100" r="5" fill="#050505" stroke="#D4AF37" strokeWidth="2" /><circle cx="100" cy="185" r="5" fill="#050505" stroke="#D4AF37" strokeWidth="2" /><circle cx="15" cy="100" r="5" fill="#050505" stroke="#D4AF37" strokeWidth="2" />
    </svg>
  </div>
);

export const StepNumber = ({ number }) => (
  <div className="w-12 h-12 bg-[#0b0b0b] border border-[#1a1a1a] flex items-center justify-center mb-4 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.05)]">
    <span className="text-[#D4AF37] font-garamond text-2xl">{number}</span>
  </div>
);

export const PlanCard = ({ plan }) => {
  const [expanded, setExpanded] = useState(false);
  const isLongText = plan.desc.length > 150;

  return (
    <div className={`bg-[#0b0b0b] border p-8 flex flex-col h-full relative transition-all duration-300 ${plan.isPro ? 'border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]' : 'border-[#1a1a1a] hover:border-[#333]'}`}>
      {plan.isPro && (<div className="absolute top-4 right-4 text-[#D4AF37]"><Star fill="currentColor" size={20} /></div>)}
      <div className="bg-[#D4AF37] text-black px-4 py-1.5 text-xs uppercase tracking-widest font-bold mb-6 self-start">{plan.name}</div>
      {plan.subtitle && <h4 className="text-lg text-white font-garamond italic mb-4">{plan.subtitle}</h4>}
      <div className="flex-grow mb-8 relative">
        <p className={`text-sm md:text-base text-gray-400 leading-relaxed transition-all duration-300 ${!expanded && isLongText ? 'line-clamp-4' : ''}`}>{plan.desc}</p>
      </div>
      {plan.items && plan.items.length > 0 && (
        <ul className="space-y-4 mb-8 border-t border-[#1a1a1a] pt-6">
          {plan.items.map((item, i) => (
            <li key={i} className="flex gap-3 items-start text-sm text-gray-300">
              <Check size={16} className="text-[#D4AF37] shrink-0 mt-0.5" /><span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto pt-6 border-t border-[#1a1a1a] flex flex-col items-center">
        {plan.price && (<div className="text-center font-garamond text-2xl text-white mb-6">{plan.price}</div>)}
        {isLongText && (
          <button onClick={() => setExpanded(!expanded)} className="font-garamond text-xl text-white hover:text-[#D4AF37] transition-colors mb-6 cursor-pointer">
            {expanded ? 'Ver menos' : 'Ver más'}
          </button>
        )}
        {/* ── CAMBIO CLAVE: Link a la sección de presupuesto correspondiente ── */}
        <Link
          to={plan.presupuestoPath || '/contacto'}
          className={`w-full block text-center py-3 text-xs uppercase font-bold tracking-widest transition-all duration-300 cursor-pointer ${
            plan.isPro
              ? 'bg-[#D4AF37] text-black hover:bg-white'
              : 'border border-[#333] text-gray-300 hover:bg-[#1a1a1a] hover:text-white hover:border-[#555]'
          }`}
        >
          Consultar
        </Link>
      </div>
    </div>
  );
};

// ─── DATOS ────────────────────────────────────────────────────────────────────
const TAB_CONTENT = {
  web: {
    label: <>DISEÑO WEB</>,
    services: [
      { title: 'ADAPTABLES Y ESCALABLES',  desc: 'Se ajustan a tus necesidades del momento y pueden evolucionar junto a tu proyecto.' },
      { title: 'FUNCIONALES Y RESPONSIVE', desc: 'Ofrecemos una gama de funciones y adaptabilidad a todos los dispositivos.' },
      { title: 'INTUITIVAS Y ELEGANTES',   desc: 'Nos ponemos en el lugar del usuario para ofrecer una buena experiencia de navegación y calidad en el diseño.' }
    ],
    processSteps: [
      { id: '1', title: 'Diagnóstico',  desc: 'Analizamos tu idea en profundidad para definir la solución más conveniente, alineada a tus objetivos, necesidades y presupuesto.' },
      { id: '2', title: 'Divergencia',  desc: 'Exploramos distintas alternativas y enfoques para identificar la opción que mejor se adapte a tu caso y maximice resultados.' },
      { id: '3', title: 'Prototipado',  desc: 'Diseñamos un prototipo en conjunto para validar la estructura y la experiencia del usuario, permitiéndote participar activamente en el proceso.' },
      { id: '4', title: 'Desarrollo',   desc: 'Transformamos el prototipo en una plataforma funcional, construida con una base sólida, escalable y optimizada para rendimiento.' }
    ],
    processDiagram: <WebProcessDiagram />,
    planes: [
      {
        name: 'LANDING PAGE',
        price: null,
        presupuestoPath: '/presupuesto/landing',   // ← va a /presupuesto/landing
        desc: 'Una página web enfocada en comunicar un mensaje de forma clara y ordenada, con una presentación profesional y corporativa de tu marca...',
        items: []
      },
      {
        name: 'ECOMMERCE',
        price: null,
        presupuestoPath: '/presupuesto/tienda',    // ← va a /presupuesto/tienda
        desc: 'Una plataforma de venta digital que permite exhibir productos o servicios de forma profesional y corporativa, con un catálogo organizado...',
        items: []
      },
      {
        name: 'ELITE',
        price: null,
        isPro: true,
        presupuestoPath: '/presupuesto/elite',     // ← va a /presupuesto/elite
        desc: 'Proyectos web de alto nivel, pensados para marcas que buscan una presencia digital premium, con diseño de máxima calidad y funcionalidades avanzadas...',
        items: []
      }
    ]
  },
  social: {
    label: <>RRSS & META ADS</>,
    services: [
      { title: 'LINEAMIENTOS ESTRATÉGICOS', desc: 'Buscamos maximizar los resultados planteando estrategias coherentes desde el momento cero.' },
      { title: 'CRECIMIENTO ORGÁNICO',      desc: 'Generamos contenido de calidad para que las publicaciones puedan crecer también de manera orgánica.' },
      { title: 'SEGMENTACIÓN ADECUADA',     desc: 'Evaluamos adecuadamente tu producto para que puedas enfocarte en tu público objetivo.' }
    ],
    processSteps: [
      { id: '1', title: 'Diagnóstico', desc: 'Realizamos un diagnóstico completo de tu presencia en redes. Analizamos tu perfil, contenido, audiencia y competencia directa.' },
      { id: '2', title: 'Estrategia',  desc: 'Armamos un plan de contenido pensado para tu negocio. Definimos qué publicar, en qué formatos y cómo comunicarlo eficientemente.' },
      { id: '3', title: 'Generación',  desc: 'Creamos las piezas necesarias para tus redes (reels, historias, posteos carrusel) cuidando la estética y la voz de la marca.' },
      { id: '4', title: 'Resultados',  desc: 'Medimos el rendimiento con métricas claras (alcance, interacciones, clics) y vamos ajustando mes a mes para el crecimiento constante.' }
    ],
    processDiagram: <SocialProcessDiagram />,
    planes: [
      // Sin presupuestoPath → van a /contacto por defecto
      { name: 'PLAN INICIAL', price: '$300.000', desc: 'Gestión básica para mantener presencia activa y profesional.', items: ['2 publicaciones feed', '8 historias', '2 reels simples'] },
      { name: 'PLAN MEDIO',   price: '$500.000', desc: 'Estrategia de crecimiento sostenido con mayor impacto visual.', items: ['4 publicaciones feed', '12 historias', '2 reels trabajados'] },
      { name: 'PLAN PRO',     price: '$700.000', isPro: true, desc: 'Cobertura total con contenido premium para dominar tu nicho.', items: ['6 publicaciones feed', '20 historias diseñadas', '2 reels premium'] }
    ]
  }
};

const DIFERENCIALES = [
  { id: '1', title: 'Consultoría Estratégica', desc: 'Te equipamos con el know-how: tips, herramientas y tácticas comerciales para que tu web sea un motor de ventas y no solo un folleto digital.' },
  { id: '2', title: 'Inversión Inteligente',   desc: 'Desarrollo web de alta gama optimizado para tu presupuesto. Calidad premium sin costos inflados para asegurar el retorno de tu inversión.' },
  { id: '3', title: 'Seguridad y Rendimiento', desc: 'Implementamos medidas de seguridad proactivas y optimizamos la velocidad de carga para blindar tu sitio y mejorar la experiencia del usuario.' },
  { id: '4', title: 'Soporte Humano',          desc: 'Olvídate de los tickets automatizados y bots. Cuando necesites ayuda, hablarás con personas reales que conocen tu proyecto.' }
];

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function ServiciosContenido({ categoria }) {
  const content = TAB_CONTENT[categoria];
  if (!content) return null;

  return (
    <div className="w-full font-sans text-gray-300">

      {/* PROCESOS */}
      <div className="border-t border-[#1a1a1a] py-20">
        <div className="text-center mb-16"><h2 className="text-2xl md:text-3xl font-garamond text-white tracking-[0.2em] uppercase">Procesos</h2></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1 space-y-16">
            {content.processSteps.filter((_, i) => i % 2 === 0).map((step, idx) => (
              <div key={idx} className="flex flex-col items-center lg:items-end text-center lg:text-right">
                <StepNumber number={step.id} />
                <h3 className="text-lg uppercase tracking-widest font-garamond text-white mb-3">{step.title}</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, rotate: -10 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: 0.5 }}>
              {content.processDiagram}
            </motion.div>
          </div>
          <div className="lg:col-span-1 space-y-16">
            {content.processSteps.filter((_, i) => i % 2 !== 0).map((step, idx) => (
              <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <StepNumber number={step.id} />
                <h3 className="text-lg uppercase tracking-widest font-garamond text-white mb-3">{step.title}</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PLANES */}
      <div className="border-t border-[#1a1a1a] py-20">
        <div className="text-center mb-16"><h2 className="text-2xl md:text-3xl font-garamond text-white tracking-[0.2em] uppercase">Planes de {content.label}</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.planes.map((plan) => (<PlanCard key={plan.name} plan={plan} />))}
        </div>
      </div>

      {/* DIFERENCIALES */}
      <div className="border-t border-[#1a1a1a] pt-20">
        <div className="text-center mb-16"><h2 className="text-2xl md:text-3xl font-garamond text-white tracking-[0.2em] uppercase">Nuestros Diferenciales</h2></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1 space-y-16">
            {DIFERENCIALES.filter((_, i) => i % 2 === 0).map((step, idx) => (
              <div key={idx} className="flex flex-col items-center lg:items-end text-center lg:text-right">
                <StepNumber number={step.id} />
                <h3 className="text-lg uppercase tracking-widest font-garamond text-white mb-3">{step.title}</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1"><DiferencialesDiagram /></div>
          <div className="lg:col-span-1 space-y-16">
            {DIFERENCIALES.filter((_, i) => i % 2 !== 0).map((step, idx) => (
              <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <StepNumber number={step.id} />
                <h3 className="text-lg uppercase tracking-widest font-garamond text-white mb-3">{step.title}</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
