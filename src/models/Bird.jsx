import { useCallback, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

import birdScene from "../assets/3d/bird.glb";

const IS_MOBILE  = typeof window !== "undefined" && window.innerWidth < 768;
const RX         = IS_MOBILE ? 1.4  : 3.2;   // horizontal orbit radius
const RZ         = IS_MOBILE ? 0.6  : 0.9;   // depth radius (shallow → always in front)
const CY         = IS_MOBILE ? 0.6  : 1.2;   // height — 39 % from viewport top at z=-2
const CZ         = -1.8;                       // orbit centre z
const BASE_SPEED  = 0.3;
const BOOST_SPEED = 1.8;
const BOOST_MS    = 1500;
const BASE_SCALE  = 0.003;

export function Bird({ onBirdClick }) {
  const outerRef   = useRef();
  const modelRef   = useRef();
  const boostTimer = useRef(null);
  const speedRef   = useRef(BASE_SPEED);
  const pulseRef   = useRef(0);

  /* gl.domElement gives us the actual <canvas> so cursor changes work even
     though the canvas element has a CSS cursor-grab class.             */
  const { gl } = useThree();

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
    speedRef.current = BOOST_SPEED;
    pulseRef.current = 1;
    clearTimeout(boostTimer.current);
    boostTimer.current = setTimeout(() => { speedRef.current = BASE_SPEED; }, BOOST_MS);
    onBirdClick?.({ clientX: e.clientX, clientY: e.clientY });
  }, [onBirdClick]);

  const setCursor = useCallback((cur) => {
    if (gl?.domElement) gl.domElement.style.cursor = cur;
  }, [gl]);

  useFrame(({ clock }) => {
    if (!outerRef.current || !modelRef.current) return;
    const t     = clock.elapsedTime;
    const angle = t * speedRef.current;

    outerRef.current.position.x = RX * Math.cos(angle);
    outerRef.current.position.z = CZ + RZ * Math.sin(angle);
    outerRef.current.position.y = CY + Math.sin(t * 3.5) * 0.32;

    // Tangent of the ellipse = direction of travel.
    // Phoenix model front faces +Z at rotation.y=0, so no offset needed.
    // +Math.PI was WRONG — it made the nose point opposite to travel direction.
    const vx = -RX * Math.sin(angle);
    const vz =  RZ * Math.cos(angle);
    outerRef.current.rotation.y = Math.atan2(vx, vz);

    if (pulseRef.current > 0) pulseRef.current = Math.max(0, pulseRef.current - 0.04);
    modelRef.current.scale.setScalar(BASE_SCALE * (1 + pulseRef.current * 0.6));
  });

  return (
    <group
      ref={outerRef}
      onClick={handleClick}
      onPointerEnter={() => setCursor("pointer")}
      onPointerLeave={() => setCursor("")}
    >
      {/*
        ── Hit-sphere: MUST use transparent material, NOT visible={false}.
           Three.js r157 Raycaster skips objects where visible===false.
           A transparent opacity-0 mesh IS raycasted and gives a generous
           click target (r=0.9) much larger than the tiny 0.003-scale model.
      */}
      <mesh renderOrder={-1}>
        <sphereGeometry args={[0.9, 10, 10]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <group ref={modelRef} scale={[BASE_SCALE, BASE_SCALE, BASE_SCALE]}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload(birdScene);
