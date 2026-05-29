import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import { CTA } from "../components";
import { experiences, skills, skillCategories } from "../constants";

const SKILL_GROUPS = [
  { label: "Languages",       type: "Language",      color: "#6366f1" },
  { label: "AI / ML",         type: "AI/ML",         color: "#a78bfa" },
  { label: "C++ Ecosystem",   type: "C++ Ecosystem", color: "#34d399" },
  { label: "Backend",         type: "Backend",       color: "#60a5fa" },
  { label: "Frontend",        type: "Frontend",      color: "#38bdf8" },
  { label: "Mobile",          type: "Mobile",        color: "#4ade80" },
  { label: "Databases",       type: "Database",      color: "#fb7185" },
  { label: "DevOps & Cloud",  type: "DevOps",        color: "#f472b6" },
  { label: "Tools & Animation", type: "Tools",       color: "#94a3b8" },
];

import "react-vertical-timeline-component/style.min.css";

/* Pill badge for a single skill */
const SkillPill = ({ name, color }) => (
  <span
    className="px-3 py-1.5 text-xs font-medium rounded-full border transition-colors select-none"
    style={{
      color,
      borderColor: `${color}35`,
      background: `${color}10`,
    }}
  >
    {name}
  </span>
);

/* Single domain card */
const DomainCard = ({ category, color, items }) => (
  <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <div className="flex items-center gap-2 mb-4">
      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
      <h5
        className="font-poppins font-semibold text-[11px] uppercase tracking-widest"
        style={{ color }}
      >
        {category}
      </h5>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.map((skill) => (
        <SkillPill key={skill} name={skill} color={color} />
      ))}
    </div>
  </div>
);

const About = () => {
  return (
    <section className="max-container overflow-x-hidden">
      {/* ── Intro ── */}
      <h1 className="head-text">
        Hello, I'm{" "}
        <span className="blue-gradient_text font-semibold drop-shadow"> Baskaran</span> 👋
      </h1>

      <div className="mt-5 flex flex-col gap-5 text-slate-500 w-full">
        <p className="leading-relaxed text-sm sm:text-base">
          Backend Software Engineer &amp; AI/ML Engineer with production experience
          in <strong className="text-slate-700">high-performance C++ systems</strong>,{" "}
          <strong className="text-slate-700">medical imaging (PACS/DICOM)</strong>, and{" "}
          <strong className="text-slate-700">distributed healthcare data pipelines</strong>.
          Currently at{" "}
          <strong className="text-slate-700">Live Medica Intelligence, Chennai</strong>{" "}
          — architecting a scalable PACS backend using DCMTK, ITK, and Intel IPP that
          reduced image retrieval latency by <strong className="text-slate-700">40%</strong>,
          and designing event-driven microservices (Kafka · RabbitMQ · gRPC) that process{" "}
          <strong className="text-slate-700">millions of HL7 v2.x healthcare messages</strong>{" "}
          with zero message loss and exactly-once delivery guarantees.
        </p>
        <p className="leading-relaxed text-sm sm:text-base">
          Experienced across the full engineering spectrum — from training custom YOLO
          object-detection models on DICOM datasets and deploying them via ONNX Runtime
          C++ inference services, to building full-stack React + Spring Boot applications
          secured with JWT and deployed on AWS EC2 behind Nginx/OpenResty. Also developed
          an on-device Android OCR engine (Tesseract + OpenCV + Google ML Kit) achieving{" "}
          <strong className="text-slate-700">95%+ accuracy</strong> on semi-handwritten
          medical documents.
        </p>
        <p className="leading-relaxed text-sm sm:text-base">
          Strong academic foundation — MCA with a{" "}
          <strong className="text-slate-700">CGPA of 9.3/10</strong> from Dr. M.G.R.
          Educational &amp; Research Institute. Solved 350+ DSA problems across
          LeetCode &amp; GeeksforGeeks. Targeting senior software engineering or ML
          engineering roles at product-focused technology companies.
        </p>
      </div>

      {/* ── Achievement strip ── */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
        {[
          { label: "Experience",       value: "1+",     sub: "years in production" },
          { label: "MCA CGPA",         value: "9.3/10", sub: "Dr. M.G.R. University" },
          { label: "DSA Problems",     value: "350+",   sub: "LeetCode & GFG" },
          { label: "OCR Accuracy",     value: "95%+",   sub: "on medical documents" },
        ].map(({ label, value, sub }) => (
          <div
            key={label}
            className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm text-center"
          >
            <p className="text-2xl font-bold blue-gradient_text">{value}</p>
            <p className="text-sm font-semibold text-slate-700 mt-0.5">{label}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── Core Technologies (3D flip blocks, grouped by ecosystem) ── */}
      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">Core Technologies</h3>
        <p className="text-slate-400 text-sm mt-1 mb-8">
          Hover each card to flip · Grouped by ecosystem.
        </p>

        {SKILL_GROUPS.map(({ label, type, color }) => {
          const group = skills.filter((s) => s.type === type);
          if (!group.length) return null;
          return (
            <div key={type} className="mb-10">
              {/* Group label */}
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                <span
                  className="font-poppins font-semibold text-xs uppercase tracking-widest"
                  style={{ color }}
                >
                  {label}
                </span>
                <span className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Flip blocks row */}
              <div className="flex flex-wrap gap-8">
                {group.map((skill) => (
                  <div key={skill.name} className="flex flex-col items-center gap-2">
                    <div className="block-container w-16 h-16">
                      <div className="btn-back rounded-xl" />
                      <div className="btn-front rounded-xl flex justify-center items-center">
                        <img
                          src={skill.imageUrl}
                          alt={skill.name}
                          className="w-1/2 h-1/2 object-contain"
                        />
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-slate-500 text-center leading-tight max-w-[64px]">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Technical Expertise by Domain ── */}
      <div className="pb-12 flex flex-col">
        <h3 className="subhead-text">Technical Expertise</h3>
        <p className="text-slate-400 text-sm mt-1 mb-8">
          Full skill map — C++ systems, Python AI/ML, medical imaging, full-stack, DevOps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {skillCategories.map((cat) => (
            <DomainCard key={cat.category} {...cat} />
          ))}
        </div>
      </div>

      {/* ── Certifications strip ── */}
      <div className="pb-10">
        <h3 className="subhead-text">Certifications</h3>
        <div className="mt-6 flex flex-wrap gap-4">
          {[
            { title: "Software Development Internship", issuer: "Accenture – Forage" },
            { title: "Database Management Systems",     issuer: "NPTEL – Govt. of India" },
            { title: "Full Stack Development",          issuer: "Guvi Online Platform" },
          ].map(({ title, issuer }) => (
            <div
              key={title}
              className="flex items-start gap-3 px-5 py-4 rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <span className="mt-1 w-2 h-2 rounded-full flex-shrink-0 bg-blue-500" />
              <div>
                <p className="text-sm font-semibold text-slate-800">{title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Work Experience timeline ── */}
      <div className="py-10 overflow-x-hidden">
        <h3 className="subhead-text">Work Experience</h3>
        <p className="text-slate-500 text-sm mt-2 max-w-2xl">
          Production experience across AI/ML engineering, distributed C++ systems,
          and full-stack development.
        </p>

        <div className="mt-8 sm:mt-12 flex">
          <VerticalTimeline>
            {experiences.map((experience) => (
              <VerticalTimelineElement
                key={experience.company_name}
                date={experience.date}
                iconStyle={{ background: experience.iconBg }}
                icon={
                  <div className="flex justify-center items-center w-full h-full">
                    <img
                      src={experience.icon}
                      alt={experience.company_name}
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                }
                contentStyle={{
                  borderBottom: "8px",
                  borderStyle: "solid",
                  borderBottomColor: experience.iconBg,
                  boxShadow: "none",
                }}
              >
                <div>
                  <h3 className="text-black text-xl font-poppins font-semibold">
                    {experience.title}
                  </h3>
                  <p className="text-black-500 font-medium text-base" style={{ margin: 0 }}>
                    {experience.company_name}
                  </p>
                </div>
                <ul className="my-5 list-disc ml-5 space-y-2">
                  {experience.points.map((point, i) => (
                    <li
                      key={`experience-point-${i}`}
                      className="text-black-500/50 font-normal pl-1 text-sm"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>

      <hr className="border-slate-200" />
      <CTA />
    </section>
  );
};

export default About;
