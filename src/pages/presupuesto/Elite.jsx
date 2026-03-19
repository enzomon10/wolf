// src/pages/presupuesto/Elite.jsx
import { PageLayout } from "./shared";

const DATA = {
  heroTitle: "ELITE",
  heroSub:   "PRESUPUESTO",
  intro:     "Solución premium para marcas que quieren una presencia digital de alto impacto con funcionalidades avanzadas, diseño exclusivo y rendimiento óptimo. Incluye todo lo necesario para destacar en el mercado digital con una propuesta visual y funcional de primer nivel.",
  planTitle: "ELITE",
  tagline:   "Solución premium para marcas que quieren una presencia digital de alto impacto con funcionalidades avanzadas.",
  price:     "$1.200.000",
  includes: [
    "Diseño UI/UX personalizado y exclusivo.",
    "Animaciones y micro-interacciones premium.",
    "Integración con CRM y herramientas de marketing.",
    "SEO avanzado on-page completo.",
    "Blog o sección de novedades.",
    "Rendimiento y velocidad optimizados al máximo.",
  ],
  addons: [
    { label: "Sesión fotográfica de producto:", price: "$150.000" },
    { label: "Mantenimiento mensual:",          price: "$40.000"  },
  ],
  objetivo: "Posicionar tu marca como referente del sector.",
  mant: [
    {
      title:  "Servidor Dedicado",
      border: "4px",
      specs: [
        "Infra dedicada en la nube.",
        "4 vCPU + 8GB RAM",
        "SSD NVMe 100GB",
        "Ancho de banda ilimitado",
      ],
      ideal: "Sitios con alto tráfico y máximo rendimiento.",
      price: "$80.000",
    },
    {
      title:  "CDN Global",
      border: "1px",
      specs: [
        "Distribución global de contenido.",
        "Caché edge en 50+ países",
        "SSL incluido",
      ],
      ideal: "Audiencia internacional con baja latencia.",
      price: "$45.000",
    },
  ],
};

export default function Elite() {
  return <PageLayout pg={DATA} />;
}
