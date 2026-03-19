// src/pages/presupuesto/TiendaOnline.jsx
import { PageLayout } from "./shared";

const DATA = {
  heroTitle: "TIENDA ONLINE",
  heroSub:   "PRESUPUESTO",
  intro:     "Una plataforma de venta digital que permite exhibir productos o servicios de forma profesional y corporativa, con un catálogo organizado, fichas detalladas, medios de pago, opciones de envío o retiro, y un proceso de compra claro y seguro. Además de vender, funciona como un canal de comunicación y posicionamiento de marca: integra promociones, gestión de stock, seguimiento de pedidos, cupones, automatizaciones y herramientas de analítica para medir resultados. Es ideal para negocios que buscan escalar ventas, ampliar su alcance geográfico, operar 24/7 y centralizar en un solo lugar la experiencia de compra, la atención al cliente y la gestión comercial.",
  planTitle: "TIENDA ONLINE",
  tagline:   "Ideal para vender productos o servicios con una experiencia moderna y simple, incluyendo carrito y catálogo.",
  price:     "$500.000",
  includes: [
    "Catálogo con categorías y filtros",
    "Panel de Administración para agregar, editar y quitar productos y/o servicios",
    "Gestión de Stock y disponibilidad",
    "Carrito de Compras",
    "Pedidos por WhatsApp (productos y/o servicios solicitados)",
  ],
  addons: [
    { label: "Mapa de Google Maps con cálculo de costo de envío:", price: "$150.000" },
    { label: "Página de detalle por producto:",                    price: "$50.000"  },
    { label: "Pagos integrados de Mercado Pago:",                  price: "$200.000" },
    { label: "Visualizador de datos de ventas para análisis de datos:", price: "$75.000" },
    { label: "Sistema de Cupones / descuentos:",                   price: "$40.000"  },
  ],
  objetivo: "Vender directamente sin depender de terceros.",
  mant: [
    {
      title:  "Ultra Económico",
      border: "4px",
      specs: [
        "APP (apagada cuando no hay tráfico)",
        "shared-cpu-1x / 512MB",
        "DB Postgres (Fly: no Managed)",
        "shared-cpu-1x / 512MB",
        "Volumen DB: 1GB",
      ],
      ideal: "tienda chica / catálogo simple / pocas ventas diarias.",
      price: "$25.000",
    },
    {
      title:  'Económico "decente"',
      border: "1px",
      specs: [
        "APP: shared-cpu-1x / 512MB",
        "autostop/autostart (apagado)",
        "DB: shared-cpu-1x / 1GB",
        "Volumen DB: 5GB",
      ],
      ideal: "Tienda real chica \"seria\", más endpoints/admin.",
      price: "$40.000",
    },
    {
      title:  'Baja/media "usable en prod"',
      border: "1px",
      specs: [
        "APP (siempre on): shared-cpu-1x / 1GB",
        "DB: shared-cpu-2x / 1GB",
        "Volumen DB: 5GB",
      ],
      ideal: "Campañas / checkout constante (sin cold start).",
      price: "$60.000",
    },
    {
      title:  '"Buena PC"',
      border: "1px",
      specs: [
        "APP: shared-cpu-2x / 2GB",
        "DB (autogestionado, ejemplo recomendado con 2 nodos)",
        "Primary: shared-cpu-2x / 2GB",
        "Réplica: shared-cpu-1x / 1GB",
        "Volúmenes: 20GB + 20GB = 40GB",
        "Snapshots (desde fecha de inicio)",
      ],
      ideal: "Más usuarios, picos fuertes, y mejor tolerancia a fallos.",
      price: "$120.000",
    },
  ],
};

export default function TiendaOnline() {
  return <PageLayout pg={DATA} />;
}
