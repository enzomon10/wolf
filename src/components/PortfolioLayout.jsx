// src/components/PortfolioLayout.jsx
import React from "react";
import { NavLink, Outlet, useLocation, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- TABS PRINCIPALES ---
const tabs = [
  { to: "/portfolio/web", label: "Web" },
  { to: "/portfolio/seo", label: "SEO & Ads" },
  { to: "/portfolio/redes", label: "RRSS" },
];

// --- PARTÍCULAS DE FONDO ---
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#D4AF37]"
          initial={{
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh",
            scale: Math.random() * 0.5 + 0.2,
            opacity: 0
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [0, 0.15, 0], 
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: Math.random() * 4 + 1 + "px",
            height: Math.random() * 4 + 1 + "px",
            boxShadow: "0 0 10px rgba(212, 175, 55, 0.3)"
          }}
        />
      ))}
    </div>
  );
};

export default function PortfolioLayout() {
  const location = useLocation();

  if (location.pathname === "/portfolio" || location.pathname === "/portfolio/") {
    return <Navigate to="/portfolio/web" replace />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
      
      <div className="absolute inset-0 z-0">
        <FloatingParticles />
        <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-[#111]/60 to-transparent" />
      </div>

      {/* --- SECCIÓN TÍTULO (Ahora 100% igual a Servicios) --- */}
      <div className="relative z-20 pt-16 pb-8 text-center px-6">
        <h1 className="text-3xl md:text-5xl font-garamond font-bold text-white tracking-widest uppercase">
           Portfolio
        </h1>
        
        {/* Línea dorada SIN sombra, igual a Servicios */}
        <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-6 mb-8 rounded-full"></div>

        {/* Texto achicado a text-base md:text-lg igual a Servicios */}
        <p className="max-w-4xl mx-auto text-base md:text-lg text-gray-400 font-light leading-relaxed">
          Selección de proyectos donde el foco está en la claridad, el diseño premium y la experiencia: desde plataformas educativas hasta catálogos editoriales y landings de conversión.
        </p>
      </div>

      {/* --- TABS PESTAÑAS (Ahora 100% igual a Servicios) --- */}
      <div className="relative z-20 mb-8 border-b border-[#1a1a1a]">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex justify-center gap-6 md:gap-16 flex-wrap">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                className={({ isActive }) =>
                  [
                    "py-4 md:py-6 border-b-2 -mb-px text-sm md:text-base font-garamond uppercase tracking-[0.2em] transition-all duration-300 px-4",
                    isActive
                      ? "border-[#D4AF37] text-[#D4AF37] shadow-[0_10px_20px_-10px_rgba(212,175,55,0.2)]"
                      : "border-transparent text-gray-400 hover:text-gray-200 hover:border-[#333]",
                  ].join(" ")
                }
              >
                {t.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* --- CONTENIDO PORTFOLIO --- */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-4 md:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
      
    </div>
  );
}