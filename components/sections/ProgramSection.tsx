"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  motion,
} from "framer-motion";
import { ArrowUpRight, Play, Clock3 } from "lucide-react";
import { programs, journey, type Program } from "@/lib/content";
import { getPhotograph, programPhotoIds, photoSource } from "@/lib/photography";
import SceneViewport from "../three/SceneViewport";
import { AnimatedButton, Icon, SectionHeading } from "../ui/Primitives";
export default function ProgramSection({
  onExplore,
  onBook,
}: {
  onExplore: (p: Program) => void;
  onBook: () => void;
}) {
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start .85", "end .25"],
  });
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [manual, setManual] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!manual) {
      setProgress(v);
      setStep(Math.min(3, Math.floor(v * 4)));
    }
  });
  useEffect(() => {
    if (!manual) return;
    const t = setTimeout(() => setManual(false), 8000);
    return () => clearTimeout(t);
  }, [manual]);
  return (
    <section id="programs" className="section programs-section">
      <div className="container">
        <div className="heading-row">
          <SectionHeading
            number="03"
            eyebrow="PURPOSE IN EVERY SESSION"
            title={
              <>
                Find what
                <br />
                makes you <em>stronger.</em>
              </>
            }
            text="Five training directions. One starting point: you."
          />
          <p className="side-note">
            Choose a focus.
            <br />
            Explore the approach.
            <br />
            <span>Make your first move.</span>
          </p>
        </div>
        <div className="program-editorial">
          {programs.map((p, i) => (
            <motion.button
              key={p.id}
              className={`program-tile program-${i}`}
              onClick={() => onExplore(p)}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="program-photograph">
                <Image
                  src={photoSource(programPhotoIds[p.id])}
                  alt={getPhotograph(programPhotoIds[p.id]).alt}
                  fill
                  sizes="(max-width:760px) 50vw, 33vw"
                  loading="lazy"
                />
                <span className="program-photograph-shade" />
              </div>
              <div className="program-top">
                <span>{p.number} / PROGRAM</span>
                <ArrowUpRight size={21} />
              </div>
              <div className="program-art" aria-hidden="true">
                <div className="art-ring ring-one" />
                <div className="art-ring ring-two" />
                <div className="program-art-icon">
                  <Icon name={p.icon} size={i === 0 ? 64 : 38} />
                </div>
              </div>
              <div className="program-body">
                <span className="mini-label">{p.label}</span>
                <h3>{p.name}</h3>
                <p>{p.summary}</p>
                <div className="program-meta">
                  <span>{p.level}</span>
                  <span>{p.frequency}</span>
                </div>
                <span className="explore-program">
                  <Play size={12} fill="currentColor" /> Explore program{" "}
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
        <div className="journey-block" ref={target}>
          <div className="journey-heading">
            <span className="mini-label">THE PROCESS</span>
            <h3>
              Small steps.
              <br />
              <em>Real direction.</em>
            </h3>
            <p>From your starting point to your next milestone.</p>
            <AnimatedButton variant="text" onClick={onBook}>
              Start your journey
            </AnimatedButton>
          </div>
          <div className="journey-explorer">
            <SceneViewport
              id="journey-scene"
              kind="journey"
              progress={progress}
              label={`Training journey checkpoint ${step + 1}: ${journey[step].title}`}
            />
            <div
              className="journey-tabs"
              role="tablist"
              aria-label="Your training journey"
              onKeyDown={(e) => {
                const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
                if (!keys.includes(e.key)) return;
                e.preventDefault();
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 3
                      : (step + (e.key === "ArrowRight" ? 1 : 3)) % 4;
                setManual(true);
                setStep(next);
                setProgress(next / 3);
                e.currentTarget.querySelectorAll("button")[next]?.focus();
              }}
            >
              {journey.map((j, i) => (
                <button
                  key={j.title}
                  role="tab"
                  id={`journey-tab-${i}`}
                  aria-controls="journey-description"
                  aria-selected={step === i}
                  tabIndex={step === i ? 0 : -1}
                  onClick={() => {
                    setManual(true);
                    setStep(i);
                    setProgress(i / 3);
                  }}
                >
                  <span>0{i + 1}</span>
                  {j.title}
                </button>
              ))}
            </div>
            <div
              id="journey-description"
              role="tabpanel"
              aria-labelledby={`journey-tab-${step}`}
              className="journey-description"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="mini-label">{journey[step].label}</span>
                  <p>{journey[step].text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <p className="program-disclaimer">
          <Clock3 size={13} /> Frequencies and session lengths are suggested
          starting points. Discuss your needs before training.
        </p>
      </div>
    </section>
  );
}
