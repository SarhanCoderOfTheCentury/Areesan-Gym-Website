import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import BrandFrame from "./BrandFrame";
export default function BrandIntroComposition() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <BrandFrame frame={frame} />
    </AbsoluteFill>
  );
}
