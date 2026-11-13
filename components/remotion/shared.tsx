import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
export type MotionInput = {
  programId?: string;
  goalId?: string;
  planId?: string;
  testimonialIndex?: number;
};
export const palette = {
  gold: "#e7c574",
  pale: "#f5f2e8",
  muted: "#9fa7a9",
  black: "#0c1115",
};
export function useEnter(delay = 0) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    config: { damping: 22, stiffness: 100 },
  });
}
export function MotionBackground({ children }: { children: React.ReactNode }) {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      aria-hidden="true"
      style={{
        background: palette.black,
        color: palette.pale,
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 75% 30%, #96732b22, transparent 65%)",
        }}
      />
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 562"
        style={{ position: "absolute", opacity: 0.22 }}
      >
        <defs>
          <pattern
            id="motion-grid"
            width="65"
            height="65"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 65 0 L 0 0 0 65"
              fill="none"
              stroke="#c4ba96"
              strokeWidth=".5"
            />
          </pattern>
        </defs>
        <rect width="1000" height="562" fill="url(#motion-grid)" />
        <circle
          cx="850"
          cy="190"
          r={120 + Math.sin(frame / 40) * 8}
          fill="none"
          stroke={palette.gold}
        />
        <circle cx="850" cy="190" r="155" fill="none" stroke={palette.gold} />
      </svg>
      {children}
    </AbsoluteFill>
  );
}
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        color: palette.gold,
        letterSpacing: 4,
        fontSize: 16,
        textTransform: "uppercase",
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}
export function VideoEmblem({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 49 47">
      <path
        d="M24.5 2 48 44 24.5 32 1 44Zm0 13L12 36l12.5-12L37 36Z"
        fill={palette.gold}
        fillRule="evenodd"
      />
    </svg>
  );
}
export function ProgressLine({
  start = 0,
  end = 150,
}: {
  start?: number;
  end?: number;
}) {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: `${interpolate(frame, [start, end], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
        height: 3,
        background: palette.gold,
      }}
    />
  );
}
