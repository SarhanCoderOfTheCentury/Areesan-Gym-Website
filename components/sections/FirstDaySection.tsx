"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { firstVisit } from "@/lib/content";
import { AnimatedButton, Icon, SectionHeading } from "../ui/Primitives";
const MotionPlayer = dynamic(() => import("../remotion/MotionPlayer"), {
  ssr: false,
});
export default function FirstDaySection({ onBook }: { onBook: () => void }) {
  const ref = useRef<HTMLDivElement>(null),
    inView = useInView(ref, { once: true, margin: "100px" });
  return (
    <section id="first-visit" className="section first-day-section">
      <div className="container">
        <div className="first-day-heading">
          <SectionHeading
            number="06"
            eyebrow="YOUR FIRST DAY, MADE SIMPLE"
            title={
              <>
                Walk in as you are.
                <br />
                Walk out <em>with direction.</em>
              </>
            }
            text="New to the gym? You don’t have to have it all figured out."
          />
          <AnimatedButton onClick={onBook} variant="outline">
            Take the first step
          </AnimatedButton>
        </div>
        <div className="visit-video" ref={ref}>
          {inView && (
            <MotionPlayer
              kind="visit"
              autoPlay
              label="An animated guide to your first visit"
            />
          )}
        </div>
        <ol className="visit-steps">
          {firstVisit.map((s, i) => (
            <li key={s.title}>
              <span className="visit-step-number">
                0{i + 1}
                <Icon name={s.icon} size={19} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="section-note">
          An introduction to the proposed first-visit experience. Confirm your
          assessment and session with the team.
        </p>
      </div>
    </section>
  );
}
