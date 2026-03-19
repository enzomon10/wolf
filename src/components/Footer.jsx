// src/components/Footer.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#1a1a1a] bg-[#050505] pt-16 pb-8 text-gray-300">
      {/* --- Decoración de fondo geométrica sutil --- */}
      <div className="pointer-events-none absolute top-[-150px] right-[-100px] z-0 h-[500px] w-[500px] rounded-full bg-[#D4AF37] opacity-[0.03] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        {/* ✅ En mobile: todo centrado. En md+: vuelve a izquierda */}
        <div className="mb-16 grid grid-cols-1 gap-12 text-center md:grid-cols-4 md:text-left md:gap-12 justify-items-center md:justify-items-start">
          {/* COLUMNA 1: MARCA Y LOGO */}
          <div className="md:col-span-1 w-full">
            <Link to="/" onClick={handleLogoClick} className="inline-block mb-6">
              <img
                src="/assets/Wulfnet_logo1.png"
                alt="Wulfnet Logo"
                className="h-24 transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </Link>

            {/* ✅ Borde solo en md+ y centrado en mobile */}
            <p className="mx-auto max-w-[280px] border-l-0 pl-0 text-sm leading-relaxed md:mx-0 md:border-l-[3px] md:border-[#D4AF37] md:pl-4">
              Te brindamos las herramientas para que puedas desarrollar tu
              emprendimiento en la era de la tecnología.
            </p>
          </div>

          {/* COLUMNA 2: SERVICIOS */}
          <div className="w-full">
            <h4 className="mb-6 text-[12px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Servicios
            </h4>
            <ul className="space-y-4">
              <li><FooterLink to="/servicios/programacion" text="Diseño Web" /></li>
              <li><FooterLink to="/servicios/seo" text="Posicionamiento SEO" /></li>
              <li><FooterLink to="/servicios/marketing" text="Gestión de Redes" /></li>
            </ul>
          </div>

          {/* COLUMNA 3: NAVEGACIÓN */}
          <div className="w-full">
            <h4 className="mb-6 text-[12px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Navegación
            </h4>
            <ul className="space-y-4">
              <li><FooterLink to="/" text="Inicio" handleLogoClick={handleLogoClick} /></li>
              <li><FooterLink to="/portfolio" text="Portfolio" /></li>
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO */}
          <div className="w-full">
            <h4 className="mb-6 text-[12px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Contacto
            </h4>

            <ul className="space-y-5">
              {/* ✅ En mobile centramos ícono+texto */}
              <li className="flex items-start justify-center gap-4 text-sm md:justify-start">
                <MailIcon className="h-5 w-5 shrink-0 text-[#D4AF37]" />
                <a
                  href="mailto:hola@wulfnet.ar"
                  className="transition-colors hover:text-white"
                >
                  contacto@wulfnet.ar
                </a>
              </li>

              <li className="flex items-start justify-center gap-4 text-sm md:justify-start">
                <MapPinIcon className="h-5 w-5 shrink-0 text-[#D4AF37]" />
                <span>Corrientes, Argentina</span>
              </li>

              {/* ✅ Botón centrado en mobile */}
              <li className="pt-4 flex justify-center md:justify-start">
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 bg-[#D4AF37] px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-white hover:text-black"
                >
                  <CalendarIcon className="h-4 w-4" />
                  Agendar Reunión
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* --- BARRA INFERIOR --- */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-[#1a1a1a] pt-8 text-center text-xs text-gray-400 md:flex-row md:text-left">
          <p>
            © {currentYear}{" "}
            <span className="font-bold text-[#D4AF37]">Wulfnet</span>. Todos los
            derechos reservados.
          </p>

          {/* ✅ Alineación central en mobile */}
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-3 md:flex-row md:gap-6">
              <Link
                to="/politica-de-privacidad"
                className="transition-colors hover:text-[#D4AF37]"
              >
                Políticas de Privacidad
              </Link>
              <Link
                to="/terminos-y-condiciones"
                className="transition-colors hover:text-[#D4AF37]"
              >
                Términos y Condiciones
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 md:border-l md:border-[#333] md:pl-6">
              <SocialLink
                href="https://www.linkedin.com/company/wulfnet/"
                icon={<LinkedInIcon />}
                label="LinkedIn"
              />
              <SocialLink
                href="https://www.instagram.com/wulfnet.ar/"
                icon={<InstagramIcon />}
                label="Instagram"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- SUB-COMPONENTES ---

function FooterLink({ to, text, handleLogoClick }) {
  const props = handleLogoClick && to === "/" ? { onClick: handleLogoClick } : {};
  return (
    <Link
      to={to}
      {...props}
      className="block text-[15px] transition-all duration-300 hover:text-white md:hover:translate-x-1"
    >
      <span className="inline-block">{text}</span>
    </Link>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center border border-[#333] bg-[#111] text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
    >
      {icon}
    </a>
  );
}

// --- ICONOS SVG ---

const MailIcon = ({ className }) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

const MapPinIcon = ({ className }) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
    />
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.53c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
    />
  </svg>
);
