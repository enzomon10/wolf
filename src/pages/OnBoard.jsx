// src/pages/OnBoard.jsx (o donde lo tengas)
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";

// --- TABS ---
const tabs = [
  { to: "/contacto", label: "Contáctanos" },
  { to: "/pagos", label: "Pagos" },
  { to: "/cancelar", label: "Cancelar" },
];

// --- PARTÍCULAS DE FONDO (Para mantener la identidad) ---
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#D4AF37] animate-float"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            transform: `scale(${Math.random() * 0.5 + 0.2})`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            boxShadow: "0 0 10px rgba(212, 175, 55, 0.3)",
            animationDuration: `${Math.random() * 10 + 15}s`,
            animationDelay: `-${Math.random() * 10}s`
          }}
        />
      ))}
    </div>
  );
};

export default function OnBoard() {
  const location = useLocation();

  return (
    // EL FONDO NEGRO MAESTRO ESTÁ ACÁ
    <div className="min-h-screen bg-[#050505] text-gray-300 relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
      
      {/* HEADER / TABS */}
      <div className="relative z-20 bg-[#050505]/80 backdrop-blur-md border-b border-[#1a1a1a]">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="flex justify-center gap-8 md:gap-12">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                className={({ isActive }) =>
                  [
                    "py-6 border-b-2 -mb-px text-xs md:text-sm font-garamond uppercase tracking-[0.2em] transition-all duration-300",
                    isActive
                      ? "border-[#D4AF37] text-[#D4AF37] shadow-[0_10px_20px_-10px_rgba(212,175,55,0.2)]"
                      : "border-transparent text-gray-400 hover:text-gray-200 hover:border-[#333]",
                  ].join(" ")
                }
                end
              >
                {t.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENIDO (Outlet) */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-12 md:py-16">
        
        {/* LA ANIMACIÓN OCURRE ACÁ ADENTRO, EL FONDO NO SE MUEVE */}
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>

      </div>
      
    </div>
  );
}