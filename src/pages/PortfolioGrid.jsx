// src/pages/PortfolioGrid.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- BASE DE DATOS DE PROYECTOS ---
const projectsData = [
  {
    id: "guilana",
    name: "Guilañá Group",
    url: "https://www.guilanagroup.com/",
    logo: "/assets/guilaña.webp",
    subtitle: "Inmobiliaria rural y urbana + consultoría agro",
    description:
      "Plataforma orientada a propiedades y proyectos productivos: presencia institucional sólida, foco en confianza, catálogo claro y contacto directo. Ideal para una marca que necesita mostrar activos, comunicar seriedad y facilitar consultas.",
    highlights: [
      "Sitio institucional + captación de leads",
      "Enfoque rural/urbano con lenguaje de agronegocios",
      "Identidad de marca sobria y profesional",
    ],
    // Filtros de las pastillas
    tags: ["Institucional", "Conversión"],
    // En qué pestañas principales aparece
    mainCategories: ["web"],
  },
  {
    id: "nihon",
    name: "Conexión Nihon",
    url: "https://conexionnihon.ar/",
    logo: "/assets/nihon.webp",
    subtitle: "Cursos y formación de japonés",
    description:
      "Experiencia educativa pensada para aprender de forma progresiva: contenidos por niveles, estructura clara y foco en la retención. Un producto digital donde el diseño acompaña el estudio y la conversión sin sentirse agresivo.",
    highlights: [
      "Producto educativo (learning-first)",
      "Estructura por niveles / progresión",
      "Optimizado para mobile y navegación rápida",
    ],
    tags: ["Plataforma LMS", "Ecommerce", "UGC", "Identidad Visual"],
    mainCategories: ["web", "redes"],
  },
  {
    id: "otaru",
    name: "Otaru Ediciones",
    url: "https://otaru.ar/",
    logo: "/assets/logo-300w.webp",
    subtitle: "Editorial independiente de literatura japonesa",
    description:
      "E-commerce/portal editorial con identidad cultural: catálogo, presentación cuidada y narrativa de marca. Un proyecto donde el diseño transmite sensibilidad, curaduría y una propuesta clara para lectores.",
    highlights: [
      "Identidad cultural + estética editorial",
      "Catálogo y navegación por contenido",
      "Storytelling de marca (literatura y Japón)",
    ],
    tags: ["Ecommerce", "Institucional", "Auditoría SEO", "SEO on page", "SEO off page"],
    mainCategories: ["web", "seo"],
  },
  {
    id: "cookies",
    name: "Cookies Corrientes",
    url: "https://cookiesctes.fly.dev/",
    logo: "/assets/cookiesLogo2.png",
    subtitle: "Pedidos y presencia digital para emprendimiento",
    description:
      "Landing enfocada en ventas rápidas: acceso directo a pedidos, WhatsApp y datos clave. Pensada para mobile, con decisiones simples y CTA directo para convertir tráfico de redes en ventas.",
    highlights: [
      "CTA directo a pedidos/WhatsApp",
      "Mobile-first para tráfico social",
      "Info esencial sin fricción",
    ],
    tags: ["Landing Page", "Conversión", "Ecommerce"],
    mainCategories: ["web"],
  }
];

// --- DICCIONARIO DE SUB-FILTROS EXACTOS (SIN "TODOS") ---
const subFilters = {
  todos: [
    "Ecommerce", "Plataforma LMS", "Landing Page", "Institucional", "Conversión", "Auditoría SEO", "UGC"
  ],
  web: [
    "Ecommerce", "Landing Page", "Institucional", "Plataforma LMS", "Conversión"
  ],
  seo: [
    "Auditoría SEO", "Google Ads", "SEO Local", "SEO on page", "SEO off page", "Meta Ads"
  ],
  redes: [
    "Contenido Orgánico (Copy)", "UGC", "Identidad Visual"
  ],
};

export default function PortfolioGrid() {
  const location = useLocation();

  // 1. Detectar categoría principal desde la URL (ej: /portfolio/web -> "web")
  const currentMainCat = location.pathname.split("/").pop() || "todos";

  // 2. Estado local para MULTI-SELECCIÓN (Array de filtros activos)
  const [activeTags, setActiveTags] = useState([]);

  // Resetear los sub-filtros si cambiás de pestaña principal
  useEffect(() => {
    setActiveTags([]);
  }, [currentMainCat]);

  // 3. Función para agregar/quitar filtros (Toggle Multi-Select)
  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag) // Si ya está, lo quita (deselecciona)
        : [...prev, tag]                // Si no está, lo agrega
    );
  };

  // 4. Filtrar proyectos (AHORA CON LÓGICA "AND" / EMBUDO)
  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      // Coincidencia de la pestaña principal
      const matchMain = currentMainCat === "todos" ? true : p.mainCategories.includes(currentMainCat);

      // 🔥 ACÁ ESTÁ LA MAGIA: usamos "every" en lugar de "some".
      // Si el usuario selecciona "SEO Local" y "SEO off page", el proyecto DEBE tener ambos.
      const matchTag = activeTags.length === 0 ? true : activeTags.every(t => p.tags.includes(t));

      return matchMain && matchTag;
    });
  }, [currentMainCat, activeTags]);

  const currentTags = subFilters[currentMainCat] || subFilters.todos;

  return (
    <div className="w-full">
      {/* Estilos para ocultar la barra de scroll horizontal nativa */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* BOTONERA DE SUB-FILTROS (Scroll Horizontal) */}
      <div className="relative mb-10 md:mb-14 w-full">
        {/* Degradado oscuro a la derecha para indicar que hay más contenido (Mobile) */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-10 md:hidden"></div>

        {/* Contenedor scrolleable (Mejor contraste) */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 md:gap-3 py-2 px-1 snap-x snap-mandatory">
          {currentTags.map((tag) => {
            const isActive = activeTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={[
                  "whitespace-nowrap shrink-0 snap-start rounded-full border px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-medium tracking-wider transition-all duration-300 select-none",
                  isActive
                    ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]"
                    : "border-[#333333] bg-[#1a1a1a] text-gray-200 hover:border-[#555555] hover:bg-[#222222] hover:text-white",
                ].join(" ")}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* GRILLA DE PROYECTOS ANIMADA */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                key={project.id}
                className="group relative overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0b0b0b] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all hover:border-[#2a2a2a]"
              >
                {/* Accent glow (Destello al hacer hover) */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#D4AF37] opacity-0 blur-[80px] transition-opacity group-hover:opacity-[0.06]" />

                <div className="p-6 md:p-7 flex flex-col h-full relative z-10">
                  <div className="flex flex-col items-center gap-5 text-center md:flex-row md:items-start md:text-left flex-1">
                    {/* Logo (Fondo blanco) */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#1f1f1f] bg-[#fdfdfd] p-1">
                      <img
                        src={project.logo}
                        alt={`${project.name} logo`}
                        className="h-12 w-12 object-contain opacity-90 transition-all group-hover:opacity-100"
                        loading="lazy"
                      />
                    </div>

                    {/* Header (Textos y Tags) */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col items-center gap-1 md:flex-row md:items-baseline md:gap-3">
                        <h3 className="truncate font-garamond text-2xl text-white">
                          {project.name}
                        </h3>
                        <span className="text-xs tracking-wider text-[#D4AF37] mt-1 md:mt-0">
                          {project.subtitle}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-gray-400">
                        {project.description}
                      </p>

                      {/* Tags visuales en la tarjeta (CORREGIDO PARA MOBILE) */}
                      <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                        {project.tags.map((t) => (
                          <span
                            key={t}
                            className={`rounded-full border px-3 py-1.5 text-[11px] md:text-xs font-medium uppercase tracking-wider transition-colors ${activeTags.includes(t)
                              ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]"
                              : "border-[#333333] bg-[#1a1a1a] text-gray-200"
                              }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Highlights (Viñetas Doradas) */}
                  <ul className="mt-6 space-y-2 border-t border-[#141414] pt-5 text-sm text-gray-300">
                    {project.highlights.map((h, idx) => (
                      <li
                        key={idx}
                        className="flex items-start justify-center gap-3 text-center md:justify-start md:text-left"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                        <span className="leading-relaxed text-gray-400">{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Actions (Botón y Link) */}
                  <div className="mt-auto pt-6 flex flex-col items-center gap-3 md:flex-row md:justify-between">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-white md:w-auto"
                    >
                      Visitar sitio
                      <ExternalIcon className="h-4 w-4" />
                    </a>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="hidden md:inline">Enlace:</span>
                      <span className="max-w-[260px] truncate rounded-full border border-[#1f1f1f] bg-[#070707] px-4 py-2">
                        {project.url.replace("https://", "").replace("http://", "").replace(/\/$/, "")}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            /* Mensaje animado si no hay resultados con ESA combinación estricta de filtros */
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-1 md:col-span-2 py-16 flex flex-col items-center justify-center border border-[#1a1a1a] rounded-2xl bg-[#0b0b0b]"
            >
              <div className="h-12 w-12 rounded-full border border-[#1f1f1f] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                <span className="text-[#D4AF37] text-xl">✦</span>
              </div>
              <p className="text-gray-400 text-sm tracking-widest uppercase">Próximamente más proyectos</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// Icono SVG para el botón "Visitar sitio"
function ExternalIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H18m0 0v4.5M18 6l-9 9"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 7.5H7.2A2.7 2.7 0 004.5 10.2v6.6A2.7 2.7 0 007.2 19.5h6.6a2.7 2.7 0 002.7-2.7v-3.3"
      />
    </svg>
  );
}