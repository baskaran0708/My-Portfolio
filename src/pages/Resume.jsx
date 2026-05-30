import { Link } from "react-router-dom";
import {
  FaDownload, FaPrint, FaShieldHalved, FaArrowLeft,
  FaFilePdf, FaEnvelope, FaGithub, FaLinkedin,
  FaLocationDot, FaGraduationCap, FaCode,
} from "react-icons/fa6";

const RESUME_URL = import.meta.env.VITE_RESUME_URL || "";

const getEmbedUrl = (url) => {
  if (!url) return null;
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : null;
};

const embedUrl = getEmbedUrl(RESUME_URL);

/* ── Page ────────────────────────────────────────────────────────────────── */
const ResumePage = () => (
  <div className="min-h-screen" style={{ background: "rgb(0,3,25)" }}>

    {/* ── Dark header ── */}
    <div className="no-print max-w-5xl mx-auto px-5 sm:px-10 pt-6 sm:pt-8 pb-8 sm:pb-10">

      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium mb-6 sm:mb-8 transition-colors"
        style={{ color: "rgba(255,255,255,0.45)" }}
        onMouseEnter={e => e.currentTarget.style.color = "#fff"}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
      >
        <FaArrowLeft size={11} /> Back to Portfolio
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] mb-2"
            style={{ color: "#00c6ff" }}>
            <span className="inline-block w-6 h-px" style={{ background: "#00c6ff" }} />
            My Credentials
          </p>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-2 tracking-tight">Resume</h1>
          <p className="text-xs sm:text-base font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
            Baskaran A — Software Engineer Resume
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold"
            style={{
              border: "1.5px solid #00f5a0", color: "#00f5a0",
              background: "rgba(0,245,160,0.06)", boxShadow: "0 0 14px rgba(0,245,160,0.18)",
            }}>
            <FaShieldHalved size={12} />
            ATS Score: <span className="font-black">97 / 100</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {RESUME_URL && (
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ background: "linear-gradient(135deg,#00c6ff,#0072ff)", color: "#fff" }}>
              <FaDownload size={12} /> Download PDF
            </a>
          )}
          <button onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all hover:bg-white/[0.08]"
            style={{ border: "1px solid rgba(255,255,255,0.28)", color: "#fff" }}>
            <FaPrint size={12} /> Print
          </button>
        </div>
      </div>
    </div>

    {/* ── Content area ── */}
    <div className="max-w-5xl mx-auto px-3 sm:px-6 pb-20">

      {embedUrl ? (
        <>
          {/* ── DESKTOP / TABLET: live iframe embed ── */}
          <div
            className="hidden sm:block w-full rounded-2xl overflow-hidden shadow-2xl bg-white"
            style={{ height: "clamp(600px, 88vh, 1040px)" }}
          >
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              title="Baskaran A — Resume PDF"
              allow="autoplay"
              loading="lazy"
            />
          </div>

          {/* ── MOBILE: summary card + open button ──
               PDFs inside iframes on mobile show a broken sidebar and are
               hard to read. Better UX: show key info + link to full PDF.  */}
          <div className="sm:hidden flex flex-col gap-4">

            {/* Summary card */}
            <div className="bg-white rounded-2xl shadow-md px-6 py-7">

              {/* Name + role */}
              <h2 className="text-2xl font-black text-slate-900 leading-tight">BASKARAN A</h2>
              <p className="text-sm font-bold mt-0.5 mb-4" style={{ color: "#0072ff" }}>
                Backend Software Engineer · AI/ML Engineer
              </p>

              {/* Contact row */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs mb-4" style={{ color: "#0072ff", fontFamily: "monospace" }}>
                <a href="mailto:baskaran030708@gmail.com" className="flex items-center gap-1">
                  <FaEnvelope size={9} /> baskaran030708@gmail.com
                </a>
                <a href="https://github.com/baskaran0708" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  <FaGithub size={9} /> baskaran0708
                </a>
                <a href="https://www.linkedin.com/in/baskaran-a-b6757625a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  <FaLinkedin size={9} /> linkedin/baskaran-a
                </a>
                <span className="flex items-center gap-1 text-slate-500">
                  <FaLocationDot size={9} /> Chennai, India
                </span>
              </div>

              <hr className="border-cyan-400 border-t-2 mb-4" />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { icon: FaGraduationCap, label: "MCA CGPA",      value: "9.3 / 10"         },
                  { icon: FaCode,          label: "DSA Problems",   value: "350+"             },
                  { icon: FaLocationDot,   label: "Experience",     value: "1+ yr production" },
                  { icon: FaShieldHalved,  label: "ATS Score",      value: "97 / 100"         },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Icon size={13} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
                      <p className="text-sm font-bold text-slate-800">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stack highlight */}
              <div className="flex flex-wrap gap-1.5">
                {["C++17/20","DCMTK","Kafka","PyTorch","ONNX","React","Spring Boot","Docker"].map(t => (
                  <span key={t} className="px-2 py-0.5 text-[10px] font-semibold rounded-full border border-blue-100 bg-blue-50 text-blue-600">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Big open PDF button */}
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-base text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#00c6ff,#0072ff)" }}
            >
              <FaFilePdf size={18} /> Open Full Resume PDF
            </a>

            <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              Opens in Google Drive · Free to view &amp; download
            </p>
          </div>
        </>
      ) : (
        <div className="w-full rounded-2xl bg-white flex flex-col items-center justify-center gap-4 py-24 px-6">
          <FaFilePdf size={48} className="text-slate-300" />
          <p className="text-slate-500 font-semibold">Resume not configured</p>
          <p className="text-slate-400 text-sm text-center max-w-xs">
            Add <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">VITE_RESUME_URL</code> to
            your <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">.env</code> file.
          </p>
        </div>
      )}

      {/* Update hint (desktop only) */}
      <p className="hidden sm:block text-center text-xs mt-4" style={{ color: "rgba(255,255,255,0.18)" }}>
        To update: upload new PDF to Google Drive → copy share link → set VITE_RESUME_URL in .env → redeploy
      </p>
    </div>
  </div>
);

export default ResumePage;
