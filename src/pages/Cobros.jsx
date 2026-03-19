// src/pages/MembresiaPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function MembresiaPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setOkMsg("");
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    // Normalizaciones
    const amount = Number(payload.monto || 0);
    const email = String(payload.email || "").trim();
    const currency = payload.currency || "ARS";
    const reason = payload.reason || "Membresía mensual";

    if (!email || amount <= 0) {
      setErrorMsg("Revisá email y monto (debe ser mayor a 0).");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://emprenderbackend.fly.dev/api/mp/preapproval/", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, amount, currency, reason }),
      });

      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.init_point || !json?.preapproval_id) {
        console.error("STATUS:", res.status, "BODY:", json);
        throw new Error(json?.error || "No pudimos crear la suscripción.");
      }

      // Feedback antes de salir
      setOkMsg("Redirigiendo a Mercado Pago…");

      // Guardar el ID para verificar luego
      localStorage.setItem("mp_preapproval_id", json.preapproval_id);

      // Redirigir al flujo de autorización de MP
      window.location.href = json.init_point;
    } catch (err) {
      setErrorMsg(err.message || "Error inesperado.");
      setLoading(false);
    }
  }

  // Estilos reutilizables (Dark Mode)
  const inputClasses = "mt-2 w-full bg-[#111] border border-[#333] text-white p-3 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors placeholder-gray-600";
  const labelClasses = "block text-xs uppercase tracking-widest text-gray-400 font-semibold";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto bg-[#0a0a0a] border border-[#222] p-6 md:p-10 rounded-3xl shadow-2xl shadow-black/50"
    >
      {/* Encabezado */}
      <div className="mb-8 border-b border-[#222] pb-6">
        <h1 className="text-3xl md:text-4xl font-garamond text-white mb-3">
          Suscripción Mensual
        </h1>
        <p className="text-gray-400 font-light text-sm md:text-base">
          Configurá el débito automático para tus servicios con Mercado Pago.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-8" noValidate>
        
        {/* Mensajes de Feedback */}
        {errorMsg && (
          <div className="rounded-xl border border-red-900/50 bg-red-900/20 text-red-200 p-4 text-sm flex items-center gap-3">
            <span className="text-xl">⚠️</span> {errorMsg}
          </div>
        )}
        {okMsg && (
          <div className="rounded-xl border border-green-900/50 bg-green-900/20 text-green-200 p-4 text-sm flex items-center gap-3">
            <span className="text-xl">✅</span> {okMsg}
          </div>
        )}

        {/* Datos de suscripción */}
        <section className="space-y-6">
            <h2 className="text-xl font-garamond text-[#D4AF37] border-l-2 border-[#D4AF37] pl-4">
              Detalles del Pago
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Email */}
              <div className="md:col-span-2">
                <label className={labelClasses}>Email del titular <span className="text-[#D4AF37]">*</span></label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  className={inputClasses} 
                  placeholder="cliente@email.com" 
                />
              </div>

              {/* Monto */}
              <div>
                <label className={labelClasses}>Monto mensual <span className="text-[#D4AF37]">*</span></label>
                <div className="relative">
                    <span className="absolute left-3 top-3.5 text-gray-500">$</span>
                    <input 
                    name="monto" 
                    type="number" 
                    min="1" 
                    step="1" 
                    required 
                    className={`${inputClasses} pl-8`} 
                    placeholder="10000" 
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Se cobrará automáticamente cada mes.
                </p>
              </div>

              {/* Moneda */}
              <div>
                <label className={labelClasses}>Moneda</label>
                <div className="relative">
                    <select name="currency" className={`${inputClasses} appearance-none cursor-pointer`}>
                        <option value="ARS">ARS (Pesos Argentinos)</option>
                        <option value="USD">USD (Dólares)</option>
                    </select>
                     {/* Flecha custom */}
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
              </div>

              {/* Motivo */}
              <div className="md:col-span-2">
                <label className={labelClasses}>Concepto (Aparece en el resumen)</label>
                <input 
                  name="reason" 
                  type="text" 
                  defaultValue="Membresía Wulfnet" 
                  className={inputClasses} 
                />
              </div>
            </div>

            {/* Checkbox Términos */}
            <div className="mt-6 pt-4 border-t border-[#222]">
              <label className="inline-flex items-center gap-3 cursor-pointer group">
                 <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      required
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-500 checked:border-[#D4AF37] checked:bg-[#D4AF37] transition-all"
                    />
                    <svg className="pointer-events-none absolute h-5 w-5 text-black opacity-0 peer-checked:opacity-100 p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                 </div>
                 <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                   Acepto los términos y condiciones de la suscripción automática.
                 </span>
              </label>
            </div>
        </section>

        {/* Acciones */}
        <div className="flex items-center justify-between pt-6 border-t border-[#222]">
           <button
            type="reset"
            disabled={loading}
            className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
          >
            Restablecer
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-white transition-colors duration-300 uppercase tracking-widest text-xs md:text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
                <>
                 <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Procesando...
                </>
            ) : "Crear Suscripción"}
          </button>
        </div>
        
        <p className="text-xs text-center text-gray-600 mt-4">
           Serás redirigido a Mercado Pago para confirmar de forma segura.
        </p>

      </form>
    </motion.div>
  );
}