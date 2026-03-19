// src/components/ServiciosLayout.jsx
import React from "react";
import { NavLink, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import ServiciosContenido, { ServiciosRadialHero } from "./ServiciosContenido";
import SEO from "../pages/SEO";
import Marketing from "../pages/Marketing";

// --- TEXTOS DEL TRIÁNGULO (Centralizados aquí para la fluidez) ---
const HERO_CONTENT = {
  web: {
    label: "DISEÑO WEB",
    services: [
      { title: 'ADAPTABLES Y ESCALABLES', desc: 'Se ajustan a tus necesidades del momento y pueden evolucionar junto a tu proyecto.' },
      { title: 'FUNCIONALES Y RESPONSIVE', desc: 'Ofrecemos una gama de funciones y adaptabilidad a todos los dispositivos.' },
      { title: 'INTUITIVAS Y ELEGANTES', desc: 'Nos ponemos en el lugar del usuario para ofrecer una buena experiencia de navegación y calidad en el diseño.' }
    ]
  },
  seo: {
    label: "SEO & GOOGLE ADS",
    services: [
      { title: 'PRESENCIA EN LA RED', desc: 'Mantenemos la visibilidad de tu marca por vos, no solo es importante el impacto, también la constancia.' },
      { title: 'PALABRAS CLAVE', desc: 'Hacemos uso de palabras clave en tu contenido para atraer a tus potenciales clientes en las búsquedas.' },
      { title: 'OPTIMIZACIÓN DE RENDIMIENTO', desc: 'Optimizamos el rendimiento de la web para aumentar tu presencia en buscadores.' }
    ]
  },
  social: {
    label: "RRSS & META ADS",
    services: [
      { title: 'LINEAMIENTOS ESTRATÉGICOS', desc: 'Buscamos maximizar los resultados planteando estrategias coherentes desde el momento cero.' },
      { title: 'CRECIMIENTO ORGÁNICO', desc: 'Generamos contenido de calidad para que las publicaciones puedan crecer también de manera orgánica.' },
      { title: 'SEGMENTACIÓN ADECUADA', desc: 'Evaluamos adecuadamente tu producto para que puedas enfocarte en tu público objetivo.' }
    ]
  }
};

const tabs = [
  { to: "/servicios/programacion", label: "Web" },
  { to: "/servicios/seo", label: "SEO & Ads" },
  { to: "/servicios/marketing", label: "RRSS" },
];

const FloatingParticles = () => {
  const particles = Array.from({ length: 15 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => (
        <motion.div key={i} className="absolute rounded-full bg-[#D4AF37]" initial={{ x: Math.random() * 100 + "vw", y: Math.random() * 100 + "vh", scale: Math.random() * 0.5 + 0.2, opacity: 0 }} animate={{ y: [null, Math.random() * -100], opacity: [0, 0.15, 0] }} transition={{ duration: Math.random() * 10 + 15, repeat: Infinity, ease: "linear" }} style={{ width: Math.random() * 4 + 1 + "px", height: Math.random() * 4 + 1 + "px", boxShadow: "0 0 10px rgba(212, 175, 55, 0.3)" }} />
      ))}
    </div>
  );
};

export default function ServiciosLayout() {
  const location = useLocation();

  if (location.pathname === "/servicios" || location.pathname === "/servicios/") {
    return <Navigate to="/servicios/programacion" replace />;
  }

  let categoriaActual = "web";
  if (location.pathname.includes("seo")) categoriaActual = "seo";
  else if (location.pathname.includes("marketing")) categoriaActual = "social";

  const content = HERO_CONTENT[categoriaActual];

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
      
      <div className="absolute inset-0 z-0">
        <FloatingParticles />
        <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-[#111]/60 to-transparent" />
      </div>

      <div className="relative z-20 pt-16 pb-8 text-center px-6">
        <h2 className="text-3xl md:text-5xl font-garamond font-bold text-white tracking-widest uppercase">Servicios</h2>
        <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6 mb-8 rounded-full"></div>
        <p className="max-w-4xl mx-auto text-base md:text-lg text-gray-400 font-light leading-relaxed">
          En Wulfnet desarrollamos web personalizadas y de alta calidad. Nuestros servicios se adaptan a tus necesidades, presupuesto y etapa actual, escalando junto con el crecimiento de tu proyecto.
        </p>
      </div>

      <div className="relative z-20 mb-8 border-b border-[#1a1a1a]">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex justify-center gap-6 md:gap-16 flex-wrap">
            {tabs.map((t) => (
              <NavLink key={t.to} to={t.to} className={({ isActive }) => ["py-4 md:py-6 border-b-2 -mb-px text-sm md:text-base font-garamond uppercase tracking-[0.2em] transition-all duration-300 px-4", isActive ? "border-[#D4AF37] text-[#D4AF37] shadow-[0_10px_20px_-10px_rgba(212,175,55,0.2)]" : "border-transparent text-gray-400 hover:text-gray-200 hover:border-[#333]"].join(" ")}>
                {t.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-0 pb-8 md:py-12 min-h-[1000px]">
        
        {/* --- EL TRIÁNGULO FIJO AQUÍ ARRIBA (Nunca se reinicia) --- */}
        <ServiciosRadialHero content={content} categoria={categoriaActual} />

        {/* --- FALLBACK MÓVIL FIJO AQUÍ ARRIBA --- */}
        <div className="lg:hidden flex flex-col gap-8 px-2 mb-20 relative mt-4 max-w-2xl mx-auto">
          <div className="absolute left-[19px] top-4 bottom-8 w-[1px] bg-gradient-to-b from-[#D4AF37]/50 via-[#D4AF37]/20 to-transparent" />
          {content.services.map((service, idx) => (
            <motion.div key={`mob-${categoriaActual}-${idx}`} className="group relative pl-10" initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
              <div className="absolute left-3 top-2.5 w-3 h-3 rounded-full bg-[#050505] border-2 border-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
              <div className="bg-[#D4AF37] text-black inline-block px-3 py-1 text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-3 shadow-[0_0_10px_rgba(212,175,55,0.2)]">{service.title}</div>
              <div className="border border-[#1a1a1a] bg-[#0b0b0b] p-5 relative transition-colors duration-300 group-hover:border-[#333]"><p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{service.desc}</p></div>
            </motion.div>
          ))}
        </div>

        {/* --- SOLO RENDERIZAMOS LA INFORMACIÓN INFERIOR (PLANES/PROCESOS) --- */}
        {categoriaActual === "seo" ? <SEO /> : categoriaActual === "social" ? <Marketing /> : <ServiciosContenido categoria={categoriaActual} />}
      
      </div>
    </div>
  );
}