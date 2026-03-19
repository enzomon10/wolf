// src/pages/presupuesto/LandingPage.jsx
import { PageLayout } from "./shared";

const DATA = {
  heroTitle: "LANDING PAGE",
  heroSub:   "PRESUPUESTO",
  intro:     "Una página web enfocada en comunicar un mensaje de forma clara y ordenada, con una presentación profesional y corporativa de tu marca. Suele incluir una introducción breve, propuesta de valor, descripción de servicios o productos, elementos de confianza (trayectoria, clientes, certificaciones o testimonios) y un llamado a la acción para facilitar el contacto. Es una solución ideal para empresas y emprendimientos que buscan tener presencia online sólida, acompañar campañas publicitarias, presentar una unidad de negocio, captar consultas, coordinar reuniones o centralizar información clave en un solo lugar.",
  planTitle: "LANDING PAGE",
  tagline:   "Ideal para emprendedores que necesitan salir rápido a internet con una página clara, moderna y orientada a generar consultas.",
  price:     "$300.000",
  includes: [
    "Home con presentación directa (hero + llamada a la acción).",
    "Sección de servicios / propuesta de valor",
    "Botón de WhatsApp flotante.",
    "Links a redes sociales.",
    "Diseño responsive para todos los dispositivos.",
    "Optimización básica de velocidad.",
  ],
  addons: [
    { label: "Formulario de contacto:",           price: "$50.000" },
    { label: "Mapa de ubicación en Google Maps:", price: "$50.000" },
  ],
  objetivo: "Convertir visitas en mensajes y consultas.",
  mant: [
    {
      title:  'Ultra mínimo + "apagado"',
      border: "4px",
      specs: [
        "Infra: 1 máquina en Fly.",
        "Machine: shared-cpu-1x + 256MB RAM",
        "Ahorro: autosuspend (se \"duerme\" sin tráfico, arranca con tráfico; no pagás CPU/RAM cuando está stopped/suspended).",
        "Región sugerida: gru (São Paulo) por cercanía desde Argentina.",
      ],
      ideal: "Landing estática. Imágenes optimizadas.",
      price: "$15.000",
    },
    {
      title:  'Económico "decente" + "apagado"',
      border: "1px",
      specs: [
        "Machine: shared-cpu-1x + 512MB RAM",
        "Modo: autosuspend (misma config que el plan 1).",
      ],
      ideal: "Landing + algo liviano (forms, SSR simple, Node chico)",
      price: "$25.000",
    },
    {
      title:  'Decente "prendida"',
      border: "1px",
      specs: [
        "Machine: shared-cpu-1x + 1GB RAM",
        "Modo: siempre encendida",
      ],
      ideal: "Campañas / tráfico constante, si querés evitar \"cold start\".",
      price: "$40.000",
    },
    {
      title:  "Buena PC",
      border: "1px",
      specs: [
        "Machine: shared-cpu-4x + 2GB RAM",
        "Costo 24/7 (máximo): U$S 13.27 / mes",
        "Modo: normalmente prendida (o autostop si el tráfico es muy intermitente).",
      ],
      ideal: "Muchas imágenes/animaciones, picos fuertes, o backend liviano.",
      price: "$60.000",
    },
  ],
};

export default function LandingPage() {
  return <PageLayout pg={DATA} />;
}
