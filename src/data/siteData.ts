// ============================================================
// src/data/siteData.ts
// ============================================================
// All static content lives here in ONE place.
// Why? If the school changes a phone number or statistic,
// you only update it here — not hunt across 10 component files.
// This is called the "Single Source of Truth" principle.
// ============================================================

// ---------- Navigation Links ----------
export const NAV_LINKS = [
  { label: "About TIS", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Boarding Life", href: "#boarding" },
  { label: "Sports", href: "#sports" },
  { label: "Admissions", href: "#admissions" },
];

// ---------- School Statistics (shown in the stats ticker) ----------
export const STATS = [
  { value: "2012", label: "Est. Year" },
  { value: "3000+", label: "Alumni" },
  { value: "16+", label: "Sports" },
  { value: "40+", label: "Acres Campus" },
  { value: "CBSE", label: "Affiliated" },
  { value: "Class 4–12", label: "Programs" },
  { value: "100%", label: "Results" },
];

// ---------- Academic Programs ----------
export const PROGRAMS = [
  {
    id: "primary",
    title: "Primary School",
    subtitle: "Class IV – V",
    description:
      "Building curiosity, creativity, and strong fundamentals through experiential learning. A nurturing environment where young minds flourish.",
    icon: "🎨",
    color: "from-tis-teal/20 to-tis-teal/5",
    accent: "#60BAB1",
  },
  {
    id: "middle",
    title: "Middle School",
    subtitle: "Class VI – VIII",
    description:
      "Developing critical thinking, leadership, and teamwork skills. Students discover their passions through a rich co-curricular programme.",
    icon: "🔬",
    color: "from-tis-gold/20 to-tis-gold/5",
    accent: "#c09d59",
  },
  {
    id: "secondary",
    title: "Secondary School",
    subtitle: "Class IX – X",
    description:
      "CBSE curriculum with rigorous academic preparation, career counselling, and holistic development to face board examinations with confidence.",
    icon: "📚",
    color: "from-tis-red/20 to-tis-red/5",
    accent: "#b90124",
  },
  {
    id: "senior",
    title: "Senior Secondary",
    subtitle: "Class XI – XII",
    description:
      "Science, Commerce & Humanities streams with specialised faculty, university counselling, and competitive exam preparation (JEE, NEET, CUET).",
    icon: "🎓",
    color: "from-purple-500/20 to-purple-500/5",
    accent: "#8B5CF6",
  },
];

// ---------- Sports Offered ----------
export const SPORTS = [
  "Archery", "Swimming", "Polo", "Karate",
  "Yoga", "Dance", "Basketball", "Cricket",
  "Football", "Tennis", "Athletics", "Badminton",
  "Shooting", "Horse Riding", "Rock Climbing", "Chess",
];

// ---------- Testimonials ----------
export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "We feel supported in what we do and nudged further to do more. Tulas gave our child the wings to dream bigger than we imagined.",
    author: "Priya Sharma",
    role: "Parent, Class X",
    avatar: "PS",
  },
  {
    id: 2,
    quote:
      "Tulas helped me thrive and become the best version of myself. The teachers here genuinely care about every student's growth.",
    author: "Aryan Mehta",
    role: "Alumni, 2022 Batch",
    avatar: "AM",
  },
  {
    id: 3,
    quote:
      "The campus, the facilities, the faculty — everything exceeded our expectations. TIS truly is one of India's finest boarding schools.",
    author: "Rajesh Kumar",
    role: "Parent, Class VII",
    avatar: "RK",
  },
];

// ---------- Contact Information ----------
export const CONTACT = {
  phone: "+91-9837983791",
  landline: "0135-2699444",
  email: "info@tis.edu.in",
  address: "Dhoolkot, P.O – Selaqui, Chakrata Road, Dehradun - 248011 (Uttarakhand)",
  googleMapsUrl: "https://maps.app.goo.gl/maBF8syXueQkw31E6",
  admissionUrl: "https://admission.tis.edu.in",
  social: {
    facebook: "https://www.facebook.com/tulasinternationalschool/",
    instagram: "https://www.instagram.com/tulasinternationalschool/",
    youtube: "https://www.youtube.com/channel/UC-eRtybnv3GvfvcWxQq93zw",
  },
};
