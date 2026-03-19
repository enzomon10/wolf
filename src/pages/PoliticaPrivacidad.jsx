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

// --- PARTÍCULAS DE FONDO (Igual que en Home) ---
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

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 relative overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      
      {/* FONDO Y PARTÍCULAS */}
      <div className="absolute inset-0 z-0">
        <FloatingParticles />
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#111]/40 to-transparent" />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="relative z-10 pt-16 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        
        {/* Botón Volver */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-12">
            <Link to="/" className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                ← Volver al Inicio
            </Link>
        </motion.div>

        {/* Título */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16 border-l-2 border-[#D4AF37] pl-6">
          <h1 className="text-4xl md:text-5xl font-garamond font-bold text-white mb-4">
            Política de Privacidad
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
            <h2 className="text-xl font-garamond font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">1. Introducción</h2>
            <p className="mb-4">
              En <strong>Wulfnet</strong> ("nosotros", "nuestro"), respetamos su privacidad y estamos comprometidos a proteger la información personal que pueda compartir con nosotros. Esta política explica cómo recopilamos, usamos y salvaguardamos sus datos cuando visita nuestro sitio web o contrata nuestros servicios de desarrollo web y marketing digital.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-garamond font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">2. Información que Recopilamos</h2>
            <p className="mb-4">Podemos recopilar los siguientes tipos de información:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400 marker:text-[#D4AF37]">
              <li><strong>Información Personal:</strong> Nombre, dirección de correo electrónico, número de teléfono y detalles del proyecto cuando completa nuestros formularios de contacto o solicita un presupuesto.</li>
              <li><strong>Información Técnica:</strong> Dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia (a través de cookies y herramientas de análisis).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-garamond font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">3. Uso de la Información</h2>
            <p>Utilizamos sus datos para los siguientes fines:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400 marker:text-[#D4AF37] mt-4">
              <li>Proveer y mantener nuestros servicios de diseño web y marketing.</li>
              <li>Contactarlo para responder a sus consultas o enviarle propuestas comerciales.</li>
              <li>Mejorar la experiencia del usuario en nuestro sitio web mediante análisis de tráfico.</li>
              <li>Ejecutar campañas publicitarias (Google Ads, Meta Ads) si ha dado su consentimiento para ello.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-garamond font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">4. Cookies y Terceros</h2>
            <p className="mb-4">
              Nuestro sitio web utiliza cookies para mejorar la navegación. Además, trabajamos con herramientas de terceros como <strong>Google Analytics</strong> y <strong>Google Ads</strong> para medir el rendimiento de nuestra publicidad.
            </p>
            <p>
              Estos proveedores pueden utilizar cookies para mostrar anuncios basados en sus visitas anteriores a nuestro sitio web. Usted puede optar por inhabilitar el uso de cookies en la configuración de su navegador.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-garamond font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">5. Seguridad de los Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra el acceso no autorizado, la alteración o la destrucción. Sin embargo, ningún método de transmisión por Internet es 100% seguro.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-garamond font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">6. Sus Derechos</h2>
            <p className="mb-4">
              Como usuario, tiene derecho a acceder, rectificar o eliminar su información personal de nuestras bases de datos. Si desea ejercer estos derechos, por favor contáctenos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-garamond font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">7. Contacto</h2>
            <p>
              Si tiene preguntas sobre esta política de privacidad, puede escribirnos a:
            </p>
            <p className="mt-4 text-[#D4AF37] font-bold">contacto@wulfnet.ar</p> {/* Cambiá por tu email real */}
          </section>

        </motion.div>

      </main>
    </div>
  );
}