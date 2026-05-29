import { useRef } from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";

export const MovingBorderButton = ({
  borderRadius = "1.75rem",
  children,
  containerClassName = "",
  borderClassName = "",
  duration,
  className = "",
  style = {},
  ...rest
}) => (
  <button
    className={`bg-transparent relative text-xl p-[1px] overflow-hidden md:col-span-2 md:row-span-1 ${containerClassName}`}
    style={{ borderRadius, ...style }}
    {...rest}
  >
    <div
      className="absolute inset-0"
      style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
    >
      <MovingBorder duration={duration} rx="30%" ry="30%">
        <div className={`h-20 w-20 opacity-[0.8] bg-[radial-gradient(#CBACF9_40%,transparent_60%)] ${borderClassName}`} />
      </MovingBorder>
    </div>
    <div
      className={`relative bg-slate-900/[0.] border border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased ${className}`}
      style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
    >
      {children}
    </div>
  </button>
);

const MovingBorder = ({ children, duration = 2000, rx, ry, ...rest }) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      progress.set((time * (length / duration)) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...rest}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}>
        {children}
      </motion.div>
    </>
  );
};
