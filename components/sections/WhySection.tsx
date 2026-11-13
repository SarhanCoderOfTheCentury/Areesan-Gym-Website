"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { pillars } from "@/lib/content";
import SceneViewport from "../three/SceneViewport";
import { Icon, SectionHeading, AnimatedButton } from "../ui/Primitives";
export default function WhySection() {
  const [active, setActive] = useState(0);
  return (
    <section id="why" className="section why-section">
      <div className="container why-layout">
        <div>
          <SectionHeading
            number="02"
            eyebrow="THE AREESAN APPROACH"
            title={
              <>
                More than a place
                <br />
                to <em>work out.</em>
              </>
            }
            text="A complete approach to showing up for yourself."
          />
          <div
            className="pillar-list"
            role="group"
            aria-label="Explore membership benefits"
          >
            {pillars.map((p, i) => (
              <button
                key={p.title}
                className={active === i ? "active" : ""}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
              >
                <span className="pillar-number">0{i + 1}</span>
                <Icon name={p.icon} />
                <span>{p.title}</span>
                <ArrowUpRight size={18} />
              </button>
            ))}
          </div>
          <AnimatedButton href="#membership" variant="text">
            Find your membership
          </AnimatedButton>
        </div>
        <div className="why-visual">
          <SceneViewport
            id="benefit-ring"
            kind="ring"
            selected={active}
            onSelect={setActive}
            label={`Five-part membership ring: ${pillars[active].title}`}
          />
          <div className="pillar-detail" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <span className="mini-label">A STRONGER CIRCLE OF SUPPORT</span>
                <h3>{pillars[active].title}</h3>
                <p>{pillars[active].detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
