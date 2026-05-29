import { useCallback, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

import birdScene from "../assets/3d/bird.glb";

/* Elliptical orbit keeps the bird visible on all sides of the scene.
   z-depth is kept shallow (-3 → +1) so the bird never disappears behind
   the island (which sits at z = -43). */
const ORBIT = {
  cx: 0,   cy: 3.2, cz: -1,   // orbit centre
  rx: 7.5,           rz: 3.2, // semi-axes
};
const BASE_SPEED  = 0.28; // rad / s
const BOOST_SPEED = 1.6;
const BOOST_MS    = 1400;
const BASE_SCALE  = 0.003;

export function Bird({ onBirdClick }) {
  const groupRef  = useRef();
  const speedRef  = useRef(BASE_SPEED);
  const scaleRef  = useRef(1);
  const boostRef  = useRef(null);

  const { scene, animations } = useGLTF(birdScene);
  const { actions }           = useAnimations(animations, groupRef);

  useEffect(() => {
    const a = actions["Take 001"];
    if (a) a.reset().play();
    return () => { if (a) a.fadeOut(0.3); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup boost timer on unmount
  useEffect(() => () => clearTimeout(boostRef.current), []);

  const handleClick = useCallback((e) => {
    e.stopPropagation();

    // Speed boost
    speedRef.current = BOOST_SPEED;
    scaleRef.current = 1.5;
    clearTimeout(boostRef.current);
    boostRef.current = setTimeout(() => {
      speedRef.current = BASE_SPEED;
      scaleRef.current = 1;
    }, BOOST_MS);

    // Tell Home to fire particle burst at click screen position
    onBirdClick?.({
      clientX: e.nativeEvent.clientX,
      clientY: e.nativeEvent.clientY,
    });
  }, [onBirdClick]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    const angle = t * speedRef.current;

    // Elliptical orbit
    groupRef.current.position.x = ORBIT.cx + Math.cos(angle) * ORBIT.rx;
    groupRef.current.position.z = ORBIT.cz + Math.sin(angle) * ORBIT.rz;
    // Natural bobbing
    groupRef.current.position.y = ORBIT.cy + Math.sin(t * 3.5) * 0.32;

    // Smooth facing: tangent of the ellipse = (-rx*sin, 0, rz*cos)
    const dx = -ORBIT.rx * Math.sin(angle);
    const dz =  ORBIT.rz * Math.cos(angle);
    groupRef.current.rotation.y = Math.atan2(dx, dz);

    // Scale pulse during boost (smooth lerp back)
    const target = BASE_SCALE * scaleRef.current;
    const cur    = groupRef.current.scale.x;
    const next   = cur + (target - cur) * 0.12;
    groupRef.current.scale.setScalar(next);
  });

  return (
    <group
      ref={groupRef}
      position={[ORBIT.cx + ORBIT.rx, ORBIT.cy, ORBIT.cz]}
      scale={BASE_SCALE}
      onClick={handleClick}
      onPointerOver={() => { document.body.style.cursor = "pointer"; }}
      onPointerOut={()  => { document.body.style.cursor = "grab";    }}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(birdScene);
