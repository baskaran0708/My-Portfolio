import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { FaEnvelope, FaPhone, FaLocationDot, FaGithub, FaLinkedin, FaPaperPlane, FaCircleCheck } from "react-icons/fa6";

import { Fox } from "../models";
import useAlert from "../hooks/useAlert";
import { Alert, Loader } from "../components";

/* ── Contact info items ──────────────────────────────────────────────────── */
const INFO = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "baskaran030708@gmail.com",
    href: "mailto:baskaran030708@gmail.com",
    color: "#3b82f6",
    bg: "#eff6ff",
  },
  {
    icon: FaPhone,
    label: "Phone",
    value: "+91 7305702113",
    href: "tel:+917305702113",
    color: "#10b981",
    bg: "#f0fdf4",
  },
  {
    icon: FaLocationDot,
    label: "Location",
    value: "Chennai, Tamil Nadu, India",
    href: null,
    color: "#f59e0b",
    bg: "#fffbeb",
  },
];

/* ── Styled input wrapper ────────────────────────────────────────────────── */
const Field = ({ label, icon: Icon, children, required }) => (
  <div className="flex flex-col gap-1.5">
    <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
      <Icon size={13} className="text-blue-500 flex-shrink-0" />
      {label}
      {required && <span className="text-red-400 text-xs">*</span>}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 " +
  "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 " +
  "focus:border-blue-400 transition-all duration-200 shadow-sm";

/* ── Page ────────────────────────────────────────────────────────────────── */
const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  const handleChange = ({ target: { name, value } }) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleFocus = () => setCurrentAnimation("walk");
  const handleBlur  = () => setCurrentAnimation("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          to_name:    "Baskaran",
          from_email: form.email,
          to_email:   "baskaran030708@gmail.com",
          message:    form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setSent(true);
        showAlert({ show: true, text: "Message sent! I'll reply soon 🚀", type: "success" });
        setTimeout(() => {
          hideAlert();
          setSent(false);
          setCurrentAnimation("idle");
          setForm({ name: "", email: "", message: "" });
        }, 4000);
      })
      .catch((err) => {
        setLoading(false);
        console.error("EmailJS error:", err);
        setCurrentAnimation("idle");
        showAlert({ show: true, text: "Failed to send — try emailing me directly 😢", type: "danger" });
      });
  };

  return (
    <section className="max-container overflow-x-hidden">
      {alert.show && <Alert {...alert} />}

      {/* ── Page header ── */}
      <div className="mb-10 sm:mb-14">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-500 mb-2 flex items-center gap-2">
          <span className="inline-block w-6 h-px bg-blue-500" />
          Let's Talk
        </p>
        <h1 className="head-text">
          Get in{" "}
          <span className="blue-gradient_text font-semibold">Touch</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base mt-3 max-w-lg leading-relaxed">
          Have a project, role, or idea to discuss? Fill out the form below — I'll get back to
          you within 24 hours.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex flex-col lg:flex-row gap-10 xl:gap-14 items-start">

        {/* ── LEFT: Form card ── */}
        <div className="w-full lg:flex-1">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Send a Message</h2>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Field label="Your Name" icon={FaEnvelope} required>
                <input
                  type="text"
                  name="name"
                  className={inputCls}
                  placeholder="John Doe"
                  required
                  value={form.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </Field>

              <Field label="Email Address" icon={FaEnvelope} required>
                <input
                  type="email"
                  name="email"
                  className={inputCls}
                  placeholder="john@example.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </Field>

              <Field label="Your Message" icon={FaEnvelope} required>
                <textarea
                  name="message"
                  rows={5}
                  className={`${inputCls} resize-none`}
                  placeholder="Tell me about your project, role, or idea..."
                  required
                  value={form.message}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </Field>

              <button
                type="submit"
                disabled={loading || sent}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="relative mt-1 h-12 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2.5
                           transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
                style={{ background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)" }}
              >
                {sent ? (
                  <>
                    <FaCircleCheck size={15} /> Message Sent!
                  </>
                ) : loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin flex-shrink-0" />
                    Sending…
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={13} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick contact strip below form */}
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="mailto:baskaran030708@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold
                         bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors">
              <FaEnvelope size={11} /> baskaran030708@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/baskaran-a-b6757625a/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold
                         bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 transition-colors">
              <FaLinkedin size={11} className="text-blue-600" /> LinkedIn
            </a>
            <a href="https://github.com/baskaran0708" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold
                         bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 transition-colors">
              <FaGithub size={11} /> GitHub
            </a>
          </div>
        </div>

        {/* ── RIGHT: Info cards + Fox ── */}
        <div className="w-full lg:w-[42%] flex flex-col gap-5">

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
            {INFO.map(({ icon: Icon, label, value, href, color, bg }) => {
              const inner = (
                <div
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white shadow-sm
                             hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: bg }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-slate-700 truncate">{value}</p>
                  </div>
                </div>
              );
              return href ? (
                <a key={label} href={href} className="block group">{inner}</a>
              ) : (
                <div key={label}>{inner}</div>
              );
            })}

            {/* Availability card */}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-green-100 bg-green-50 shadow-sm">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-600 mb-0.5">
                  Status
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  Open to Senior Roles · Reply within 24h
                </p>
              </div>
            </div>
          </div>

          {/* Fox 3D canvas */}
          <div
            className="w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
            style={{ height: "280px", background: "linear-gradient(135deg,#f8faff,#eef2ff)" }}
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
              <directionalLight position={[0, 0, 1]} intensity={2.5} />
              <ambientLight intensity={1} />
              <pointLight position={[5, 10, 0]} intensity={2} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
              <Suspense fallback={<Loader />}>
                <Fox
                  currentAnimation={currentAnimation}
                  position={[0.5, 0.35, 0]}
                  rotation={[12.629, -0.6, 0]}
                  scale={[0.5, 0.5, 0.5]}
                />
              </Suspense>
            </Canvas>
          </div>

          <p className="text-center text-xs text-slate-400">
            ↑ Fox reacts when you type in the form
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
