import { useCallback, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

import birdScene from "../assets/3d/bird.glb";

/* ── Design rationale ────────────────────────────────────────────────────────
   Previous orbit was in the XZ plane (x and z vary).  At the BACK of the
   orbit (z most negative) the bird:
     1. went visually behind the island buildings
     2. faced away from the camera (tail toward viewer = "backward flying")

   Fix: orbit in the XY plane — x and y vary, Z is CONSTANT at -0.8 (always
   clearly in front of the island at z=-43).  The bird sweeps left ↔ right and
   bobs up ↔ down, always at the same screen depth.  Facing = left when
   moving left, right when moving right.  Users always see the full side
   profile — never the tail.

   Entry animation: bird flies in from the bottom-left corner over 2.5 s,
   arcing up to the orbit centre, then settles into the circle.
   ─────────────────────────────────────────────────────────────────────────── */

const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768;

/* Orbit parameters */
const CX = 0;                         // orbit centre x
const CY = IS_MOBILE ? 0.9  : 1.4;   // orbit centre y  (mid-upper viewport)
const CZ = -0.8;                      // CONSTANT z — always in front of island

const RX = IS_MOBILE ? 1.0  : 2.2;   // horizontal sweep radius
const RY = IS_MOBILE ? 0.25 : 0.45;  // vertical bob radius

/* Entry parameters */
const ENTRY_DUR = 2.4;                // seconds
const ENTRY_X   = -10;               // off-screen left
const ENTRY_Y   = -0.2;              // entry height

/* Speed */
const BASE_SPEED  = 0.32;
const BOOST_SPEED = 1.9;
const BOOST_MS    = 1500;
const BASE_SCALE  = 0.003;

/* Smooth-lerp a rotation angle through the shortest path */
const lerpAngle = (from, to, t) => {
  const diff = ((to - from + Math.PI) % (Math.PI * 2)) - Math.PI;
  return from + diff * t;
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
      /* ── Entry phase: fly in from bottom-left ── */
      const progress = t / ENTRY_DUR;
      // Ease-out cubic — fast start, gentle landing
      const eased = 1 - Math.pow(1 - progress, 3);
      // Arc upward during entry
      const arcY   = Math.sin(progress * Math.PI) * 0.8;

      outerRef.current.position.x = ENTRY_X + (CX - RX - ENTRY_X) * eased;
      outerRef.current.position.y = ENTRY_Y + (CY   - ENTRY_Y) * eased + arcY;
      outerRef.current.position.z = CZ;

      // Face right (toward island) during entry
      outerRef.current.rotation.y = Math.PI / 2;
      outerRef.current.rotation.z = -0.15; // slight nose-up on approach

    } else {
      /* ── Orbit phase: XY-plane circle at constant Z ── */
      const tOrbit = t - ENTRY_DUR;
      // Start orbit at left (Math.PI offset) so it seamlessly continues entry
      const angle  = tOrbit * speedRef.current + Math.PI;

      outerRef.current.position.x = CX + RX * Math.cos(angle);
      outerRef.current.position.y = CY + RY * Math.sin(angle);
      outerRef.current.position.z = CZ; // never changes — always in front

      // Horizontal velocity determines facing: left when vx<0, right when vx>0
      const vx = -RX * Math.sin(angle);
      const targetRot = vx < 0 ? -Math.PI / 2 : Math.PI / 2;
      outerRef.current.rotation.y = lerpAngle(
        outerRef.current.rotation.y, targetRot, 0.06
      );

      // Natural banking tilt — lean into turns
      const bankTarget = Math.sin(angle) * 0.18;
      outerRef.current.rotation.z = lerpAngle(
        outerRef.current.rotation.z, bankTarget, 0.07
      );
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
      {/*
        Hit-sphere: must NOT use visible={false} — Three.js r157 skips those
        in raycasting.  transparent + opacity=0 mesh IS raycasted, giving a
        generous r=1.0 click target regardless of animation frame.
      */}
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
