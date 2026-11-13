"use client";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowUpRight,
  ChevronsLeftRight,
  Maximize2,
  MoveRight,
} from "lucide-react";
import { AnimatedButton, Reveal, SectionHeading } from "../ui/Primitives";
import {
  coachPortraits,
  getPhotograph,
  photographs,
  photoSource,
} from "@/lib/photography";

export function ExperiencePanorama({
  onPhoto,
}: {
  onPhoto: (id: string) => void;
}) {
  return (
    <section
      className="experience-panorama"
      aria-label="The Areesan training experience"
    >
      <div className="container">
        <button
          className="panorama-photo"
          onClick={() => onPhoto("hero")}
          aria-label="View the Areesan training panorama"
        >
          <Image
            src={photoSource("hero")}
            alt={getPhotograph("hero").alt}
            fill
            sizes="(max-width:760px) 100vw, 1240px"
            loading="lazy"
          />
          <span className="panorama-shade" />
          <span className="panorama-copy">
            <span className="mini-label">
              THE ENERGY BEHIND YOUR NEXT CHAPTER
            </span>
            <strong>
              Train with purpose.
              <br />
              Move with <em>confidence.</em>
            </strong>
            <span className="panorama-action">
              Step into the experience <ArrowUpRight size={17} />
            </span>
          </span>
          <span className="photo-expand">
            <Maximize2 size={15} />
          </span>
          <span className="photo-concept-label">ORIGINAL AREESAN CONCEPT</span>
        </button>
      </div>
    </section>
  );
}

export function TrainersSection({
  onExplore,
}: {
  onExplore: (id: string) => void;
}) {
  return (
    <section id="trainers" className="section restored-trainers">
      <div className="container">
        <div className="heading-row">
          <SectionHeading
            number="03.1"
            eyebrow="THE PEOPLE BEHIND YOUR PROGRESS"
            title={
              <>
                A little guidance.
                <br />
                <em>A stronger connection.</em>
              </>
            }
            text="Meet the familiar faces from the original Areesan concept."
          />
          <p className="side-note">
            A human approach
            <br />
            to your personal goals.
          </p>
        </div>
        <div className="restored-trainer-grid">
          {coachPortraits.map((coach, i) => (
            <Reveal key={coach.name} delay={i * 0.07}>
              <article className="restored-trainer">
                <span className="restored-trainer-pill">
                  <i />
                  {coach.tag}
                </span>
                <div className="restored-trainer-photo">
                  <Image
                    src={photoSource(coach.photo)}
                    alt={getPhotograph(coach.photo).alt}
                    fill
                    sizes="(max-width:760px) 100vw, 33vw"
                    loading="lazy"
                  />
                  <span className="trainer-photo-shade" />
                </div>
                <div className="restored-trainer-copy">
                  <span className="mini-label">{coach.role}</span>
                  <h3>{coach.name}</h3>
                  <p>{coach.description}</p>
                  <button
                    className="text-link"
                    onClick={() => onExplore(coach.program)}
                  >
                    Explore this training <ArrowUpRight size={15} />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="section-note">
          Generated coach portraits and sample profiles from the original
          concept. Confirm the real coaching team before launch.
        </p>
      </div>
    </section>
  );
}

function ProgressComparison({
  id,
  title,
  text,
}: {
  id: string;
  title: string;
  text: string;
}) {
  const [split, setSplit] = useState(50);
  const image = getPhotograph(id);
  return (
    <article className="progress-photo-card">
      <div className="progress-comparison">
        <div className="comparison-half comparison-before">
          <div className="comparison-source">
            <Image
              src={photoSource(id)}
              alt=""
              fill
              sizes="(max-width:760px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        </div>
        <div
          className="comparison-half comparison-after"
          style={{ clipPath: `inset(0 0 0 ${split}%)` }}
        >
          <div className="comparison-source">
            <Image
              src={photoSource(id)}
              alt=""
              fill
              sizes="(max-width:760px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        </div>
        <span className="comparison-label label-before">Before</span>
        <span className="comparison-label label-after">After</span>
        <div className="comparison-divider" style={{ left: `${split}%` }}>
          <span>
            <ChevronsLeftRight size={20} />
          </span>
        </div>
        <input
          type="range"
          min="5"
          max="95"
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          aria-label={`Compare the before and after ${id === "transformation-man" ? "male" : "female"} concept portraits`}
          aria-valuetext={`${split}% starting portrait, ${100 - split}% progress portrait`}
        />
        <span className="sr-only">
          {image.alt} Illustrative images, not documented member results.
        </span>
      </div>
      <div className="progress-photo-copy">
        <span className="mini-label">ILLUSTRATIVE PROGRESS STORY</span>
        <h3>{title}</h3>
        <p>{text}</p>
        <span className="comparison-hint">
          <MoveRight size={14} />
          Drag the divider to explore
        </span>
      </div>
    </article>
  );
}
export function TransformationSection({ onBook }: { onBook: () => void }) {
  return (
    <section id="transformations" className="section restored-transformations">
      <div className="container">
        <div className="heading-row">
          <SectionHeading
            number="05.1"
            eyebrow="PICTURE YOUR NEXT CHAPTER"
            title={
              <>
                Consistency, pictured.
                <br />
                Confidence, <em>in motion.</em>
              </>
            }
            text="The original progress portraits return, now with interactive comparisons."
          />
          <AnimatedButton variant="outline" onClick={onBook}>
            Start your journey
          </AnimatedButton>
        </div>
        <div className="progress-photo-grid">
          <ProgressComparison
            id="transformation-man"
            title="A stronger routine."
            text="A visual reminder of the intention behind every training session."
          />
          <ProgressComparison
            id="transformation-woman"
            title="A new kind of confidence."
            text="Make room for a routine that helps you feel more at home in your movement."
          />
        </div>
        <p className="section-note">
          Generated before-and-after concept imagery, not verified member
          transformations or promised outcomes.
        </p>
      </div>
    </section>
  );
}

export function FacilitiesSection({
  onPhoto,
  onBook,
}: {
  onPhoto: (id: string) => void;
  onBook: () => void;
}) {
  const photos = photographs.filter((p) => p.category === "Facility concept");
  return (
    <section id="facilities" className="section restored-facilities">
      <div className="container">
        <div className="heading-row">
          <SectionHeading
            number="06.1"
            eyebrow="A SPACE TO FIND YOUR RHYTHM"
            title={
              <>
                Room to focus.
                <br />
                Space to <em>grow.</em>
              </>
            }
            text="Explore the four training environments from the original design."
          />
          <AnimatedButton variant="text" onClick={onBook}>
            Plan your first visit
          </AnimatedButton>
        </div>
        <div className="facility-photo-grid">
          {photos.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <button
                className="facility-photo-card"
                onClick={() => onPhoto(p.id)}
                aria-label={`View ${p.title}`}
              >
                <div className="facility-photo-image">
                  <Image
                    src={photoSource(p.id)}
                    alt={p.alt}
                    fill
                    sizes="(max-width:600px) 100vw, (max-width:1000px) 50vw, 25vw"
                    loading="lazy"
                  />
                  <span className="photo-expand">
                    <Maximize2 size={16} />
                  </span>
                </div>
                <div className="facility-photo-caption">
                  <span>0{i + 1}</span>
                  <h3>{p.title}</h3>
                  <ArrowUpRight size={17} />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        <p className="section-note">
          Original generated facility visuals. They illustrate the design
          concept and do not document a verified gym location.
        </p>
      </div>
    </section>
  );
}
