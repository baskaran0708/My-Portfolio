import { useEffect, useRef, useState } from "react";

const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className = "",
  interactive = true,
  containerClassName = "",
}) => {
  const interactiveRef = useRef(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    if (!interactiveRef.current) return;
    setCurX((prev) => prev + (tgX - curX) / 20);
    setCurY((prev) => prev + (tgY - curY) / 20);
    interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
  }, [tgX, tgY]);

  const handleMouseMove = (e) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(e.clientX - rect.left);
      setTgY(e.clientY - rect.top);
    }
  };

  const blurStyle = isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]";

  return (
    <div
      className={`w-full h-full absolute overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))] ${containerClassName}`}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={className}>{children}</div>
      <div className={`gradients-container h-full w-full blur-lg ${blurStyle}`}>
        {[
          { style: { transformOrigin: "center center" }, opacity: "opacity-100", anim: "animate-first" },
          { style: { transformOrigin: "calc(50% - 400px)" }, opacity: "opacity-100", anim: "animate-second", alpha: true },
          { style: { transformOrigin: "calc(50% + 400px)" }, opacity: "opacity-100", anim: "animate-third", alpha: true },
          { style: { transformOrigin: "calc(50% - 200px)" }, opacity: "opacity-70", anim: "animate-fourth", alpha: true },
          { style: { transformOrigin: "calc(50% - 800px) calc(50% + 800px)" }, opacity: "opacity-100", anim: "animate-fifth", alpha: true },
        ].map((item, i) => {
          const colors = ["var(--first-color)", "rgba(var(--second-color),0.8)", "rgba(var(--third-color),0.8)", "rgba(var(--fourth-color),0.8)", "rgba(var(--fifth-color),0.8)"];
          return (
            <div key={i} className={`absolute w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [mix-blend-mode:var(--blending-value)] ${item.opacity}`}
              style={{ background: `radial-gradient(circle at center, ${colors[i]} 0, transparent 50%) no-repeat`, ...item.style }} />
          );
        })}
        {interactive && (
          <div ref={interactiveRef} onMouseMove={handleMouseMove}
            className="absolute w-full h-full -top-1/2 -left-1/2 opacity-70"
            style={{ background: "radial-gradient(circle at center, rgba(var(--pointer-color),0.8) 0, transparent 50%) no-repeat", mixBlendMode: "var(--blending-value)" }} />
        )}
      </div>
    </div>
  );
};

export default BackgroundGradientAnimation;
