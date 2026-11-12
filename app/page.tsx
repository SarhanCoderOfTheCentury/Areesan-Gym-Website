"use client";

import { useEffect, useRef, useState, type ReactNode, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Award, BicepsFlexed, CalendarDays, Check, CheckCircle2, ChevronLeft, ChevronRight, ChevronsRight, ClipboardCheck, Clock3, Crown, Diamond, Download, Dumbbell, Flame, HeartPulse, Instagram, MapPin, Menu, Phone, Play, ShieldCheck, Sparkles, Star, Target, Users, Waves, X, Zap, Mail, Facebook, MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/923001234567?text=Hi%20Areesan!%20I%27d%20like%20to%20know%20more%20about%20memberships%20and%20a%20free%20trial.";
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=DHA+Phase+4+Karachi+Pakistan";

const programs = [
  { title: "Muscle Building", short: "Build lean muscle, increase strength, and get a powerful, athletic physique.", image: "muscle", icon: BicepsFlexed, tag: "STRENGTH & POWER", detail: "Build a stronger foundation with progressive strength training, purposeful technique, and a plan that grows with you.", benefits: ["Structured strength sessions", "Form and technique coaching", "Progressive training plan", "Regular progress check-ins"], duration: "45–60 minutes", level: "All fitness levels" },
  { title: "Fat Loss", short: "Burn calories, reduce body fat, and achieve a leaner, healthier body.", image: "fat-loss", icon: Flame, tag: "ENERGY & CONFIDENCE", detail: "Create sustainable habits with a balanced mix of resistance training, cardio, and practical nutrition guidance.", benefits: ["Goal-based workout planning", "Strength and cardio balance", "Nutrition and habit guidance", "Supportive coaching"], duration: "45–60 minutes", level: "Beginner friendly" },
  { title: "Personal Training", short: "One-on-one coaching for faster, more effective results.", image: "boxing", icon: Zap, tag: "YOUR GOALS. YOUR PLAN.", detail: "Get your coach’s full attention. Every session is tailored to your ability, movement, lifestyle, and personal fitness goals.", benefits: ["Dedicated one-on-one coaching", "Personal fitness assessment", "A plan built around you", "Accountability and feedback"], duration: "60 minutes", level: "All fitness levels" },
  { title: "Fitness & Conditioning", short: "Improve stamina, endurance, and your overall athletic performance.", image: "conditioning", icon: HeartPulse, tag: "MOVE. SWEAT. PROGRESS.", detail: "Bring more energy to everything you do with functional circuits, athletic movements, and conditioning sessions.", benefits: ["Functional training circuits", "Endurance and stamina work", "Athletic movement coaching", "Scalable workout intensity"], duration: "45 minutes", level: "Scalable intensity" },
  { title: "Strength & Mobility", short: "Build functional strength, better flexibility, and injury resilience.", image: "mobility", icon: Waves, tag: "STRENGTH IN EVERY MOVEMENT", detail: "Move with confidence. Combine controlled strength work with mobility exercises for a body that feels as good as it performs.", benefits: ["Guided mobility sessions", "Functional strength work", "Balance and body control", "Recovery-focused movement"], duration: "45 minutes", level: "All fitness levels" },
];

const trainers = [
  { name: "Ali Raza", title: "Strength & Muscle Building Expert", image: "personal", description: "8+ years of experience in transforming clients with safe, effective training.", specialty: "Strength training", quote: "A little stronger, every single day.", approach: "Ali focuses on building strong foundations through consistent training and careful technique. His coaching pairs progressive strength sessions with a plan you can maintain.", areas: ["Muscle building", "Strength fundamentals", "Training technique"] },
  { name: "Ayesha Khan", title: "Fat Loss & Wellness Coach", image: "fat-loss", description: "Specializes in fat loss, women’s fitness, and sustainable, long-term results.", specialty: "Women’s wellness", quote: "Find your strength. Keep your balance.", approach: "Ayesha creates an encouraging space to build confidence. Her approach combines practical routines, balanced movement, and habits that support your everyday life.", areas: ["Women’s fitness", "Fat loss", "Healthy habits"] },
  { name: "Hamza Malik", title: "Performance & Conditioning Coach", image: "muscle", description: "Expert in strength, endurance, and overall fitness performance.", specialty: "Athletic performance", quote: "Show up with purpose. Leave with progress.", approach: "Hamza brings energy and structure to functional training. His sessions develop endurance, strength, and confidence through adaptable athletic exercises.", areas: ["Conditioning", "Functional fitness", "Endurance"] },
];

const facilities = [
  { name: "Strength Training Zone", image: "strength-zone", icon: Dumbbell, text: "Find your strength with premium free weights, resistance machines, and space to focus on every rep." },
  { name: "Functional Training Area", image: "functional-zone", icon: BicepsFlexed, text: "Purpose-built space for functional circuits, kettlebells, movement training, and sessions that keep you challenged.", position: "left center" },
  { name: "Performance & Conditioning", image: "performance-zone", icon: Zap, text: "Take your training to the turf. Develop speed, endurance, and athletic performance in a dedicated conditioning zone.", position: "right center" },
  { name: "Cardio & Fitness Zone", image: "cardio-zone", icon: HeartPulse, text: "Bring fresh energy to your routine with modern cardio equipment and bright, open views." },
];

const plans = [
  { name: "Basic", price: "4,999", icon: Dumbbell, tagline: "Your stronger start.", features: ["Gym access (all workout areas)", "Standard training support", "Access to group fitness sessions", "Member app & progress tracking"] },
  { name: "Premium", price: "7,999", icon: Crown, tagline: "More guidance. More progress.", features: ["Everything in Basic", "Personalized training plan", "Nutrition guidance & diet support", "Priority trainer access", "Body composition & progress check"], popular: true },
  { name: "Premium Plus", price: "11,999", icon: Diamond, tagline: "A plan built entirely around you.", features: ["Everything in Premium", "1-on-1 personal training (dedicated)", "Advanced performance programming", "Monthly fitness assessment & reports", "Exclusive member benefits & events"] },
];

const stories = [
  { name: "Usman", city: "Lahore", image: "transformation-man", quote: <>“I lost 14 kg in <span>12 weeks!</span>”</>, detail: "Areesan’s coaching and structured plan helped me stay consistent and finally get results.", note: "Consistency, guided training, and a routine that fit his life.", metric: "12 weeks of commitment" },
  { name: "Hira", city: "Karachi", image: "transformation-woman", quote: <>“More energy, better fitness, <span>higher confidence.</span>”</>, detail: "I feel stronger, healthier, and more active in my daily life now. The team is extremely supportive.", note: "A supportive community and a new sense of confidence.", metric: "A stronger everyday" },
];

const testimonials = [
  { name: "Bilal Ahmed", city: "Islamabad", image: "personal", text: "Areesan is more than a gym — it’s a complete fitness experience. Professional trainers, great equipment, and a motivating environment." },
  { name: "Sara Nadeem", city: "Lahore", image: "fat-loss", text: "The personalized training and nutrition guidance made a huge difference. I’ve never felt this fit and confident before!" },
  { name: "Kashif Ali", city: "Karachi", image: "muscle", text: "Excellent facilities, disciplined atmosphere, and a very supportive team. Highly recommended for anyone serious about their fitness goals." },
];

type ModalState = { type: "booking"; plan?: string; program?: string; trainer?: string } | { type: "program" | "trainer" | "facility" | "story"; index: number } | { type: "tour" } | { type: "privacy" } | null;
type Booking = { name: string; email: string; phone: string; location: string; date: string; time: string; plan: string; goal: string };

function Logo() {
  return <a className="logo" href="#home" aria-label="Areesan home"><svg viewBox="0 0 49 47" aria-hidden="true"><path d="M24.5 2 48 44 24.5 32 1 44Zm0 13L12 36l12.5-12L37 36Z" fill="currentColor" /></svg><span>Areesan<span className="logo-dot">.</span></span></a>;
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <Reveal className="section-heading"><div className="eyebrow"><span />{eyebrow}<span /></div><h2>{title}</h2>{text && <p>{text}</p>}</Reveal>;
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) { setCount(value); return; }
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1350, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);
  return <span ref={ref}>{count.toLocaleString("en-US")}{suffix}</span>;
}

function Modal({ children, onClose, wide = false }: { children: ReactNode; onClose: () => void; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const active = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = previous; active?.focus(); };
  }, []);
  return <dialog ref={ref} className={`modal ${wide ? "modal-wide" : ""}`} aria-labelledby="modal-title" onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose(); } }}>
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}><button className="modal-close icon-button" aria-label="Close dialog" onClick={onClose}><X size={21} /></button>{children}</motion.div>
  </dialog>;
}

function BookingForm({ plan = "Free trial", program, trainer }: { plan?: string; program?: string; trainer?: string }) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [draft, setDraft] = useState<Booking | null>(null);
  const [error, setError] = useState("");
  const [today, setToday] = useState("");
  useEffect(() => { const now = new Date(); now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); setToday(now.toISOString().slice(0, 10)); }, []);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const details = Object.fromEntries(form.entries()) as unknown as Booking;
    if (details.phone.replace(/\D/g, "").length < 10) { setError("Please enter a valid phone number with at least 10 digits."); return; }
    const chosen = new Date(`${details.date}T${details.time}`);
    if (chosen <= new Date()) { setError("Please choose a trial time in the future."); return; }
    setError(""); setDraft(details); setBooking(details);
  }
  function download() {
    if (!booking) return;
    const text = `AREESAN — YOUR FITNESS JOURNEY\n\nName: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone}\nLocation: ${booking.location}\nDate: ${booking.date}\nTime: ${booking.time}\nMembership: ${booking.plan}\nGoal: ${booking.goal}\n${trainer ? `Preferred coach: ${trainer}\n` : ""}\nWebsite preview only. This is a saved enquiry, not a confirmed appointment. No request has been sent to the gym. Contact Areesan to confirm availability.`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const a = document.createElement("a"); a.href = url; a.download = "areesan-trial-details.txt"; a.click(); URL.revokeObjectURL(url);
  }
  if (booking) return <div className="booking-success"><div className="success-mark"><CheckCircle2 size={38} /></div><span className="mini-label">YOUR NEXT CHAPTER STARTS HERE</span><h2 id="modal-title">You’re one step closer,<br />{booking.name.split(" ")[0]}.</h2><p>Your trial details are ready. Here’s your preferred visit.</p><div className="booking-recap"><div><MapPin size={19}/><span>{booking.location}</span></div><div><CalendarDays size={19}/><span>{new Date(`${booking.date}T12:00`).toLocaleDateString("en-PK", { weekday: "long", day: "numeric", month: "long" })}</span></div><div><Clock3 size={19}/><span>{booking.time} · {booking.plan}</span></div></div><p className="preview-note">This is a website preview. No booking has been sent or confirmed. Download your details and contact the gym to arrange your visit.</p><button className="button gold full-width" onClick={download}><Download size={17}/>Save my trial details</button><button className="text-button" onClick={() => setBooking(null)}>Edit details <ArrowRight size={15}/></button></div>;
  return <div className="booking-content"><span className="mini-label">MAKE YOUR FIRST MOVE</span><h2 id="modal-title">Your stronger self<br />starts here.</h2><p>Come for a free trial. Meet the coaches, explore the space, and find your fit.</p><form onSubmit={submit} className="booking-form"><div className="form-row"><label>Full name<input name="name" defaultValue={draft?.name} placeholder="Your full name" autoComplete="name" required maxLength={80}/></label><label>Phone number<input type="tel" name="phone" defaultValue={draft?.phone} placeholder="03XX XXXXXXX" autoComplete="tel" required maxLength={22}/></label></div><label>Email address<input type="email" name="email" defaultValue={draft?.email} placeholder="you@example.com" autoComplete="email" required maxLength={100}/></label><div className="form-row"><label>Preferred location<select name="location" defaultValue={draft?.location ?? "Karachi — DHA Phase 4"}><option>Lahore — Gulberg III</option><option>Karachi — DHA Phase 4</option><option>Islamabad</option></select></label><label>Membership interest<select name="plan" defaultValue={draft?.plan ?? plan}><option>Free trial</option>{plans.map(p => <option key={p.name}>{p.name}</option>)}</select></label></div><div className="form-row"><label>Preferred date<input type="date" name="date" defaultValue={draft?.date} min={today} required /></label><label>Preferred time<select name="time" defaultValue={draft?.time ?? "18:00"}><option value="07:00">7:00 AM</option><option value="10:00">10:00 AM</option><option value="14:00">2:00 PM</option><option value="18:00">6:00 PM</option><option value="20:00">8:00 PM</option></select></label></div><label>Your fitness goal<select name="goal" defaultValue={draft?.goal ?? program ?? "Explore my options"}><option>Explore my options</option>{programs.map(p => <option key={p.title}>{p.title}</option>)}</select></label>{trainer && <div className="coach-selection"><ShieldCheck size={16}/>Preferred coach: {trainer}</div>}{error && <p className="form-error" role="alert">{error}</p>}<button type="submit" className="button gold full-width">Prepare my free trial <ArrowRight size={18}/></button><p className="form-footnote"><ShieldCheck size={13}/>Preview only. Your information is not sent to a server.</p></form></div>;
}

function Website() {
  const [modal, setModal] = useState<ModalState>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const heroY = useTransform(scrollY, [0, 800], [0, reduced ? 0 : 90]);
  const nav = [["home", "Home"], ["programs", "Programs"], ["trainers", "Trainers"], ["membership", "Membership"], ["testimonials", "Testimonials"], ["contact", "Contact"]];
  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 20); setShowTop(window.scrollY > 900); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); }, { rootMargin: "-18% 0px -55% 0px" });
    document.querySelectorAll("[data-nav-section]").forEach(el => observer.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);
  useEffect(() => { if (!mobileMenu) return; const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileMenu(false); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [mobileMenu]);
  const openBooking = (plan?: string, program?: string, trainer?: string) => { setMobileMenu(false); setModal({ type: "booking", plan, program, trainer }); };

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}><div className="nav-container"><Logo/><nav className="desktop-nav" aria-label="Main navigation">{nav.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? "active" : ""} aria-current={active === id ? "location" : undefined}>{label}</a>)}</nav><div className="nav-actions"><button className="button gold nav-join" onClick={() => openBooking()}>Join Now <ArrowUpRight size={16}/></button><button className="menu-toggle icon-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label={mobileMenu ? "Close navigation" : "Open navigation"} aria-expanded={mobileMenu} aria-controls="mobile-nav">{mobileMenu ? <X/> : <Menu/>}</button></div></div><motion.div className="scroll-progress" style={{ scaleX: progress }}/></header>
    <AnimatePresence>{mobileMenu && <motion.nav className="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>{nav.map(([id, label], i) => <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); setMobileMenu(false); window.history.replaceState(null, "", `#${id}`); window.setTimeout(() => { const target = document.getElementById(id); if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 84, behavior: reduced ? "instant" : "smooth" }); }, 300); }}><span className="nav-number">0{i+1}</span>{label}<ArrowUpRight size={18}/></a>)}<button className="button gold" onClick={() => openBooking()}>Start your journey <ArrowRight size={17}/></button></motion.nav>}</AnimatePresence>

    <main id="main">
      <section className="hero" id="home" data-nav-section>
        <motion.div className="hero-photo" style={{ y: heroY }}><Image src="/images/hero.webp" alt="Areesan trainer guiding a member through a strength workout in a premium black and gold gym" fill priority sizes="100vw" quality={90}/></motion.div><div className="hero-shade"/>
        <div className="container hero-container"><motion.div className="hero-copy" initial={reduced ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}><div className="hero-kicker"><span/>PAKISTAN’S PREMIUM GYM</div><h1>Transform<br />Your Body at<br /><span>Areesan</span></h1><p>World-class gym, expert trainers, and<br className="desktop-break"/> result-driven programs to help you get<br className="desktop-break"/> fitter, stronger, and more confident.</p><div className="hero-buttons"><button className="button gold" onClick={() => openBooking()}>Join Now – Get Started <ArrowRight size={18}/></button><button className="button outline" onClick={() => { setTourIndex(0); setModal({ type: "tour" }); }}><span className="play-icon"><Play size={15} fill="currentColor"/></span>Watch Gym Tour</button></div><div className="hero-stats"><div><Users/><p><strong><Counter value={10000} suffix="+"/></strong><span>Happy Members</span></p></div><div><Dumbbell/><p><strong><Counter value={25} suffix="+"/></strong><span>Expert Trainers</span></p></div><div><MapPin/><p><strong><Counter value={5} suffix="+"/></strong><span>Locations in Pakistan</span></p></div></div></motion.div><div className="hero-caption"><span className="live-dot"/>YOUR JOURNEY. OUR COMMITMENT.</div></div><a href="#why" className="discover-link">DISCOVER THE DIFFERENCE <ArrowDown size={13}/></a>
      </section>

      <section className="section why-section" id="why"><div className="container"><SectionHeading eyebrow="WHY CHOOSE AREESAN" title="More Than a Gym – A Complete Fitness Experience" text="A premium fitness destination in Pakistan, built for real results."/><div className="benefit-grid">{[
        { icon: Award, title: "Expert Coaching", text: "Certified, experienced trainers to guide you at every step." },
        { icon: Dumbbell, title: "Modern Equipment", text: "World-class, safe, and high-performance equipment." },
        { icon: ClipboardCheck, title: "Personalized Plans", text: "Custom workout and nutrition plans for your unique goals." },
        { icon: Users, title: "Supportive Community", text: "A motivating, disciplined, and goal-oriented fitness community." },
      ].map((b, i) => <Reveal delay={i * 0.07} key={b.title}><motion.div className="benefit-card" whileHover={{ y: -5 }} transition={{ duration: 0.2 }}><b.icon size={35} strokeWidth={1.5}/><h3>{b.title}</h3><p>{b.text}</p></motion.div></Reveal>)}</div></div></section>

      <section className="section programs-section" id="programs" data-nav-section><div className="container"><SectionHeading eyebrow="OUR PROGRAMS" title="Fitness Programs for Every Goal" text="Targeted, result-driven programs designed to fit your fitness level, lifestyle, and goals."/><div className="program-grid">{programs.map((p, i) => <Reveal delay={i * 0.06} key={p.title}><motion.button className="program-card" onClick={() => setModal({ type: "program", index: i })} whileHover={{ y: -6 }}><div className="program-photo"><Image src={`/images/${p.image}.webp`} alt={p.title === "Fat Loss" ? "Woman in modest black sportswear at Areesan gym" : `${p.title} at Areesan`} fill sizes="(max-width: 600px) 75vw, (max-width: 1000px) 30vw, 20vw"/><div className="photo-shade"/><span className="photo-link"><ArrowUpRight size={16}/></span></div><div className="program-content"><p.icon size={27} strokeWidth={1.6}/><h3>{p.title}</h3><p>{p.short}</p><span className="explore-label">Explore program <ArrowRight size={14}/></span></div></motion.button></Reveal>)}</div><div className="section-bottom-note"><Sparkles size={14}/><span>Not sure where to start?</span><button onClick={() => openBooking()}>Let’s find your fit <ArrowRight size={14}/></button></div></div></section>

      <section className="section trainers-section" id="trainers" data-nav-section><div className="container"><SectionHeading eyebrow="OUR TRAINERS" title="Learn from Pakistan’s Fitness Experts" text="A team of certified, experienced, and passionate trainers dedicated to your success."/><div className="trainer-grid">{trainers.map((t, i) => <Reveal delay={i * 0.09} key={t.name}><motion.button className="trainer-card" whileHover={{ y: -5 }} onClick={() => setModal({ type: "trainer", index: i })}><div className="trainer-photo"><Image src={`/images/${t.image}.webp`} alt={`${t.name}, ${t.title}`} fill sizes="(max-width: 700px) 90vw, 33vw"/><div className="trainer-photo-shade"/><span className="trainer-link"><ArrowUpRight size={20}/></span></div><span className="trainer-specialty"><span/>{t.specialty}</span><div className="trainer-content"><h3>{t.name}</h3><p className="trainer-role">{t.title}</p><p>{t.description}</p><span className="explore-label">Meet your coach <ArrowRight size={14}/></span></div></motion.button></Reveal>)}</div></div></section>

      <section className="section transformations-section" id="transformations"><div className="container"><SectionHeading eyebrow="REAL TRANSFORMATIONS" title="Real People. Real Results." text="Hear from our members across Pakistan who transformed their fitness, health, and confidence at Areesan."/><div className="stories-grid">{stories.map((s, i) => <Reveal delay={i * 0.1} key={s.name}><div className="story-card"><button className="transformation-photos" onClick={() => setModal({ type: "story", index: i })} aria-label={`Read ${s.name}’s transformation story`}><div className="transformation-frame"><Image src={`/images/${s.image}.webp`} alt={`${s.name} before joining Areesan`} fill sizes="(max-width: 600px) 40vw, 14vw" className="before-image"/><span className="before-tag">Before</span></div><span className="transform-arrow"><ChevronsRight size={23}/></span><div className="transformation-frame after-frame"><Image src={`/images/${s.image}.webp`} alt={`${s.name} after training with Areesan`} fill sizes="(max-width: 600px) 40vw, 14vw" className="after-image"/><span className="after-tag">After</span></div></button><div className="story-copy"><span className="quote-mark">“</span><h3>{s.quote}</h3><p>{s.detail}</p><span className="story-author">— {s.name}, {s.city}</span></div></div></Reveal>)}</div></div></section>

      <section className="section testimonials-section" id="testimonials" data-nav-section><div className="container"><SectionHeading eyebrow="MEMBER TESTIMONIALS" title="What Our Members Say" text="Trusted by a growing community of fitness enthusiasts across Pakistan."/><div className="testimonial-grid">{testimonials.map((t, i) => <Reveal key={t.name} delay={i * 0.08}><motion.article className="testimonial-card" whileHover={{ y: -4 }}><div className="member-top"><div className="member-avatar"><Image src={`/images/${t.image}.webp`} alt={t.name} fill sizes="60px"/></div><div><h3>{t.name}</h3><span className="member-city"><MapPin size={13}/>{t.city}</span><div className="stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, j) => <Star key={j} size={14} fill="currentColor"/>)}</div></div><span className="testimonial-quote">“</span></div><blockquote>“{t.text}”</blockquote></motion.article></Reveal>)}</div></div></section>

      <section className="section membership-section" id="membership" data-nav-section><div className="container"><SectionHeading eyebrow="MEMBERSHIP PLANS" title="Choose the Plan That Fits You" text="Flexible, value-packed membership plans for every fitness goal."/><div className="plan-grid">{plans.map((p, i) => <Reveal delay={i * 0.08} key={p.name}><motion.article className={`plan-card ${p.popular ? "plan-popular" : ""}`} whileHover={{ y: -5 }}>{p.popular && <div className="popular-badge"><Star size={12} fill="currentColor"/>MOST POPULAR</div>}<div className="plan-name"><p.icon size={31} strokeWidth={1.5}/><h3>{p.name}</h3></div><p className="plan-tagline">{p.tagline}</p><div className="plan-price"><span className="currency">PKR</span> {p.price}<span className="period"> / month</span></div><div className="plan-divider"/><ul>{p.features.map(f => <li key={f}><Check size={17} strokeWidth={3}/><span>{f}</span></li>)}</ul><button className={`button ${p.popular ? "gold" : "outline neutral"} full-width`} onClick={() => openBooking(p.name)}>Join {p.name}<ArrowUpRight size={16}/></button></motion.article></Reveal>)}</div><p className="membership-note"><ShieldCheck size={14}/> Every plan starts with a stronger you. Explore the gym with a free trial.</p></div></section>

      <section className="section facilities-section" id="facilities"><div className="container"><SectionHeading eyebrow="OUR FACILITIES" title="A Premium Training Environment" text="World-class facilities, modern equipment, and a comfortable space to train and grow."/><div className="facilities-grid">{facilities.map((f, i) => <Reveal delay={i * 0.07} key={f.name}><motion.button className="facility-card" onClick={() => setModal({ type: "facility", index: i })} whileHover={{ y: -5 }}><div className="facility-photo"><Image src={`/images/${f.image}.webp`} alt={f.name} fill sizes="(max-width: 600px) 46vw, 25vw" style={{ objectPosition: f.position ?? "center" }}/><span className="photo-link"><ArrowUpRight size={16}/></span></div><div className="facility-label"><f.icon size={21} strokeWidth={1.6}/><h3>{f.name}</h3></div></motion.button></Reveal>)}</div></div></section>

      <section className="cta-section"><Image src="/images/strength-zone.webp" alt="" fill sizes="100vw"/><div className="cta-overlay"/><Reveal className="container cta-content"><div className="eyebrow"><span/>YOUR FIRST STEP STARTS HERE<span/></div><h2>Ready to Start Your Fitness Journey?</h2><p>Book a free trial session at Areesan and experience the difference yourself.</p><button className="button gold" onClick={() => openBooking()}>Book Your Free Trial Now <ArrowRight size={20}/></button><span className="cta-assurance">No commitment. Just possibility.</span></Reveal></section>
    </main>

    <footer id="contact" data-nav-section><div className="container footer-main"><div className="footer-brand"><Logo/><p>Pakistan’s premium gym, offering expert training, modern facilities, and result-driven programs for a healthier, stronger you.</p><div className="social-links"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Open Instagram"><Instagram size={21}/></a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Open Facebook"><Facebook size={21}/></a><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat with Areesan on WhatsApp"><MessageCircle size={21}/></a></div></div><div className="footer-contact"><div><MapPin/><p><strong>DHA Phase 4 – Karachi</strong><span>DHA Phase 4,<br/>Karachi, Pakistan</span></p></div><div><Phone/><p><a href="tel:+923001234567">+92 300 1234567</a></p></div><div><MessageCircle/><p><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></p></div><div><Mail/><p><a href="mailto:info@areesan.com">info@areesan.com</a></p></div><div><Clock3/><p>Mon – Sun: 6:00 AM – 11:00 PM</p></div></div><div className="map-card"><iframe className="google-map" title="Google Maps: DHA Phase 4, Karachi" src="https://www.google.com/maps?q=DHA%20Phase%204%20Karachi%20Pakistan&z=14&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/><a className="map-open" href={MAP_URL} target="_blank" rel="noopener noreferrer">DHA Phase 4, Karachi · Get directions <ArrowUpRight size={15}/></a></div></div><div className="container footer-bottom"><p>© {new Date().getFullYear()} Areesan. All rights reserved.</p><span>Concept preview · Images & member stories are illustrative.</span><button onClick={() => setModal({ type: "privacy" })}>Privacy & preview details</button></div></footer>
    <a className="whatsapp-float" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat with Areesan on WhatsApp"><MessageCircle size={23}/><span>WhatsApp</span></a>
    <AnimatePresence>{showTop && <motion.a href="#home" className="back-top" aria-label="Back to top" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}><ArrowRight size={19}/></motion.a>}</AnimatePresence>

    {modal && <Modal onClose={() => setModal(null)} wide={modal.type === "tour" || modal.type === "facility" || modal.type === "story"}>
      {modal.type === "booking" && <BookingForm plan={modal.plan} program={modal.program} trainer={modal.trainer}/>}
      {modal.type === "program" && (() => { const p = programs[modal.index]; return <><div className="detail-photo"><Image src={`/images/${p.image}.webp`} alt={p.title} fill sizes="650px"/></div><div className="detail-content"><span className="mini-label">{p.tag}</span><h2 id="modal-title">{p.title}</h2><p>{p.detail}</p><div className="detail-meta"><span><Clock3 size={16}/>{p.duration}</span><span><Target size={16}/>{p.level}</span></div><ul className="detail-benefits">{p.benefits.map(b => <li key={b}><Check size={17}/>{b}</li>)}</ul><button className="button gold full-width" onClick={() => openBooking(undefined, p.title)}>Try this program <ArrowRight size={18}/></button></div></>; })()}
      {modal.type === "trainer" && (() => { const t = trainers[modal.index]; return <><div className="detail-photo trainer-detail-photo"><Image src={`/images/${t.image}.webp`} alt={t.name} fill sizes="650px"/></div><div className="detail-content"><span className="mini-label">MEET YOUR COACH</span><h2 id="modal-title">{t.name}</h2><p className="gold-text">{t.title}</p><blockquote className="coach-quote">“{t.quote}”</blockquote><p>{t.approach}</p><div className="specialty-tags">{t.areas.map(a => <span key={a}>{a}</span>)}</div><button className="button gold full-width" onClick={() => openBooking(undefined, undefined, t.name)}>Train with {t.name.split(" ")[0]} <ArrowRight size={17}/></button></div></>; })()}
      {modal.type === "facility" && (() => { const f = facilities[modal.index]; return <><div className="tour-photo"><Image src={`/images/${f.image}.webp`} alt={f.name} fill sizes="900px"/></div><div className="detail-content"><span className="mini-label">SPACE TO BECOME MORE</span><h2 id="modal-title">{f.name}</h2><p>{f.text}</p><button className="button gold" onClick={() => openBooking()}>See it for yourself <ArrowRight size={17}/></button></div></>; })()}
      {modal.type === "tour" && <><div className="tour-photo"><AnimatePresence mode="wait"><motion.div key={tourIndex} className="tour-image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}><Image src={`/images/${facilities[tourIndex].image}.webp`} alt={facilities[tourIndex].name} fill sizes="900px"/></motion.div></AnimatePresence><span className="tour-count">0{tourIndex+1} / 04</span><button className="tour-arrow previous icon-button" aria-label="Previous tour image" onClick={() => setTourIndex((tourIndex + 3) % 4)}><ChevronLeft/></button><button className="tour-arrow next icon-button" aria-label="Next tour image" onClick={() => setTourIndex((tourIndex + 1) % 4)}><ChevronRight/></button></div><div className="detail-content tour-content"><span className="mini-label">INSIDE AREESAN · PHOTO TOUR</span><h2 id="modal-title">{facilities[tourIndex].name}</h2><p>{facilities[tourIndex].text}</p><div className="tour-bottom"><div className="tour-dots">{facilities.map((f, i) => <button key={f.name} aria-label={`Show ${f.name}`} aria-current={i === tourIndex ? "step" : undefined} className={i === tourIndex ? "selected" : ""} onClick={() => setTourIndex(i)}/>)}</div><button className="button gold" onClick={() => openBooking()}>Visit us <ArrowRight size={17}/></button></div></div></>}
      {modal.type === "story" && (() => { const s = stories[modal.index]; return <><div className="tour-photo story-detail-photo"><Image src={`/images/${s.image}.webp`} alt={`${s.name}’s before and after fitness journey`} fill sizes="900px"/><span className="story-image-before">Before</span><span className="story-image-after">After</span></div><div className="detail-content"><span className="mini-label">{s.metric}</span><h2 id="modal-title">{s.name}’s story</h2><blockquote className="coach-quote">{s.quote}</blockquote><p>{s.detail} {s.note}</p><p className="preview-note">Illustrative member story from the design reference. Results vary for every individual.</p><button className="button gold" onClick={() => openBooking()}>Start your own journey <ArrowRight size={17}/></button></div></>; })()}
      {modal.type === "privacy" && <div className="detail-content privacy-content"><span className="mini-label">WEBSITE PREVIEW</span><h2 id="modal-title">A little transparency.</h2><p>This concept website brings the supplied Areesan design references to life. Photography is generated; member stories, coach profiles, statistics, prices, and contact details are sample content taken from or developed for the reference design.</p><h3>Your information stays with you.</h3><p>The trial form works in your browser. It does not send, store, or share your personal information with a server. A downloaded trial summary is saved only to your device.</p><h3>Before your first visit.</h3><p>Confirm current pricing, facilities, opening hours, and availability directly with the gym. The embedded Google Map shows DHA Phase 4, Karachi; it does not verify an exact gym address. Google Maps and WhatsApp are external services. WhatsApp opens a chat using the contact number displayed on this preview. Other social links open their respective platforms.</p><button className="button outline" onClick={() => setModal(null)}>Back to exploring <ArrowRight size={17}/></button></div>}
    </Modal>}
  </>;
}

export default function Home() { return <MotionConfig reducedMotion="user"><Website/></MotionConfig>; }
