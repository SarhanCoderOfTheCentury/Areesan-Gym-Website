"use client";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Download, MessageCircle } from "lucide-react";
import {
  contact,
  goals,
  plans,
  getGoal,
  getPlan,
  getProgram,
  whatsappUrl,
  type GoalId,
  type PlanId,
} from "@/lib/content";
import { track } from "@/lib/analytics";
import type { Preferences } from "./sections/GoalFinderSection";
type Enquiry = {
  name: string;
  phone: string;
  date: string;
  time: string;
  goal: string;
  plan: string;
};
export default function BookingFlow({
  goalId,
  planId,
  preferences,
}: {
  goalId: GoalId;
  planId: PlanId;
  preferences: Preferences;
}) {
  const [details, setDetails] = useState<Enquiry | null>(null),
    [draft, setDraft] = useState<Enquiry | null>(null),
    [today, setToday] = useState(""),
    [error, setError] = useState("");
  useEffect(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    setToday(d.toISOString().slice(0, 10));
  }, []);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget)) as Enquiry;
    values.name = values.name.trim();
    values.phone = values.phone.trim();
    if (values.name.length < 2) {
      setError("Please enter your name.");
      return;
    }
    const digits = values.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      setError("Enter a valid phone number (10–15 digits).");
      return;
    }
    if (new Date(`${values.date}T${values.time}`) <= new Date()) {
      setError("Choose a preferred visit time in the future.");
      return;
    }
    setError("");
    setDraft(values);
    setDetails(values);
    track("trial_enquiry_prepared", { goal: values.goal, plan: values.plan });
  }
  const goal = getGoal(details?.goal ?? goalId),
    plan = getPlan(details?.plan ?? planId),
    program = getProgram(goal.programId);
  const message = details
    ? `Hi Areesan! I’d like to arrange a free trial.\n\nName: ${details.name}\nPhone: ${details.phone}\nLocation: ${contact.location}\nPreferred visit: ${details.date} at ${details.time}\nGoal: ${goal.title}\nProgram: ${program.name}\nMembership interest: ${plan.name}\nExperience: ${preferences.level}\nTraining rhythm: ${preferences.days} per week\n\nPlease confirm availability and current membership pricing.`
    : "";
  function download() {
    const url = URL.createObjectURL(
      new Blob(
        [
          message +
            "\n\nPrepared enquiry only. The gym has not confirmed this visit.",
        ],
        { type: "text/plain" },
      ),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "areesan-trial-enquiry.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  if (details)
    return (
      <div className="booking-content">
        <span className="success-disc">
          <Check size={28} />
        </span>
        <span className="mini-label">YOUR NEXT CHAPTER IS READY</span>
        <h2>
          Your first move,
          <br />
          <em>{details.name.split(" ")[0]}.</em>
        </h2>
        <p>
          Your enquiry is ready to share. Send it on WhatsApp to arrange your
          visit; the team will confirm availability.
        </p>
        <div className="enquiry-recap">
          <div>
            <span>Location</span>
            <strong>{contact.location}</strong>
          </div>
          <div>
            <span>Preferred visit</span>
            <strong>
              {details.date} · {details.time}
            </strong>
          </div>
          <div>
            <span>Program</span>
            <strong>{program.name}</strong>
          </div>
          <div>
            <span>Membership interest</span>
            <strong>{plan.name}</strong>
          </div>
        </div>
        <p className="contact-demo-note">
          WhatsApp currently uses the original demo number,{" "}
          {contact.displayPhone}. Replace it with the gym’s verified number
          before launch.
        </p>
        <a
          className="button gold full-width"
          href={whatsappUrl(message)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track("whatsapp_enquiry_opened", { goal: goal.id, plan: plan.id })
          }
        >
          <MessageCircle size={18} /> Continue to WhatsApp{" "}
          <ArrowUpRight size={17} />
        </a>
        <div className="booking-secondary">
          <button className="text-link" onClick={() => setDetails(null)}>
            Edit my details
          </button>
          <button className="text-link" onClick={download}>
            <Download size={14} /> Save enquiry
          </button>
        </div>
      </div>
    );
  return (
    <div className="booking-content">
      <span className="mini-label">YOUR FIRST MOVE</span>
      <h2>
        Let’s find
        <br />
        <em>your stronger self.</em>
      </h2>
      <p>
        Choose a preferred visit. We’ll prepare an enquiry for you to send on
        WhatsApp.
      </p>
      <form className="booking-form" onSubmit={submit}>
        <div className="form-row">
          <label>
            Your name
            <input
              name="name"
              autoComplete="name"
              defaultValue={draft?.name}
              placeholder="Full name"
              required
              maxLength={80}
            />
          </label>
          <label>
            Phone number
            <input
              name="phone"
              autoComplete="tel"
              type="tel"
              defaultValue={draft?.phone}
              placeholder="03XX XXXXXXX"
              required
              minLength={10}
              maxLength={22}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Your goal
            <select name="goal" defaultValue={draft?.goal ?? goalId}>
              {goals.map((g) => (
                <option value={g.id} key={g.id}>
                  {g.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Membership interest
            <select name="plan" defaultValue={draft?.plan ?? planId}>
              {plans.map((p) => (
                <option value={p.id} key={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>
            Preferred date
            <input
              name="date"
              type="date"
              min={today}
              defaultValue={draft?.date}
              required
            />
          </label>
          <label>
            Preferred time
            <select name="time" defaultValue={draft?.time ?? "18:00"}>
              <option value="07:00">7:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="14:00">2:00 PM</option>
              <option value="18:00">6:00 PM</option>
              <option value="20:00">8:00 PM</option>
            </select>
          </label>
        </div>
        <p className="location-field">
          DHA Phase 4, Karachi · Please confirm the exact address with the team.
        </p>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button gold full-width" type="submit">
          Prepare my trial enquiry <ArrowUpRight size={17} />
        </button>
        <p className="fine-print">
          Your details stay in this browser until you choose to share them
          through WhatsApp. This form does not confirm a booking.
        </p>
      </form>
    </div>
  );
}
