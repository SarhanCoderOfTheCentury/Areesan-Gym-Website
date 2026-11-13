"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Pause, Play } from "lucide-react";
import { testimonials } from "@/lib/content";
import { SectionHeading } from "../ui/Primitives";
const MotionPlayer = dynamic(() => import("../remotion/MotionPlayer"), {
  ssr: false,
  loading: () => (
    <div className="motion-placeholder">A little inspiration, on its way.</div>
  ),
});
export default function TestimonialSection() {
  const [index, setIndex] = useState(0),
    [paused, setPaused] = useState(false),
    [hovered, setHovered] = useState(false),
    [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null),
    inView = useInView(ref, { amount: 0.25 }),
    reduced = useReducedMotion();
  const item = testimonials[index];
  useEffect(() => {
    if (!inView || paused || hovered || focused || reduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % 3), 7000);
    return () => clearInterval(t);
  }, [inView, paused, hovered, focused, reduced, index]);
  return (
    <section id="stories" className="section testimonials-section">
      <div className="container">
        <div className="heading-row">
          <SectionHeading
            number="05"
            eyebrow="WORDS THAT MOVE US"
            title={
              <>
                A stronger feeling.
                <br />A different <em>perspective.</em>
              </>
            }
          />
          <p className="side-note">
            A glimpse of the experience
            <br />
            we’re building together.
          </p>
        </div>
        <div className="testimonials-layout" ref={ref}>
          <div
            className="quote-player"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={() => setFocused(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node))
                setFocused(false);
            }}
          >
            {inView && (
              <MotionPlayer
                kind="testimonial"
                input={{ testimonialIndex: index }}
                autoPlay
                controls={false}
                paused={paused || hovered || focused}
                label={`Sample testimonial from ${item.name}`}
              />
            )}
            <blockquote className="sr-only" aria-live="polite">
              {item.quote} — {item.name}, {item.city}. Sample concept
              testimonial.
            </blockquote>
            <div className="quote-controls">
              <button
                className="circle-button"
                onClick={() => setIndex((index + 2) % 3)}
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={17} />
              </button>
              <div
                className="quote-dots"
                role="group"
                aria-label="Choose testimonial"
              >
                {testimonials.map((x, i) => (
                  <button
                    key={x.name}
                    className={i === index ? "active" : ""}
                    aria-label={`Show ${x.name}'s testimonial`}
                    aria-pressed={i === index}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
              <button
                className="circle-button"
                onClick={() => setIndex((index + 1) % 3)}
                aria-label="Next testimonial"
              >
                <ArrowRight size={17} />
              </button>
              <button
                className="circle-button pause-button"
                aria-label={
                  paused
                    ? "Play testimonial rotation"
                    : "Pause testimonial rotation"
                }
                aria-pressed={paused}
                onClick={() => setPaused(!paused)}
              >
                {paused ? <Play size={15} /> : <Pause size={15} />}
              </button>
            </div>
          </div>
          <div className="story-index">
            {testimonials.map((x, i) => (
              <button
                key={x.name}
                className={index === i ? "active" : ""}
                aria-pressed={index === i}
                onClick={() => setIndex(i)}
              >
                <span className="initial-avatar">{x.initials}</span>
                <span>
                  <strong>{x.name}</strong>
                  <small>
                    <MapPin size={11} />
                    {x.city}
                  </small>
                  <em>{x.program}</em>
                </span>
                <span className="story-count">0{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="section-note">
          Illustrative testimonials retained from the original concept; these
          are not verified member reviews.
        </p>
      </div>
    </section>
  );
}
