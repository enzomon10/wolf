import React, { useMemo, useRef, useState, useEffect } from "react";

export function VikingRuneFrame({ cx, cy, rOuter, rInner, rKnot, isMobile }) {
  const studs = useMemo(() => {
    const n = 8;
    return Array.from({ length: n }, (_, i) => {
      const ang = (-90 + (360 / n) * i) * (Math.PI / 180);
      return {
        x: cx + Math.cos(ang) * rKnot,
        y: cy + Math.sin(ang) * rKnot,
      };
    });
  }, [cx, cy, rKnot]);

  // pequeña curva “nudo” (una especie de ∞) repetida alrededor
  const knotPath = useMemo(() => {
    // un lazo simple centrado en 0,0
    // lo escalamos con transform y lo rotamos con rotate(...)
    return `
      M -18 0
      C -18 -12, -6 -18, 0 -10
      C 6 -2, 18 -6, 18 0
      C 18 12, 6 18, 0 10
      C -6 2, -18 6, -18 0
      Z
    `;
  }, []);

  const knotCount = isMobile ? 18 : 22;
  const notchCount = isMobile ? 48 : 64;

  return (
    <g>
      {/* ==== AROS PRINCIPALES (metal) ==== */}
      <circle
        cx={cx}
        cy={cy}
        r={rOuter}
        stroke="#D4AF37"
        strokeWidth={isMobile ? 2.1 : 1.6}
        opacity="0.42"
      />
      <circle
        cx={cx}
        cy={cy}
        r={rOuter - (isMobile ? 10 : 12)}
        stroke="#D4AF37"
        strokeWidth={isMobile ? 1.1 : 0.9}
        opacity="0.22"
      />
      <circle
        cx={cx}
        cy={cy}
        r={rInner}
        stroke="#D4AF37"
        strokeWidth={isMobile ? 1.0 : 0.8}
        opacity="0.18"
      />

      {/* ==== “GRABADO” / MUESCAS FINAS ==== */}
      {Array.from({ length: notchCount }, (_, i) => {
        const ang = (i * 360) / notchCount;
        const len = i % 4 === 0 ? (isMobile ? 9 : 10) : (isMobile ? 6 : 7);
        return (
          <line
            key={`notch-${i}`}
            x1={cx}
            y1={cy - rOuter + (isMobile ? 3 : 4)}
            x2={cx}
            y2={cy - rOuter + (isMobile ? 3 : 4) + len}
            stroke="#D4AF37"
            strokeWidth={i % 4 === 0 ? 0.9 : 0.7}
            opacity={i % 4 === 0 ? 0.22 : 0.14}
            transform={`rotate(${ang} ${cx} ${cy})`}
          />
        );
      })}

      {/* ==== KNOTWORK: lazos alrededor ==== */}
      <g opacity="0.16">
        {Array.from({ length: knotCount }, (_, i) => {
          const ang = (-90 + (360 / knotCount) * i);
          return (
            <path
              key={`knot-${i}`}
              d={knotPath}
              fill="none"
              stroke="#D4AF37"
              strokeWidth={0.9}
              strokeLinejoin="round"
              strokeLinecap="round"
              transform={`translate(${cx} ${cy}) rotate(${ang}) translate(0 ${-rKnot}) scale(${isMobile ? 0.82 : 0.9})`}
            />
          );
        })}
      </g>

      {/* ==== REMACHES / STUDS ==== */}
      <g>
        {studs.map((p, i) => (
          <g key={`stud-${i}`}>
            <circle
              cx={p.x}
              cy={p.y}
              r={isMobile ? 4.2 : 4.8}
              fill="rgba(212,175,55,0.18)"
              stroke="#D4AF37"
              strokeWidth="1"
              opacity="0.65"
            />
            <circle
              cx={p.x}
              cy={p.y}
              r={isMobile ? 1.6 : 1.8}
              fill="#D4AF37"
              opacity="0.55"
            />
          </g>
        ))}
      </g>

      {/* ==== SOMBRA SUAVE (parece metal) ==== */}
      <circle
        cx={cx}
        cy={cy}
        r={rOuter + (isMobile ? 1 : 2)}
        stroke="rgba(0,0,0,0.55)"
        strokeWidth={isMobile ? 3.0 : 3.8}
        opacity="0.12"
      />
    </g>
  );
}