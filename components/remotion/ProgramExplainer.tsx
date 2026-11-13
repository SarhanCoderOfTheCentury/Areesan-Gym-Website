import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { getProgram } from "../../lib/content";
import {
  MotionBackground,
  Label,
  palette,
  useEnter,
  ProgressLine,
  type MotionInput,
} from "./shared";
export default function ProgramExplainer({
  programId = "muscle-building",
}: MotionInput) {
  const p = getProgram(programId);
  const f = useCurrentFrame();
  const enter = useEnter(5);
  return (
    <MotionBackground>
      <div
        style={{
          padding: "55px 65px",
          transform: `translateY(${(1 - enter) * 30}px)`,
          opacity: enter,
        }}
      >
        <Label>YOUR PROGRAM / {p.number}</Label>
        <h1
          style={{
            fontSize: 61,
            letterSpacing: -2.5,
            maxWidth: 740,
            margin: "25px 0 18px",
            lineHeight: 1.05,
          }}
        >
          {p.name}
        </h1>
        <p
          style={{
            fontSize: 24,
            color: palette.muted,
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          {p.summary}
        </p>
        <div style={{ display: "flex", gap: 45, marginTop: 30 }}>
          {[
            [p.level, "YOUR START"],
            [p.frequency, "SUGGESTED RHYTHM"],
            [p.duration, "SESSION LENGTH"],
          ].map(([a, b], i) => (
            <div
              key={b}
              style={{
                opacity: interpolate(f, [20 + i * 15, 40 + i * 15], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div style={{ color: palette.gold, fontSize: 24 }}>{a}</div>
              <div
                style={{
                  color: palette.muted,
                  fontSize: 12,
                  letterSpacing: 2,
                  marginTop: 12,
                }}
              >
                {b}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 38 }}>
          {p.focus.map((x) => (
            <span
              key={x}
              style={{
                border: "1px solid #50482f",
                padding: "12px 18px",
                fontSize: 16,
                borderRadius: 30,
              }}
            >
              {x}
            </span>
          ))}
        </div>
      </div>
      <ProgressLine end={210} />
    </MotionBackground>
  );
}
