import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaCode, FaFileLines, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";

import { logo } from "../assets/images";

const NAV_LINKS = [
  { to: "/about",    label: "About",    desc: "Skills & experience",     Icon: FaUser      },
  { to: "/projects", label: "Projects", desc: "GitHub & live demos",     Icon: FaCode      },
  { to: "/resume",   label: "Resume",   desc: "Download my CV",          Icon: FaFileLines },
  { to: "/contact",  label: "Contact",  desc: "Let's work together",     Icon: FaEnvelope  },
];

const SOCIALS = [
  { href: "https://github.com/baskaran0708",                    Icon: FaGithub,   label: "GitHub"   },
  { href: "https://www.linkedin.com/in/baskaran-a-b6757625a/", Icon: FaLinkedin, label: "LinkedIn" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="header relative">
      {/* Logo */}
      <NavLink to="/" onClick={close}>
        <img src={logo} alt="Baskaran A" className="w-12 h-12 object-contain" />
      </NavLink>

      {/* Desktop nav */}
      <nav className="hidden sm:flex text-lg gap-7 font-medium">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-black hover:text-blue-500 transition-colors"
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        className="sm:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1.5 z-[60] relative"
        onClick={() => setOpen(p => !p)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span className="block w-full h-0.5 bg-black origin-center transition-transform duration-200"
          style={{ transform: open ? "translateY(6.5px) rotate(45deg)" : "none" }} />
        <span className="block w-full h-0.5 bg-black transition-opacity duration-200"
          style={{ opacity: open ? 0 : 1 }} />
        <span className="block w-full h-0.5 bg-black origin-center transition-transform duration-200"
          style={{ transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
      </button>

      {/* ── Mobile full-screen overlay menu ── */}
      {open && (
        <div
          className="sm:hidden fixed inset-0 z-50 flex flex-col"
          style={{ background: "rgba(0,3,25,0.97)", backdropFilter: "blur(24px)" }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/10">
            <NavLink to="/" onClick={close}>
              <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
            </NavLink>
            <button
              onClick={close}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-white transition-colors text-lg"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 flex flex-col justify-center px-5 gap-2">
            {NAV_LINKS.map(({ to, label, desc, Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={close}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600/20 border border-blue-500/30"
                      : "border border-transparent hover:bg-white/[0.05]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Icon box */}
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg,#CBACF9,#0072ff)"
                          : "rgba(255,255,255,0.08)",
                      }}
                    >
                      <Icon size={18} className={isActive ? "text-white" : "text-white/60"} />
                    </div>

                    {/* Label + description */}
                    <div>
                      <p className={`text-base font-semibold leading-none mb-0.5 ${isActive ? "text-white" : "text-white/90"}`}>
                        {label}
                      </p>
                      <p className="text-xs text-white/40">{desc}</p>
                    </div>

                    {/* Active arrow */}
                    {isActive && (
                      <span className="ml-auto text-blue-400 text-lg">›</span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Bottom: social links + brand */}
          <div className="px-6 pb-8 pt-4 border-t border-white/10">
            <div className="flex gap-3 mb-4">
              {SOCIALS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all text-sm font-medium"
                >
                  <Icon size={14} /> {label}
                </a>
              ))}
            </div>
            <p className="text-xs text-white/25 text-center">
              Baskaran A · Backend Engineer & AI/ML Engineer
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
