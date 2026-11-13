"use client";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { plans, type PlanId } from "@/lib/content";
import SceneViewport from "../three/SceneViewport";
import { AnimatedButton, Icon, SectionHeading } from "../ui/Primitives";
export default function MembershipSection({
  selected,
  onSelect,
  onBook,
  recommended,
}: {
  selected: PlanId;
  onSelect: (p: PlanId) => void;
  onBook: () => void;
  recommended: PlanId;
}) {
  const index = plans.findIndex((p) => p.id === selected),
    plan = plans[index],
    drag = useRef<number | null>(null);
  function move(n: number) {
    onSelect(plans[(index + n + 3) % 3].id);
  }
  return (
    <section id="membership" className="section membership-section">
      <div className="container">
        <div className="heading-row">
          <SectionHeading
            number="04"
            eyebrow="YOUR COMMITMENT, YOUR WAY"
            title={
              <>
                Choose your
                <br />
                <em>next chapter.</em>
              </>
            }
            text="A little independence. A little guidance. Or a coach by your side."
          />
          <span className="pricing-caption">
            MONTHLY MEMBERSHIPS
            <br />
            <b>INVEST IN YOURSELF.</b>
          </span>
        </div>
        <div className="membership-layout">
          <div
            className="membership-stage"
            onPointerDown={(e) => {
              drag.current = e.clientX;
            }}
            onPointerUp={(e) => {
              if (
                drag.current !== null &&
                Math.abs(e.clientX - drag.current) > 45
              )
                move(e.clientX < drag.current ? 1 : -1);
              drag.current = null;
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
          >
            <div className="panel-corner">
              THE MEMBERSHIP COLLECTION <span>01—03</span>
            </div>
            <SceneViewport
              id="membership-podium"
              kind="membership"
              selected={index}
              onSelect={(i) => onSelect(plans[i].id)}
              label={`Interactive membership podium, ${plan.name} selected`}
            />
            <div
              className="plan-switcher"
              role="group"
              aria-label="Compare membership plans"
            >
              {plans.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => onSelect(p.id)}
                  aria-pressed={p.id === selected}
                >
                  <Icon name={p.icon} size={18} />
                  <span>{p.name}</span>
                  {p.id === recommended && <i aria-label="Recommended" />}
                </button>
              ))}
            </div>
            <div className="stage-nav">
              <button
                className="circle-button"
                onClick={() => move(-1)}
                aria-label="Previous plan"
              >
                <ArrowLeft size={16} />
              </button>
              <span>SELECT A PLAN · SWIPE TO EXPLORE</span>
              <button
                className="circle-button"
                onClick={() => move(1)}
                aria-label="Next plan"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div className="plan-detail" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.22 }}
              >
                <span className="plan-recommend-tag">
                  {selected === recommended
                    ? "RECOMMENDED FOR YOUR PREFERENCES"
                    : selected === "premium"
                      ? "THE AREESAN SIGNATURE"
                      : "YOUR TRAINING, YOUR CHOICE"}
                </span>
                <div className="plan-name">
                  <Icon name={plan.icon} size={33} />
                  <h3>{plan.name}</h3>
                </div>
                <p className="plan-tagline">{plan.tagline}</p>
                <div className="plan-price">
                  <span>PKR</span>
                  {plan.price}
                  <small>/ month</small>
                </div>
                <div className="plan-best">
                  <span>BEST FOR</span>
                  <p>{plan.bestFor}</p>
                </div>
                <ul className="plan-features">
                  {plan.features.map((x, i) => (
                    <motion.li
                      key={x}
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045 }}
                    >
                      <Check size={17} />
                      {x}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <AnimatedButton onClick={onBook} className="full-width">
              Join {plan.name}
            </AnimatedButton>
            <p className="fine-print">
              <ShieldCheck size={13} /> Start with a free trial. Decide after
              your visit.
            </p>
          </div>
        </div>
        <p className="section-note">
          Preview prices from the original concept. Confirm current pricing,
          inclusions, and availability with the gym.
        </p>
      </div>
    </section>
  );
}
