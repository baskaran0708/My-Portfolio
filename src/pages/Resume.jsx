import { Link } from "react-router-dom";
import { FaDownload, FaPrint, FaShieldHalved, FaArrowLeft, FaFilePdf } from "react-icons/fa6";

/*
  Resume URL lives in .env as VITE_RESUME_URL.
  To update the resume: upload a new PDF to Google Drive, share it publicly,
  paste the new share URL in .env → both Download button AND the preview
  refresh automatically with zero code changes.

  Google Drive share URL:  .../file/d/FILE_ID/view?usp=sharing
  Google Drive embed URL:  .../file/d/FILE_ID/preview
*/
const RESUME_URL = import.meta.env.VITE_RESUME_URL || "";

/** Extract FILE_ID from any Google Drive URL and return an embeddable URL */
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
    <div className="no-print max-w-5xl mx-auto px-5 sm:px-10 pt-8 pb-10">

      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors"
        style={{ color: "rgba(255,255,255,0.45)" }}
        onMouseEnter={e => e.currentTarget.style.color = "#fff"}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
      >
        <FaArrowLeft size={11} /> Back to Portfolio
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
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

        <div className="flex flex-wrap gap-3">
          {RESUME_URL ? (
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ background: "linear-gradient(135deg,#00c6ff,#0072ff)", color: "#fff" }}
            >
              <FaDownload size={13} /> Download PDF
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold opacity-40"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}>
              <FaFilePdf size={13} /> No URL set
            </span>
          )}
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:bg-white/[0.08]"
            style={{ border: "1px solid rgba(255,255,255,0.28)", color: "#fff" }}
          >
            <FaPrint size={13} /> Print Resume
          </button>
        </div>
      </div>
    </div>

    {/* ── Resume preview: Google Drive iframe ── */}
    <div className="max-w-5xl mx-auto px-3 sm:px-6 pb-20">
      {embedUrl ? (
        <div
          className="w-full rounded-2xl overflow-hidden shadow-2xl bg-white"
          style={{ height: "clamp(500px, 85vh, 1000px)" }}
        >
          <iframe
            src={embedUrl}
            className="w-full h-full border-0"
            title="Baskaran A — Resume PDF"
            allow="autoplay"
            loading="lazy"
          />
        </div>
      ) : (
        /* Fallback when no URL is set */
        <div className="w-full rounded-2xl bg-white flex flex-col items-center justify-center gap-4 py-24">
          <FaFilePdf size={48} className="text-slate-300" />
          <p className="text-slate-500 font-semibold">Resume not configured</p>
          <p className="text-slate-400 text-sm max-w-xs text-center">
            Add <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">VITE_RESUME_URL</code> to
            your <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">.env</code> file
            with your Google Drive share link.
          </p>
        </div>
      )}

      {/* Update hint */}
      <p className="text-center text-xs mt-4" style={{ color: "rgba(255,255,255,0.2)" }}>
        To update: upload new PDF to Google Drive → copy share link → set{" "}
        <code className="text-white/30">VITE_RESUME_URL</code> in .env → redeploy
      </p>
    </div>
  </div>
);

export default ResumePage;
