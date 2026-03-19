// src/components/BottomNav.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // Detectar si estamos en la App Instalada
    const mq = window.matchMedia('(display-mode: standalone)');
    setIsPWA(mq.matches);
    const handler = (e) => setIsPWA(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Si NO estamos en la App, no renderizamos absolutamente nada
  if (!isPWA) return null;

  const navClass = ({ isActive }) => 
    `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
      isActive ? 'text-[#D4AF37]' : 'text-gray-400 hover:text-gray-600'
    }`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] safe-area-pb">
      <div className="flex h-full max-w-lg mx-auto font-medium">
        
        <NavLink to="/" className={navClass} end>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] uppercase tracking-wider font-bold mt-1">Inicio</span>
        </NavLink>

        <NavLink to="/quienessomos" className={navClass}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="text-[10px] uppercase tracking-wider font-bold mt-1">Nosotros</span>
        </NavLink>

        <NavLink to="/contacto" className={navClass}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="text-[10px] uppercase tracking-wider font-bold mt-1">Contacto</span>
        </NavLink>

      </div>
    </div>
  );
};

export default BottomNav;