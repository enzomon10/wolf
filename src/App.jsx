// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Componentes globales
import Navbar from "./components/NavBar";
import PageTransition from "./components/PageTransition";
import BottomNav from "./components/BottomNav";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

// Layouts
import ServiciosLayout from "./components/ServiciosLayout";
import PortfolioLayout from "./components/PortfolioLayout";

// Páginas
import Home              from "./pages/Home";
import Marketing         from "./pages/Marketing";
import Programacion      from "./pages/Programación";
import SEO               from "./pages/SEO";
import ContactPage       from "./pages/Contacto";
import SolicitudRecibida from "./pages/SolicitudRecibida";
import MembresiaPage     from "./pages/Cobros";
import OnBoard           from "./pages/OnBoard";
import CancelarMembresia from "./pages/Cancel";
import CobroExitoso      from "./pages/CobroExitoso";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import Terminos          from "./pages/Terminos";
import PortfolioGrid     from "./pages/PortfolioGrid";

// ── Presupuesto — las 3 páginas directo, sin router intermedio ────────────────
import LandingPage  from "./pages/presupuesto/LandingPage";
import TiendaOnline from "./pages/presupuesto/TiendaOnline";
import Elite        from "./pages/presupuesto/Elite";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname.split("/")[1]}>

        {/* Home */}
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />

        {/* Servicios */}
        <Route path="/servicios" element={<PageTransition><ServiciosLayout /></PageTransition>}>
          <Route path="programacion" element={<Programacion />} />
          <Route path="seo"          element={<SEO />} />
          <Route path="marketing"    element={<Marketing />} />
        </Route>

        {/* Presupuesto — rutas absolutas, sin componente router intermedio */}
        <Route path="/presupuesto"         element={<Navigate to="/presupuesto/landing" replace />} />
        <Route path="/presupuesto/landing" element={<LandingPage />} />
        <Route path="/presupuesto/tienda"  element={<TiendaOnline />} />
        <Route path="/presupuesto/elite"   element={<Elite />} />

        {/* Legales */}
        <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/terminos-y-condiciones" element={<PageTransition><Terminos /></PageTransition>} />

        {/* Portfolio */}
        <Route path="/portfolio" element={<PortfolioLayout />}>
          <Route path="todos" element={<PortfolioGrid />} />
          <Route path="web"   element={<PortfolioGrid />} />
          <Route path="seo"   element={<PortfolioGrid />} />
          <Route path="redes" element={<PortfolioGrid />} />
        </Route>

        {/* OnBoard */}
        <Route element={<OnBoard />}>
          <Route path="/contacto"      element={<ContactPage />} />
          <Route path="/recibida"      element={<SolicitudRecibida />} />
          <Route path="/pagos"         element={<MembresiaPage />} />
          <Route path="/cancelar"      element={<CancelarMembresia />} />
          <Route path="/cobro-exitoso" element={<CobroExitoso />} />
        </Route>

      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <BottomNav />
      <main className="bg-gray-100 min-h-screen flex flex-col justify-between">
        <div className="flex-grow">
          <AnimatedRoutes />
        </div>
        <Footer />
      </main>
    </BrowserRouter>
  );
};

export default App;
