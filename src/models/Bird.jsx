import { useCallback, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

import birdScene from "../assets/3d/bird.glb";

/*
  GLTF models face -Z at rotation.y = 0 (GLTF / OpenGL convention).

  For side-profile flight the CORRECT values are:
    moving left  (vx < 0) → rotation.y = +π/2  → model faces -X = LEFT  ✓
    moving right (vx > 0) → rotation.y = -π/2  → model faces +X = RIGHT ✓

  Previous code had both values SWAPPED, causing the backward appearance.

  Orbit is in the XY plane (z = constant = -0.8).
  The bird never goes behind the island (z = -43) or the banner.
  Entry: fly in from off-screen left over 3.5 s, land at orbit centre.
*/

const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768;

/* ── Orbit ───────────────────────────────────────────────────────────────── */
const CX = IS_MOBILE ? 0    : 0.3;   // orbit centre x  (above island)
const CY = IS_MOBILE ? 0.6  : 0.9;   // orbit centre y  (30 % from top)
const CZ =  -0.8;                     // constant depth  — always in front
const RX = IS_MOBILE ? 0.9  : 1.6;   // horizontal sweep radius
const RY = IS_MOBILE ? 0.22 : 0.38;  // vertical bob radius

/* ── Entry ───────────────────────────────────────────────────────────────── */
const ENTRY_DUR = 3.5;   // seconds — slow, graceful entry
const ENTRY_X   = -10;   // start x — off-screen left
const ENTRY_Y   = -0.5;  // start y — below centre

/* ── Speed ───────────────────────────────────────────────────────────────── */
const BASE_SPEED  = 0.3;
const BOOST_SPEED = 1.8;
const BOOST_MS    = 1500;
const BASE_SCALE  = 0.003;

/* Shortest-path angle lerp */
const lerpAngle = (from, to, t) => {
  const d = ((to - from + Math.PI) % (Math.PI * 2)) - Math.PI;
  return from + d * t;
};

export function Bird({ onBirdClick }) {
  const outerRef   = useRef();
  const modelRef   = useRef();
  const boostTimer = useRef(null);
  const speedRef   = useRef(BASE_SPEED);
  const pulseRef   = useRef(0);

  const { gl } = useThree();
  const { scene, animations } = useGLTF(birdScene);
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    const a = actions["Take 001"];
    if (a) a.reset().play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => clearTimeout(boostTimer.current), []);

  const setCursor = useCallback((c) => {
    if (gl?.domElement) gl.domElement.style.cursor = c;
  }, [gl]);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    speedRef.current = BOOST_SPEED;
    pulseRef.current = 1;
    clearTimeout(boostTimer.current);
    boostTimer.current = setTimeout(() => { speedRef.current = BASE_SPEED; }, BOOST_MS);
    onBirdClick?.({ clientX: e.clientX, clientY: e.clientY });
  }, [onBirdClick]);

  useFrame(({ clock }) => {
    if (!outerRef.current || !modelRef.current) return;

    const t = clock.elapsedTime;

    if (t < ENTRY_DUR) {
      /* ── ENTRY: glide in from bottom-left ── */
      const p = t / ENTRY_DUR;                       // 0 → 1
      const ease = 1 - Math.pow(1 - p, 2);           // ease-out quad (smooth decel)
      const arc  = Math.sin(p * Math.PI) * 0.6;      // gentle upward arc

      outerRef.current.position.x = ENTRY_X + (CX - ENTRY_X) * ease;
      outerRef.current.position.y = ENTRY_Y + (CY - ENTRY_Y) * ease + arc;
      outerRef.current.position.z = CZ;

      /* Face right (toward island) during entry, slight nose-up tilt */
      outerRef.current.rotation.y = lerpAngle(outerRef.current.rotation.y, -Math.PI / 2, 0.06);
      outerRef.current.rotation.z = lerpAngle(outerRef.current.rotation.z, -0.12, 0.06);

    } else {
      /* ── ORBIT: XY-plane circle at constant z ── */
      const tO    = t - ENTRY_DUR;
      const angle = tO * speedRef.current + Math.PI; // start at left side

      outerRef.current.position.x = CX + RX * Math.cos(angle);
      outerRef.current.position.y = CY + RY * Math.sin(angle);
      outerRef.current.position.z = CZ;               // z NEVER changes

      /*
        vx = -RX * sin(angle)
        GLTF faces -Z at rotation.y=0, so:
          vx < 0  (moving left)  → +π/2  → model faces -X = LEFT  ✓
          vx ≥ 0  (moving right) → -π/2  → model faces +X = RIGHT ✓
        (Previous build had these swapped → backward appearance)
      */
      const vx = -RX * Math.sin(angle);
      const targetFace = vx < 0 ? Math.PI / 2 : -Math.PI / 2;
      outerRef.current.rotation.y = lerpAngle(outerRef.current.rotation.y, targetFace, 0.06);

      /* Natural banking — lean into turns */
      const bankTarget = Math.sin(angle) * 0.16;
      outerRef.current.rotation.z = lerpAngle(outerRef.current.rotation.z, bankTarget, 0.07);
    }

    /* ── Scale pulse on click ── */
    if (pulseRef.current > 0) pulseRef.current = Math.max(0, pulseRef.current - 0.035);
    modelRef.current.scale.setScalar(BASE_SCALE * (1 + pulseRef.current * 0.65));
  });

  return (
    <group
      ref={outerRef}
      position={[ENTRY_X, ENTRY_Y, CZ]}
      onClick={handleClick}
      onPointerEnter={() => setCursor("pointer")}
      onPointerLeave={() => setCursor("")}
    >
      {/* Transparent hit-sphere (r=1.0) — visible=false would skip raycasting */}
      <mesh>
        <sphereGeometry args={[1.0, 10, 10]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <group ref={modelRef} scale={[BASE_SCALE, BASE_SCALE, BASE_SCALE]}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload(birdScene);
