import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLocationArrow, FaGithub, FaArrowUpRightFromSquare, FaDownload, FaLinkedin, FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { socialMedia } from "../constants";
import FloatingNavbar from "../components/ui/FloatingNavbar";

/* ── Constants ────────────────────────────────────────────────────────── */
const BG = "rgb(0,3,25)";
const CARD_BG = { background: "linear-gradient(135deg, rgb(4,7,29) 0%, rgb(12,14,35) 100%)" };

const navItems = [
  { name: "Projects",   link: "#projects"   },
  { name: "Experience", link: "#experience" },
  { name: "Contact",    link: "#contact"    },
  { name: "Resume",     link: "/resume"     },
];

const FILTERS = ["All", "AI / ML", "Full Stack", "Mobile", "C++"];

/* ── Real GitHub repositories ─────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1, num: "01",
    name: "AI Tuberculosis Detection",
    tagline: "Automated TB screening from chest X-rays",
    description:
      "Deep learning pipeline for binary TB classification on annotated chest X-ray datasets. CLAHE lung enhancement, custom augmentation suite, Grad-CAM explainability. 92%+ accuracy — exported to ONNX for production inference without a Python runtime.",
    category: "AI / ML", language: "Python", langColor: "#3572A5",
    tech: ["PyTorch", "CNN", "OpenCV", "scikit-learn", "ONNX", "Jupyter"],
    github: "https://github.com/baskaran0708/AI-Tuberculosis-Detection",
    featured: true, accent: "#a78bfa",
    gradFrom: "rgba(109,40,217,0.22)", gradTo: "rgba(76,29,149,0.04)",
  },
  {
    id: 2, num: "02",
    name: "Spinal Cord Detection · U-Net",
    tagline: "Pixel-level MRI segmentation via semantic U-Net",
    description:
      "Custom U-Net trained on multi-sequence MRI volumes for spinal cord segmentation. DICOM preprocessing with SimpleITK, Dice + BCE hybrid loss, 3D volumetric post-processing for clinical-grade output.",
    category: "AI / ML", language: "Python", langColor: "#3572A5",
    tech: ["PyTorch", "U-Net", "DICOM", "SimpleITK", "NumPy", "Albumentations"],
    github: "https://github.com/baskaran0708/SpinalCordDetectionUsing_U-Net-",
    featured: true, accent: "#2dd4bf",
    gradFrom: "rgba(8,145,178,0.22)", gradTo: "rgba(21,94,117,0.04)",
  },
  {
    id: 3, num: "03",
    name: "Medical Chatbot · RAG",
    tagline: "Grounded medical Q&A via Retrieval-Augmented Generation",
    description:
      "RAG pipeline: LangChain + FAISS vector store, sentence-transformer embeddings, top-k retrieval, LLM generation with sourced medical context — eliminating hallucinations by grounding every answer in ingested clinical documents.",
    category: "AI / ML", language: "Python", langColor: "#3572A5",
    tech: ["LangChain", "RAG", "FAISS", "HuggingFace", "Python", "Jupyter"],
    github: "https://github.com/baskaran0708/MedicalChatbot-using-RAG",
    featured: true, accent: "#f472b6",
    gradFrom: "rgba(219,39,119,0.22)", gradTo: "rgba(157,23,77,0.04)",
  },
  {
    id: 4, num: "04",
    name: "Scanly — Smart OCR Scanner",
    tagline: "On-device Android OCR · 95%+ accuracy on medical docs",
    description:
      "Android app integrating Tesseract OCR with OpenCV preprocessing (binarisation, deskew, adaptive noise removal) and Google ML Kit layout detection. 95%+ accuracy on printed and semi-handwritten medical prescription documents.",
    category: "Mobile", language: "Kotlin", langColor: "#A97BFF",
    tech: ["Kotlin", "Android SDK", "Tesseract OCR", "OpenCV", "Google ML Kit", "Jetpack"],
    github: "https://github.com/baskaran0708/Scanly-App-for-OCR-",
    featured: true, accent: "#fb923c",
    gradFrom: "rgba(234,88,12,0.22)", gradTo: "rgba(154,52,18,0.04)",
  },
  {
    id: 5, num: "05",
    name: "OrthoView Pro",
    tagline: "Clinical DICOM viewer for orthopedic imaging",
    description:
      "TypeScript application for orthopedic DICOM visualization — multi-frame rendering, measurement tools, and clinical annotation workflow for radiology review of orthopedic scan series.",
    category: "Full Stack", language: "TypeScript", langColor: "#2b7489",
    tech: ["TypeScript", "React", "DICOM", "Canvas API", "Node.js"],
    github: "https://github.com/baskaran0708/ortho-view-pro",
    featured: false, accent: "#60a5fa",
    gradFrom: "rgba(37,99,235,0.22)", gradTo: "rgba(29,78,216,0.04)",
  },
  {
    id: 6, num: "06",
    name: "AI Content Detection",
    tagline: "Classify AI-generated vs human-written text",
    description:
      "Full-stack app using fine-tuned transformer models for AI content classification. TypeScript React frontend with REST API backend, real-time confidence score visualization, and batch analysis mode.",
    category: "AI / ML", language: "TypeScript", langColor: "#2b7489",
    tech: ["TypeScript", "React", "Transformers", "Node.js", "TailwindCSS"],
    github: "https://github.com/baskaran0708/Ai-Content-Detection",
    featured: false, accent: "#818cf8",
    gradFrom: "rgba(99,102,241,0.22)", gradTo: "rgba(79,70,229,0.04)",
  },
  {
    id: 7, num: "07",
    name: "AI Trip Planner",
    tagline: "Gemini AI-powered personalized itinerary generator",
    description:
      "Full-stack travel app generating day-wise itineraries with Google Gemini AI. Firebase Auth + Firestore, React + Vite frontend, hotel and place recommendations with one-click export.",
    category: "Full Stack", language: "JavaScript", langColor: "#f1e05a",
    tech: ["React", "Gemini AI", "Firebase", "JavaScript", "TailwindCSS", "Vite"],
    github: "https://github.com/baskaran0708/Ai-Trip-Planner",
    live: "https://valentines-day-website-mu.vercel.app/",
    featured: false, accent: "#34d399",
    gradFrom: "rgba(5,150,105,0.22)", gradTo: "rgba(6,95,70,0.04)",
  },
  {
    id: 8, num: "08",
    name: "Stylish E-Commerce",
    tagline: "Modern product catalog with cart and checkout",
    description:
      "Responsive e-commerce platform with dynamic product filtering, cart management, and animated checkout flow. Mobile-first design with optimised asset loading and smooth page transitions.",
    category: "Full Stack", language: "JavaScript", langColor: "#f1e05a",
    tech: ["JavaScript", "HTML5", "CSS3", "Bootstrap", "Responsive"],
    github: "https://github.com/baskaran0708/Stylish-E-Commerce-website",
    live: "https://stylish-e-commerce-website.vercel.app/",
    featured: false, accent: "#38bdf8",
    gradFrom: "rgba(2,132,199,0.22)", gradTo: "rgba(7,89,133,0.04)",
  },
  {
    id: 10, num: "10",
    name: "Valentine's Day Website",
    tagline: "Animated love-letter web experience",
    description:
      "A beautifully animated Valentine's Day web experience with interactive hearts, love messages, and silky CSS animations. Fully responsive and mobile-first with delightful micro-interactions throughout.",
    category: "Full Stack", language: "JavaScript", langColor: "#f1e05a",
    tech: ["HTML5", "CSS3", "JavaScript", "CSS Animations", "Responsive"],
    github: "https://github.com/baskaran0708/valentines-day-website",
    live: "https://valentines-day-website-mu.vercel.app/",
    featured: false, accent: "#f472b6",
    gradFrom: "rgba(219,39,119,0.22)", gradTo: "rgba(157,23,77,0.04)",
  },
  {
    id: 9, num: "09",
    name: "Space Invaders · C++",
    tagline: "Classic arcade game rebuilt in C++17 with SFML",
    description:
      "Faithful Space Invaders implementation using C++17 entity hierarchy, smooth 60 fps collision detection, wave-based difficulty scaling, and persistent high-score file I/O.",
    category: "C++", language: "C++", langColor: "#f34b7d",
    tech: ["C++17", "SFML", "OOP", "Game Loop", "Collision Detection"],
    github: "https://github.com/baskaran0708/SpaceInvadersGame",
    featured: false, accent: "#f87171",
    gradFrom: "rgba(220,38,38,0.22)", gradTo: "rgba(153,27,27,0.04)",
  },
];

/* ── Shared micro-components ──────────────────────────────────────────── */
const CatBadge = ({ label, color, small = false }) => (
  <span
    className={`inline-flex items-center rounded-full border font-semibold whitespace-nowrap
      ${small ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"}`}
    style={{ color, borderColor: `${color}40`, background: `${color}18` }}
  >
    {label}
  </span>
);

const LangDot = ({ language, color }) => (
  <span className="inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap" style={{ color: "#BEC1DD" }}>
    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
    {language}
  </span>
);

/* ── Featured card (horizontal) ───────────────────────────────────────── */
const FeaturedCard = ({ project, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: idx * 0.08 }}
    className="w-full rounded-2xl border border-white/[0.08] overflow-hidden
               flex flex-col lg:flex-row hover:border-white/[0.18] transition-colors duration-300"
    style={CARD_BG}
  >
    {/* Left — gradient visual */}
    <div
      className="relative lg:w-[38%] flex-shrink-0 min-h-[220px] flex flex-col justify-between p-8 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${project.gradFrom}, ${project.gradTo})` }}
    >
      <span
        className="absolute -bottom-6 -right-3 text-[130px] font-black leading-none select-none pointer-events-none"
        style={{ color: project.accent, opacity: 0.07 }}
      >
        {project.num}
      </span>
      <div className="relative z-10 flex flex-col gap-3">
        <CatBadge label={project.category} color={project.accent} />
        <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
          {project.name}
        </h3>
        <p className="text-sm font-medium leading-relaxed" style={{ color: project.accent }}>
          {project.tagline}
        </p>
      </div>
      <div className="relative z-10 mt-6">
        <LangDot language={project.language} color={project.langColor} />
      </div>
    </div>

    {/* Right — content */}
    <div className="flex-1 p-8 flex flex-col gap-5
                    border-t border-white/[0.06] lg:border-t-0 lg:border-l lg:border-white/[0.06]">
      <p className="text-sm leading-relaxed flex-1" style={{ color: "#BEC1DD" }}>
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 text-[11px] font-medium rounded-full border border-white/10 bg-white/[0.04]"
            style={{ color: "#BEC1DD" }}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold
                     border transition-all duration-200 hover:scale-[1.03]"
          style={{
            color: project.accent,
            borderColor: `${project.accent}40`,
            background: `${project.accent}12`,
          }}
        >
          <FaGithub size={14} /> GitHub
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold
                       transition-all duration-200 hover:scale-[1.03] hover:opacity-90"
            style={{
              color: "#0a0a1a",
              background: project.accent,
            }}
          >
            <FaArrowUpRightFromSquare size={12} /> Live Demo
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

/* ── Regular card ─────────────────────────────────────────────────────── */
const ProjectCard = ({ project, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: idx * 0.07 }}
    className="group rounded-2xl border border-white/[0.08] overflow-hidden flex flex-col
               hover:border-white/[0.2] hover:-translate-y-1 transition-all duration-300"
    style={CARD_BG}
  >
    {/* Accent line */}
    <div
      className="h-[3px]"
      style={{ background: `linear-gradient(90deg, ${project.accent}, transparent 80%)` }}
    />

    <div className="p-6 flex flex-col gap-4 flex-1">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <span
          className="text-5xl font-black leading-none select-none"
          style={{ color: project.accent, opacity: 0.12 }}
        >
          {project.num}
        </span>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <CatBadge label={project.category} color={project.accent} small />
          <LangDot language={project.language} color={project.langColor} />
        </div>
      </div>

      {/* Title + tagline */}
      <div>
        <h3 className="text-base font-bold text-white leading-snug">{project.name}</h3>
        <p className="text-xs font-medium mt-1 leading-relaxed" style={{ color: project.accent }}>
          {project.tagline}
        </p>
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed flex-1" style={{ color: "#BEC1DD" }}>
        {project.description}
      </p>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.slice(0, 5).map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 text-[10px] font-medium rounded-full border border-white/10 bg-white/[0.04]"
            style={{ color: "#BEC1DD" }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links row */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group-hover:gap-2.5"
          style={{ color: project.accent }}
        >
          <FaGithub size={12} /> GitHub <FaLocationArrow size={9} />
        </a>
        {project.live && (
          <>
            <span className="w-px h-3 bg-white/10 flex-shrink-0" />
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 hover:opacity-80"
              style={{ color: "#4ade80" }}
            >
              <FaArrowUpRightFromSquare size={10} /> Live Demo
            </a>
          </>
        )}
      </div>
    </div>
  </motion.div>
);

/* ── Hero ─────────────────────────────────────────────────────────────── */
const Hero = () => {
  return (
    <section className="relative lg:min-h-[100svh] flex flex-col lg:justify-center pt-16 sm:pt-20 lg:pt-28 pb-8 sm:pb-12 lg:pb-16 overflow-hidden w-full">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute -top-20 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-[0.07]" style={{ background: "radial-gradient(ellipse, #7c3aed, transparent)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.05]" style={{ background: "radial-gradient(ellipse, #0072ff, transparent)" }} />
      </div>

      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-5 sm:px-14 grid lg:grid-cols-2 gap-10 xl:gap-20 items-center">
        {/* ── Left: text content ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-5 sm:gap-7"
        >
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="self-start flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-semibold whitespace-nowrap"
            style={{ borderColor: "rgba(203,172,249,0.35)", background: "rgba(203,172,249,0.08)", color: "#CBACF9" }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            Available · Open to Senior Roles
          </motion.div>

          {/* Name */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] mb-2 sm:mb-3" style={{ color: "#8892A4" }}>
              Portfolio of
            </p>
            <h1 className="font-black leading-none tracking-tight whitespace-nowrap">
              <span className="text-[2.4rem] sm:text-5xl md:text-[4.5rem] xl:text-[5.2rem] text-white">
                Baskaran{" "}
                <span style={{ background: "linear-gradient(135deg,#CBACF9 20%,#0072ff 80%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  A
                </span>
              </span>
            </h1>
          </motion.div>

          {/* Role chips */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
            className="flex flex-wrap gap-1.5 sm:gap-2"
          >
            {["C++ Systems", "AI / ML", "Medical Imaging", "Backend", "Full Stack"].map((tag) => (
              <span key={tag} className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold border"
                style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#BEC1DD" }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
            className="text-sm sm:text-[0.95rem] leading-[1.75] max-w-lg"
            style={{ color: "#8892A4" }}
          >
            Backend Engineer &amp; AI/ML specialist building{" "}
            <span className="text-white font-semibold">high-performance C++ systems</span>,{" "}
            <span className="text-white font-semibold">PACS/DICOM pipelines</span>, and{" "}
            <span className="text-white font-semibold">production ML inference</span>{" "}
            for healthcare infrastructure at scale.
          </motion.p>

          {/* CTAs — 2×2 grid on mobile, flex-wrap on desktop */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 sm:gap-3"
          >
            {/* Browse Projects — full width on mobile */}
            <a href="#projects"
              className="col-span-2 sm:col-auto relative inline-flex h-11 overflow-hidden rounded-lg p-[1px] focus:outline-none">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-lg bg-slate-950 px-5 sm:px-6 text-sm font-semibold text-white gap-2">
                Browse Projects <FaLocationArrow size={11} />
              </span>
            </a>
            <a href="https://github.com/baskaran0708" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-4 sm:px-6 rounded-lg border border-white/20 bg-white/[0.05] text-white text-sm font-semibold gap-2 hover:bg-white/[0.1] transition-all"
            >
              <FaGithub size={14} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/baskaran-a-b6757625a/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-4 sm:px-6 rounded-lg border text-sm font-semibold gap-2 transition-all hover:opacity-85"
              style={{ borderColor: "rgba(10,102,194,0.5)", background: "rgba(10,102,194,0.12)", color: "#60a5fa" }}
            >
              <FaLinkedin size={14} /> LinkedIn
            </a>
            {/* View Resume — full width on mobile */}
            <Link
              to="/resume"
              className="col-span-2 sm:col-auto inline-flex items-center justify-center h-11 px-5 sm:px-6 rounded-lg text-sm font-semibold gap-2 transition-all hover:opacity-85"
              style={{ background: "linear-gradient(135deg,#CBACF9,#0072ff)", color: "#fff" }}
            >
              <FaEye size={13} /> View Resume
            </Link>
          </motion.div>

          {/* Mobile stats — inside left column, below CTAs */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:hidden grid grid-cols-4 gap-2 pt-5 border-t border-white/[0.08]"
          >
            {[
              { v: "10+", l: "Repos" },
              { v: "40%", l: "Latency ↓" },
              { v: "95%+", l: "OCR Acc." },
              { v: "9.3",  l: "MCA CGPA" },
            ].map(({ v, l }) => (
              <div key={l} className="flex flex-col items-center gap-0.5 text-center">
                <span className="text-lg sm:text-xl font-bold text-white leading-none">{v}</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wide" style={{ color: "#BEC1DD" }}>{l}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: orbit avatar + floating stat cards (desktop only) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px]">
            <div className="absolute inset-0 rounded-full"
              style={{ border: "1px solid rgba(203,172,249,0.22)", animation: "spin 14s linear infinite" }}>
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#CBACF9]"
                style={{ boxShadow: "0 0 14px #CBACF9, 0 0 28px rgba(203,172,249,0.5)" }} />
            </div>
            <div className="absolute rounded-full"
              style={{ inset: "44px", border: "1px solid rgba(0,114,255,0.2)", animation: "spin 22s linear infinite reverse" }}>
              <span className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#0072ff]"
                style={{ boxShadow: "0 0 12px #0072ff, 0 0 24px rgba(0,114,255,0.5)" }} />
            </div>
            <div className="absolute rounded-full"
              style={{ inset: "84px", border: "1px solid rgba(0,198,255,0.15)", animation: "spin 32s linear infinite" }}>
              <span className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#00c6ff]"
                style={{ boxShadow: "0 0 10px #00c6ff" }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[155px] h-[155px] rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg,rgba(203,172,249,0.1),rgba(0,114,255,0.12))",
                  border: "2px solid rgba(203,172,249,0.45)",
                  boxShadow: "0 0 60px rgba(203,172,249,0.12), inset 0 0 40px rgba(203,172,249,0.04)",
                }}
              >
                <span className="text-[2.8rem] font-black"
                  style={{ background: "linear-gradient(135deg,#CBACF9,#0072ff)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  BA
                </span>
              </div>
            </div>
            {[
              { v: "40%",  l: "Latency cut",  style: { top: "5%",    right: "-12%" } },
              { v: "1M+",  l: "HL7 messages", style: { top: "5%",    left: "-12%"  } },
              { v: "95%+", l: "OCR accuracy", style: { bottom: "5%", right: "-10%" } },
              { v: "9.3",  l: "MCA CGPA",     style: { bottom: "5%", left: "-10%"  } },
            ].map(({ v, l, style }) => (
              <div key={l} className="absolute px-4 py-3 rounded-xl text-center" style={{
                ...style,
                background: "rgba(4,7,29,0.92)",
                border: "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(14px)",
                minWidth: "88px",
              }}>
                <p className="text-xl font-extrabold text-white leading-none">{v}</p>
                <p className="text-[10px] uppercase tracking-wide mt-1" style={{ color: "#8892A4" }}>{l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Projects with filter ─────────────────────────────────────────────── */
const ProjectsSection = () => {
  const [filter, setFilter] = useState("All");

  const featured = PROJECTS.filter(
    (p) => p.featured && (filter === "All" || p.category === filter)
  );
  const regular = PROJECTS.filter(
    (p) => !p.featured && (filter === "All" || p.category === filter)
  );

  return (
    <section id="projects" className="py-20">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
          Projects & <span style={{ color: "#CBACF9" }}>Open Source</span>
        </h2>
        <p className="text-sm md:text-base max-w-xl mx-auto" style={{ color: "#BEC1DD" }}>
          From medical AI to high-performance C++ — real production code, open for review.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-12">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200"
            style={
              filter === f
                ? { borderColor: "rgba(203,172,249,0.6)", color: "#CBACF9", background: "rgba(203,172,249,0.12)" }
                : { borderColor: "rgba(255,255,255,0.12)", color: "#BEC1DD" }
            }
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-12"
        >
          {/* Featured (horizontal) */}
          {featured.length > 0 && (
            <div className="flex flex-col gap-5">
              {filter === "All" && (
                <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#CBACF9" }}>
                  ✦ Featured Projects
                </p>
              )}
              {featured.map((p, i) => (
                <FeaturedCard key={p.id} project={p} idx={i} />
              ))}
            </div>
          )}

          {/* Regular grid */}
          {regular.length > 0 && (
            <div className="flex flex-col gap-5">
              {filter === "All" && featured.length > 0 && (
                <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#BEC1DD" }}>
                  More Projects
                </p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {regular.map((p, i) => (
                  <ProjectCard key={p.id} project={p} idx={i} />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {featured.length === 0 && regular.length === 0 && (
            <p className="text-center py-24 text-sm" style={{ color: "#BEC1DD" }}>
              No projects in this category yet.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

/* ── Experience data ──────────────────────────────────────────────────── */
const EXP = [
  {
    id: 1,
    company: "Live Medica Intelligence",
    role: "Backend Software Engineer",
    period: "Jul 2024 – Present",
    accent: "#a78bfa",
    accentBg: "rgba(167,139,250,0.08)",
    desc: "Redesigned PACS pixel data path using DCMTK + Intel IPP for zero-copy CLAHE on 12/16-bit CT/MRI frames, cutting retrieval latency by 40%. Solved HL7 dual-write consistency with Transactional Outbox Pattern + Kafka Debezium CDC — millions of messages, zero loss.",
    highlights: ["40% latency cut", "1M+ HL7 messages", "Zero message loss"],
    tech: ["C++17/20", "DCMTK", "ITK", "Intel IPP", "Kafka", "RabbitMQ", "gRPC", "Nginx"],
  },
  {
    id: 2,
    company: "Live Medica Intelligence",
    role: "AI/ML Engineer — Medical Imaging",
    period: "Jul 2024 – Present",
    accent: "#2dd4bf",
    accentBg: "rgba(45,212,191,0.08)",
    desc: "Trained custom YOLO v8 on annotated DICOM datasets for vertebral segmentation. Exported to INT8 ONNX and deployed via C++ ONNX Runtime + Boost.Asio async service — sub-100ms inference, no Python runtime in production.",
    highlights: ["Sub-100ms inference", "No Python runtime", "INT8 quantised model"],
    tech: ["PyTorch", "YOLO v8", "ONNX Runtime", "Boost.Asio", "DICOM", "OpenCV"],
  },
  {
    id: 3,
    company: "Shiash Info Tech",
    role: "Java Full Stack Developer Intern",
    period: "Apr 2024 – Jul 2024",
    accent: "#60a5fa",
    accentBg: "rgba(96,165,250,0.08)",
    desc: "Diagnosed N+1 Hibernate ORM patterns causing 800ms+ response times. Fixed with JOIN FETCH + composite indexes + HikariCP tuning — 30% latency improvement. Built multi-module Spring Boot platform with JWT RBAC, deployed on AWS EC2 with Docker + Nginx.",
    highlights: ["30% latency improvement", "JWT + RBAC auth", "AWS EC2 deployment"],
    tech: ["Java", "Spring Boot", "Hibernate ORM", "Spring Security", "MySQL", "Docker", "AWS EC2"],
  },
  {
    id: 4,
    company: "Independent Project",
    role: "Android AI Developer",
    period: "2023 – 2024",
    accent: "#fb923c",
    accentBg: "rgba(251,146,60,0.08)",
    desc: "Built on-device OCR Android app combining Tesseract with OpenCV preprocessing (binarisation, deskew, adaptive noise removal) and Google ML Kit layout analysis. Achieved 95%+ accuracy on semi-handwritten medical prescription documents.",
    highlights: ["95%+ OCR accuracy", "On-device inference", "Medical doc parsing"],
    tech: ["Kotlin", "Tesseract OCR", "OpenCV", "Google ML Kit", "Android SDK", "Jetpack"],
  },
];

/* ── Work Experience ──────────────────────────────────────────────────── */
const Experience = () => (
  <section className="py-20 w-full" id="experience">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      className="text-center mb-14"
    >
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
        Work <span style={{ color: "#CBACF9" }}>Experience</span>
      </h2>
      <p className="text-sm md:text-base max-w-xl mx-auto" style={{ color: "#BEC1DD" }}>
        Production roles across healthcare AI, distributed systems, and full-stack engineering.
      </p>
    </motion.div>

    {/* Cards grid */}
    <div className="grid md:grid-cols-2 gap-5">
      {EXP.map((exp, i) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          className="group relative rounded-2xl overflow-hidden border border-white/[0.07] hover:border-white/[0.16] transition-all duration-300 hover:-translate-y-1"
          style={{ background: "linear-gradient(135deg,rgb(4,7,29) 0%,rgb(12,14,35) 100%)" }}
        >
          {/* Colour accent top bar */}
          <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${exp.accent}, transparent 75%)` }} />

          <div className="p-7 flex flex-col gap-5">
            {/* Header row */}
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: exp.accent, boxShadow: `0 0 8px ${exp.accent}` }} />
                  <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: exp.accent }}>
                    {exp.company}
                  </p>
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">{exp.role}</h3>
              </div>
              <span className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold border"
                style={{ borderColor: `${exp.accent}35`, background: exp.accentBg, color: exp.accent }}
              >
                {exp.period}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed" style={{ color: "#BEC1DD" }}>{exp.desc}</p>

            {/* Highlight chips */}
            <div className="flex flex-wrap gap-2">
              {exp.highlights.map((h) => (
                <span key={h} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold"
                  style={{ background: exp.accentBg, color: exp.accent, border: `1px solid ${exp.accent}25` }}
                >
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.accent }} />
                  {h}
                </span>
              ))}
            </div>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
              {exp.tech.map((t) => (
                <span key={t} className="px-2.5 py-1 text-[10px] font-medium rounded-full border border-white/[0.09] bg-white/[0.04]"
                  style={{ color: "#8892A4" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

/* ── Footer ───────────────────────────────────────────────────────────── */
const PageFooter = () => (
  <footer className="w-full pt-20 pb-12 relative overflow-hidden" id="contact">
    <div className="absolute left-0 -bottom-40 w-full opacity-40 pointer-events-none">
      <img src="/footer-grid.svg" alt="" className="w-full" />
    </div>

    <div className="relative z-10 flex flex-col items-center text-center gap-6 max-w-2xl mx-auto px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
        Ready to build something{" "}
        <span style={{ color: "#CBACF9" }}>impactful</span>?
      </h2>
      <p style={{ color: "#BEC1DD" }}>
        Open to senior backend, AI/ML, or full-stack roles. Let's talk.
      </p>
      <a href="mailto:baskaran030708@gmail.com" className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="relative z-10 inline-flex h-full w-full items-center justify-center rounded-lg bg-slate-950 px-8 text-sm font-semibold text-white gap-2">
          Get in touch <FaLocationArrow size={12} />
        </span>
      </a>
    </div>

    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto px-8 mt-14 border-t border-white/10 pt-8">
      <p className="text-sm" style={{ color: "#BEC1DD" }}>
        © 2025 · Baskaran A · Built with React &amp; Vite
      </p>
      <div className="flex items-center gap-3">
        {socialMedia.map((info) => (
          <a
            key={info.id}
            href={info.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 hover:border-white/30 transition-colors"
            style={{ background: "rgba(13,13,43,0.8)" }}
          >
            <img src={info.img} alt="" width={18} height={18} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

/* ── Page root ────────────────────────────────────────────────────────── */
const ProjectsPage = () => (
  <main className="min-h-screen" style={{ background: BG }}>
    <FloatingNavbar navItems={navItems} />
    {/* Hero: full viewport width — background glows span edge-to-edge */}
    <div className="w-full">
      <Hero />
    </div>
    <div className="max-w-[1480px] mx-auto sm:px-14 px-5">
      <ProjectsSection />
      <Experience />
      <PageFooter />
    </div>
  </main>
);

export default ProjectsPage;
