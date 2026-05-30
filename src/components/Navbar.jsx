import { useState } from "react";
import { NavLink } from "react-router-dom";

import { logo } from "../assets/images";

const NAV_LINKS = [
  { to: "/about",    label: "About"    },
  { to: "/projects", label: "Projects" },
  { to: "/resume",   label: "Resume"   },
  { to: "/contact",  label: "Contact"  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="header relative">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
      </NavLink>

      {/* Desktop nav */}
      <nav className="hidden sm:flex text-lg gap-7 font-medium">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Mobile hamburger button */}
      <button
        className="sm:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1.5"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span
          className="block w-full h-0.5 bg-black origin-center transition-transform duration-200"
          style={{ transform: open ? "translateY(6.5px) rotate(45deg)" : "none" }}
        />
        <span
          className="block w-full h-0.5 bg-black transition-opacity duration-200"
          style={{ opacity: open ? 0 : 1 }}
        />
        <span
          className="block w-full h-0.5 bg-black origin-center transition-transform duration-200"
          style={{ transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none" }}
        />
      </button>

      {/* Mobile dropdown */}
      {open && (
        <nav className="sm:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg flex flex-col items-center py-5 gap-5 font-medium z-50 border-t border-gray-100">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-base ${isActive ? "text-blue-600 font-semibold" : "text-black"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
