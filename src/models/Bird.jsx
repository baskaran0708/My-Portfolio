import { useCallback, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

import birdScene from "../assets/3d/bird.glb";

/* ── Orbit math
   Verified viewport bounds at the orbit's CLOSEST point (front, z ≈ -1):
     desktop  (1.78:1, FOV 75°) → visible half-width ≈ 8.2 units → rx=3.5 = 43 % ✓
     mobile   (0.56:1, portrait) → visible half-width ≈ 2.6 units → rx=1.5 = 58 % ✓
   Previously rx=7.5 put the bird 196 % off-screen at orbit front. ── */
const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768;
const RX = IS_MOBILE ? 1.5 : 3.5;   // horizontal radius
const RZ = IS_MOBILE ? 0.8 : 1.0;   // depth radius (shallow = stays visible)
const CY = IS_MOBILE ? 2.2 : 2.8;   // orbit centre height
const CZ = -2.0;                      // orbit centre z (behind origin → always in front of island)

const BASE_SPEED  = 0.3;   // rad / s
const BOOST_SPEED = 1.8;   // rad / s on click
const BOOST_MS    = 1500;
const BASE_SCALE  = 0.003;

export function Bird({ onBirdClick }) {
  const outerRef = useRef(); // controlled by useFrame (position + rotation)
  const modelRef = useRef(); // animation root (scale pulse)
  const boostTimer = useRef(null);
  const speedRef   = useRef(BASE_SPEED);
  const pulseRef   = useRef(0); // 0→1 pulse, decays in useFrame

  const { scene, animations } = useGLTF(birdScene);
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    const a = actions["Take 001"];
    if (a) a.reset().play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => clearTimeout(boostTimer.current), []);

  const handleClick = useCallback((e) => {
    e.stopPropagation();

    // Speed boost
    speedRef.current = BOOST_SPEED;
    pulseRef.current = 1;
    clearTimeout(boostTimer.current);
    boostTimer.current = setTimeout(() => {
      speedRef.current = BASE_SPEED;
    }, BOOST_MS);

    // Fix: R3F ThreeEvent exposes clientX/Y directly — NOT on nativeEvent
    onBirdClick?.({ clientX: e.clientX, clientY: e.clientY });
  }, [onBirdClick]);

  useFrame(({ clock }) => {
    if (!outerRef.current || !modelRef.current) return;
    const t     = clock.elapsedTime;
    const angle = t * speedRef.current;

    /* ── Elliptical orbit ── */
    outerRef.current.position.x = RX * Math.cos(angle);
    outerRef.current.position.z = CZ + RZ * Math.sin(angle);
    outerRef.current.position.y = CY + Math.sin(t * 3.5) * 0.32;

    /* ── Facing direction (tangent of ellipse) + Math.PI to face FORWARD
          Without + Math.PI the model faces its tail toward movement. ── */
    const vx = -RX * Math.sin(angle);
    const vz =  RZ * Math.cos(angle);
    outerRef.current.rotation.y = Math.atan2(vx, vz) + Math.PI;

    /* ── Scale pulse: 1 → 1.6 → 1 over ~0.4 s ── */
    if (pulseRef.current > 0) {
      pulseRef.current = Math.max(0, pulseRef.current - 0.04);
    }
    const s = BASE_SCALE * (1 + pulseRef.current * 0.6);
    modelRef.current.scale.setScalar(s);
  });

  return (
    <group
      ref={outerRef}
      onClick={handleClick}
      onPointerEnter={() => { document.body.style.cursor = "pointer"; }}
      onPointerLeave={() => { document.body.style.cursor = "";        }}
    >
      {/* Invisible hit-sphere — much easier to click than the tiny model geometry */}
      <mesh visible={false}>
        <sphereGeometry args={[0.65, 8, 8]} />
        <meshBasicMaterial />
      </mesh>

      {/* Actual bird model */}
      <group ref={modelRef} scale={[BASE_SCALE, BASE_SCALE, BASE_SCALE]}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload(birdScene);
