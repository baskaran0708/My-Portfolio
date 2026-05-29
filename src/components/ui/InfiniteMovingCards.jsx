import { useEffect, useRef, useState } from "react";

const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className = "",
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      Array.from(scrollerRef.current.children).forEach((item) => {
        scrollerRef.current.appendChild(item.cloneNode(true));
      });
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
      containerRef.current.style.setProperty(
        "--animation-duration",
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
      );
      setStart(true);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`scroller relative z-20 w-screen overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)] ${className}`}
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-16 py-4 w-max flex-nowrap ${start ? "animate-scroll" : ""} ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[90vw] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-800 p-5 md:p-16 md:w-[60vw]"
            style={{ background: "rgb(4,7,29)", backgroundColor: "linear-gradient(90deg,rgba(4,7,29,1) 0%,rgba(12,14,35,1) 100%)" }}
          >
            <blockquote>
              <span className="relative z-20 text-sm md:text-lg leading-[1.6] text-white font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <div className="me-3 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold">
                  {item.name[0]}
                </div>
                <span className="flex flex-col gap-1">
                  <span className="text-xl font-bold leading-[1.6] text-white">{item.name}</span>
                  <span className="text-sm leading-[1.6] text-white-200 font-normal">{item.title}</span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
