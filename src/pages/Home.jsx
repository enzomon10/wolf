// src/pages/Home.jsx
import React from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import ValoresSection from "../components/ValoresSection";
import ProcesosAssembleSVG from "../components/ProcesoSVG";
import Wulfnet from '../components/WulfnetSVG';
import WulfnetLogo from '../components/WulfnetLogo';
import SpiralCircleAssemble from "../components/ServiciosSVG";
import { VisionScatterExplode } from "../components/VisionSVG";
import VegvisirScatterBase from "../components/MisionSVG";
import VigasAssembleScroll from "../components/MarcasSVG";
import ProyectosAssemble from "../components/ProyectosAssemble";
import {
  P1AssembleIcon,
  P2AssembleIcon,
  P3AssembleIcon,
} from "../components/procesosSVG";

// --- ANIMACIONES BASE ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// --- ESTILOS PARA LA CINTA DE MARCAS (Marquee) ---
const marqueeStyle = `
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); } 
  }
  .animate-scroll {
    animation: scroll 10s linear infinite;
    display: flex;
    width: max-content;
  }
  .animate-scroll:hover {
    animation-play-state: paused;
  }
`;

// --- PARTÍCULAS DE FONDO (Premium Wulfnet) ---
const FloatingParticles = React.memo(() => {
  const particles = React.useMemo(
    () =>
      Array.from({ length: 15 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 0.5 + 0.2,
        w: Math.random() * 4 + 1,
        dur: Math.random() * 10 + 15,
        yTo: Math.random() * -100,
      })),
    [],
  );

  return (
    <div className="flex flex-col w-full bg-[#050505] relative overflow-x-clip overflow-y-visible min-h-screen text-gray-300">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#D4AF37]"
          initial={{ x: `${p.x}vw`, y: `${p.y}vh`, scale: p.s, opacity: 0 }}
          animate={{ y: [null, p.yTo], opacity: [0, 0.15, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "linear" }}
          style={{
            width: `${p.w}px`,
            height: `${p.w}px`,
            boxShadow: "0 0 10px rgba(212, 175, 55, 0.3)",
          }}
        />
      ))}
    </div>
  );
});
function ProjectCard({ title, category, image, logo, link }) {
  return (
    <motion.div
      variants={fadeUp}
      // Asegurate de que estas clases en el div principal sigan estando:
      className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-80 md:h-[400px]"
    >
      {/* Imagen de portada (La dejamos como estaba en el último paso) */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />

      {/* --- 🔥 ACÁ ESTÁ EL CAMBIO 🔥 --- */}
      {/* Reemplazamos el div del overlay anterior por este nuevo con degradado */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80 transition-all duration-500 group-hover:from-black/80 group-hover:via-black/40 group-hover:to-black/90"
      ></div>
      {/* -------------------------------- */}

      {/* Contenido de la tarjeta (Esto sigue igual, pero ahora se verá mejor) */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
        {/* Logo de la marca y Categoría */}
        <div className="flex justify-between items-start">
          {logo ? (
            // 1. Contenedor del fondo blanco (más chico)
            <div className="relative h-9 w-9 bg-white rounded-full flex items-center justify-center mt-1 ml-1 shrink-0 z-0">
              {/* 2. La imagen del logo (más grande y superpuesta) */}
              <img
                src={logo}
                alt="Brand Logo"
                // Usamos 'absolute' para que se salga del contenedor, y un tamaño mayor (h-8 w-8)
                // 'max-w-none' es importante para que no se limite al ancho del padre.
                className="absolute h-10 w-10 max-w-none opacity-90 object-contain z-10"
              />
            </div>
          ) : (
            <div></div>
          )}
          <span className="bg-[#D4AF37] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full z-20">
            {category}
          </span>
        </div>

        {/* Título y Enlace */}
        <div>
          <h3 className="text-2xl font-garamond font-bold text-white mb-2 drop-shadow-sm">{title}</h3>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#D4AF37] text-sm uppercase tracking-widest hover:underline"
            >
              Ver Proyecto
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  // Hook para el hilo conductor dorado
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      <style>{marqueeStyle}</style>

      <div className="flex flex-col w-full bg-[#050505] relative overflow-x-hidden min-h-screen text-gray-300">
        {/* FONDO Y PARTÍCULAS */}
        <div className="absolute inset-0 z-0">
          <FloatingParticles />
          <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#111]/40 to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-[60vh] bg-gradient-to-t from-[#D4AF37]/5 to-transparent" />
        </div>

        {/* HILO CONDUCTOR DORADO (Línea de Scroll) */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-[#1a1a1a] z-0 hidden md:block">
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="w-full h-full bg-gradient-to-b from-[#D4AF37] via-[#fcebb6] to-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.5)]"
          />
        </div>

        {/* --- SECCIÓN 1: HERO (alto pantalla - navbar - bottomnav) --- */}
        <section
          className="
            relative z-10 text-center w-full
            min-h-[calc(100dvh-var(--navbar-h)-var(--bottomnav-h,0px))]
            flex flex-col items-center justify-center
            px-6 pt-16 md:pt-0 md:pb-0
            overflow-hidden
          "
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-7xl w-full mx-auto"
          >
       {/* --- BLOQUE SUPERIOR: LOGO + TEXTO WULFNET --- */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-10 md:mb-14">
              
              {/* IMAGEN 1: El Lobo Geométrico */}
              <motion.div variants={fadeUp} className="w-40 md:w-56 lg:w-72 flex-shrink-0">
                <WulfnetLogo className="w-full h-auto cursor-pointer" floatPx={200} />
              </motion.div>

              {/* IMAGEN 2 o BLOQUE DE TEXTO: Wulfnet + Slogan */}
              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center md:items-start text-center md:text-left"
              >
                {/* 👇 ACÁ RECUPERAMOS LA ALTURA EXACTA ORIGINAL 👇 */}
                <div className="h-12 md:h-20 lg:h-28 mb-4 w-full flex items-center justify-center md:justify-start">
                  <Wulfnet
                    className="w-auto h-full"
                    fill="#ffffff"
                    floatPx={120} 
                  />
                </div>

                {/* SLOGAN */}
                <p className="text-xl md:text-2xl font-garamond text-[#DEBB35] font-light leading-tight">
                  Transformando líderes y empresas <br />
                  a través de internet.
                </p>
              </motion.div>
            </div>

            {/* --- BLOQUE INFERIOR: Párrafo descriptivo centrado --- */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-xl text-gray-300 font-light leading-relaxed max-w-4xl mx-auto text-center"
            >
              Somos una agencia digital que combina estrategia de negocios, análisis de datos,
              diseño UX/UI y marketing para ayudar a emprendedores, startups y pymes a crecer.
              Creamos planes de acción claros, productos digitales funcionales y soluciones a
              medida que convierten ideas en resultados.
            </motion.p>
          </motion.div>
        </section>


        {/* --- SECCIÓN 2: MISIÓN Y VISIÓN --- */}
        <section className="pt-24 pb-0 md:pb-16 px-6 relative z-10 border-t border-[#1a1a1a] bg-[#020202]">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 md:gap-12">

              {/* --- MISIÓN --- */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center md:text-left group flex flex-col h-full cursor-default"
              >
                <div className="mb-6 flex flex-col items-center text-center gap-4 md:flex-row md:items-center md:text-left">
                  {/* Ícono animado al hacer hover */}
                  <div className="w-24 h-24 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700">
                    <VegvisirScatterBase
                      className="w-24 h-24 transition-all duration-500"
                      paper="transparent"
                      ringStroke="#D4AF37"
                      ringFill="#050505"
                      stroke="#D4AF37"
                    />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-garamond text-white tracking-[0.2em] uppercase group-hover:scale-105 transition-transform duration-700">
                    Misión
                  </h2>
                </div>

                {/* Borde izquierdo dinámico (solo en PC) y texto corregido */}
                <div className="relative md:pl-8 md:border-l md:border-[#333] group-hover:border-[#D4AF37] transition-colors duration-500 flex-grow">
                  <p className="text-base md:text-lg text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-500">
                    Nuestra misión es desarrollar plataformas digitales innovadoras y
                    personalizadas que empoderen a las empresas y emprendedores para que
                    puedan alcanzar sus objetivos y mejorar la experiencia de sus
                    clientes. Nos enfocamos en crear soluciones digitales que sean
                    flexibles, escalables y seguras, y que se adapten a las necesidades
                    específicas de cada cliente.
                  </p>
                </div>
              </motion.div>

              {/* --- VISIÓN --- */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center md:text-left group flex flex-col h-full cursor-default"
              >
                <div className="mb-6 flex flex-col items-center text-center gap-4 md:flex-row md:items-center md:text-left">
                  {/* Ícono animado al hacer hover */}
                  <div className="w-24 h-24 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700">
                    <VisionScatterExplode
                      className="w-24 h-24 text-[#D4AF37] transition-all duration-500"
                    />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-garamond text-white tracking-[0.2em] uppercase group-hover:scale-105 transition-transform duration-700">
                    Visión
                  </h2>
                </div>

                {/* Borde izquierdo dinámico (solo en PC) y texto corregido */}
                <div className="relative md:pl-8 md:border-l md:border-[#333] group-hover:border-[#D4AF37] transition-colors duration-500 flex-grow">
                  <p className="text-base md:text-lg text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-500">
                    Nuestra visión es ser líderes en la creación de soluciones digitales
                    que transformen la forma en que las empresas interactúan con sus
                    clientes y usuarios. Queremos ser reconocidos por nuestra excelencia
                    en el desarrollo de plataformas digitales que sean innovadoras,
                    intuitivas y visualmente atractivas, y que generen valor agregado para
                    nuestros clientes y la sociedad.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>


        {/* --- ✅ SECCIÓN NUEVA: VALORES (Diagrama Místico) --- */}
        <div className="mt-24 md:mt-40">
          <ValoresSection />
        </div>
        {/* --- SECCIÓN 3: SERVICIOS (Grilla Bento) --- */}
        <section className="py-16 px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.3 },
                },
              }}
              className="mb-16 flex flex-col items-center justify-center relative z-10 text-center"
            >

              {/* --- 🌟 RECUADRO ANIMADO (Se dibuja al scrollear) 🌟 --- */}
              <div className="relative mb-6 px-6 py-3 flex items-center justify-center">
                {/* Borde Superior (Crece desde el centro) */}
                <motion.div
                  variants={{
                    hidden: { width: "0%" },
                    visible: { width: "100%", transition: { duration: 0.6, ease: "easeInOut" } }
                  }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                />

                {/* Borde Inferior (Crece desde el centro) */}
                <motion.div
                  variants={{
                    hidden: { width: "0%" },
                    visible: { width: "100%", transition: { duration: 0.6, ease: "easeInOut" } }
                  }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                />

                {/* Borde Izquierdo (Crece desde el centro hacia arriba/abajo) */}
                <motion.div
                  variants={{
                    hidden: { height: "0%" },
                    visible: { height: "100%", transition: { duration: 0.4, ease: "easeInOut", delay: 0.6 } }
                  }}
                  className="absolute top-1/2 left-0 -translate-y-1/2 w-[1px] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                />

                {/* Borde Derecho (Crece desde el centro hacia arriba/abajo) */}
                <motion.div
                  variants={{
                    hidden: { height: "0%" },
                    visible: { height: "100%", transition: { duration: 0.4, ease: "easeInOut", delay: 0.6 } }
                  }}
                  className="absolute top-1/2 right-0 -translate-y-1/2 w-[1px] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                />

                {/* Texto del subtítulo (Un poco más grande y con aire a los costados) */}
                <motion.span
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.8 } }
                  }}
                  className="text-xs md:text-sm font-bold text-[#D4AF37] block uppercase tracking-[0.2em] m-0 px-2"
                >
                  Nuestra Propuesta
                </motion.span>
              </div>

              {/* Texto principal (Jerarquía corregida: tamaño de lectura y color más suave) */}
              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg text-gray-300 max-w-3xl leading-relaxed px-4 md:px-0"
              >
                Hacemos crecer las marcas con las que trabajamos, nos
                involucramos con sus negocios implementando las mejores
                prácticas de marketing online disponibles. Logramos esto gracias
                a nuestro método de trabajo diferencial y un talento híper
                calificado.
              </motion.p>
            </motion.div>

            <motion.div className="mt-16 mb-8 flex flex-col items-center justify-center text-center gap-4 overflow-visible relative z-30">
              <div className="relative w-28 md:w-32 h-28 md:h-32 overflow-visible pt-6">
                <SpiralCircleAssemble
                  className="absolute inset-0 -top-2 overflow-visible"
                  originOverride={{ x: 90.171, y: 82.15 }}
                  SUCTION_ZONE={1}
                  SUCTION_POWER={0.2}
                  SUCTION_CURVE={0.5}
                />
              </div>

              <h2 className="text-3xl font-garamond text-white tracking-[0.2em] uppercase">
                Servicios
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ServiceCard
                title="Diseño Web"
                desc="Creamos tu presencia digital desde cero: landing pages rápidas en React hasta plataformas completas con React + Django, con login, panel de administración, base de datos, pagos, mapas, reservas y todo lo que tu negocio necesite."
                link="/servicios/programacion"
              />
              <ServiceCard
                title="SEO & Google Ads"
                desc="Hacemos que tu web aparezca donde importa: en los primeros resultados. Optimizamos tu plataforma con SEO técnico y de contenido, y potenciamos resultados con campañas de Google Ads para atraer clientes listos para comprar."
                link="/servicios/seo"
              />
              <ServiceCard
                title="Redes Sociales & Meta Ads"
                desc="Construimos tu marca en redes con una estrategia real: contenido, identidad visual y planificación para crecer en Instagram y Facebook. Activamos campañas de Meta Ads para alcanzar más personas y convertir seguidores en clientes."
                link="/servicios/marketing"
              />
            </div>
          </div>
        </section>

        {/* --- SECCIÓN 4: PROCESOS (Timeline Alternado) --- */}
        <section className="py-16 px-6 relative z-10 border-t border-[#1a1a1a] bg-[#020202] overflow-hidden">
          <div className="max-w-5xl mx-auto relative">
            {/* Título */}
            <div className="mt-16 mb-8 flex flex-col items-center justify-center text-center gap-4">
              <div className="relative w-[116px] md:w-[132px] h-[116px] md:h-[132px] overflow-visible"/* Altura hardcodeada */>
                <ProcesosAssembleSVG className="w-full h-full object-contain overflow-visible" />
              </div>
              <h2 className="text-3xl font-garamond text-white tracking-[0.2em] uppercase">
                Procesos
              </h2>
            </div>

            {/* Contenedor del Timeline */}
            <div className="relative">
              {/* Línea Central Vertical (Solo visible en PC) */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#D4AF37]/0 via-[#D4AF37]/40 to-[#D4AF37]/0 transform -translate-x-1/2 z-0"></div>

              <div className="space-y-16 md:space-y-24 relative z-10">
                <ProcessStep
                  num="#1"
                  title="Tormenta de ideas"
                  desc="Te ayudamos a generar el concepto de tu plataforma ideal que se ajuste a tus necesidades."
                  align="right"
                  customIconNode={<P1AssembleIcon className="h-20 w-auto" />}
                />
                <ProcessStep
                  num="#2"
                  title="Desarrollo"
                  desc="Plasmamos tu idea en la realidad, una plataforma totalmente funcional."
                  align="left"
                  customIconNode={<P2AssembleIcon className="h-20 w-auto" />}
                />
                <ProcessStep
                  num="#3"
                  title="Acompañamiento"
                  desc="Te acompañamos para mejorar tu plataforma y conseguir usuarios."
                  align="right"
                  customIconNode={<P3AssembleIcon className="h-20 w-auto"/>}
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- ✅ SECCIÓN NUEVA: PROYECTOS (Grilla de Casos de Estudio) --- */}
        <section className="py-16 px-6 relative z-10 border-t border-[#1a1a1a] bg-[#020202] overflow-hidden">
          <div className="max-w-6xl mx-auto">
            {/* Título y Descripción de la Sección */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-16 flex flex-col items-center justify-center text-center gap-4"
            >
              <div className="relative w-28 md:w-32 h-28 md:h-32 overflow-visible pt-6">
                <ProyectosAssemble
                  className="absolute inset-0 -top-2 overflow-visible"
                  SUCTION_ZONE={1}
                  SUCTION_POWER={0.2}
                  SUCTION_CURVE={0.5}
                />
              </div>
              <h2 className="text-3xl font-garamond text-white tracking-[0.2em] uppercase">
                Proyectos
              </h2>
              <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed max-w-3xl mx-auto mt-4">
                Cada proyecto que desarrollamos en Wulfnet está pensado a medida, combinando
                diseño, rendimiento y experiencia de usuario. Estas son algunas de las webs que
                creamos junto a nuestros clientes.
              </p>
            </motion.div>

            {/* Grilla de Proyectos */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <ProjectCard
                title="Conexión Nihon"
                category="Premium / Elite"
                image="/assets/piza2.webp"
                logo="/assets/nihon.png"
                link="https://conexionnihon.ar/sobre-mi"
              />
              <ProjectCard
                title="Otaru Ediciones"
                category="Ecommerce"
                image="/assets/compu2.webp"
                logo="/assets/logo-300w.webp"
                link="https://otaru.ar/"
              />
            </motion.div>
            {/* --- 🔥 BOTÓN DE VER MÁS PROYECTOS 🔥 --- */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mt-16 flex justify-center w-full"
            >
              <a
                href="/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-3 text-xs md:text-sm font-medium uppercase tracking-[0.2em] transition-all duration-300 border border-[#D4AF37]/30 text-gray-200 bg-transparent shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:-translate-y-1"
              >
                Ver Más Proyectos
              </a>
            </motion.div>
            {/* ---------------------------------------- */}
          </div>
        </section>

        {/* --- SECCIÓN 5: CLIENTES Y MARCAS --- */}
        <section className="py-16 px-6 relative z-10 overflow-hidden">
          <div className="max-w-6xl mx-auto">

            {/* --- 🌟 RECUADRO ANIMADO PARA TESTIMONIOS 🌟 --- */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.3 },
                },
              }}
              className="mb-16 flex flex-col items-center justify-center relative z-10 text-center"
            >

              <div className="relative mb-6 px-6 py-3 flex items-center justify-center max-w-[95%] md:max-w-none">
                {/* Borde Superior */}
                <motion.div
                  variants={{
                    hidden: { width: "0%" },
                    visible: { width: "100%", transition: { duration: 0.6, ease: "easeInOut" } }
                  }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                />

                {/* Borde Inferior */}
                <motion.div
                  variants={{
                    hidden: { width: "0%" },
                    visible: { width: "100%", transition: { duration: 0.6, ease: "easeInOut" } }
                  }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                />

                {/* Borde Izquierdo */}
                <motion.div
                  variants={{
                    hidden: { height: "0%" },
                    visible: { height: "100%", transition: { duration: 0.4, ease: "easeInOut", delay: 0.6 } }
                  }}
                  className="absolute top-1/2 left-0 -translate-y-1/2 w-[1px] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                />

                {/* Borde Derecho */}
                <motion.div
                  variants={{
                    hidden: { height: "0%" },
                    visible: { height: "100%", transition: { duration: 0.4, ease: "easeInOut", delay: 0.6 } }
                  }}
                  className="absolute top-1/2 right-0 -translate-y-1/2 w-[1px] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                />

                {/* Texto del subtítulo */}
                <motion.span
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.8 } }
                  }}
                  className="text-xs md:text-sm font-bold text-[#D4AF37] block uppercase tracking-[0.2em] m-0 px-2"
                >
                  La Experiencia Wulfnet, Contada Por Nuestros Clientes
                </motion.span>
              </div>

              {/* Texto principal (Con la misma jerarquía y tamaño que el de "Nuestra Propuesta") */}
              <motion.p
                variants={fadeUp}
                className="text-base md:text-lg text-gray-300 max-w-3xl leading-relaxed px-4 md:px-0"
              >
                En Wulfnet creemos que el mejor respaldo es la experiencia de
                nuestros clientes. Cada proyecto es único y trabajamos para que
                cada web refleje profesionalismo, rendimiento y resultados
                reales.
              </motion.p>
            </motion.div>

            {/* Testimonios Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
              <TestimonialCard
                name="Conexión Nihon"
                loc="CABA, Argentina"
                img="/assets/nihon.png"
                desc="Increíble atención al detalle. No solo diseñaron una web hermosa, sino que entendieron la lógica de nuestro mercado y optimizaron cada proceso de venta."
              />
              <TestimonialCard
                name="Cookies ctes"
                loc="Corrientes, Argentina"
                img="/assets/cookies.png"
                desc="Gracias a mi pagina la gente puede hacer sus pedidos sin intermediar con otras plataformas, hizo mi local mucho mas eficiente y eficaz."
              />
              <TestimonialCard
                name="Guilaña Group"
                loc="Corrientes, Argentina"
                img="/assets/guilaña.webp"
                desc="Lo que más valoro es el soporte post-lanzamiento. Siempre están disponibles para ajustar estrategias y mejorar el rendimiento. Un socio tecnológico."
              />
            </div>

            <motion.div className="mt-16 mb-8 flex flex-col items-center justify-center text-center gap-4">
              <div className="h-28 md:h-32 w-full flex items-center justify-center">
                <VigasAssembleScroll
                  inline
                  startY={-260}
                  className="h-28 md:h-32 w-auto object-contain"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-garamond text-white tracking-[0.2em] uppercase mb-4">
                Marcas
              </h3>
              {/* ACÁ ESTÁ EL CAMBIO: text-base md:text-lg, text-gray-300 y leading-relaxed */}
              <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
                En Wulfnet acompañamos a empresas, emprendimientos y marcas en
                el desarrollo de su presencia digital, creando soluciones web
                adaptadas a cada necesidad.
              </p>
            </motion.div>

            {/* Marquee de Marcas */}
            <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <div className="animate-scroll flex gap-16 md:gap-32 items-center pl-16">
                {/* Reemplazá estos src por las rutas de tus logos */}
                <img
                  src="/assets/manabu.webp"
                  className="h-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                  alt="Manabu"
                />
                <img
                  src="/assets/guilaña.webp"
                  className="h-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                  alt="Guilaña"
                />
                <img
                  src="/assets/logo-300w.webp"
                  className="h-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                  alt="Otaru"
                />
                <img
                  src="/assets/nihon.webp"
                  className="h-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                  alt="Nihon"
                />

                {/* Loop duplicado para efecto infinito */}
                <img
                  src="/assets/manabu.webp"
                  className="h-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                  alt="Manabu"
                />
                <img
                  src="/assets/guilaña.webp"
                  className="h-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                  alt="Guilaña"
                />
                <img
                  src="/assets/logo-300w.webp"
                  className="h-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                  alt="Otaru"
                />
                <img
                  src="/assets/nihon.webp"
                  className="h-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                  alt="Nihon"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// --- COMPONENTES AUXILIARES ---

function ServiceCard({ title, desc, link }) {
  const ref = React.useRef(null);

  // Reveal con scroll continuo (como ValoresSection/MobileRevealCard)
  const { scrollYProgress } = useScroll({
    target: ref,
    // Ajustá estos offsets si querés que aparezca antes/después
    offset: ["start 85%", "start 60%"],
  });

  const p = useTransform(scrollYProgress, (v) => {
    if (v < 0) return 0;
    if (v > 1) return 1;
    return v;
  });

  // Animación suave (sin transition reactiva)
  const opacity = useTransform(p, [0, 1], [0, 1]);
  const y = useTransform(p, [0, 1], [16, 0]);
  const scale = useTransform(p, [0, 1], [0.99, 1]);

  const blurPx = useTransform(p, [0, 1], [8, 0]);
  const blurStr = useTransform(blurPx, (b) => `blur(${b}px)`);

  // --- Anti-flicker para auto-scroll (ruedita apretada) ---
  const [autoScroll, setAutoScroll] = React.useState(false);

  React.useEffect(() => {
    // middle mouse down => entra auto scroll
    const onDown = (e) => {
      if (e.button === 1) setAutoScroll(true);
    };
    const onUp = (e) => {
      if (e.button === 1) setAutoScroll(false);
    };
    const onBlur = () => setAutoScroll(false);

    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      // Cuando hay auto-scroll, congelamos lo que más flicker produce:
      // transform/y y filter/blur
      style={
        autoScroll
          ? { opacity } // solo opacidad (estable)
          : { opacity, y, scale, filter: blurStr }
      }
      // importante: sin translateZ y sin willChange agresivo
      className="bg-[#0a0a0a] border border-[#1a1a1a] p-8 hover:border-[#D4AF37] transition-all duration-300 flex flex-col h-full group"
    >
      <div className="h-1 w-12 bg-[#D4AF37] mb-6 group-hover:w-full transition-all duration-500" />
      <h3 className="text-lg font-garamond font-bold text-white mb-4 uppercase tracking-widest">
        {title}
      </h3>
      <p className="text-base text-gray-400 leading-relaxed flex-grow">{desc}</p>

      <Link
        to={link}
        className="mt-8 px-6 py-2 text-xs font-medium uppercase tracking-widest transition-all duration-300 self-start inline-block border border-[#D4AF37]/30 text-gray-200 bg-transparent shadow-[0_0_10px_rgba(212,175,55,0.05)] hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:-translate-y-1"
      >
        Ver Más
      </Link>
    </motion.div>
  );
}

function ProcessStep({
  num,
  title,
  desc,
  align,
  svgType,
  customIcon,
  customIconNode,
}) {
  const isRight = align === "right";

  // Clases compartidas para mantener la animación de opacidad y rotación
  const imgClasses = `w-24 h-24 object-contain opacity-60 group-hover:opacity-100 transition-all duration-500 transform ${isRight ? "group-hover:rotate-12" : "group-hover:-rotate-12"
    }`;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeUp}
      className={`relative flex ${isRight ? "flex-col" : "flex-col-reverse"
        } md:flex-row items-center justify-between w-full group gap-8 md:gap-0`}
    >
      {/* Punto Dorado Central (Solo PC) */}
      <div className="hidden md:block absolute left-1/2 top-1/2 w-4 h-4 bg-[#D4AF37] rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_15px_rgba(212,175,55,0.6)] group-hover:scale-150 transition-transform duration-500"></div>

      {/* COLUMNA IZQUIERDA */}
      <div
        className={`w-full md:w-1/2 flex ${isRight
          ? "justify-center md:justify-end md:pr-16"
          : "justify-start md:justify-end md:pr-16"
          }`}
      >
        {isRight ? (
          // DIBUJO O IMAGEN (Si es Right)
          customIconNode ? (
            <div className={imgClasses}>{customIconNode}</div>
          ) : customIcon ? (
            <img src={customIcon} alt={title} className={imgClasses} />
          ) : (
            <DecorativeSVG
              type={svgType}
              className={`w-24 h-24 text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:rotate-12 transform`}
            />
          )
        ) : (
          // TEXTO (Si es Left) -> CAMBIO ACÁ: flex-row y tamaños responsivos
          <div className="flex flex-row md:flex-row-reverse items-center gap-4 md:gap-6 w-full text-left md:text-right">
            <div className="bg-[#050505] border border-[#1a1a1a] text-[#D4AF37] font-garamond text-3xl md:text-4xl p-2 md:p-4 font-bold flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition-colors duration-500 z-10">
              {num}
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-garamond text-white mb-1 md:mb-2">{title}</h4>
              <p className="text-xs md:text-sm text-gray-400 max-w-xs md:ml-auto">
                {desc}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* COLUMNA DERECHA */}
      <div
        className={`w-full md:w-1/2 flex ${isRight
          ? "justify-start md:pl-16"
          : "justify-center md:justify-start md:pl-16"
          }`}
      >
        {isRight ? (
          // TEXTO (Si es Right) -> CAMBIO ACÁ: flex-row y tamaños responsivos
          <div className="flex flex-row items-center gap-4 md:gap-6 w-full text-left">
            <div className="bg-[#050505] border border-[#1a1a1a] text-[#D4AF37] font-garamond text-3xl md:text-4xl p-2 md:p-4 font-bold flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:text-black transition-colors duration-500 z-10">
              {num}
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-garamond text-white mb-1 md:mb-2">{title}</h4>
              <p className="text-xs md:text-sm text-gray-400 max-w-xs">{desc}</p>
            </div>
          </div>
        ) : // DIBUJO O IMAGEN (Si es Left)
          customIconNode ? (
            <div className={imgClasses}>{customIconNode}</div>
          ) : customIcon ? (
            <img src={customIcon} alt={title} className={imgClasses} />
          ) : (
            <DecorativeSVG
              type={svgType}
              className={`w-24 h-24 text-[#D4AF37] opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:-rotate-12 transform`}
            />
          )}
      </div>
    </motion.div>
  );
}

// Iconos geométricos laterales para los procesos
function DecorativeSVG({ type, className }) {
  if (type === "circles") {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={className}
      >
        <circle cx="50" cy="35" r="25" />
        <circle cx="35" cy="65" r="25" />
        <circle cx="65" cy="65" r="25" />
      </svg>
    );
  }
  if (type === "starburst1") {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={className}
      >
        <circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
        <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" />
        <circle cx="50" cy="50" r="15" fill="currentColor" fillOpacity="0.1" />
      </svg>
    );
  }
  if (type === "starburst2") {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={className}
      >
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="45" strokeDasharray="2 6" />
        <polygon points="50,15 85,50 50,85 15,50" />
      </svg>
    );
  }
  return null;
}

function TestimonialCard({ name, loc, img, desc }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[#0a0a0a] border border-[#1a1a1a] p-8 text-center hover:border-[#333] transition-all"
    >
      <div className="w-20 h-20 mx-auto rounded-full bg-gray-800 border-2 border-[#D4AF37] mb-4 overflow-hidden p-1">
        <img
          src={img}
          alt={name}
          className="w-full h-full rounded-full object-cover bg-gray-200 opacity-90"
        />
      </div>
      <h4 className="font-bold text-white text-sm">{name}</h4>
      <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest mb-6">
        {loc}
      </p>
      <p className="text-base text-gray-400 italic leading-relaxed">"{desc}"</p>
    </motion.div>
  );
}