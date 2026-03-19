// src/pages/CancelarMembresia.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function CancelarMembresia() {
  const [id, setId] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCancel(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch(
        `https://emprenderbackend.fly.dev/api/mp/cancel/${encodeURIComponent(id)}/`,
        { method: "POST" }
      );
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.error || "No se pudo cancelar. Intentá nuevamente.");
      setMsg("Suscripción cancelada correctamente.");
      setId("");
    } catch (err) {
      setMsg(err.message || "Error inesperado. Intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  // Estilos reutilizables
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
          Cancelar Suscripción
        </h1>
        <p className="text-gray-400 font-light text-sm md:text-base">
          Lamentamos que te vayas. Podés dar de baja tu suscripción automática ingresando el ID o desde Mercado Pago.
        </p>
      </div>

      <div className="space-y-10">
        
        {/* BLOQUE 1: Cancelar por ID */}
        <section>
            <h2 className="text-xl font-garamond text-[#D4AF37] border-l-2 border-[#D4AF37] pl-4 mb-6">
              Opción A: Cancelar con ID
            </h2>
            
            <div className="bg-[#111]/30 border border-[#222] rounded-2xl p-6">
                <form onSubmit={handleCancel} className="space-y-4">
                    <div>
                        <label className={labelClasses}>ID de la suscripción (Preapproval ID)</label>
                        <input
                        type="text"
                        placeholder="ej: 2c938084726fca48..."
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className={inputClasses}
                        required
                        />
                         <p className="text-xs text-gray-500 mt-2">
                            Lo encontrás en el email de confirmación que te envió Mercado Pago.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4 pt-2">
                        <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-6 py-3 bg-[#222] text-white border border-[#333] font-bold rounded-xl hover:bg-red-900/30 hover:text-red-200 hover:border-red-900 transition-colors duration-300 uppercase tracking-widest text-xs disabled:opacity-50"
                        >
                        {loading ? "Procesando..." : "Cancelar Suscripción"}
                        </button>

                        {msg && (
                        <span
                            className={`px-4 py-2 rounded-lg text-sm border ${
                            msg.toLowerCase().includes("correcta") 
                                ? "bg-green-900/20 border-green-900 text-green-400" 
                                : "bg-red-900/20 border-red-900 text-red-400"
                            }`}
                        >
                            {msg}
                        </span>
                        )}
                    </div>
                </form>
            </div>
        </section>

        {/* BLOQUE 2: Cancelar desde Mercado Pago */}
        <section>
            <h2 className="text-xl font-garamond text-[#D4AF37] border-l-2 border-[#D4AF37] pl-4 mb-6">
              Opción B: Desde Mercado Pago
            </h2>
            
            <div className="text-gray-400 text-sm md:text-base space-y-4">
                <p>
                    Si no tenés el ID a mano, podés gestionar todo desde tu cuenta de MP:
                </p>
                <ol className="list-decimal pl-5 space-y-3 marker:text-[#D4AF37]">
                    <li>Ingresá a tu cuenta de <strong>Mercado Pago</strong> (Web o App).</li>
                    <li>Andá a <strong>Tu perfil &gt; Suscripciones</strong> (o <em>Pagos automáticos</em>).</li>
                    <li>Buscá la suscripción de <strong>Wulfnet</strong> o del servicio contratado.</li>
                    <li>Seleccioná <strong>"Cancelar suscripción"</strong>.</li>
                </ol>

                <div className="pt-4">
                     <a
                        href="https://www.mercadopago.com.ar/subscriptions"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white transition-colors uppercase tracking-widest text-xs font-bold border-b border-[#D4AF37] pb-1 hover:border-white"
                    >
                        Ir a mis Suscripciones en MP
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                </div>
            </div>
        </section>
      
        {/* BLOQUE: Ayuda Extra */}
        <div className="bg-[#111] border border-[#333] rounded-xl p-4 flex gap-4 items-start">
            <span className="text-2xl">💡</span>
            <div className="text-sm text-gray-500">
                <strong className="text-gray-300">Nota importante:</strong> Si cancelás desde Mercado Pago, el cambio puede demorar unos minutos en reflejarse en nuestro sistema. No te preocupes, si MP dice "Cancelado", ya no se te cobrará más.
            </div>
        </div>

      </div>
    </motion.div>
  );
}