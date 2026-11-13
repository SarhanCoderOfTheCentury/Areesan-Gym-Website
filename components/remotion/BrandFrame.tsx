import React from "react";
import { interpolate } from "remotion";
import { brandFacts } from "../../lib/content";
// Pure SVG frame shared by the Remotion composition and the CPU video renderer.
export default function BrandFrame({ frame: f }: { frame: number }) {
  const word =
    f < 65 ? "DISCIPLINE." : f < 120 ? "STRENGTH." : "TRANSFORMATION.";
  const start = f < 65 ? 0 : f < 120 ? 65 : 120;
  const opacity = interpolate(f - start, [0, 12], [0.2, 1], {
    extrapolateRight: "clamp",
  });
  const y = interpolate(f - start, [0, 15], [18, 0], {
    extrapolateRight: "clamp",
  });
  const facts = interpolate(f, [145, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cta = interpolate(f, [180, 205], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1280"
      height="720"
      viewBox="0 0 1280 720"
    >
      <defs>
        <radialGradient id="glow">
          <stop stopColor="#987b36" stopOpacity=".2" />
          <stop offset="1" stopColor="#0c1115" stopOpacity="0" />
        </radialGradient>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path
            d="M80 0H0V80"
            fill="none"
            stroke="#a99b6d"
            strokeOpacity=".12"
            strokeWidth=".6"
          />
        </pattern>
        <linearGradient id="gold">
          <stop stopColor="#fff0ba" />
          <stop offset=".5" stopColor="#c2a054" />
          <stop offset="1" stopColor="#f1d486" />
        </linearGradient>
      </defs>
      <rect width="1280" height="720" fill="#0c1115" />
      <rect width="1280" height="720" fill="url(#grid)" />
      <ellipse cx="640" cy="320" rx="560" ry="400" fill="url(#glow)" />
      <g fill="none" stroke="#b89a50" opacity=".15">
        <ellipse
          cx="640"
          cy="292"
          rx="460"
          ry="150"
          transform={`rotate(${-18 + f * 0.05} 640 292)`}
        />
        <ellipse
          cx="640"
          cy="292"
          rx="450"
          ry="220"
          transform={`rotate(${20 - f * 0.04} 640 292)`}
        />
      </g>
      <g transform="translate(573 106) scale(2.7)">
        <path
          d="M24.5 2 48 44 24.5 32 1 44 24.5 2M24.5 15 12 36l12.5-12L37 36Z"
          fill="none"
          stroke="url(#gold)"
          strokeWidth=".65"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={interpolate(f, [0, 55], [1, 0], {
            extrapolateRight: "clamp",
          })}
        />
      </g>
      <text
        x="640"
        y="285"
        textAnchor="middle"
        fontFamily="Arial,sans-serif"
        fontSize="15"
        letterSpacing="5"
        fill="#d7bb73"
      >
        THE AREESAN EXPERIENCE
      </text>
      <text
        x="640"
        y={386 + y}
        textAnchor="middle"
        fontFamily="Arial,sans-serif"
        fontWeight="600"
        fontSize={word.length > 12 ? 67 : 92}
        letterSpacing="-3"
        fill="#f4f1e6"
        opacity={opacity}
      >
        {word}
      </text>
      <g opacity={facts}>
        {brandFacts.map((fact, i) => (
          <g key={fact.label} transform={`translate(${420 + i * 220} 470)`}>
            <text
              textAnchor="middle"
              fontFamily="Arial,sans-serif"
              fill="#e4c575"
              fontSize="36"
            >
              {fact.value}
            </text>
            <text
              y="30"
              textAnchor="middle"
              fontFamily="Arial,sans-serif"
              fill="#a2aaab"
              fontSize="14"
            >
              {fact.label}
            </text>
          </g>
        ))}
      </g>
      <g opacity={cta}>
        <rect x="478" y="566" width="324" height="49" rx="3" fill="#dfc17b" />
        <text
          x="640"
          y="597"
          textAnchor="middle"
          fontFamily="Arial,sans-serif"
          fontSize="13"
          letterSpacing="2"
          fill="#151b15"
        >
          MAKE YOUR FIRST MOVE
        </text>
      </g>
      <text
        x="640"
        y="674"
        textAnchor="middle"
        fontFamily="Arial,sans-serif"
        fontSize="9"
        letterSpacing="3"
        fill="#7b8888"
      >
        STRENGTH IS PERSONAL.
      </text>
    </svg>
  );
}
