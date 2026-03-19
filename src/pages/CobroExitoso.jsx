// src/pages/CobroExitoso.jsx
import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";

export default function CobroExitoso() {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [statusText, setStatusText] = useState("Verificando suscripción…");
  const [sub, setSub] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // 1) intentar leer de querystring (por si MP lo manda)
    //    ej: .../pagos/estado?preapproval_id=xxxx
    const fromQuery = search.get("preapproval_id");

    // 2) si no vino, leer del localStorage (guardado antes de redirigir a MP)
    const fromStorage = localStorage.getItem("mp_preapproval_id") || "";

    const id = fromQuery || fromStorage;

    if (!id) {
      setLoading(false);
      setError("No encontramos tu suscripción. Si ya aprobaste, volvé a la página de Pagos.");
      return;
    }

    async function fetchStatus() {
      try {
        const r = await fetch(`/api/mp/subscription/${encodeURIComponent(id)}/`);
        const j = await r.json();
        if (!r.ok || !j?.preapproval_id) throw new Error(j?.error || "No se pudo verificar.");
        setSub(j);
        setStatusText(`Estado: ${j.status}`);
        // si todo salió bien y ya no necesitás el id, podés limpiarlo:
        localStorage.removeItem("mp_preapproval_id");
      } catch (e) {
        setError(e.message || "Error al verificar tu suscripción.");
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();
  }, [search]);

  const copiarId = async () => {
    if (!sub?.preapproval_id) return;
    await navigator.clipboard.writeText(sub.preapproval_id);
    setStatusText("ID copiado al portapapeles ✔");
    setTimeout(() => setStatusText(`Estado: ${sub.status}`), 1500);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          ¡Gracias! {loading ? "" : sub ? "Suscripción activada" : ""}
        </h1>

        {loading && (
          <p className="text-gray-600">Verificando suscripción…</p>
        )}

        {!loading && error && (
          <>
            <p className="text-red-700 mb-4">{error}</p>
            <div className="flex items-center justify-center gap-3">
              <Link
                to="/pagos"
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Volver a Pagos
              </Link>
            </div>
          </>
        )}

        {!loading && sub && (
          <>
            <p className="text-gray-600 mb-4">
              {statusText}
              <br />
              Monto: <strong>{sub.amount} {sub.currency_id}</strong>
              <br />
              Razón: <strong>{sub.reason}</strong>
            </p>

            <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 mb-4">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate">
                  ID de suscripción:{" "}
                  <code className="text-gray-900 break-all">{sub.preapproval_id}</code>
                </span>
                <button
                  onClick={copiarId}
                  className="shrink-0 px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
                >
                  Copiar
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Ir a gestionar/cancelar dentro de tu app */}
              <Link
                to="/cancelar"
                className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-700"
              >
                Gestionar / Cancelar
              </Link>

              {/* Ir a Home o a Contacto si querés */}
              <Link
                to="/contacto"
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Contacto
              </Link>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Si no ves reflejado el estado correcto, puede demorar unos minutos
              por las notificaciones. Actualizá esta página más tarde.
            </p>
          </>
        )}
      </div>
    </div>
  );
}