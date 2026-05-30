import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

import sakura from "../assets/sakura.mp3";
import { HomeInfo, Loader } from "../components";
import { soundoff, soundon } from "../assets/icons";
import { Bird, Island, Plane, Sky } from "../models";

/* ── Screen-size helpers (module-level = computed once) ── */
const adjustBiplaneForScreenSize = () =>
  window.innerWidth < 768
    ? [[1.5, 1.5, 1.5], [0, -1.5, 0]]
    : [[3, 3, 3],       [0, -4,  -4]];

const adjustIslandForScreenSize = () =>
  window.innerWidth < 768
    ? [[0.9, 0.9, 0.9], [0, -6.5, -43.4]]
    : [[1, 1, 1],       [0, -6.5, -43.4]];

const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
const [islandScale,  islandPosition]  = adjustIslandForScreenSize();

/* ── Particle emoji pools (module-level constants — never mutated) ── */
const HEART_EMOJIS = ["❤️","💕","💖","💗","💓","💞","🌸","💝"];
const FIRE_EMOJIS  = ["🔥","✨","⚡","💥","🚀","🌟","💫","🎯"];


/* ── Single floating particle ── */
const Particle = ({ x, y, emoji, dx, dy }) => (
  <span
    className="bird-particle"
    style={{
      left:   x,
      top:    y,
      "--dx": `${dx}px`,
      "--dy": `${dy}px`,
      "--dr": `${(Math.random() - 0.5) * 360}deg`,
    }}
  >
    {emoji}
  </span>
);

/* ── Home page ── */
const Home = () => {
  const audioRef        = useRef(null);
  const pidRef          = useRef(0);
  const clickCountRef   = useRef(0);
  const particleTimers  = useRef([]);

  const [currentStage,   setCurrentStage]   = useState(1);
  const [isRotating,     setIsRotating]     = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [particles,      setParticles]      = useState([]);

  /* Audio setup */
  useEffect(() => {
    audioRef.current = new Audio(sakura);
    audioRef.current.volume = 0.4;
    audioRef.current.loop   = true;
    // Hide hint after 4 s
    return () => {
      // Clear all pending particle-cleanup timers to prevent state updates on unmounted component
      particleTimers.current.forEach(clearTimeout);
      particleTimers.current = [];
      audioRef.current?.pause();
      audioRef.current && (audioRef.current.src = "");
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.play().catch((err) => {
        console.warn("Audio play blocked:", err.message);
        setIsPlayingMusic(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlayingMusic]);

  /* Bird click → particle burst — alternates hearts ❤️ and fire 🔥 */
  const handleBirdClick = useCallback(({ clientX, clientY }) => {
    clickCountRef.current++;
    const pool = clickCountRef.current % 2 === 0 ? FIRE_EMOJIS : HEART_EMOJIS;

    const COUNT = 10;
    const burst = Array.from({ length: COUNT }, (_, i) => {
      const angle = (i / COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
      const dist  = 55 + Math.random() * 90;
      return {
        id:    pidRef.current++,
        emoji: pool[Math.floor(Math.random() * pool.length)],
        x:     clientX,
        y:     clientY,
        dx:    Math.cos(angle) * dist,
        dy:    Math.sin(angle) * dist - 50,
      };
    });

    setParticles(prev => [...prev.slice(-40), ...burst]);

    // Track timeout so it can be cleared if component unmounts
    const ids = new Set(burst.map(p => p.id));
    const tid = setTimeout(() => {
      setParticles(prev => prev.filter(p => !ids.has(p.id)));
      particleTimers.current = particleTimers.current.filter(t => t !== tid);
    }, 1900);
    particleTimers.current.push(tid);
  }, []);

  return (
    <section className="w-full h-screen relative select-none">
      {/* Stage info box */}
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      {/* 3D Canvas */}
      <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight position={[0, 50, 10]} angle={0.15} penumbra={1} intensity={2} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />

          <Bird onBirdClick={handleBirdClick} />
          <Sky isRotating={isRotating} />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />
          <Plane
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, 20.1, 0]}
            scale={biplaneScale}
          />
        </Suspense>
      </Canvas>

      {/* Emoji particle overlay — fixed so coords match clientX/Y */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9999 }}>
        {particles.map(p => (
          <Particle key={p.id} {...p} />
        ))}
      </div>

      {/* Sound toggle */}
      <div className="absolute bottom-2 left-2 z-20">
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt={isPlayingMusic ? "Mute music" : "Play music"}
          onClick={() => setIsPlayingMusic(prev => !prev)}
          className="w-10 h-10 cursor-pointer object-contain"
        />
      </div>
    </section>
  );
};

export default Home;
