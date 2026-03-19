// src/pages/Marketing.jsx
import React from "react";

const procesosMarketing = [
  {
    id: "1",
    title: "Diagnóstico",
    desc: "Realizamos un diagnóstico completo de tu presencia en redes y del ecosistema digital de tu marca. Analizamos tu perfil, tu contenido actual, tu audiencia, tu competencia y el rendimiento de tus publicaciones.",
    position: "top-[12%] right-0", // 👇 Bajó (antes top-[2%])
    layout: "row",
    width: "w-[340px] lg:w-[400px]",
  },
  {
    id: "2",
    title: "Estrategia",
    desc: "Armamos un plan de contenido pensado para tu negocio. Definimos qué publicar, cómo comunicarlo y con qué frecuencia para atraer público y generar resultados.",
    position: "bottom-[12%] -right-[5%]", // 👉 Más a la derecha (antes right-0)
    layout: "col",
    width: "w-64 lg:w-72",
  },
  {
    id: "3",
    title: "Generación de contenido",
    desc: "Creamos las piezas necesarias para tus redes (reels, historias, posteos y carruseles) cuidando la estética y el mensaje, para que tu marca se vea profesional y conecte con tu audiencia.",
    position: "bottom-0 left-[15%]", // 👉 Un poquito a la derecha (antes left-[8%])
    layout: "col",
    width: "w-64 lg:w-72",
  },
  {
    id: "4",
    title: "Resultados",
    desc: "Medimos el rendimiento con métricas claras (alcance, interacción, mensajes y ventas) y vamos ajustando para que el crecimiento sea constante y rentable.",
    position: "top-[22%] left-0", // 👆 Subió un poco (antes top-[32%])
    layout: "row",
    width: "w-[340px] lg:w-[380px]",
  },
];

const planesSocial = [
  {
    name: "PLAN INICIAL",
    desc: "Pensado para emprendedores y negocios que buscan dar sus primeros pasos en redes sociales con una presencia sólida, confiable y atractiva.\n\n12 piezas de contenido:",
    price: "$300.000",
    items: [
      { title: "• 2 publicaciones en el feed", text: " (estáticas, de impacto)." },
      { title: "• 8 historias,", text: " mínimo 2 por semana, con plantillas reutilizables para continuidad." },
      { title: "• 2 reels simples", text: " con animaciones o videos breves con subtítulos." },
    ],
  },
  {
    name: "PLAN MEDIO",
    desc: "Pensado para empresas que buscan consolidar su presencia online con dinamismo y variedad, proyectando una imagen profesional y coherente.\n\n18 piezas de contenido:",
    price: "$500.000",
    items: [
      { title: "• 4 publicaciones en el feed", text: " (estáticas, de impacto)." },
      { title: "• 12 historias,", text: " mínimo 3 por semana, con plantillas para mantener continuidad." },
      { title: "• 2 reels trabajados", text: " con animaciones, motion de productos/servicios o reels creativos." },
    ],
  },
  {
    name: "PLAN PRO",
    isPro: true,
    desc: "Diseñado para empresas que buscan destacarse en su rubro y proyectar una presencia digital de imagen y marca de alto nivel.\n\n30 piezas de contenido:",
    price: "$700.000",
    items: [
      { title: "• 6 publicaciones en el feed", text: " (estáticas, de impacto)." },
      { title: "• 20 historias diseñadas,", text: " ideales para storytelling y promociones, con 4 plantillas personalizadas." },
      { title: "• 3 reels trabajados", text: " videos editados, motion graphics, storytelling o detrás de escena." },
    ],
  },
];

export default function Marketing() {
  return (
    <div className="w-full font-sans text-gray-300">

      {/* ========================================== */}
      {/* SECCIÓN 1: PROCESOS (Con Diagrama Central) */}
      {/* ========================================== */}
      <section className="py-10 max-w-7xl mx-auto px-6 relative">
        {/* Titulo Sección */}
        <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-20">
          <div className="w-16 md:w-24 h-16 md:h-24 mb-4 md:mb-6 opacity-80">
            <img src="/assets/procSVG.svg" alt="Icono" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl md:text-4xl font-garamond text-white tracking-[0.25em] md:tracking-[0.3em] uppercase">
            Procesos
          </h2>
        </div>

        {/* --- DIAGRAMA DESKTOP --- */}
        {/* 🔥 CAMBIO: Aumenté la altura a 780px para que el gráfico grande respire */}
        <div className="hidden md:block relative w-full h-[780px] mt-10">

          {/* Gráfico Central */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {/* 🔥 CAMBIO: SVG mucho más grande (600px en PC grandes) */}
            <div className="w-[450px] h-[450px] lg:w-[600px] lg:h-[600px] opacity-90">
              <img src="/assets/redes.svg" alt="Diagrama Marketing" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Nodos de Procesos (Posicionamiento Absoluto) */}
          {procesosMarketing.map((proceso) => (
            <div key={proceso.id} className={`absolute ${proceso.position} ${proceso.width} z-10`}>
              <div className={`flex ${proceso.layout === 'row' ? 'flex-row items-start gap-5' : 'flex-col items-start'}`}>

                {/* Cuadro del Número */}
                <div className={`border border-[#D4AF37] text-[#D4AF37] font-garamond text-4xl lg:text-5xl flex items-center justify-center p-3 lg:px-5 shadow-[0_0_15px_rgba(212,175,55,0.15)] bg-[#050505]/90 backdrop-blur-sm flex-shrink-0 ${proceso.layout === 'col' ? 'mb-4' : ''}`}>
                  #{proceso.id}
                </div>

                {/* Textos */}
                <div>
                  <h3 className="text-xl lg:text-2xl font-garamond text-white mb-3">
                    {proceso.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">
                    {proceso.desc}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* --- VERSIÓN MOBILE (Apilada) --- */}
        <div className="md:hidden flex flex-col gap-12 mt-10">
          <div className="w-full max-w-sm mx-auto mb-8 opacity-80">
            <img src="/assets/redes.svg" alt="Diagrama Marketing" className="w-full h-auto object-contain" />
          </div>

          {procesosMarketing.map((proceso) => (
            <div key={proceso.id} className="flex flex-col items-center text-center">
              <div className="border border-[#D4AF37] text-[#D4AF37] font-garamond text-4xl p-3 px-5 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.1)] bg-[#050505]/80">
                #{proceso.id}
              </div>
              <h3 className="text-2xl font-garamond text-white mb-3">
                {proceso.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                {proceso.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================= */}
      {/* SECCIÓN 2: PLANES */}
      {/* ========================================== */}
      <section className="py-20 max-w-7xl mx-auto px-6">

        {/* Titulo Sección */}
        <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-20">
          <div className="w-16 md:w-24 h-16 md:h-24 mb-4 md:mb-6 opacity-80">
            <img src="/assets/proc3.svg" alt="Icono" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl md:text-4xl font-garamond text-white tracking-[0.25em] md:tracking-[0.3em] uppercase">
            Planes
          </h2>
        </div>

        {/* Grilla de Planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planesSocial.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-8 bg-[#0a0a0a] transition-all duration-300 ${plan.isPro
                ? "border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.15)] transform md:-translate-y-2"
                : "border border-[#222] hover:border-[#555]"
                }`}
            >
              {plan.isPro && (
                <div className="absolute top-6 right-6 text-[#D4AF37]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              )}

              <div className="flex justify-center mb-8 mt-2">
                <span className="bg-[#D4AF37] text-black text-sm font-bold uppercase tracking-widest px-6 py-2">
                  {plan.name}
                </span>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-8 whitespace-pre-wrap">
                {plan.desc}
              </p>

              <div className="flex flex-col gap-5 mb-10 flex-grow">
                {plan.items.map((item, idx) => (
                  <p key={idx} className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                    <strong className="text-white font-semibold">{item.title}</strong>
                    {item.text}
                  </p>
                ))}
              </div>

              <div className="mt-auto">
                <button
                  className={`w-full font-bold uppercase tracking-widest py-3 text-sm transition-colors duration-300 ${plan.isPro
                    ? "bg-[#D4AF37] text-black hover:bg-[#b08d24]"
                    : "bg-white text-black hover:bg-gray-200"
                    }`}
                >
                  {plan.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}