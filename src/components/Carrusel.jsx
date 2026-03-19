// Carrusel.jsx (ahora con video de fondo)
import React from "react";
// ❌ ya no hace falta react-slick ni sus CSS

// Si el video está en src/assets, descomentá esto y cambiá el src del <video>
// import Barco3 from "../assets/Barco3.mp4";

export default function Carrusel() {
  return (
    // 👇 subimos 1px para tapar el “pelito” entre navbar e imagen
    <div className="font-garamond w-screen h-full overflow-hidden relative -mt-px">
      {/* Video de fondo */}
      <video
        className="absolute inset-0 w-full h-full object-cover object-left-bottom"
        src="/assets/BarcoLobos6.mp4"        // 🔁 usa Barco3 si lo importaste desde src/assets
        // src={Barco3}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        // opcional: poster mientras carga
        // poster="/assets/3.png"
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Contenido superpuesto */}
<div className="absolute inset-0 z-10 flex items-center justify-center p-6">
  <div className="
    text-xl sm:text-2xl md:text-3xl lg:text-4xl
    font-semibold leading-tight text-white/95
    px-6 py-8 sm:px-10 sm:py-12
    text-center
  ">
   Te brindamos las herramientas para que puedas desarrollar tu emprendimiento en la era de la tecnología
  </div>
</div>
    </div>
  );
}