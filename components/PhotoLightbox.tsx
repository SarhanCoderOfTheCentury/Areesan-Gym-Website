"use client";
import Image from "next/image";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { photographs, photoSource } from "@/lib/photography";
export default function PhotoLightbox({
  index,
  onChange,
}: {
  index: number;
  onChange: (n: number) => void;
}) {
  const photo = photographs[index];
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onChange((index + photographs.length - 1) % photographs.length);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onChange((index + 1) % photographs.length);
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [index, onChange]);
  return (
    <div className="photo-lightbox">
      <div className="lightbox-image">
        <Image
          key={photo.id}
          src={photoSource(photo.id)}
          alt={photo.alt}
          fill
          sizes="(max-width:760px) 100vw, 880px"
          loading="eager"
        />
        <button
          className="lightbox-arrow previous"
          onClick={() =>
            onChange((index + photographs.length - 1) % photographs.length)
          }
          aria-label="Previous photograph"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          className="lightbox-arrow next"
          onClick={() => onChange((index + 1) % photographs.length)}
          aria-label="Next photograph"
        >
          <ArrowRight size={20} />
        </button>
      </div>
      <div className="lightbox-caption" aria-live="polite">
        <div>
          <span className="mini-label">{photo.category}</span>
          <h2>{photo.title}</h2>
          <p>Original generated Areesan concept image.</p>
        </div>
        <span>
          {String(index + 1).padStart(2, "0")} / {photographs.length}
        </span>
      </div>
      <div
        className="lightbox-thumbnails"
        role="group"
        aria-label="Choose a photograph"
      >
        {photographs.map((p, i) => (
          <button
            key={p.id}
            onClick={() => onChange(i)}
            aria-label={`Show ${p.title}`}
            aria-pressed={i === index}
          >
            <Image
              src={photoSource(p.id)}
              alt=""
              fill
              sizes="64px"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
