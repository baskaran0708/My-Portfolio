import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";

const FloatingNavbar = ({ navItems = [], className = "" }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious();
      setVisible(scrollYProgress.get() < 0.05 || direction < 0);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed z-[5000] top-3 sm:top-8 inset-x-0 mx-auto
          w-[96vw] sm:w-auto sm:max-w-fit
          px-3 sm:px-8 py-2 sm:py-4
          rounded-xl flex items-center justify-center gap-1.5 sm:gap-4
          ${className}`}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17,25,40,0.85)",
          border: "1px solid rgba(255,255,255,0.125)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
        }}
      >
        {/* 3D Home */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-colors
                     border border-purple/40 hover:border-purple px-2.5 sm:px-3 py-1 rounded-full whitespace-nowrap"
          style={{ color: "#CBACF9" }}
        >
          <FaHouse size={11} />
          <span className="hidden sm:inline">3D Home</span>
        </button>

        <span className="text-white/20 text-sm">|</span>

        {navItems.map((item, idx) => {
          const isRoute = item.link.startsWith("/");
          const sharedCls =
            "text-neutral-300 hover:text-white font-medium cursor-pointer transition-colors whitespace-nowrap text-[10px] sm:text-xs lg:text-sm";
          const label = (
            <>
              <span className="sm:hidden">
                {item.name === "Experience" ? "Exp" :
                 item.name === "Projects"   ? "Work" :
                 item.name}
              </span>
              <span className="hidden sm:inline">{item.name}</span>
            </>
          );

          // Route links: use navigate() so React Router handles them as SPA transitions
          // Hash links: use plain <a> so the browser scrolls to the anchor
          return isRoute ? (
            <button key={idx} onClick={() => navigate(item.link)} className={sharedCls}>
              {label}
            </button>
          ) : (
            <a key={idx} href={item.link} className={sharedCls}>
              {label}
            </a>
          );
        })}
      </motion.nav>
    </AnimatePresence>
  );
};

export default FloatingNavbar;
