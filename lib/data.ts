export interface Program {
  id: string;
  title: string;
  short: string;
  category: string;
  icon: string;
  raised: number;
  goal: number;
  days: number;
  donors: number;
  location: string;
  impactUnit: string;
  impactPerDollar: number;
  tone: "teal" | "amber" | "rose" | "indigo";
  story?: string;
}

export const PROGRAMS: Program[] = [
  {
    id: "clean-water-malawi",
    title: "Clean Water for Northern Malawi",
    short: "30 villages, one well at a time.",
    category: "Health",
    icon: "droplet",
    raised: 84320,
    goal: 120000,
    days: 18,
    donors: 1247,
    location: "Mzimba, Malawi",
    impactUnit: "Provides 1 day of clean water for a family",
    impactPerDollar: 1,
    tone: "teal",
    story: "Across Mzimba district, families walk an average of 6 km each day for water that often makes them sick. With local partners we're drilling 30 boreholes — each serves roughly 400 people for the next 25 years.",
  },
  {
    id: "girls-school-kenya",
    title: "Girls' Secondary Scholarships",
    short: "Tuition, books and mentorship for 240 girls.",
    category: "Education",
    icon: "book",
    raised: 46100,
    goal: 75000,
    days: 32,
    donors: 893,
    location: "Kisumu, Kenya",
    impactUnit: "Pays for 1 month of school supplies",
    impactPerDollar: 1.4,
    tone: "amber",
    story: "Only 1 in 4 girls in rural Kisumu finishes secondary school. Your gift covers tuition, transport, and after-school tutoring through graduation.",
  },
  {
    id: "mangrove-philippines",
    title: "Mangrove Restoration",
    short: "Replanting 500 hectares of coastal forest.",
    category: "Environment",
    icon: "leaf",
    raised: 132480,
    goal: 200000,
    days: 64,
    donors: 2104,
    location: "Palawan, Philippines",
    impactUnit: "Plants and protects 4 mangrove seedlings",
    impactPerDollar: 4,
    tone: "teal",
    story: "Mangroves store 4× more carbon than tropical forests and protect coastal villages from storms. We're partnering with 14 fishing communities to restore lost cover.",
  },
  {
    id: "maternal-health-india",
    title: "Mobile Maternal Health Clinics",
    short: "Pre- and post-natal care in remote districts.",
    category: "Health",
    icon: "heart",
    raised: 28940,
    goal: 60000,
    days: 11,
    donors: 612,
    location: "Jharkhand, India",
    impactUnit: "Funds one prenatal checkup",
    impactPerDollar: 0.5,
    tone: "rose",
  },
  {
    id: "solar-schools-uganda",
    title: "Solar Power for Rural Schools",
    short: "Lighting up 18 classrooms in Karamoja.",
    category: "Education",
    icon: "sparkle",
    raised: 19200,
    goal: 48000,
    days: 27,
    donors: 374,
    location: "Karamoja, Uganda",
    impactUnit: "Powers a classroom for one evening",
    impactPerDollar: 2,
    tone: "amber",
  },
  {
    id: "reef-guardians-fiji",
    title: "Reef Guardians of Fiji",
    short: "Training local rangers to monitor reefs.",
    category: "Environment",
    icon: "globe",
    raised: 51000,
    goal: 90000,
    days: 41,
    donors: 821,
    location: "Yasawa, Fiji",
    impactUnit: "Sponsors 1 hour of reef patrol",
    impactPerDollar: 1.2,
    tone: "teal",
  },
];

export const TESTIMONIALS = [
  { id: 1, name: "Amara N.", role: "Monthly donor · 3 yrs", text: "I've watched the well in my mother's village change everything. Givr keeps me close to the work — every month I get a real photo, not a stat.", initials: "AN" },
  { id: 2, name: "Rafa & Kim", role: "Family fund", text: "We started giving to one program. The transparency made it easy to keep going. Now our kids pick where the family fund goes each quarter.", initials: "RK" },
  { id: 3, name: "Jonas H.", role: "Donor since 2021", text: "It feels less like charity and more like joining a team. Updates are honest — they tell you when things go wrong, too.", initials: "JH" },
];

export const DONORS_WALL = [
  "Amara N.", "Yui T.", "Marco R.", "Kwame O.", "Lena F.", "Diego A.", "Priya S.", "Hana B.", "Otto W.", "Sara M.", "Felipe G.", "Aisha K.",
  "Mei L.", "Tomás V.", "Noor H.", "Zara P.", "Jakob E.", "Eshe O.", "Rina C.", "Liam D.", "Aki S.", "Rosa C.", "Ben K.", "Iris N.",
  "Hugo L.", "Soyini O.", "Nadia E.", "Arjun M.", "Cira P.", "Lukas B.", "Maya R.", "Elif T.",
];

export const TEAM = [
  { name: "Naledi Okafor", role: "Executive Director", initials: "NO" },
  { name: "Dr. Anand Joshi", role: "Head of Programs", initials: "AJ" },
  { name: "Sigrid Larsen", role: "Field Operations", initials: "SL" },
  { name: "Marcos Vidal", role: "Donor Relations", initials: "MV" },
];

export const PARTNERS = [
  { name: "Aurora Foundation", style: "serif" },
  { name: "Open Earth Lab", style: "mono" },
  { name: "Lumen Health", style: "sans" },
  { name: "Northwind Trust", style: "serif" },
  { name: "Rivulet.org", style: "mono" },
  { name: "Halcyon Fund", style: "sans" },
];

export const CATEGORIES = [
  { id: "all", label: "All", icon: "grid" },
  { id: "Education", label: "Education", icon: "book" },
  { id: "Health", label: "Health", icon: "heart" },
  { id: "Environment", label: "Environment", icon: "leaf" },
];

export const fmtCurrency = (n: number) => "$" + n.toLocaleString("en-US");
export const pct = (raised: number, goal: number) => Math.min(100, Math.round((raised / goal) * 100));
