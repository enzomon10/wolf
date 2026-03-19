// src/pages/SEO.jsx
import React from "react";

const procesosSEO = [
  {
    id: "1",
    title: "Diagnóstico",
    desc: "Se realiza un diagnóstico completo del estado actual de tu marca en el entorno online. Auditamos el sitio, vemos cómo te encuentra en Google y optimizamos el sitio según sus requerimientos.",
    position: "top-[5%] right-[2%]", // Más arriba y a la derecha
    layout: "row", // 👈 Novedad: Número a la izquierda
    width: "w-[400px]", // Más ancho para que entre en formato fila
  },
  {
    id: "2",
    title: "Estrategia",
    desc: "Se desarrollan estrategias de contenido, analítica y procesos enfocados en el crecimiento del negocio. Aquí es donde definiríamos las palabras clave, la arquitectura de la web y el plan de contenidos.",
    position: "bottom-[5%] right-[0%]", // Bien a la esquina
    layout: "col", // Número arriba
    width: "w-72",
  },
  {
    id: "3",
    title: "Optimización",
    desc: "Se miden los resultados en base a tu atracción de visitas, su conversión a clientes y tu rentabilidad entre otros indicadores clave. De esta forma nos aseguramos que el tráfico que atrae el SEO realmente se convierta en ventas.",
    position: "bottom-[5%] left-[0%]", // Bien a la esquina
    layout: "col", // Número arriba
    width: "w-72",
  },
];

const planesSEO = [
  {
    name: "PLAN INICIAL",
    subtitle: "Validación Digital",
    desc: "Infraestructura esencial para asegurar la indexación y visibilidad de la organización en motores de búsqueda.",
    price: "$95.000",
    items: [
      { title: "✅ Content Marketing (Nivel 1):", text: " Redacción técnica de 1 artículo mensual orientado a keywords de oportunidad para iniciar el rastreo orgánico." },
      { title: "✅ Mantenimiento Técnico Preventivo:", text: " Monitoreo mensual de salud del dominio en Google Search Console (Detección de errores 4xx/5xx)." },
      { title: "✅ Data Setup:", text: " Implementación y configuración de propiedad en Google Analytics 4 (GA4)." },
      { title: "✅ Reporting Ejecutivo:", text: " Informe mensual de métricas de adquisición (Usuarios, Sesiones y Canales)." },
    ],
  },
  {
    name: "PLAN MEDIO",
    subtitle: "Performance & Growth",
    desc: "Enfoque orientado a datos. Implementación de trazabilidad avanzada para medir el retorno de inversión (ROI).\n\nFee Mensual: $195.000 ARS",
    price: "$195.000",
    items: [
      { title: "🚀 Infraestructura de Medición (GTM):", text: " Despliegue de Google Tag Manager para el traqueo de eventos de conversión (Leads cualificados, Clics en WhatsApp, Envíos de formulario)." },
      { title: "✍️ Estrategia de Contenidos (Nivel 2):", text: " Producción de 2 artículos técnicos mensuales optimizados para clusters temáticos del sector." },
      { title: "📍 SEO Local & Reputación:", text: " Gestión y optimización de Google Business Profile (Maps) para captura de tráfico geolocalizado." },
      { title: "⚡ WPO (Web Performance Optimization):", text: " Optimización mensual de Core Web Vitals para garantizar tiempos de carga competitivos." },
      { title: "📊 Reporting de Conversión:", text: " Informe detallado de objetivos cumplidos y atribución de leads." },
    ],
  },
  {
    name: "PLAN PRO",
    isPro: true,
    desc: "Solución modular para organizaciones que requieren un departamento externo de inteligencia digital. Base estratégica fija con capacidad de escalamiento operativo.",
    price: "$250.000",
    items: [
      { title: "🔒 BASE ESTRATÉGICA (Fixed Fee)", text: "\nNúcleo de consultoría y auditoría técnica permanente. Inversión Base: $300.000 ARS / mes" },
      { title: "🧠 Consultoría de Negocio:", text: " Mesa de trabajo mensual para alineación de KPIs comerciales y revisión de estrategia." },
      { title: "📊 Dashboard en Tiempo Real (Looker Studio):", text: " Acceso 24/7 a panel de control visual con integración de fuentes de datos (Analytics + Search Console)." },
      { title: "🛡️ Auditoría Técnica Continua:", text: " Health Check semanal para prevención de errores de rastreo, canibalización de keywords y estabilidad del servidor." },
      { title: "👁️ QA de Paid Media:", text: " Auditoría de calidad y supervisión estratégica de cuentas publicitarias existentes (Control de fugas de presupuesto)." },
      { title: "⬆️ MÓDULOS DE ESCALAMIENTO (Variables)", text: "\nSeleccionables según la agresividad de la estrategia comercial." },
    ],
  },
];

export default function SEO() {
  return (
    <div className="w-full font-sans text-gray-300">

      {/* ========================================== */}
      {/* SECCIÓN 1: PROCESOS (Con Diagrama Central) */}
      {/* ========================================== */}
      <section className="py-10 max-w-6xl mx-auto px-6 relative">
        {/* Titulo Sección */}
        <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-20">
          {/* Contenedor del SVG adaptable */}
          <div className="w-16 md:w-24 h-16 md:h-24 mb-4 md:mb-6 opacity-80">
            <img src="/assets/procSVG.svg" alt="Icono" className="w-full h-full object-contain" />
          </div>
          {/* Texto adaptable con mayor tracking en desktop */}
          <h2 className="text-2xl md:text-4xl font-garamond text-white tracking-[0.25em] md:tracking-[0.3em] uppercase">
            Procesos
          </h2>
        </div>

        {/* --- DIAGRAMA DESKTOP --- */}
        {/* Reduje un poco la altura total a 700px para que quede más compacto */}
        <div className="hidden md:block relative w-full h-[700px] mt-10">

          {/* Gráfico Central */}
          {/* ACHICADO: Pasó de w-[600px] a w-[500px] para darle "aire" a los textos */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-[500px] h-[500px] opacity-90 mt-8">
              <img src="/assets/proc2.svg" alt="Diagrama SEO" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Nodos de Procesos (Posicionamiento Absoluto) */}
          {procesosSEO.map((proceso) => (
            <div key={proceso.id} className={`absolute ${proceso.position} ${proceso.width} z-10`}>
              {/* Lógica dinámica: flex-row para el #1, flex-col para los demás */}
              <div className={`flex ${proceso.layout === 'row' ? 'flex-row items-start gap-5' : 'flex-col items-start'}`}>

                {/* Cuadro del Número */}
                <div className={`border border-[#D4AF37] text-[#D4AF37] font-garamond text-5xl flex items-center justify-center p-3 px-5 shadow-[0_0_15px_rgba(212,175,55,0.15)] bg-[#050505]/90 backdrop-blur-sm flex-shrink-0 ${proceso.layout === 'col' ? 'mb-4' : ''}`}>
                  #{proceso.id}
                </div>

                {/* Textos */}
                <div>
                  <h3 className="text-2xl font-garamond text-white mb-3">
                    {proceso.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
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
            <img src="/assets/proc2.svg" alt="Diagrama SEO" className="w-full h-auto object-contain" />
          </div>

          {procesosSEO.map((proceso) => (
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

      {/* ========================================== */}
      {/* SECCIÓN 2: PLANES */}
      {/* ========================================== */}
      <section className="py-20 max-w-7xl mx-auto px-6">

        {/* Titulo Sección */}
        <div className="flex flex-col items-center justify-center text-center mb-12 md:mb-20">
          {/* Contenedor del SVG adaptable */}
          <div className="w-16 md:w-24 h-16 md:h-24 mb-4 md:mb-6 opacity-80">
            <img src="/assets/proc3.svg" alt="Icono" className="w-full h-full object-contain" />
          </div>
          {/* Texto adaptable con mayor tracking en desktop */}
          <h2 className="text-2xl md:text-4xl font-garamond text-white tracking-[0.25em] md:tracking-[0.3em] uppercase">
            Planes
          </h2>
        </div>

        {/* Grilla de Planes (El código que ya teníamos) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planesSEO.map((plan) => (
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

              {plan.subtitle && (
                <h3 className="text-xl font-bold italic text-white mb-4">
                  {plan.subtitle}
                </h3>
              )}

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