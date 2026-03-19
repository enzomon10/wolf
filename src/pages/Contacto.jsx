import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ContactPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = Object.fromEntries(data.entries());
    
    // Normalizar preferencia de contacto
    if (payload.preferencia_contacto) {
      payload.preferencia_contacto = String(payload.preferencia_contacto).toLowerCase();
    }

    try {
      const res = await fetch(
        "https://emprenderbackend.fly.dev/api/solicitudes/",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...payload,
            ingresos_mensuales: Number(payload.ingresos_mensuales || 0),
            equipo_cantidad: Number(payload.equipo_cantidad || 0),
          }),
        }
      );

      const json = await res.json().catch(() => null);

      if (!res.ok || (json && json.ok === false)) {
        console.error("STATUS:", res.status, "ERRORS:", json?.errors);
        throw new Error(
          "Datos inválidos. Revisá los campos e intentá de nuevo."
        );
      }

      form.reset();
      navigate("/recibida", { replace: true });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "No pudimos enviar el formulario.");
      setLoading(false);
    }
  };

  // Clases reutilizables para los inputs
  const inputClasses = "mt-2 w-full bg-[#111] border border-[#333] text-white p-3 rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors placeholder-gray-600";
  const labelClasses = "block text-xs uppercase tracking-widest text-gray-400 font-semibold";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-[#0a0a0a] border border-[#222] p-6 md:p-10 rounded-3xl shadow-2xl shadow-black/50"
    >
      {/* Encabezado */}
      <div className="mb-8 border-b border-[#222] pb-6">
        <h1 className="text-3xl md:text-4xl font-garamond text-white mb-3">
          Formulario de Proyecto
        </h1>
        <p className="text-gray-400 font-light text-sm md:text-base">
          Completá el siguiente formulario para que podamos evaluar tu propuesta. 
          Los campos marcados con <span className="text-[#D4AF37]">*</span> son obligatorios.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-8" noValidate>
        
        {/* Mensaje de error */}
        {errorMsg && (
          <div className="rounded-xl border border-red-900/50 bg-red-900/20 text-red-200 p-4 text-sm flex items-center gap-3">
            <span className="text-xl">⚠️</span> {errorMsg}
          </div>
        )}

        {/* SECCIÓN 1: DATOS OBLIGATORIOS */}
        <section className="space-y-6">
            <h2 className="text-xl font-garamond text-[#D4AF37] border-l-2 border-[#D4AF37] pl-4">
              Datos Generales
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className={labelClasses}>Email de contacto <span className="text-[#D4AF37]">*</span></label>
                <input name="email" type="email" required className={inputClasses} placeholder="contacto@wulfnet.ar" />
              </div>

              {/* Teléfono */}
              <div>
                <label className={labelClasses}>Teléfono / WhatsApp <span className="text-[#D4AF37]">*</span></label>
                <input name="telefono" type="tel" required className={inputClasses} placeholder="+54 9 ..." />
              </div>

              {/* Nombre del proyecto */}
              <div>
                <label className={labelClasses}>Nombre del proyecto <span className="text-[#D4AF37]">*</span></label>
                <input name="proyecto" type="text" required className={inputClasses} placeholder="Ej: Wulfnet" />
              </div>

              {/* Rubro */}
              <div>
                <label className={labelClasses}>Rubro / Actividad <span className="text-[#D4AF37]">*</span></label>
                <input name="rubro" type="text" required className={inputClasses} placeholder="Ej: Servicios, Editorial..." />
              </div>

              {/* Ubicación */}
              <div>
                <label className={labelClasses}>Ubicación <span className="text-[#D4AF37]">*</span></label>
                <input name="ubicacion" type="text" required className={inputClasses} placeholder="Ciudad, Provincia" />
              </div>

              {/* Etapa */}
              <div>
                <label className={labelClasses}>Etapa del proyecto <span className="text-[#D4AF37]">*</span></label>
                <div className="relative">
                    <select name="etapa" required className={`${inputClasses} appearance-none cursor-pointer`}>
                        <option value="" className="bg-[#111] text-gray-500">Seleccionar...</option>
                        <option value="idea" className="bg-[#111]">Idea</option>
                        <option value="mvp" className="bg-[#111]">MVP / Piloto</option>
                        <option value="operando" className="bg-[#111]">Operando</option>
                        <option value="escala" className="bg-[#111]">Escalando</option>
                    </select>
                    {/* Flechita custom */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                </div>
              </div>

              {/* Ingresos */}
              <div>
                <label className={labelClasses}>Ingresos mensuales aprox. (ARS)</label>
                <input name="ingresos_mensuales" type="number" min="0" step="1000" required className={inputClasses} placeholder="0" />
              </div>

              {/* Equipo */}
              <div>
                <label className={labelClasses}>Equipo (Cantidad) <span className="text-[#D4AF37]">*</span></label>
                <input name="equipo_cantidad" type="number" min="0" required className={inputClasses} placeholder="1" />
              </div>

              {/* Preferencia de contacto */}
              <div className="md:col-span-2 bg-[#111]/50 p-4 rounded-xl border border-[#222]">
                <label className={labelClasses}>Preferencia de contacto <span className="text-[#D4AF37]">*</span></label>
                <div className="mt-3 flex flex-wrap gap-6">
                  {["Email", "Teléfono", "WhatsApp"].map((op) => (
                    <label key={op} className="inline-flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="radio"
                          name="preferencia_contacto"
                          value={op.toLowerCase()}
                          required
                          className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-500 checked:border-[#D4AF37] checked:bg-[#D4AF37] transition-all"
                        />
                        <div className="pointer-events-none absolute h-4 w-4 rounded-full ring-1 ring-[#D4AF37]/50 opacity-0 peer-checked:opacity-100 peer-checked:animate-ping"></div>
                      </div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{op}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Objetivo */}
              <div className="md:col-span-2">
                <label className={labelClasses}>Objetivo Principal <span className="text-[#D4AF37]">*</span></label>
                <textarea
                  name="objetivo"
                  required
                  rows={4}
                  className={`${inputClasses} resize-none`}
                  placeholder="¿Qué necesitás lograr? Ej: Estrategia de marketing, desarrollo web..."
                />
              </div>
            </div>
        </section>

        {/* SECCIÓN 2: REDES SOCIALES */}
        <section className="space-y-6 pt-6 border-t border-[#222]">
          <h2 className="text-xl font-garamond text-[#D4AF37] border-l-2 border-[#D4AF37] pl-4">
             Presencia Online (Opcional)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "sitio_web", label: "Sitio web", icon: "🌐" },
              { name: "instagram", label: "Instagram", icon: "📸" },
              { name: "facebook", label: "Facebook", icon: "fb" },
              { name: "tiktok", label: "TikTok", icon: "🎵" },
              { name: "youtube", label: "YouTube", icon: "▶️" },
              { name: "linkedin", label: "LinkedIn", icon: "in" },
            ].map((f) => (
              <div key={f.name}>
                <label className="text-xs text-gray-500 mb-1 block">{f.label}</label>
                <div className="relative">
                    <span className="absolute left-3 top-3.5 text-xs grayscale opacity-50">{f.icon}</span>
                    <input
                    name={f.name}
                    type="url"
                    className={`${inputClasses} pl-8`} // Padding left extra para el icono
                    placeholder="https://..."
                    />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACCIONES */}
        <div className="flex items-center justify-between pt-6 border-t border-[#222]">
          <button
            type="reset"
            disabled={loading}
            className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
          >
            Limpiar Formulario
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-white transition-colors duration-300 uppercase tracking-widest text-xs md:text-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando..." : "Enviar Solicitud"}
          </button>
        </div>

      </form>
    </motion.div>
  );
}