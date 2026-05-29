import { Link } from "react-router-dom";
import { FaDownload, FaPrint, FaShieldHalved, FaArrowLeft, FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaLocationDot } from "react-icons/fa6";

const RESUME_PDF = "https://drive.google.com/file/d/13egs4xpC8B-s55hJ8XA-tTvmV4PfrNq0/view?usp=sharing";

/* ── Resume data ─────────────────────────────────────────────────────────── */
const EXPERIENCE = [
  {
    role: "Backend Software Engineer",
    company: "Live Medica Intelligence",
    companyHref: "https://livemedica.com",
    period: "Jul 2024 – Present",
    location: "Chennai",
    points: [
      "Architected a C++ PACS backend with full DICOM viewer — C-STORE ingestion, WADO-RS serving, and metadata extraction — cutting image retrieval latency by 40% via Intel IPP-accelerated pipelines.",
      "Built a high-throughput HL7 v2.x integration plane (ORM, SIU, MDM, ADT) on Kafka, RabbitMQ, Redis, gRPC, and Mirth Connect, routing millions of messages/day between PACS, RIS, HIS, and EHR with zero message loss.",
      "Trained a custom YOLO model on annotated DICOM datasets and deployed it as a C++ ONNX inference service inside the PACS viewer for automated vertebral region detection.",
      "Tuned Nginx / OpenResty edge routing and reverse-proxy configuration for clinical-grade reliability.",
    ],
  },
  {
    role: "Java Full-Stack Engineering Intern",
    company: "Shiash Info Tech",
    companyHref: "#",
    period: "Apr 2024 – Jul 2024",
    location: "",
    points: [
      "Built secure REST services with Spring Boot + Hibernate over MySQL, with authentication via Spring Security.",
      "Shipped responsive front-ends with Bootstrap; deployed and operated services on AWS EC2.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Medical Spine Region Detection System",
    badge: "Production",
    points: ["Custom YOLO model on DICOM datasets, exported to ONNX and served via C++ for in-viewer ROI highlighting."],
    stack: "PyTorch · DCMTK · OpenCV · ONNX · C++",
  },
  {
    name: "Android AI OCR Extraction Engine",
    badge: "Production",
    points: ["On-device OCR engine combining Tesseract with OpenCV preprocessing + Google ML Kit; 95%+ accuracy on semi-handwritten medical prescriptions."],
    stack: "Kotlin · OpenCV · Tesseract · ML Kit · Android SDK",
  },
  {
    name: "AI Tuberculosis Detection System",
    badge: null,
    points: ["CNN-based binary TB classifier on chest X-ray datasets with CLAHE enhancement, Grad-CAM explainability, and ONNX export for production C++ inference."],
    stack: "PyTorch · OpenCV · scikit-learn · ONNX",
  },
  {
    name: "Spinal Cord U-Net Segmentation",
    badge: null,
    points: ["Custom U-Net trained on multi-sequence MRI for pixel-level spinal cord segmentation with Dice + BCE loss and 3D volumetric post-processing."],
    stack: "PyTorch · SimpleITK · DICOM · NumPy",
  },
  {
    name: "Medical RAG Chatbot",
    badge: null,
    points: ["Retrieval-Augmented Generation chatbot for medical Q&A with semantic vector search over clinical documents."],
    stack: "Python · LangChain · FastAPI · ChromaDB",
  },
];

const SKILLS = [
  { label: "Languages",      items: "Python, C++17/20, Java, JavaScript, TypeScript, Kotlin" },
  { label: "AI / ML",        items: "PyTorch, TensorFlow, YOLO v8, ONNX Runtime, OpenCV, scikit-learn, NumPy, Pandas" },
  { label: "C++ Ecosystem",  items: "DCMTK, ITK, Intel IPP, Boost.Asio, RapidJSON, libcurl, Qt, CMake, vcpkg" },
  { label: "Backend",        items: "Spring Boot, FastAPI, Flask, Django, Node.js, gRPC, RabbitMQ, Kafka, Redis, GraphQL" },
  { label: "Frontend",       items: "React, Tailwind CSS, Three.js, Framer Motion, TypeScript" },
  { label: "Mobile",         items: "Android SDK, Jetpack Compose, Kotlin, Google ML Kit, Tesseract OCR" },
  { label: "Databases",      items: "MySQL, PostgreSQL, MongoDB, Redis, ChromaDB" },
  { label: "DevOps & Cloud", items: "Docker, Kubernetes, AWS EC2, Nginx/OpenResty, GitHub Actions, Linux, Firebase" },
];

const CERTS = [
  { title: "Software Development Internship", issuer: "Accenture – Forage" },
  { title: "Database Management Systems",     issuer: "NPTEL – Govt. of India" },
  { title: "Full Stack Development",          issuer: "Guvi Online Platform" },
];

/* ── Sub-components ──────────────────────────────────────────────────────── */
const SectionTitle = ({ children }) => (
  <div className="mb-4 mt-1">
    <h2 className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-800 pb-2.5 border-b-2 border-cyan-500">
      {children}
    </h2>
  </div>
);

const JobEntry = ({ role, company, companyHref, period, location, points }) => (
  <div className="mb-6 last:mb-0">
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-2">
      <p className="text-sm font-bold text-slate-900">
        {role}{" "}
        {company !== "#" ? (
          <span>—{" "}
            <a href={companyHref} target="_blank" rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-semibold">
              {company}
            </a>
          </span>
        ) : (
          <span className="font-semibold text-blue-600">— {company}</span>
        )}
      </p>
      <span className="text-xs text-slate-500 flex-shrink-0 tabular-nums">
        {period}{location ? ` · ${location}` : ""}
      </span>
    </div>
    <ul className="ml-4 space-y-1.5">
      {points.map((pt, i) => (
        <li key={i} className="text-sm text-slate-700 leading-relaxed list-disc marker:text-cyan-500">
          {pt}
        </li>
      ))}
    </ul>
  </div>
);

const ProjectEntry = ({ name, badge, points, stack }) => (
  <div className="mb-5 last:mb-0">
    <div className="flex flex-wrap items-center gap-2 mb-1.5">
      <span className="text-sm font-bold text-slate-900">{name}</span>
      {badge && (
        <span className="px-2 py-0.5 text-[10px] font-semibold rounded border"
          style={{ borderColor: "#0072ff50", color: "#0072ff", background: "#0072ff0d" }}>
          {badge}
        </span>
      )}
    </div>
    <ul className="ml-4 space-y-1">
      {points.map((pt, i) => (
        <li key={i} className="text-sm text-slate-700 leading-relaxed list-disc marker:text-cyan-500">
          {pt}
        </li>
      ))}
    </ul>
    {stack && (
      <p className="text-xs text-slate-500 mt-1.5 ml-4 font-medium">{stack}</p>
    )}
  </div>
);

/* ── Page ────────────────────────────────────────────────────────────────── */
const ResumePage = () => (
  <>
    {/* Scoped print styles */}
    <style>{`
      @media print {
        .no-print { display: none !important; }
        body { background: white !important; margin: 0 !important; }
        .resume-paper {
          box-shadow: none !important;
          border-radius: 0 !important;
          max-width: 100% !important;
          padding: 0.6in 0.75in !important;
        }
      }
    `}</style>

    <div className="min-h-screen" style={{ background: "rgb(0,3,25)" }}>

      {/* ── Dark header (hidden on print) ── */}
      <div className="no-print max-w-5xl mx-auto px-5 sm:px-10 pt-8 pb-10">
        {/* Back link */}
        <Link to="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors mb-8"
          style={{ color: "rgba(255,255,255,0.45)" }}
          onMouseEnter={e => e.currentTarget.style.color = "#fff"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
        >
          <FaArrowLeft size={11} /> Back to Portfolio
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            {/* Label */}
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] mb-3"
              style={{ color: "#00c6ff" }}>
              <span className="inline-block w-8 h-px" style={{ background: "#00c6ff" }} />
              My Credentials
            </p>

            <h1 className="text-5xl sm:text-6xl font-black text-white mb-3 tracking-tight">
              Resume
            </h1>
            <p className="text-sm sm:text-base font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
              Baskaran A — Software Engineer Resume
            </p>

            {/* ATS Score */}
            <div className="mt-5 inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-bold"
              style={{
                border: "1.5px solid #00f5a0",
                color: "#00f5a0",
                background: "rgba(0,245,160,0.06)",
                boxShadow: "0 0 16px rgba(0,245,160,0.2)",
              }}>
              <FaShieldHalved size={14} />
              ATS Score: <span className="font-black">97 / 100</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ background: "linear-gradient(135deg,#00c6ff,#0072ff)", color: "#fff" }}>
              <FaDownload size={13} /> Download PDF
            </a>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:bg-white/[0.08]"
              style={{ border: "1px solid rgba(255,255,255,0.28)", color: "#fff" }}>
              <FaPrint size={13} /> Print Resume
            </button>
          </div>
        </div>
      </div>

      {/* ── Resume paper ── */}
      <div className="max-w-5xl mx-auto px-3 sm:px-6 pb-20">
        <div className="resume-paper bg-white rounded-2xl shadow-2xl px-7 py-9 sm:px-14 sm:py-12">

          {/* ── Header: Name + Contact ── */}
          <div className="mb-7">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none mb-1">
              BASKARAN A
            </h1>
            <p className="text-sm sm:text-base font-bold mb-3" style={{ color: "#0072ff" }}>
              Backend Software Engineer · AI/ML Engineer
            </p>

            {/* Contact row */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs sm:text-sm" style={{ fontFamily: "'JetBrains Mono',monospace", color: "#0072ff" }}>
              <a href="mailto:baskaran030708@gmail.com" className="flex items-center gap-1 hover:underline">
                <FaEnvelope size={10} className="flex-shrink-0" /> baskaran030708@gmail.com
              </a>
              <span className="flex items-center gap-1 text-slate-600">
                <FaPhone size={10} className="flex-shrink-0" /> +91 7305702113
              </span>
              <a href="https://github.com/baskaran0708" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                <FaGithub size={10} className="flex-shrink-0" /> github.com/baskaran0708
              </a>
              <a href="https://www.linkedin.com/in/baskaran-a-b6757625a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                <FaLinkedin size={10} className="flex-shrink-0" /> linkedin.com/in/baskaran-a
              </a>
              <span className="flex items-center gap-1 text-slate-600">
                <FaLocationDot size={10} className="flex-shrink-0" /> Chennai, India
              </span>
            </div>

            <hr className="mt-4 border-t-[2.5px]" style={{ borderColor: "#00c6ff" }} />
          </div>

          {/* ── Professional Summary ── */}
          <div className="mb-7">
            <SectionTitle>Professional Summary</SectionTitle>
            <p className="text-sm text-slate-700 leading-relaxed">
              Backend Software Engineer and AI/ML Engineer with 1+ years of production experience building
              high-performance C++ medical imaging systems, distributed HL7 healthcare data pipelines, and
              production ML inference services. Core expertise spans DCMTK-based PACS backends,
              Kafka/RabbitMQ event-driven microservices, and PyTorch + ONNX model deployment.
              MCA graduate with a CGPA of 9.3/10 from Dr. M.G.R. University; 350+ DSA problems
              solved across LeetCode and GeeksforGeeks.
            </p>
          </div>

          {/* ── Work Experience ── */}
          <div className="mb-7">
            <SectionTitle>Work Experience</SectionTitle>
            {EXPERIENCE.map((exp) => (
              <JobEntry key={exp.company} {...exp} />
            ))}
          </div>

          {/* ── Key Projects ── */}
          <div className="mb-7">
            <SectionTitle>Key Projects</SectionTitle>
            {PROJECTS.map((proj) => (
              <ProjectEntry key={proj.name} {...proj} />
            ))}
          </div>

          {/* ── Technical Skills ── */}
          <div className="mb-7">
            <SectionTitle>Technical Skills</SectionTitle>
            <div className="space-y-1.5">
              {SKILLS.map(({ label, items }) => (
                <div key={label} className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                  <span className="text-xs font-extrabold text-slate-700 sm:min-w-[110px] flex-shrink-0">
                    {label}:
                  </span>
                  <span className="text-sm text-slate-700">{items}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Education ── */}
          <div className="mb-7">
            <SectionTitle>Education</SectionTitle>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
              <p className="text-sm font-bold text-slate-900">Master of Computer Applications (MCA)</p>
              <span className="text-xs text-slate-500 tabular-nums">2022 – 2024</span>
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: "#0072ff" }}>
              Dr. M.G.R. Educational &amp; Research Institute, Chennai
            </p>
            <p className="text-sm text-slate-600">
              CGPA: <strong className="text-slate-800">9.3 / 10</strong>
              &nbsp;·&nbsp; DSA: 350+ problems solved (LeetCode &amp; GeeksforGeeks)
            </p>
          </div>

          {/* ── Certifications ── */}
          <div>
            <SectionTitle>Certifications</SectionTitle>
            <ul className="ml-4 space-y-2">
              {CERTS.map(({ title, issuer }) => (
                <li key={title} className="text-sm text-slate-700 list-disc marker:text-cyan-500">
                  <strong>{title}</strong> — {issuer}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  </>
);

export default ResumePage;
