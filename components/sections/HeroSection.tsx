"use client";
import { Play, ArrowDown, ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { brandFacts } from "@/lib/content";
import SceneViewport, { GraphicsControl } from "../three/SceneViewport";
import { AnimatedButton } from "../ui/Primitives";
export default function HeroSection({
  onBook,
  onWatch,
}: {
  onBook: () => void;
  onWatch: () => void;
}) {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0),
    pointerY = useMotionValue(0),
    x = useSpring(pointerX, { stiffness: 80, damping: 25 }),
    y = useSpring(pointerY, { stiffness: 80, damping: 25 });
  return (
    <section
      id="home"
      className="hero"
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        pointerX.set((e.clientX / r.width - 0.5) * 5);
        pointerY.set(((e.clientY - r.top) / r.height - 0.5) * 4);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="container hero-layout">
        <motion.div
          className="hero-copy"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="eyebrow">
            <span className="status-light" />
            PAKISTAN’S PREMIUM FITNESS EXPERIENCE
          </div>
          <motion.h1 style={reduced ? undefined : { x, y }}>
            Transform
            <br />
            your body
            <br />
            <span className="hero-last">
              at <em>Areesan.</em>
            </span>
          </motion.h1>
          <p>
            Strength is personal. Find your rhythm, build your confidence, and
            make your next chapter an Areesan chapter.
          </p>
          <div className="hero-actions">
            <AnimatedButton onClick={onBook}>Join Areesan</AnimatedButton>
            <AnimatedButton href="#goals" variant="outline">
              Find my program
            </AnimatedButton>
          </div>
          <button className="watch-link" onClick={onWatch}>
            <span className="play-disc">
              <Play size={12} fill="currentColor" />
            </span>
            <span>
              Feel the Areesan experience<small>AN 8-SECOND INTRODUCTION</small>
            </span>
            <ArrowUpRight size={17} />
          </button>
          <GraphicsControl />
        </motion.div>
        <div className="hero-visual">
          <SceneViewport
            id="brand-scene"
            kind="brand"
            label="Sculpted gold Areesan emblem surrounded by orbiting metallic rings"
          />
          <span className="hero-orbit-label label-top">
            <i />
            DESIGNED FOR YOUR NEXT CHAPTER
          </span>
          <span className="hero-orbit-label label-bottom">
            STRENGTH. BALANCE. PROGRESS.<span>01 — THE AREESAN STANDARD</span>
          </span>
          <div className="hero-annotation">
            <span>YOUR POTENTIAL</span>
            <div className="annotation-line" />
            <b>Limitless.</b>
          </div>
        </div>
      </div>
      <div className="container hero-footer">
        <a href="#goals" className="scroll-cue">
          <span>
            <ArrowDown size={17} />
          </span>
          DISCOVER YOUR STRONGER SELF
        </a>
        <div className="hero-facts">
          {brandFacts.map((x) => (
            <div key={x.label}>
              <strong>{x.value}</strong>
              <span>{x.label}</span>
            </div>
          ))}
        </div>
        <span className="hero-location">
          DHA PHASE 4<br />
          <b>KARACHI, PAKISTAN</b>
        </span>
      </div>
    </section>
  );
}
