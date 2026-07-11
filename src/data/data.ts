import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";
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
} from "react-icons/si";
import { MdEmail } from "react-icons/md";

export const about = {
  // Main Text
  name: "Hi, I'm Kayode 👋",
  description: "I'm a full-stack developer who enjoys building modern web applications, AI-powered products, and clean user experiences with performance in mind. I specialize in building scalable SaaS platforms and specialized tools.",
  
  // Section Headings & UI Text
  pageTitle: "About Me",
  subHeading: "About Me",
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
  { number: "3+", label: "Years Experience" },
  { number: "3+", label: "SaaS Projects" }, 
  { number: "15+", label: "Happy Clients" },
  { number: "99%", label: "On-Time Delivery" },
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
];

export const builds = [
  "SaaS Platforms",
  "AI Applications",
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
    description: "A specialized web builder application utilizing a unique click-to-edit interaction model rather than traditional drag-and-drop.",
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
    description: "Analytics dashboard powered by AI with authentication and payments.",
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
    description: "A self-aware portfolio built with Framer Motion and AI integrations.",
    stack: [
      { name: "React", icon: SiReact },
      { name: "Framer Motion", icon: SiFramer },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
    github: "#",
    live: "#",
  },
];