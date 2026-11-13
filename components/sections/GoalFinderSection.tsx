"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Target } from "lucide-react";
import { goals, getGoal, getProgram, type GoalId } from "@/lib/content";
import SceneViewport from "../three/SceneViewport";
import { AnimatedButton, Icon, SectionHeading } from "../ui/Primitives";
export type Preferences = { level: string; days: string; coaching: string };
export default function GoalFinderSection({
  goalId,
  onGoal,
  preferences,
  onPreferences,
  onBook,
}: {
  goalId: GoalId;
  onGoal: (id: GoalId) => void;
  preferences: Preferences;
  onPreferences: (p: Preferences) => void;
  onBook: () => void;
}) {
  const goal = getGoal(goalId),
    program = getProgram(goal.programId),
    index = goals.findIndex((g) => g.id === goalId);
  return (
    <section id="goals" className="section goal-section">
      <div className="container">
        <SectionHeading
          number="01"
          eyebrow="YOUR GOAL. YOUR DIRECTION."
          title={
            <>
              Every journey starts
              <br />
              with <em>a reason.</em>
            </>
          }
          text="Tell us what moves you. We’ll help you find a place to start."
        />
        <div className="goal-layout">
          <div className="goal-visual-panel">
            <div className="panel-corner">
              THE GOAL FINDER <span>01—05</span>
            </div>
            <SceneViewport
              id="goal-orbit"
              kind="goals"
              selected={index}
              color={goal.color}
              onSelect={(i) => onGoal(goals[i].id)}
              label={`Interactive orbit showing ${goal.title}`}
            />
            <div className="goal-visual-caption">
              <span className="mini-label">YOUR NEXT CHAPTER</span>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={goalId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{ color: goal.color }}
                >
                  {goal.title}
                  <ArrowUpRight size={24} />
                </motion.h3>
              </AnimatePresence>
            </div>
          </div>
          <div className="goal-controls">
            <div className="small-step">
              <span>01</span>WHAT WOULD YOU LIKE TO WORK ON?
            </div>
            <div
              className="goal-options"
              role="group"
              aria-label="Choose your fitness goal"
            >
              {goals.map((g) => (
                <button
                  key={g.id}
                  className={`goal-option ${g.id === goalId ? "selected" : ""}`}
                  aria-pressed={g.id === goalId}
                  onClick={() => onGoal(g.id)}
                >
                  <Icon name={g.icon} />
                  <span>{g.title}</span>
                  {g.id === goalId ? (
                    <Check size={17} />
                  ) : (
                    <ArrowRight size={16} />
                  )}
                </button>
              ))}
            </div>
            <div className="small-step">
              <span>02</span>MAKE IT FIT YOUR LIFE
            </div>
            <div className="preferences">
              <label>
                Your experience
                <select
                  value={preferences.level}
                  onChange={(e) =>
                    onPreferences({ ...preferences, level: e.target.value })
                  }
                >
                  <option>Just starting</option>
                  <option>Some experience</option>
                  <option>Regularly training</option>
                </select>
              </label>
              <label>
                Days per week
                <select
                  value={preferences.days}
                  onChange={(e) =>
                    onPreferences({ ...preferences, days: e.target.value })
                  }
                >
                  <option>2 days</option>
                  <option>3 days</option>
                  <option>4 days</option>
                  <option>5 days</option>
                </select>
              </label>
              <label className="coaching-select">
                Coaching preference
                <select
                  value={preferences.coaching}
                  onChange={(e) =>
                    onPreferences({ ...preferences, coaching: e.target.value })
                  }
                >
                  <option value="guided">A personal plan & guidance</option>
                  <option value="independent">
                    I like to train independently
                  </option>
                  <option value="dedicated">
                    Dedicated one-to-one coaching
                  </option>
                </select>
              </label>
            </div>
            <div className="goal-suggestion" aria-live="polite">
              <span className="suggestion-icon">
                <Target size={20} />
              </span>
              <div>
                <small>YOUR SUGGESTED PROGRAM</small>
                <strong>{program.name}</strong>
                <p>{goal.summary}</p>
              </div>
            </div>
            <div className="goal-next">
              <AnimatedButton href="#recommendation">
                See my starting plan
              </AnimatedButton>
              <button className="text-link" onClick={onBook}>
                Talk it through <ArrowRight size={16} />
              </button>
            </div>
            <p className="fine-print">
              A suggested starting point. Your coach can help adapt the details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
