import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// --- ANIMACIONES ---
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// --- PARTÍCULAS DE FONDO ---
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#D4AF37]"
          initial={{
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh",
            scale: Math.random() * 0.5 + 0.2,
            opacity: 0
          }}
          animate={{
            y: [null, Math.random() * -100],
            opacity: [0, 0.15, 0], 
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: Math.random() * 4 + 1 + "px",
            height: Math.random() * 4 + 1 + "px",
            boxShadow: "0 0 10px rgba(212, 175, 55, 0.3)"
          }}
        />
      ))}
    </div>
  );
};

export default function Terminos() {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 relative overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      
      {/* FONDO */}
      <div className="absolute inset-0 z-0">
        <FloatingParticles />
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#111]/40 to-transparent" />
      </div>

      {/* CONTENIDO */}
      <main className="relative z-10 pt-16 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        
        {/* Volver */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-12">
            <Link to="/" className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                ← Volver al Inicio
            </Link>
        </motion.div>

        {/* Título */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 border-l-2 border-[#D4AF37] pl-6">
          <h1 className="text-4xl md:text-5xl font-garamond font-bold text-white mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-sm md:text-base text-gray-400">
            Última actualización: Febrero 2026
          </p>
        </motion.div>

        {/* Texto Legal */}
        <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeUp} 
            className="space-y-12 text-sm md:text-base leading-relaxed font-light"
        >
          
          <section>
            <h2 className="text-xl font-garamond font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar el sitio web de <strong>Wulfnet</strong>, usted acepta cumplir con estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, le recomendamos no utilizar nuestros servicios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-garamond font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">2. Servicios</h2>
            <p>
              Wulfnet ofrece servicios de desarrollo web, marketing digital, SEO y publicidad online. Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto de nuestros servicios en cualquier momento, aunque siempre intentaremos notificar a nuestros clientes activos con antelación.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-garamond font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">3. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de este sitio web (incluyendo textos, gráficos, logos, iconos, imágenes y código fuente) es propiedad exclusiva de Wulfnet o de sus licenciantes y está protegido por las leyes de propiedad intelectual. Está prohibida su reproducción sin nuestro consentimiento expreso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-garamond font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">4. Limitación de Responsabilidad</h2>
            <p>
              Wulfnet no será responsable por daños indirectos, incidentales o consecuentes que surjan del uso o la imposibilidad de uso de nuestros servicios. Si bien nos esforzamos por garantizar la seguridad y el funcionamiento continuo de nuestro sitio, no garantizamos que esté libre de errores o virus.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-garamond font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">5. Enlaces a Terceros</h2>
            <p>
              Nuestro sitio puede contener enlaces a sitios web de terceros que no son controlados por nosotros. No asumimos responsabilidad por el contenido, políticas de privacidad o prácticas de sitios web de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-garamond font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">6. Ley Aplicable</h2>
            <p>
              Estos términos se regirán e interpretarán de acuerdo con las leyes vigentes en la República Argentina, y cualquier disputa estará sujeta a la jurisdicción exclusiva de los tribunales de dicha región.
            </p>
          </section>

        </motion.div>

      </main>
    </div>
  );
}