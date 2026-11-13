export type GoalId =
  | "muscle"
  | "fat-loss"
  | "strength"
  | "endurance"
  | "mobility";
export type PlanId = "basic" | "premium" | "plus";
export type FitnessGoal = {
  id: GoalId;
  title: string;
  shortTitle: string;
  summary: string;
  programId: string;
  membershipId: PlanId;
  weeklyFrequency: string;
  color: string;
  icon: string;
};
export const goals: FitnessGoal[] = [
  {
    id: "muscle",
    title: "Build muscle",
    shortTitle: "Muscle",
    summary: "Build a stronger foundation, one purposeful rep at a time.",
    programId: "muscle-building",
    membershipId: "premium",
    weeklyFrequency: "3–4 days / week",
    color: "#eac76e",
    icon: "dumbbell",
  },
  {
    id: "fat-loss",
    title: "Lose weight",
    shortTitle: "Fat loss",
    summary:
      "Find a sustainable rhythm with strength, cardio, and better habits.",
    programId: "fat-loss",
    membershipId: "premium",
    weeklyFrequency: "3–4 days / week",
    color: "#f0a87a",
    icon: "flame",
  },
  {
    id: "strength",
    title: "Improve strength",
    shortTitle: "Strength",
    summary:
      "Move with purpose. Develop technique, confidence, and everyday strength.",
    programId: "personal-training",
    membershipId: "plus",
    weeklyFrequency: "3 days / week",
    color: "#c4b2ed",
    icon: "zap",
  },
  {
    id: "endurance",
    title: "Increase endurance",
    shortTitle: "Endurance",
    summary:
      "Build your stamina with adaptable circuits and athletic movement.",
    programId: "conditioning",
    membershipId: "basic",
    weeklyFrequency: "3 days / week",
    color: "#89cabb",
    icon: "activity",
  },
  {
    id: "mobility",
    title: "Improve mobility",
    shortTitle: "Mobility",
    summary:
      "Create space to move better through control, balance, and strength.",
    programId: "mobility",
    membershipId: "basic",
    weeklyFrequency: "2–3 days / week",
    color: "#a6c4e9",
    icon: "waves",
  },
];
export const programs = [
  {
    id: "muscle-building",
    goalId: "muscle" as GoalId,
    name: "Strength & muscle building",
    number: "01",
    label: "BUILD YOUR FOUNDATION",
    summary: "A little stronger. Every single session.",
    detail:
      "Progressive resistance work, thoughtful technique, and a routine that grows with you.",
    level: "All levels",
    frequency: "3–4 days / week",
    duration: "45–60 min",
    approach: "Progressive strength sessions",
    focus: ["Technique", "Progressive overload", "Consistency"],
    icon: "dumbbell",
  },
  {
    id: "fat-loss",
    goalId: "fat-loss" as GoalId,
    name: "Fat loss & fitness",
    number: "02",
    label: "FIND YOUR RHYTHM",
    summary: "Build habits that go beyond the gym.",
    detail:
      "A balanced blend of strength and cardio with practical, sustainable habit guidance.",
    level: "Beginner friendly",
    frequency: "3–4 days / week",
    duration: "45–60 min",
    approach: "Strength, cardio & habit support",
    focus: ["Balanced movement", "Healthy habits", "Accountability"],
    icon: "flame",
  },
  {
    id: "personal-training",
    goalId: "strength" as GoalId,
    name: "Personal training",
    number: "03",
    label: "ALL ABOUT YOU",
    summary: "Your ambition. A plan of your own.",
    detail:
      "Focused one-to-one guidance, adapted to your experience, movement, and training goals.",
    level: "All levels",
    frequency: "3 days / week",
    duration: "60 min",
    approach: "Dedicated one-to-one coaching",
    focus: ["Personal guidance", "Strength", "Form & feedback"],
    icon: "zap",
  },
  {
    id: "conditioning",
    goalId: "endurance" as GoalId,
    name: "Fitness & conditioning",
    number: "04",
    label: "GO A LITTLE FURTHER",
    summary: "More energy for the life you lead.",
    detail:
      "Functional circuits and scalable conditioning to develop stamina and body control.",
    level: "Scalable intensity",
    frequency: "3 days / week",
    duration: "45 min",
    approach: "Functional circuits & conditioning",
    focus: ["Stamina", "Athletic movement", "Work capacity"],
    icon: "activity",
  },
  {
    id: "mobility",
    goalId: "mobility" as GoalId,
    name: "Strength & mobility",
    number: "05",
    label: "FREEDOM TO MOVE",
    summary: "Feel stronger in every movement.",
    detail:
      "Controlled strength work paired with mobility, balance, and recovery-focused movement.",
    level: "All levels",
    frequency: "2–3 days / week",
    duration: "45 min",
    approach: "Controlled strength & mobility",
    focus: ["Range of motion", "Balance", "Body control"],
    icon: "waves",
  },
];
export type Program = (typeof programs)[number];
export const plans = [
  {
    id: "basic" as PlanId,
    name: "Basic",
    price: "4,999",
    amount: 4999,
    tagline: "Make your first move.",
    bestFor: "Independent training & a strong routine",
    features: [
      "Access to all workout areas",
      "Standard training support",
      "Group fitness sessions",
      "Member app & progress tracking",
    ],
    icon: "dumbbell",
  },
  {
    id: "premium" as PlanId,
    name: "Premium",
    price: "7,999",
    amount: 7999,
    tagline: "A little more direction.",
    bestFor: "A personal plan & consistent guidance",
    features: [
      "Everything in Basic",
      "Personalized training plan",
      "Nutrition & habit guidance",
      "Priority trainer access",
      "Body composition & progress check",
    ],
    icon: "crown",
  },
  {
    id: "plus" as PlanId,
    name: "Premium Plus",
    price: "11,999",
    amount: 11999,
    tagline: "Your goals. Our full focus.",
    bestFor: "Dedicated one-to-one coaching",
    features: [
      "Everything in Premium",
      "Dedicated personal training",
      "Advanced programming",
      "Monthly fitness assessment",
      "Exclusive member events",
    ],
    icon: "diamond",
  },
];
export const pillars = [
  {
    title: "Coaching",
    detail:
      "Clear guidance and thoughtful technique, wherever you are in your journey.",
    icon: "award",
  },
  {
    title: "Training",
    detail:
      "Purposeful sessions that connect your effort to your personal goals.",
    icon: "dumbbell",
  },
  {
    title: "Nutrition guidance",
    detail:
      "Practical support for everyday habits that complement your training.",
    icon: "heart",
  },
  {
    title: "Progress tracking",
    detail:
      "Regular check-ins to reflect, adjust your plan, and keep moving forward.",
    icon: "chart",
  },
  {
    title: "Community",
    detail:
      "A welcoming environment that makes showing up feel a little easier.",
    icon: "users",
  },
];
export const journey = [
  {
    title: "Assessment",
    text: "Start with a conversation about your goals, experience, and how you like to move.",
    label: "UNDERSTAND YOUR START",
    icon: "target",
  },
  {
    title: "Personalized plan",
    text: "Find a practical training direction that fits your starting point and weekly routine.",
    label: "GIVE YOUR EFFORT DIRECTION",
    icon: "clipboard",
  },
  {
    title: "Guided training",
    text: "Build confidence with purposeful sessions, coaching cues, and manageable progression.",
    label: "SHOW UP WITH PURPOSE",
    icon: "dumbbell",
  },
  {
    title: "Progress tracking",
    text: "Check in, celebrate consistency, and adjust your approach as you develop.",
    label: "KEEP MOVING FORWARD",
    icon: "chart",
  },
];
export const firstVisit = [
  {
    title: "A warm welcome",
    text: "Get comfortable and tell us a little about yourself.",
    icon: "users",
  },
  {
    title: "Your goals",
    text: "Talk through what you want to work towards.",
    icon: "target",
  },
  {
    title: "Your starting point",
    text: "Discuss your experience and movement preferences.",
    icon: "activity",
  },
  {
    title: "Your direction",
    text: "Explore a program and membership that fit you.",
    icon: "clipboard",
  },
  {
    title: "Your first session",
    text: "Take the first step with guidance and support.",
    icon: "dumbbell",
  },
];
// Existing concept testimonials. They are explicitly identified as examples in the UI.
export const testimonials = [
  {
    name: "Bilal Ahmed",
    city: "Islamabad",
    program: "Strength & muscle building",
    initials: "BA",
    highlight: "It’s a complete fitness experience.",
    quote:
      "Areesan is more than a gym — it’s a complete fitness experience. Professional trainers, great equipment, and a motivating environment.",
    rating: 5,
  },
  {
    name: "Sara Nadeem",
    city: "Lahore",
    program: "Fat loss & fitness",
    initials: "SN",
    highlight: "I’ve never felt this fit and confident.",
    quote:
      "The personalized training and nutrition guidance made a huge difference. I’ve never felt this fit and confident before!",
    rating: 5,
  },
  {
    name: "Kashif Ali",
    city: "Karachi",
    program: "Fitness & conditioning",
    initials: "KA",
    highlight: "A very supportive team.",
    quote:
      "Excellent facilities, disciplined atmosphere, and a very supportive team. Highly recommended for anyone serious about their fitness goals.",
    rating: 5,
  },
];
export const brandFacts = [
  { value: "05", label: "Training goals" },
  { value: "03", label: "Ways to join" },
  { value: "01", label: "Stronger you" },
];
export const contact = {
  location: "DHA Phase 4, Karachi",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=DHA+Phase+4+Karachi+Pakistan",
  mapEmbed:
    "https://maps.google.com/maps?q=DHA%20Phase%204%20Karachi%20Pakistan&t=&z=14&ie=UTF8&iwloc=&output=embed",
  whatsappNumber: "923001234567",
  displayPhone: "+92 300 1234567",
};
export function whatsappUrl(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
export function getGoal(id: string) {
  return goals.find((g) => g.id === id) ?? goals[0];
}
export function getProgram(id: string) {
  return programs.find((p) => p.id === id) ?? programs[0];
}
export function getPlan(id: string) {
  return plans.find((p) => p.id === id) ?? plans[1];
}
