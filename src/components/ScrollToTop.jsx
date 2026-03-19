// src/components/ScrollToTop.jsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname); // Guardamos la ruta anterior

  useEffect(() => {
    // Comprobamos si el usuario se está moviendo ÚNICAMENTE entre las pestañas de servicios
    const isServiceTabSwitch = 
      prevPathname.current.startsWith('/servicios') && 
      pathname.startsWith('/servicios');

    // Si NO es un cambio de pestaña interna, hacemos el scroll al inicio
    if (!isServiceTabSwitch) {
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", 
      });
    }

    // Actualizamos la ruta anterior para la próxima vez
    prevPathname.current = pathname;
  }, [pathname]);

  return null;
}