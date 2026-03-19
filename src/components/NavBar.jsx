// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPWA, setIsPWA] = useState(false);
  const location = useLocation(); // Para saber si estamos en /servicios

  useEffect(() => {
    const mq = window.matchMedia('(display-mode: standalone)');
    setIsPWA(mq.matches);
    const handler = (e) => setIsPWA(e.matches);
    mq.addEventListener('change', handler);

    if (!ref.current) return;
    const el = ref.current;
    const setVar = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--navbar-h", `${h}px`);
    };
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    window.addEventListener("resize", setVar);

    return () => {
      mq.removeEventListener('change', handler);
      ro.disconnect();
      window.removeEventListener("resize", setVar);
    };
  }, []);

  // Función para cerrar el menú móvil al hacer click
  const closeMenu = () => setIsOpen(false);

  // Verificamos si estamos en alguna sub-ruta de servicios para resaltar el link
  const isServicesActive = location.pathname.includes("/servicios");

  return (
    // CAMBIO: border-b-[#D4AF37] para el borde dorado
    <nav ref={ref} className="bg-[#050505] text-white font-garamond py-2 px-6 md:px-16 lg:px-24 shadow-lg border-b border-[#D4AF37] font-semibold relative z-50">
      
      <div className={`container mx-auto flex items-center ${isPWA ? 'justify-center md:justify-start' : 'justify-between md:justify-start'}`}>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center">
          <img
            className="h-8 sm:h-10 md:h-12 lg:h-16 grayscale hover:grayscale-0 transform hover:scale-102 transition-all duration-400 ease-in"
            src="/assets/header2.svg"
            alt="Logo Wulfnet"
          />
        </Link>

        {/* =========================================
            MODO PC (Desktop)
            ========================================= */}
        <div className="hidden md:flex flex-1 justify-end space-x-8 sm:text-lg lg:text-2xl ml-8">
          {/* Enlace Único a Servicios (lleva a la primera pestaña por defecto) */}
          <Link 
            to="/servicios/programacion" 
            className={`transition-colors ${isServicesActive ? "text-[#D4AF37]" : "hover:text-[#D4AF37]"}`}
          >
            Servicios
          </Link>
          <Link to="/portfolio" className="hover:text-[#D4AF37] transition-colors">Portfolio</Link>
          <Link to="/contacto" className="hover:text-[#D4AF37] transition-colors">Contacto</Link>
        </div>

        {/* =========================================
            MODO MÓVIL (Hamburguesa)
            ========================================= */}
        {!isPWA && (
          <button
            className="md:hidden text-[#D4AF37] hover:text-white focus:outline-none ml-auto"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        )}
      </div>

      {/* Menú Desplegable Móvil */}
      {!isPWA && isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#050505] shadow-xl border-t border-[#D4AF37] flex flex-col items-center py-6 space-y-5 text-lg z-50">
          <Link to="/servicios/programacion" onClick={closeMenu} className="text-white hover:text-[#D4AF37] w-full text-center">Servicios</Link>
          <Link to="/portfolio" onClick={closeMenu} className="text-white hover:text-[#D4AF37] w-full text-center">Portfolio</Link>
          <Link to="/contacto" onClick={closeMenu} className="text-white hover:text-[#D4AF37] w-full text-center font-bold">Contacto</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;