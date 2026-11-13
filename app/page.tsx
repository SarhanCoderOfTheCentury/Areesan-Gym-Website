"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  MapPin,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import {
  contact,
  getGoal,
  getPlan,
  getProgram,
  type GoalId,
  type PlanId,
  type Program,
  whatsappUrl,
} from "@/lib/content";
import { track } from "@/lib/analytics";
import { SceneRuntimeProvider } from "@/components/three/SceneViewport";
import { AnimatedButton, Emblem, Icon, Logo } from "@/components/ui/Primitives";
import HeroSection from "@/components/sections/HeroSection";
import GoalFinderSection, {
  type Preferences,
} from "@/components/sections/GoalFinderSection";
import WhySection from "@/components/sections/WhySection";
import ProgramSection from "@/components/sections/ProgramSection";
import MembershipSection from "@/components/sections/MembershipSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import FirstDaySection from "@/components/sections/FirstDaySection";
import RecommendationSection from "@/components/sections/RecommendationSection";
import Modal from "@/components/ui/Modal";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import MobileBookingBar from "@/components/ui/MobileBookingBar";
import {
  ExperiencePanorama,
  TrainersSection,
  TransformationSection,
  FacilitiesSection,
} from "@/components/sections/PhotographySections";
import {
  photographs,
  programPhotoIds,
  photoSource,
  getPhotograph,
} from "@/lib/photography";
const MotionPlayer = dynamic(
  () => import("@/components/remotion/MotionPlayer"),
  { ssr: false },
);
const BookingFlow = dynamic(() => import("@/components/BookingFlow"));
const PhotoLightbox = dynamic(() => import("@/components/PhotoLightbox"));
const links = [
  ["goals", "Your goal"],
  ["programs", "Programs"],
  ["membership", "Membership"],
  ["first-visit", "First visit"],
  ["contact", "Find us"],
];
type Dialog =
  | "booking"
  | "experience"
  | "chat"
  | { program: Program }
  | { photo: number }
  | null;
function Header({ onBook }: { onBook: () => void }) {
  const [menu, setMenu] = useState(false),
    [solid, setSolid] = useState(false),
    [active, setActive] = useState("");
  useEffect(() => {
    const listener = () => setSolid(window.scrollY > 30);
    listener();
    window.addEventListener("scroll", listener, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", listener);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!menu) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [menu]);
  return (
    <header className={`header ${solid || menu ? "solid" : ""}`}>
      <div className="container nav-container">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="nav-join"
            onClick={() => {
              setMenu(false);
              onBook();
            }}
          >
            Join now <ArrowUpRight size={16} />
          </button>
          <button
            className="menu-toggle"
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            aria-controls="mobile-navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {links.map(([id, label], i) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                <span>0{i + 1}</span>
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
export default function Home() {
  const [goalId, setGoalId] = useState<GoalId>("muscle"),
    [planId, setPlanId] = useState<PlanId>("premium"),
    [preferences, setPreferences] = useState<Preferences>({
      level: "Just starting",
      days: "3 days",
      coaching: "guided",
    }),
    [dialog, setDialog] = useState<Dialog>(null);
  const goal = getGoal(goalId),
    plan = getPlan(planId),
    program = getProgram(goal.programId);
  const recommended: PlanId =
    preferences.coaching === "dedicated"
      ? "plus"
      : preferences.coaching === "independent"
        ? "basic"
        : "premium";
  function selectGoal(id: GoalId) {
    const g = getGoal(id);
    setGoalId(id);
    setPlanId(g.membershipId);
    setPreferences((p) => ({
      ...p,
      coaching:
        g.membershipId === "plus"
          ? "dedicated"
          : g.membershipId === "basic"
            ? "independent"
            : "guided",
    }));
    track("goal_selected", { goal: id });
  }
  function updatePreferences(p: Preferences) {
    setPreferences(p);
    setPlanId(
      p.coaching === "dedicated"
        ? "plus"
        : p.coaching === "independent"
          ? "basic"
          : "premium",
    );
    track("preferences_updated", {
      level: p.level,
      days: p.days,
      coaching: p.coaching,
    });
  }
  function book(source: string) {
    setDialog("booking");
    track("trial_cta_clicked", { source, goal: goalId, plan: planId });
  }
  function chat() {
    setDialog("chat");
    track("whatsapp_cta_clicked", { goal: goalId, plan: planId });
  }
  function openPhoto(id: string) {
    const index = photographs.findIndex((p) => p.id === id);
    if (index >= 0) {
      setDialog({ photo: index });
      track("photograph_opened", { photo: id });
    }
  }
  const message = `Hi Areesan! I’d like to learn more about ${program.name} and arrange a free trial at ${contact.location}.\n\nMy goal: ${goal.title}\nMembership interest: ${plan.name}\nExperience: ${preferences.level}\nTraining rhythm: ${preferences.days} per week\n\nPlease share availability and current pricing.`;
  return (
    <MotionConfig reducedMotion="user">
      <SceneRuntimeProvider>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header onBook={() => book("navigation")} />
        <main id="main-content">
          <HeroSection
            onBook={() => book("hero")}
            onWatch={() => {
              setDialog("experience");
              track("experience_opened");
            }}
          />
          <ExperiencePanorama onPhoto={openPhoto} />
          <GoalFinderSection
            goalId={goalId}
            onGoal={selectGoal}
            preferences={preferences}
            onPreferences={updatePreferences}
            onBook={() => book("goal_finder")}
          />
          <WhySection />
          <ProgramSection
            onExplore={(p) => {
              selectGoal(p.goalId);
              setDialog({ program: p });
              track("program_explored", { program: p.id });
            }}
            onBook={() => book("journey")}
          />
          <TrainersSection
            onExplore={(id) => {
              const p = getProgram(id);
              selectGoal(p.goalId);
              setDialog({ program: p });
              track("coach_program_explored", { program: id });
            }}
          />
          <MembershipSection
            selected={planId}
            recommended={recommended}
            onSelect={(id) => {
              setPlanId(id);
              track("plan_selected", { plan: id });
            }}
            onBook={() => book("membership")}
          />
          <TestimonialSection />
          <TransformationSection onBook={() => book("progress_photographs")} />
          <FirstDaySection onBook={() => book("first_visit")} />
          <FacilitiesSection
            onPhoto={openPhoto}
            onBook={() => book("facilities")}
          />
          <RecommendationSection
            goalId={goalId}
            planId={planId}
            preferences={preferences}
            onBook={() => book("recommendation")}
            onChat={chat}
          />
          <section id="contact" className="section contact-section">
            <div className="container contact-layout">
              <div className="contact-copy">
                <div className="eyebrow">
                  <span className="section-index">08</span>MAKE IT HAPPEN
                </div>
                <h2>
                  Your next chapter.
                  <br />
                  <em>A little closer.</em>
                </h2>
                <p>
                  Start a conversation. Plan a visit. Take a little time for
                  you.
                </p>
                <div className="contact-location">
                  <MapPin size={25} />
                  <div>
                    <strong>DHA Phase 4</strong>
                    <span>Karachi, Pakistan</span>
                  </div>
                </div>
                <p className="fine-print">
                  The map shows the DHA Phase 4 area. Confirm the gym’s exact
                  address and visiting hours before your trip.
                </p>
                <div className="contact-actions">
                  <a
                    className="button outline"
                    href={contact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("map_directions_opened")}
                  >
                    Open Google Maps <ArrowUpRight size={17} />
                  </a>
                  <button className="text-link" onClick={chat}>
                    <MessageCircle size={16} /> Ask on WhatsApp
                  </button>
                </div>
              </div>
              <div className="map-frame">
                <iframe
                  title="Google Map of DHA Phase 4, Karachi"
                  src={contact.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="map-caption">
                  <span className="status-light" />
                  DHA PHASE 4, KARACHI
                  <a
                    href={contact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open location in Google Maps"
                  >
                    <ArrowUpRight size={19} />
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="faq-section">
            <div className="container faq-layout">
              <div>
                <span className="mini-label">A LITTLE CLARITY</span>
                <h2>
                  Before you
                  <br />
                  <em>make your move.</em>
                </h2>
              </div>
              <div className="faq-list">
                {[
                  [
                    "Do I need experience to start?",
                    "The programs include beginner-friendly options and scalable intensity. Tell the team about your experience, goals, and any needs before your first session.",
                  ],
                  [
                    "Can I explore before choosing a membership?",
                    "Use the goal finder to explore a starting direction, then prepare a free-trial enquiry. The team should confirm your visit, current trial terms, and membership inclusions.",
                  ],
                  [
                    "Is my trial confirmed when I submit the form?",
                    "No. The form prepares an enquiry in your browser. You can send it through WhatsApp, and the team can confirm availability. No information is submitted to a booking server.",
                  ],
                  [
                    "What do I need for my first visit?",
                    "Comfortable training clothes, a water bottle, and a little time to talk through your goals. Confirm any specific requirements with the team before you travel.",
                  ],
                ].map(([q, a]) => (
                  <details key={q}>
                    <summary>
                      {q}
                      <ChevronDown size={18} />
                    </summary>
                    <p>{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
          <section className="final-cta">
            <div className="container final-cta-layout">
              <div className="cta-emblem" aria-hidden="true">
                <Emblem />
              </div>
              <div>
                <span className="mini-label">
                  YOU DON’T HAVE TO BE READY. JUST WILLING.
                </span>
                <h2>
                  Your first move
                  <br />
                  changes <em>everything.</em>
                </h2>
                <p>Make a little space for a stronger you.</p>
              </div>
              <div className="final-actions">
                <AnimatedButton onClick={() => book("final_cta")}>
                  Book a free trial
                </AnimatedButton>
                <span>Explore first. Decide after your visit.</span>
              </div>
            </div>
          </section>
        </main>
        <footer>
          <div className="container footer-main">
            <div>
              <Logo />
              <p>
                Strength is personal.
                <br />
                Make your next chapter count.
              </p>
            </div>
            <nav aria-label="Footer navigation">
              <a href="#goals">Find my program</a>
              <a href="#membership">Membership</a>
              <a href="#first-visit">Your first visit</a>
              <a href="#contact">Find us</a>
            </nav>
            <div className="footer-location">
              <span className="mini-label">YOUR NEXT CHAPTER</span>
              <strong>DHA Phase 4, Karachi</strong>
              <button className="text-link" onClick={chat}>
                Let’s talk <ArrowUpRight size={15} />
              </button>
            </div>
          </div>
          <div className="container footer-bottom">
            <span>
              © {new Date().getFullYear()} Areesan. Move with purpose.
            </span>
            <span>
              Concept preview · Sample prices, reviews & contact number.
            </span>
            <a href="#home">Back to top ↑</a>
          </div>
        </footer>
        <WhatsAppButton onClick={chat} />
        <MobileBookingBar onBook={() => book("mobile_bar")} onChat={chat} />
        {dialog && (
          <Modal
            wide={dialog === "experience" || typeof dialog === "object"}
            label={
              dialog === "booking"
                ? "Prepare a trial enquiry"
                : dialog === "chat"
                  ? "Start a WhatsApp conversation"
                  : dialog === "experience"
                    ? "The Areesan experience"
                    : typeof dialog === "object" && "photo" in dialog
                      ? "Areesan photo gallery"
                      : "Explore your program"
            }
            onClose={() => setDialog(null)}
          >
            {dialog === "booking" && (
              <BookingFlow
                goalId={goalId}
                planId={planId}
                preferences={preferences}
              />
            )}
            {dialog === "experience" && (
              <div className="experience-modal">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/media/brand-poster.jpg"
                  aria-label="An eight-second Areesan brand introduction"
                >
                  <source src="/media/areesan-brand.webm" type="video/webm" />
                  <source src="/media/areesan-brand.mp4" type="video/mp4" />
                </video>
                <div className="modal-content">
                  <span className="mini-label">
                    DISCIPLINE. STRENGTH. TRANSFORMATION.
                  </span>
                  <h2>Make your first move.</h2>
                  <p>Five goals. Three ways to join. One stronger you.</p>
                  <AnimatedButton onClick={() => book("experience")}>
                    Book a free trial
                  </AnimatedButton>
                </div>
              </div>
            )}
            {dialog === "chat" && (
              <div className="booking-content">
                <span className="mini-label">
                  A CONVERSATION IS A GOOD START
                </span>
                <h2>
                  Let’s talk about
                  <br />
                  <em>your goals.</em>
                </h2>
                <p>
                  We’ve included your preferences so you can start with a little
                  direction.
                </p>
                <pre className="whatsapp-preview">{message}</pre>
                <p className="contact-demo-note">
                  The current WhatsApp redirect uses the concept number{" "}
                  {contact.displayPhone}. Add the gym’s verified number before
                  business launch.
                </p>
                <a
                  className="button gold full-width"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={whatsappUrl(message)}
                  onClick={() =>
                    track("whatsapp_redirect_opened", {
                      goal: goalId,
                      plan: planId,
                    })
                  }
                >
                  <MessageCircle size={18} /> Continue to WhatsApp{" "}
                  <ArrowUpRight size={17} />
                </a>
              </div>
            )}
            {typeof dialog === "object" &&
              dialog !== null &&
              "photo" in dialog && (
                <PhotoLightbox
                  index={dialog.photo}
                  onChange={(index) => setDialog({ photo: index })}
                />
              )}
            {typeof dialog === "object" &&
              dialog !== null &&
              "program" in dialog && (
                <div className="program-modal">
                  <div className="program-modal-photograph">
                    <Image
                      src={photoSource(programPhotoIds[dialog.program.id])}
                      alt={
                        getPhotograph(programPhotoIds[dialog.program.id]).alt
                      }
                      fill
                      sizes="(max-width:760px) 100vw, 880px"
                      loading="eager"
                    />
                    <div />
                    <span className="mini-label">{dialog.program.label}</span>
                  </div>
                  <MotionPlayer
                    kind="program"
                    input={{ programId: dialog.program.id }}
                    autoPlay
                    label={`Animated explainer for ${dialog.program.name}`}
                  />
                  <div className="modal-content">
                    <span className="mini-label">{dialog.program.label}</span>
                    <h2>{dialog.program.name}</h2>
                    <p>{dialog.program.detail}</p>
                    <div className="modal-meta">
                      <span>{dialog.program.level}</span>
                      <span>{dialog.program.frequency}</span>
                      <span>{dialog.program.duration} / session</span>
                    </div>
                    <div className="focus-tags">
                      {dialog.program.focus.map((x) => (
                        <span key={x}>
                          <Icon name="check" size={14} />
                          {x}
                        </span>
                      ))}
                    </div>
                    <p className="fine-print">
                      Suggested routine; your coach can tailor the approach to
                      your needs.
                    </p>
                    <AnimatedButton onClick={() => book("program_explainer")}>
                      Try this program
                    </AnimatedButton>
                  </div>
                </div>
              )}
          </Modal>
        )}
      </SceneRuntimeProvider>
    </MotionConfig>
  );
}
