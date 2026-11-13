import React from "react";
import { getGoal, getPlan, getProgram } from "../../lib/content";
import {
  MotionBackground,
  Label,
  palette,
  useEnter,
  VideoEmblem,
  type MotionInput,
} from "./shared";
export default function RecommendationResult({
  goalId = "muscle",
  planId = "premium",
}: MotionInput) {
  const goal = getGoal(goalId),
    plan = getPlan(planId),
    program = getProgram(goal.programId);
  const enter = useEnter(8),
    details = useEnter(35);
  return (
    <MotionBackground>
      <div
        style={{
          padding: 50,
          display: "flex",
          gap: 40,
          alignItems: "center",
          height: "100%",
          opacity: enter,
          transform: `translateY(${(1 - enter) * 20}px)`,
        }}
      >
        <div
          style={{
            flex: "0 0 210px",
            height: 280,
            border: "1px solid #92773d",
            borderRadius: 20,
            background: "linear-gradient(135deg,#554625,#111814)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <VideoEmblem size={90} />
          <div
            style={{
              fontSize: 16,
              letterSpacing: 3,
              color: palette.gold,
              marginTop: 25,
            }}
          >
            YOUR PLAN
          </div>
          <strong style={{ fontSize: 27, marginTop: 12, textAlign: "center" }}>
            {plan.name}
          </strong>
        </div>
        <div style={{ opacity: details }}>
          <Label>BUILT AROUND YOUR AMBITION</Label>
          <div style={{ fontSize: 18, color: palette.muted, marginTop: 28 }}>
            YOUR GOAL
          </div>
          <h1
            style={{ fontSize: 51, letterSpacing: -2, margin: "10px 0 24px" }}
          >
            {goal.title}
          </h1>
          <div style={{ fontSize: 18, color: palette.muted }}>
            RECOMMENDED PROGRAM
          </div>
          <h2 style={{ fontSize: 27, margin: "10px 0 25px", fontWeight: 500 }}>
            {program.name}
          </h2>
          <div style={{ fontSize: 18, color: palette.gold }}>
            Next step: your free trial ↗
          </div>
        </div>
      </div>
    </MotionBackground>
  );
}
