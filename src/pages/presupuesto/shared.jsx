// src/pages/presupuesto/shared.jsx
// ─── Constantes y componentes compartidos entre las 3 páginas ────────────────

import { Link, useLocation } from "react-router-dom";

export const GOLD  = "#DEBB35";
export const FF_CG = "Cormorant Garamond, serif";
export const FF_MA = "Marcellus, serif";
export const FF_PP = "Poppins, sans-serif";
export const FF_MT = "Montserrat, sans-serif";
export const FF_CD = "Cinzel Decorative, serif";

// Definición de tabs para la navegación
export const TABS = [
  { label: "LANDING PAGE", to: "/presupuesto/landing"  },
  { label: "TIENDA ONLINE", to: "/presupuesto/tienda"  },
  { label: "ELITE",         to: "/presupuesto/elite"   },
];

// ─── LOGO SVG ────────────────────────────────────────────────────────────────
export function CompassLogo() {
  return (
    <svg viewBox="0 0 180 164" fill="none" style={{ width: 177, height: 164 }}>
      <ellipse cx="89" cy="72" rx="78" ry="64" stroke="#000" strokeWidth="1" strokeDasharray="4 3" />
      <ellipse cx="89" cy="72" rx="56" ry="46" stroke="#000" strokeWidth="0.5" strokeDasharray="4 3" />
      <circle cx="89" cy="72" r="30" stroke="#000" strokeWidth="1" />
      <line x1="89" y1="10" x2="89" y2="134" stroke="#000" strokeWidth="1" />
      <line x1="11" y1="72" x2="167" y2="72" stroke="#000" strokeWidth="1" />
      <line x1="50" y1="33" x2="128" y2="33" stroke="#000" strokeWidth="0.5" opacity="0.4" />
      <line x1="50" y1="111" x2="128" y2="111" stroke="#000" strokeWidth="0.5" opacity="0.4" />
      <polygon points="89,3 84,16 89,12 94,16"     fill={GOLD} />
      <polygon points="89,141 84,128 89,132 94,128" fill="#000" opacity="0.5" />
      <polygon points="4,72 17,67 13,72 17,77"      fill="#000" opacity="0.5" />
      <polygon points="174,72 161,67 165,72 161,77" fill="#000" opacity="0.5" />
      <circle cx="68"  cy="33" r="3"   fill={GOLD} />
      <circle cx="110" cy="33" r="3"   fill={GOLD} />
      <circle cx="89"  cy="72" r="5"   fill="#000" />
      <circle cx="89"  cy="72" r="2.5" fill={GOLD} />
    </svg>
  );
}

// ─── BADGE (dorado o blanco) ──────────────────────────────────────────────────
export function Badge({ text, gold = false }) {
  return (
    <div style={{
      background: gold ? GOLD : "#FFF",
      padding: "0 20px", height: 40,
      display: "inline-flex", alignItems: "center", alignSelf: "flex-start",
    }}>
      <span style={{ fontFamily: FF_MA, fontSize: 32, lineHeight: "40px", color: "#000" }}>
        {text}
      </span>
    </div>
  );
}

// ─── CARD DE MANTENIMIENTO ────────────────────────────────────────────────────
export function MantCard({ plan }) {
  return (
    <div style={{
      border: `${plan.border} solid ${GOLD}`,
      padding: "50px 30px",
      display: "flex", gap: 68, alignItems: "flex-end",
    }}>
      {/* Izquierda: título + specs */}
      <div style={{ flex: "0 0 730px", display: "flex", flexDirection: "column", gap: 71 }}>
        <div style={{
          background: GOLD, padding: "0 20px", height: 79,
          display: "inline-flex", alignItems: "center", alignSelf: "flex-start",
        }}>
          <span style={{ fontFamily: FF_MA, fontSize: 32, lineHeight: "50px", color: "#000" }}>
            {plan.title}
          </span>
        </div>
        <div style={{ background: "rgba(0,0,0,0.9)", padding: "44px 40px" }}>
          <ul style={{ margin: 0, padding: "0 0 0 20px" }}>
            {plan.specs.map((s, j) => (
              <li key={j} style={{ fontFamily: FF_PP, fontSize: 17, lineHeight: "1.65", color: "#FFF", marginBottom: 4 }}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Derecha: ideal para + precio */}
      <div style={{ flex: "0 0 743px", display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Badge text="Ideal para" />
          <div style={{ background: "rgba(0,0,0,0.9)", border: "1px solid #FFF", padding: "21px 30px" }}>
            <p style={{ fontFamily: FF_PP, fontSize: 17, lineHeight: "1.65", color: "#FFF", margin: 0 }}>
              {plan.ideal}
            </p>
          </div>
        </div>
        <div style={{
          background: "#FFF", height: 148,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        }}>
          <p style={{ fontFamily: FF_MA, fontSize: 32, lineHeight: "40px", textAlign: "center", color: "#000" }}>
            PRECIO<br />
            <span style={{ fontSize: 40 }}>{plan.price}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── TABS DE NAVEGACIÓN ───────────────────────────────────────────────────────
export function TabsNav() {
  const location = useLocation();

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 35, height: 66 }}>
      {TABS.map((tab) => {
        const isActive = location.pathname === tab.to;
        return (
          <Link
            key={tab.to}
            to={tab.to}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", gap: 10 }}
          >
            <span style={{
              fontFamily: FF_CG, fontWeight: 700, fontSize: 30, lineHeight: "36px",
              color: isActive ? GOLD : "#FFF", whiteSpace: "nowrap",
            }}>
              {tab.label}
            </span>
            <div style={{
              width: "100%", height: 0,
              borderTop: isActive ? `2px solid ${GOLD}` : "2px solid transparent",
            }} />
          </Link>
        );
      })}
    </div>
  );
}

// ─── LAYOUT GENERAL DE PÁGINA ─────────────────────────────────────────────────
// Recibe los datos de cada página (pg) y renderiza toda la estructura
export function PageLayout({ pg }) {
  return (
    <div style={{ background: "#FFF", fontFamily: FF_PP }}>

      {/* HERO */}
      <section style={{ paddingTop: 80 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0 0" }}>
          <CompassLogo />
          <p style={{ fontFamily: FF_CG, fontWeight: 700, fontSize: 54, lineHeight: "65px", color: "#000", marginTop: 3 }}>
            {pg.heroTitle}
          </p>
          <p style={{ fontFamily: FF_CG, fontWeight: 700, fontSize: 54, lineHeight: "65px", color: "#000", marginTop: -8 }}>
            {pg.heroSub}
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: "60px 177px" }}>
          <p style={{ fontFamily: FF_PP, fontSize: 20, lineHeight: "1.65", textAlign: "center", color: "#000", maxWidth: 1100 }}>
            {pg.intro}
          </p>
        </div>
      </section>

      {/* SECCIÓN NEGRA: tabs + plan */}
      <section style={{ background: "#000", padding: "0 80px 100px" }}>

        <TabsNav />

        <div style={{ display: "flex", gap: 68, marginTop: 40 }}>

          {/* Columna izquierda */}
          <div style={{ flex: "0 0 672px", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "44px 40px 0" }}>
              <p style={{ fontFamily: FF_CG, fontWeight: 400, fontSize: 50, lineHeight: "61px", color: GOLD }}>
                {pg.planTitle}
              </p>
            </div>
            <div style={{ background: "rgba(0,0,0,0.9)", padding: "44px 40px" }}>
              <p style={{ fontFamily: FF_PP, fontStyle: "italic", fontWeight: 500, fontSize: 20, lineHeight: "1.65", color: "#FFF" }}>
                {pg.tagline}
              </p>
            </div>
            <div style={{ background: "#FFF", height: 184, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <p style={{ fontFamily: FF_MA, fontSize: 32, lineHeight: "40px", textAlign: "center", color: "#000" }}>
                PRECIO<br /><span style={{ fontSize: 38 }}>{pg.price}</span>
              </p>
            </div>
          </div>

          {/* Columna derecha */}
          <div style={{ flex: "0 0 730px", display: "flex", flexDirection: "column", gap: 46 }}>

            {/* Incluye */}
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <Badge text="Incluye:" gold />
              <div style={{ background: "rgba(0,0,0,0.9)", border: "1px solid #FFF", padding: "44px 25px" }}>
                <ul style={{ margin: 0, padding: "0 0 0 20px" }}>
                  {pg.includes.map((item, i) => (
                    <li key={i} style={{ fontFamily: FF_PP, fontSize: 17, lineHeight: "1.65", color: "#FFF", marginBottom: 4 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Adicionales */}
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <Badge text="Adicionales" />
              <div style={{ background: "rgba(0,0,0,0.9)", border: "1px solid #FFF", padding: "44px 40px" }}>
                {pg.addons.map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: i < pg.addons.length - 1 ? 20 : 0 }}>
                    <div style={{ width: 32, height: 32, border: "1px solid #FFF", borderRadius: 5, flexShrink: 0, marginTop: 4 }} />
                    <span style={{ fontFamily: FF_PP, fontSize: 17, lineHeight: "1.65", color: "#FFF" }}>
                      {a.label} <span style={{ color: GOLD, fontWeight: 600 }}>{a.price}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Objetivo */}
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              <Badge text="Objetivo" />
              <div style={{ background: "#000", border: "1px solid #FFF", padding: "33px 40px" }}>
                <p style={{ fontFamily: FF_PP, fontSize: 17, lineHeight: "42px", color: "#FFF", margin: 0 }}>
                  {pg.objetivo}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MANTENIMIENTO */}
      <section style={{ background: "#000", padding: "0 160px 160px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 80, paddingTop: 10 }}>
          <h2 style={{ fontFamily: FF_CG, fontWeight: 700, fontSize: 54, lineHeight: "65px", color: "#FFF", letterSpacing: "0.05em" }}>
            MANTENIMIENTO
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 128 }}>
          {pg.mant.map((plan, i) => <MantCard key={i} plan={plan} />)}
        </div>
      </section>

    </div>
  );
}
