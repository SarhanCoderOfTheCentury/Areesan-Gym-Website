"use client";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Award,
  ChartNoAxesCombined,
  Check,
  ClipboardCheck,
  Crown,
  Diamond,
  Dumbbell,
  Flame,
  Heart,
  Target,
  Users,
  Waves,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
const icons = {
  activity: Activity,
  award: Award,
  chart: ChartNoAxesCombined,
  clipboard: ClipboardCheck,
  crown: Crown,
  diamond: Diamond,
  dumbbell: Dumbbell,
  flame: Flame,
  heart: Heart,
  target: Target,
  users: Users,
  waves: Waves,
  zap: Zap,
  check: Check,
};
export function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const I = icons[name as keyof typeof icons] ?? Target;
  return <I size={size} strokeWidth={1.6} aria-hidden="true" />;
}
export function Emblem({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 49 47"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M24.5 2 48 44 24.5 32 1 44Zm0 13L12 36l12.5-12L37 36Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
export function Logo() {
  return (
    <a href="#home" className="logo" aria-label="Areesan home">
      <Emblem />
      <span>
        Areesan<span className="gold-text">.</span>
      </span>
    </a>
  );
}
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { y: 25, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function SectionHeading({
  number,
  eyebrow,
  title,
  text,
}: {
  number: string;
  eyebrow: string;
  title: ReactNode;
  text?: string;
}) {
  return (
    <Reveal className="section-heading">
      <div className="eyebrow">
        <span className="section-index">{number}</span>
        {eyebrow}
      </div>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}
export function AnimatedButton({
  children,
  onClick,
  variant = "gold",
  className = "",
  href,
  label,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "gold" | "outline" | "text";
  className?: string;
  href?: string;
  label?: string;
}) {
  const props = {
    className: `button ${variant} ${className}`,
    whileHover: { y: -2 },
    whileTap: { scale: 0.98 },
    onClick,
    "aria-label": label,
  };
  return href ? (
    <motion.a href={href} {...props}>
      {children}
      <ArrowUpRight size={18} />
    </motion.a>
  ) : (
    <motion.button type="button" {...props}>
      {children}
      <ArrowUpRight size={18} />
    </motion.button>
  );
}
