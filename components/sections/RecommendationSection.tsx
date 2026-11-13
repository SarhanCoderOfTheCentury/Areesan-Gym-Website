"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, CalendarDays, Check } from "lucide-react";
import {
  getGoal,
  getPlan,
  getProgram,
  type GoalId,
  type PlanId,
} from "@/lib/content";
import { AnimatedButton } from "../ui/Primitives";
import type { Preferences } from "./GoalFinderSection";
const MotionPlayer = dynamic(() => import("../remotion/MotionPlayer"), {
  ssr: false,
});
export default function RecommendationSection({
  goalId,
  planId,
  preferences,
  onBook,
  onChat,
}: {
  goalId: GoalId;
  planId: PlanId;
  preferences: Preferences;
  onBook: () => void;
  onChat: () => void;
}) {
  const goal = getGoal(goalId),
    plan = getPlan(planId),
    program = getProgram(goal.programId),
    ref = useRef<HTMLDivElement>(null),
    inView = useInView(ref, { once: true, margin: "100px" });
  return (
    <section id="recommendation" className="section recommendation-section">
      <div className="container">
        <div className="eyebrow">
          <span className="section-index">07</span>YOUR AMBITION, WITH A LITTLE
          DIRECTION
        </div>
        <div className="recommendation-layout">
          <div className="recommendation-copy">
            <span className="recommendation-badge">
              <Check size={13} /> YOUR STARTING PLAN
            </span>
            <h2>
              A stronger you.
              <br />
              <em>A place to start.</em>
            </h2>
            <p>
              Your preferences bring us here. Explore this direction, then talk
              it through with the team.
            </p>
            <dl className="recommendation-summary">
              <div>
                <dt>Your goal</dt>
                <dd>{goal.title}</dd>
              </div>
              <div>
                <dt>Your program</dt>
                <dd>{program.name}</dd>
              </div>
              <div>
                <dt>Your membership</dt>
                <dd>
                  {plan.name}
                  <small>PKR {plan.price} / month</small>
                </dd>
              </div>
              <div>
                <dt>Your rhythm</dt>
                <dd>
                  {preferences.days} / week<small>{preferences.level}</small>
                </dd>
              </div>
            </dl>
            <div className="recommendation-actions">
              <AnimatedButton onClick={onBook}>
                Book my free trial
              </AnimatedButton>
              <button className="text-link" onClick={onChat}>
                Ask on WhatsApp <ArrowRight size={16} />
              </button>
            </div>
            <p className="fine-print">
              <CalendarDays size={13} /> Your final routine and availability are
              agreed with your coach.
            </p>
          </div>
          <div className="recommendation-visual" ref={ref}>
            <div className="recommendation-player">
              {inView && (
                <MotionPlayer
                  key={`${goalId}-${planId}`}
                  kind="recommendation"
                  input={{ goalId, planId }}
                  autoPlay
                  label={`Your starting plan: ${goal.title}, ${program.name}, ${plan.name}`}
                />
              )}
            </div>
            <div className="plan-receipt">
              <span>AREESAN / YOUR NEXT CHAPTER</span>
              <div>
                <strong>
                  Progress starts
                  <br />
                  with showing up.
                </strong>
                <span className="receipt-arrow">↗</span>
              </div>
              <div className="receipt-bottom">
                <span>DHA PHASE 4, KARACHI</span>
                <a href="#goals">
                  Refine my preferences <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
