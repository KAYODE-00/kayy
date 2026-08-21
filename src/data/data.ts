import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiFirebase,
  SiSupabase,
  SiDocker,
  SiGit,
  SiGithub,
  SiFigma,
  SiVercel,
  SiFramer,
  SiStripe,
  SiLangchain,
  SiHuggingface,
  SiPython,
  SiFastapi,
  SiRedis,
} from "react-icons/si";
import { MdEmail } from "react-icons/md";

export const about = {
  name: "Hi, I'm Kayode ",
  description:
    " who builds production-ready web applications and practical AI products. I specialize in scalable SaaS platforms, RAG systems, MCP integrations, fine-tuning workflows, and clean user experiences.",
  heroText:
    " who builds production-ready web applications and practical AI products. I specialize in scalable SaaS platforms, RAG systems, MCP integrations, fine-tuning workflows, and clean user experiences.",
  aiEngineeringText:
    "I design AI features that are useful in real products: grounded retrieval, well-scoped agent workflows, tool integrations, and evaluation-minded delivery. I focus on making models dependable, observable, and genuinely helpful for users and teams.",
  aiEngineeringStack: ["RAG", "MCP", "LangChain", "Hugging Face", "Python", "FastAPI", "PostgreSQL", "Redis"],
  softwareEngineeringText:
    "I build the foundations around the AI: responsive interfaces, secure APIs, clean databases, authentication, payments, dashboards, and deployment workflows. The goal is software that is fast to use, easy to maintain, and ready to grow.",
  softwareEngineeringStack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "Docker", "Vercel"],
  workingStyleText:
    "I like working from the real problem outward. I clarify the user flow, choose the simplest reliable architecture, ship in focused iterations, and keep the product understandable for the people who will maintain it.",
  portraitImage: "/developer.PNG",
  aboutCardLabel: "About Me",
  workSectionTitle: "Works",
  workCardLabel: "Projects",
  stacksSectionTitle: "Stacks & Tools",
  experienceSectionTitle: "Experience",
  githubSectionTitle: "Github contribution graph",
  resumeLabel: "Resume",
  resumeUrl: "/resume.pdf",
  rotatingPrefix: "He who",
  rotatingWords: [
    "software engineer",
    "AI engineer",
  
  ],
  rotatingAlias: ["codes", "plans", "architects", "builds"],

  pageTitle: "About Me",
  subHeading: "A little about me",
  iBuildText: "I Build",
  connectTitle: "Let's Connect",
  connectSubtitle: "Ready to build something amazing together?",
  resumeText: "Resume",
  testimonialsTitle: "Testimonials",
  toolsTitle: "Tools I Use",
  githubTitle: "GitHub Contributions",
  githubSubtitle: "Last 365 days of contributions •",
  githubUsername: "kayode-00",
};

export const stats = [
  {
    number: "3+k",
    label: "Years Experience",
  },
  {
    number: "3+m.m",
    label: "SaaS Projects",
  },
  {
    number: "15+fu",
    label: "Happy Clients",
  },
];

export const testimonials = [
  {
    name: "John Doe",
    role: "CEO at StartupX",
    text: "Kayode delivered an exceptional SaaS platform that exceeded our expectations.",
    avatar: "👨‍💼",
  },
  {
    name: "Sarah Chen",
    role: "Product Manager",
    text: "Working with Kayode was a pleasure. He built a beautiful and intuitive dashboard.",
    avatar: "👩‍💼",
  },
];

export const socials = [
  {
    name: "GitHub",
    url: "https://github.com/kayode-00",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: FaLinkedin,
  },
  {
    name: "X",
    url: "https://x.com/kayodee",
    icon: FaXTwitter,
  },
  {
    name: "Email",
    url: "abdulwahabKayode001@gmail.com",
    icon: MdEmail,
  },
];

export const tools = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Prisma", icon: SiPrisma },
  { name: "Firebase", icon: SiFirebase },
  { name: "Supabase", icon: SiSupabase },
  { name: "Docker", icon: SiDocker },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "Figma", icon: SiFigma },
  { name: "Vercel", icon: SiVercel },
  { name: "Framer Motion", icon: SiFramer },
  { name: "LangChain", icon: SiLangchain },
  { name: "Hugging Face", icon: SiHuggingface },
  { name: "Python", icon: SiPython },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Redis", icon: SiRedis },
];

export const builds = [
  "SaaS Platforms",
  "AI Applications",
  "RAG Systems",
  "MCP Integrations",
  "Fine-Tuning Workflows",
  "Admin Dashboards",
  "Business Tools",
  "Click-to-Edit Builders",
  "Landing Pages",
  "E-commerce Stores",
  "CMS Platforms",
  "Developer Tools",
  "Automation Systems",
];

export const projects = [
  {
    title: "Webcrate",
    type: "personal",
    image: "/webcrate.png",
    description:
      "A specialized web builder application utilizing a unique click-to-edit interaction model rather than traditional drag-and-drop.",
    problem:
      "Makes page editing faster and more intuitive by replacing awkward drag-and-drop workflows with direct, click-to-edit interactions.",
    stack: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
    github: "#",
    live: "#",
  },
  {
    title: "Metric SaaS",
    type: "personal",
    image: "/metric.png",
    description:
      "Analytics dashboard powered by AI with authentication and payments.",
    problem:
      "Gives teams one clear place to understand product performance instead of working through disconnected metrics and reports.",
    stack: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
    github: "#",
    live: "#",
  },
  {
    title: "AI Portfolio",
    type: "nocode",
    image: "/projects/project3.png",
    description:
      "A self-aware portfolio built with Framer Motion and AI integrations.",
    problem:
      "Creates a more useful portfolio experience by giving visitors immediate, contextual answers instead of making them search static pages.",
    stack: [
      { name: "React", icon: SiReact },
      { name: "Framer Motion", icon: SiFramer },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
    github: "#",
    live: "#",
  },
];

export const workExperience = [
  {
    name: "Independent Product Engineer",
    role: "Freelance · Present",
    text: "Designing and shipping SaaS products, AI tools, dashboards, and focused digital experiences for teams and founders.",
    avatar: "01",
  },
  {
    name: "Full-stack Developer",
    role: "Contract Projects · 2023 — 2025",
    text: "Built responsive products from the first idea through production, working across interfaces, APIs, databases, and deployment.",
    avatar: "02",
  },
  {
    name: "Web Developer",
    role: "Independent · 2022 — 2023",
    text: "Created landing pages, business tools, and custom web experiences with a strong focus on clarity, performance, and maintainability.",
    avatar: "03",
  },
];
