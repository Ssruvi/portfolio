// Every fact here comes from Ssruvi's résumé (Sept 2026), her public GitHub, or the live sites.
// Keep wording faithful; do not add metrics or roles that are not on record.

export const person = {
  first: "Ssruvi",
  last: "Rupani",
  name: "Ssruvi Rupani",
  role: "SDE intern at ZootechX",
  location: "Vasai, Maharashtra",
  email: "rupanissruvi@gmail.com",
  phone: "+91 90212 90517",
  phoneHref: "tel:+919021290517",
  linkedin: "https://www.linkedin.com/in/ssruvi-rupani-542351270/",
  github: "https://github.com/Ssruvi",
  githubUser: "Ssruvi",
  resume: "/Ssruvi_Rupani_Resume.pdf",
};

export const stats = [
  { value: "8.76", label: "CGPA in BTech Computer Science" },
  { value: "200+", label: "webpages built and managed at Sahu Technologies" },
  { value: "2", label: "engineering internships" },
];

export type Job = {
  id: string;
  dates: string;
  role: string;
  org: string;
  kind: string;
  current?: boolean;
  short: string;
  points: string[];
};

export const experience: Job[] = [
  {
    id: "zootechx",
    dates: "Jul 2026 – now",
    role: "SDE Intern",
    org: "ZootechX",
    kind: "Internship",
    current: true,
    short: "Websites, software and web apps built to client requirements.",
    points: [
      "Develop websites, software and web applications based on client requirements.",
      "Design and implement responsive, user-friendly interfaces and interactive features.",
      "Translate client requirements into functional and visually polished digital solutions.",
      "Collaborate on UI/UX design, frontend development, testing and deployment.",
    ],
  },
  {
    id: "djsisaca",
    dates: "Aug 2025 – Aug 2026",
    role: "Editorial Head",
    org: "DJSISACA",
    kind: "Leadership",
    short: "Ran content production for CyberSeconds and led its writers.",
    points: [
      "Led end-to-end content production for CyberSeconds and managed a team of writers to publish on time.",
      "Reviewed and edited every submission, keeping editorial standards consistent across issues.",
    ],
  },
  {
    id: "sahu",
    dates: "Jun – Aug 2023",
    role: "Web Developer Intern",
    org: "Sahu Technologies",
    kind: "Internship, remote",
    short: "200+ WordPress pages and a responsive e-commerce frontend.",
    points: [
      "Developed and managed 200+ webpages using WordPress, customising themes and plugins for better UI/UX.",
      "Built the frontend of an e-commerce website, fully responsive across devices.",
      "Followed secure coding practices, including input validation and HTTPS compliance on every deployed page.",
    ],
  },
];

export const education = [
  {
    id: "btech",
    years: "2024 – now",
    school: "Dwarkadas J. Sanghvi College of Engineering",
    course: "BTech, Computer Science and Engineering",
    focus: "IoT & Cybersecurity with Blockchain Technology",
    score: "8.76",
    scoreLabel: "CGPA",
  },
  {
    id: "diploma",
    years: "2021 – 2024",
    school: "Shri Bhagubhai Mafatlal Polytechnic",
    course: "Diploma, Computer Engineering",
    focus: "SVKM",
    score: "88.87%",
    scoreLabel: "Final score",
  },
];

export type Project = {
  id: string;
  name: string;
  when: string;
  kind: string;
  desc: string;
  tags: string[];
  shot: string;
  shotAlt: string;
  url: string;
  urlLabel: string;
  code?: string;
};

export const projects: Project[] = [
  {
    id: "creatorz",
    name: "CreatorZ",
    when: "Live",
    kind: "Brand and creator collaboration platform",
    desc: "Brands post a brief; creators, actors, musicians, comedians, podcasters and photographers answer with a 30–60 second vertical audition reel. Fees and terms are agreed directly, with no agency in between.",
    tags: ["Marketplace", "Video auditions", "Two-sided platform"],
    shot: "/work/creatorz.webp",
    shotAlt: "CreatorZ home page: creator portraits clustered around the CreatorZ wordmark, “Brands brief it. Creators make it.” along the bottom.",
    url: "https://creator-z-roan.vercel.app/",
    urlLabel: "Open live site",
  },
  {
    id: "velora",
    name: "Velora Journeys",
    when: "Live",
    kind: "Website for a luxury travel company",
    desc: "34 curated journeys across international and Indian destinations, each with a detailed itinerary, plus group tours, tailor-made holidays and enquiry built in.",
    tags: ["Marketing site", "Itineraries", "Enquiry flow"],
    shot: "/work/velora.webp",
    shotAlt: "Velora Journeys home page: “Luxury beyond destinations.” over a mountain ridge at dusk.",
    url: "https://velora-main-five.vercel.app/",
    urlLabel: "Open live site",
  },
  {
    id: "pipeline",
    name: "AI Optimization Pipeline",
    when: "Jul 2026",
    kind: "Faster, steadier, tested AI pipeline",
    desc: "Cut redundant processing, traced intermittent failures to their root causes, and added Pytest tests with a CI workflow that checks every change.",
    tags: ["Python", "Flask", "Pytest", "CI"],
    shot: "/work/pipeline.webp",
    shotAlt: "The ai_optimization_pipeline repository on GitHub, with debugging, deployment and token-optimization folders.",
    url: "https://github.com/Ssruvi/ai_optimization_pipeline",
    urlLabel: "View code",
  },
  {
    id: "reviewshield",
    name: "ReviewShield",
    when: "May 2026",
    kind: "AI-based fake review detection",
    desc: "Paste reviews, one per line, and it scores how far each can be trusted, using NLP, sentiment analysis and similarity checks.",
    tags: ["Python", "NLP", "Flask", "Transformers"],
    shot: "/work/reviewshield.webp",
    shotAlt: "ReviewShield: a review input box and an Analyze Reviews button.",
    url: "https://github.com/Ssruvi/fake-review-detector",
    urlLabel: "View code",
  },
  {
    id: "spothole",
    name: "SpotHole",
    when: "Mar 2024",
    kind: "Pothole reporting with a live map",
    desc: "Built the frontend and the interactive geolocation map for reporting potholes in real time. As a team, we cut average reporting time by about 40%.",
    tags: ["Node.js", "MySQL", "Geolocation API", "Team project"],
    shot: "/work/spothole.webp",
    shotAlt: "SpotHole home page: a road with a deep, water-filled pothole in the foreground.",
    url: "https://github.com/Ssruvi/SpotHole",
    urlLabel: "View code",
  },
];

export type Skill = { name: string; group: string; where?: string };

export const skillGroups = ["Languages", "Frontend", "Backend", "Data", "Tools"] as const;

export const skills: Skill[] = [
  { name: "Python", group: "Languages", where: "ReviewShield, AI Optimization Pipeline" },
  { name: "JavaScript", group: "Languages", where: "SpotHole, client work at ZootechX" },
  { name: "SQL", group: "Languages", where: "SpotHole" },
  { name: "C", group: "Languages", where: "Coursework" },
  { name: "HTML5", group: "Frontend", where: "Every site here" },
  { name: "CSS3", group: "Frontend", where: "Every site here" },
  { name: "React.js", group: "Frontend" },
  { name: "WordPress", group: "Frontend", where: "200+ pages at Sahu Technologies" },
  { name: "Node.js", group: "Backend", where: "SpotHole" },
  { name: "Express.js", group: "Backend" },
  { name: "Flask", group: "Backend", where: "AI Optimization Pipeline, ReviewShield" },
  { name: "MySQL", group: "Data", where: "SpotHole" },
  { name: "MongoDB", group: "Data" },
  { name: "Pandas", group: "Data", where: "Data analysis coursework" },
  { name: "NumPy", group: "Data", where: "Data analysis coursework" },
  { name: "OpenCV", group: "Data", where: "Computer vision coursework" },
  { name: "Git", group: "Tools", where: "Every project" },
  { name: "GitHub", group: "Tools", where: "github.com/Ssruvi" },
  { name: "Vercel", group: "Tools", where: "CreatorZ, Velora Journeys" },
  { name: "Pytest", group: "Tools", where: "AI Optimization Pipeline" },
];
