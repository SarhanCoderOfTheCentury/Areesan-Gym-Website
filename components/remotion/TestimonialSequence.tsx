import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { testimonials } from "../../lib/content";
import {
  MotionBackground,
  Label,
  palette,
  useEnter,
  type MotionInput,
} from "./shared";
export default function TestimonialSequence({
  testimonialIndex = 0,
}: MotionInput) {
  const t = testimonials[testimonialIndex];
  const f = useCurrentFrame();
  const enter = useEnter();
  return (
    <MotionBackground>
      <div
        style={{
          padding: "45px 60px",
          opacity: enter,
          transform: `translateY(${(1 - enter) * 15}px)`,
        }}
      >
        <Label>WORDS THAT MOVE US</Label>
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 100,
            color: palette.gold,
            height: 78,
            marginTop: 12,
          }}
        >
          “
        </div>
        <h2
          style={{
            fontSize: 47,
            letterSpacing: -1.3,
            lineHeight: 1.19,
            maxWidth: 820,
            margin: "0 0 25px",
          }}
        >
          {t.highlight}
        </h2>
        <div
          style={{
            width: `${interpolate(f, [10, 75], [0, 92], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
            height: 1,
            background: "#a58a4d",
            marginBottom: 30,
          }}
        />
        <p
          style={{
            fontSize: 22,
            lineHeight: 1.55,
            color: palette.muted,
            maxWidth: 840,
            margin: 0,
          }}
        >
          {t.quote}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 25,
          }}
        >
          <div
            style={{
              border: "1px solid #847143",
              borderRadius: 50,
              width: 55,
              height: 55,
              display: "grid",
              placeItems: "center",
              color: palette.gold,
              fontSize: 18,
            }}
          >
            {t.initials}
          </div>
          <div>
            <strong style={{ fontSize: 22 }}>{t.name}</strong>
            <div style={{ fontSize: 16, color: palette.muted, marginTop: 6 }}>
              {t.city} · {t.program}
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              color: palette.gold,
              fontSize: 25,
              letterSpacing: 4,
            }}
          >
            ★★★★★
          </div>
        </div>
      </div>
    </MotionBackground>
  );
}
