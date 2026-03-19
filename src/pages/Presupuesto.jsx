// src/pages/Presupuesto.jsx
// Router principal — maneja las rutas /presupuesto/landing, /tienda, /elite
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage  from "./presupuesto/LandingPage";
import TiendaOnline from "./presupuesto/TiendaOnline";
import Elite        from "./presupuesto/Elite";

export default function Presupuesto() {
  return (
    <Routes>
      {/* Redirige /presupuesto → /presupuesto/landing por defecto */}
      <Route index element={<Navigate to="landing" replace />} />
      <Route path="landing" element={<LandingPage />} />
      <Route path="tienda"  element={<TiendaOnline />} />
      <Route path="elite"   element={<Elite />} />
    </Routes>
  );
}
