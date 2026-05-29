import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";

const TextGenerateEffect = ({ words, className = "" }) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate("span", { opacity: 1 }, { duration: 2, delay: stagger(0.2) });
  }, [scope.current]);

  return (
    <div className={`font-bold ${className}`}>
      <div className="my-4">
        <motion.div ref={scope} className="leading-snug tracking-wide">
          {wordsArray.map((word, idx) => (
            <motion.span
              key={word + idx}
              className={`${idx > 3 ? "text-purple" : "text-white"} opacity-0`}
            >
              {word}{" "}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TextGenerateEffect;
