"use client";
import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useRef, type ComponentType } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import ProgramExplainer from "./ProgramExplainer";
import FirstVisitJourney from "./FirstVisitJourney";
import TestimonialSequence from "./TestimonialSequence";
import RecommendationResult from "./RecommendationResult";
import type { MotionInput } from "./shared";
import { usePageVisible } from "@/lib/usePageVisible";
const registry: Record<
  string,
  { component: ComponentType<MotionInput>; frames: number }
> = {
  program: { component: ProgramExplainer, frames: 240 },
  visit: { component: FirstVisitJourney, frames: 375 },
  testimonial: { component: TestimonialSequence, frames: 210 },
  recommendation: { component: RecommendationResult, frames: 180 },
};
export default function MotionPlayer({
  kind,
  input = {},
  paused = false,
  controls = true,
  autoPlay = false,
  label,
}: {
  kind: keyof typeof registry;
  input?: MotionInput;
  paused?: boolean;
  controls?: boolean;
  autoPlay?: boolean;
  label: string;
}) {
  const ref = useRef<PlayerRef>(null);
  const container = useRef<HTMLDivElement>(null);
  const inView = useInView(container, { amount: 0.1 });
  const pageVisible = usePageVisible();
  const reduced = useReducedMotion();
  const scene = registry[kind];
  const id = JSON.stringify(input);
  useEffect(() => {
    if (reduced) {
      ref.current?.pause();
      ref.current?.seekTo(scene.frames - 1);
    } else if (inView && pageVisible && autoPlay && !paused)
      ref.current?.play();
    else ref.current?.pause();
  }, [inView, pageVisible, autoPlay, paused, reduced, scene.frames, id]);
  useEffect(() => {
    if (!reduced) ref.current?.seekTo(0);
  }, [id, reduced]);
  return (
    <div
      ref={container}
      className={`motion-player motion-${kind}`}
      role="group"
      aria-label={label}
    >
      <Player
        ref={ref}
        component={scene.component}
        inputProps={input}
        durationInFrames={scene.frames}
        compositionWidth={1000}
        compositionHeight={562}
        fps={30}
        style={{ width: "100%" }}
        controls={controls}
        autoPlay={false}
        initiallyMuted
        numberOfSharedAudioTags={0}
        loop={autoPlay && kind !== "recommendation"}
        clickToPlay={!reduced}
        doubleClickToFullscreen={false}
        spaceKeyToPlayOrPause={false}
        acknowledgeRemotionLicense
      />
    </div>
  );
}
