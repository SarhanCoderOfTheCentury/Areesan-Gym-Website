// All original generated photographs are kept in their original WebP format.
export const photographs = [
  {
    id: "hero",
    title: "Training with purpose",
    category: "The Areesan experience",
    alt: "Black-and-gold gym concept with a coach guiding strength training and a woman using a cable machine.",
    width: 1672,
    height: 941,
  },
  {
    id: "muscle",
    title: "Muscle building",
    category: "Programs",
    alt: "Athlete performing a dumbbell curl in a warm, gold-lit gym concept.",
    width: 800,
    height: 1000,
  },
  {
    id: "fat-loss",
    title: "Fat loss & wellness",
    category: "Programs",
    alt: "Woman in a black sports hijab and gold-trimmed training clothes in a gym concept.",
    width: 800,
    height: 1000,
  },
  {
    id: "boxing",
    title: "Focused personal training",
    category: "Programs",
    alt: "Athlete wearing boxing gloves in a black-and-gold training environment.",
    width: 960,
    height: 1200,
  },
  {
    id: "conditioning",
    title: "Fitness & conditioning",
    category: "Programs",
    alt: "Athlete training with battle ropes beneath warm gym lighting.",
    width: 800,
    height: 1000,
  },
  {
    id: "mobility",
    title: "Strength & mobility",
    category: "Programs",
    alt: "Woman in a sports hijab performing a seated mobility exercise in a premium gym concept.",
    width: 800,
    height: 1000,
  },
  {
    id: "personal",
    title: "A personal approach to coaching",
    category: "Coaching",
    alt: "Male trainer concept portrait with folded arms in a warmly lit boxing gym.",
    width: 800,
    height: 1000,
  },
  {
    id: "transformation-man",
    title: "A stronger routine",
    category: "Illustrative progress portraits",
    alt: "Two side-by-side generated male fitness progress portraits from the original Areesan concept.",
    width: 1000,
    height: 667,
  },
  {
    id: "transformation-woman",
    title: "Confidence in movement",
    category: "Illustrative progress portraits",
    alt: "Two side-by-side generated female fitness progress portraits from the original Areesan concept.",
    width: 1000,
    height: 667,
  },
  {
    id: "strength-zone",
    title: "Strength training zone",
    category: "Facility concept",
    alt: "Black-and-gold dumbbell racks and a strength training area.",
    width: 1200,
    height: 675,
  },
  {
    id: "functional-zone",
    title: "Functional training area",
    category: "Facility concept",
    alt: "Open training area with black-and-gold functional training frames.",
    width: 1200,
    height: 675,
  },
  {
    id: "performance-zone",
    title: "Performance & conditioning",
    category: "Facility concept",
    alt: "Green training turf and a gold Areesan emblem in a gym concept.",
    width: 1200,
    height: 675,
  },
  {
    id: "cardio-zone",
    title: "Cardio & fitness zone",
    category: "Facility concept",
    alt: "Row of treadmills beside large windows overlooking greenery.",
    width: 1200,
    height: 675,
  },
];
export const programPhotoIds: Record<string, string> = {
  "muscle-building": "muscle",
  "fat-loss": "fat-loss",
  "personal-training": "boxing",
  conditioning: "conditioning",
  mobility: "mobility",
};
export function getPhotograph(id: string) {
  return photographs.find((p) => p.id === id) ?? photographs[0];
}
export function photoSource(id: string) {
  return `/images/${id}.webp`;
}
export const coachPortraits = [
  {
    name: "Ali Raza",
    role: "Strength & muscle building",
    photo: "personal",
    tag: "Strength training",
    program: "muscle-building",
    description:
      "A purposeful approach to technique, consistency, and a stronger training foundation.",
  },
  {
    name: "Ayesha Khan",
    role: "Fat loss & wellness",
    photo: "fat-loss",
    tag: "Women’s wellness",
    program: "fat-loss",
    description:
      "An encouraging approach to balanced movement and habits you can keep building on.",
  },
  {
    name: "Hamza Malik",
    role: "Performance & conditioning",
    photo: "muscle",
    tag: "Athletic performance",
    program: "conditioning",
    description:
      "Adaptable training focused on endurance, body control, and showing up with intention.",
  },
];
