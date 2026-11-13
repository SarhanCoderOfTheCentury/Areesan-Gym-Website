import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { firstVisit } from "../../lib/content";
import {
  MotionBackground,
  Label,
  palette,
  VideoEmblem,
  ProgressLine,
} from "./shared";
export default function FirstVisitJourney() {
  const f = useCurrentFrame();
  const current = Math.min(4, Math.floor(f / 75));
  return (
    <MotionBackground>
      <div style={{ padding: 55 }}>
        <Label>YOUR FIRST DAY AT AREESAN</Label>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 48,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 40,
              right: 40,
              top: 29,
              height: 1,
              background: "#47412f",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 40,
              top: 29,
              height: 2,
              width: `${interpolate(f, [0, 340], [0, 85], { extrapolateRight: "clamp" })}%`,
              background: palette.gold,
            }}
          />
          {firstVisit.map((x, i) => (
            <div
              key={x.title}
              style={{
                zIndex: 1,
                width: 150,
                textAlign: "center",
                opacity: current >= i ? 1 : 0.35,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  background: current === i ? palette.gold : "#161b1d",
                  color: current === i ? "#17180e" : palette.gold,
                  border: "1px solid #827044",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 22,
                  margin: "0 auto 18px",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontSize: 18, lineHeight: 1.4 }}>{x.title}</div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
            marginTop: 55,
          }}
        >
          <VideoEmblem size={92} />
          <div>
            <h2 style={{ fontSize: 42, letterSpacing: -1, margin: "0 0 13px" }}>
              {firstVisit[current].title}
            </h2>
            <p
              style={{
                fontSize: 22,
                color: palette.muted,
                margin: 0,
                maxWidth: 600,
              }}
            >
              {firstVisit[current].text}
            </p>
          </div>
        </div>
      </div>
      <ProgressLine end={374} />
    </MotionBackground>
  );
}
