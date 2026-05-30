import { useCallback, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

import birdScene from "../assets/3d/bird.glb";

// Original diagonal-patrol flight that was confirmed working visually.
// onBirdClick prop is added so Home.jsx can fire emoji particles on click.
export function Bird({ onBirdClick }) {
  const birdRef = useRef();
  const { gl }  = useThree();

  const { scene, animations } = useGLTF(birdScene);
  const { actions } = useAnimations(animations, birdRef);

  useEffect(() => {
    const a = actions["Take 001"];
    if (a) a.reset().play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
    onBirdClick?.({ clientX: e.clientX, clientY: e.clientY });
  }, [onBirdClick]);

  useFrame(({ clock, camera }) => {
    if (!birdRef.current) return;

    // Sine-wave vertical bob
    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

    // Turn around at the camera-relative boundaries
    if (birdRef.current.position.x > camera.position.x + 10) {
      birdRef.current.rotation.y = Math.PI;
    } else if (birdRef.current.position.x < camera.position.x - 10) {
      birdRef.current.rotation.y = 0;
    }

    // Move diagonally based on current heading
    if (birdRef.current.rotation.y === 0) {
      birdRef.current.position.x += 0.01;
      birdRef.current.position.z -= 0.01;
    } else {
      birdRef.current.position.x -= 0.01;
      birdRef.current.position.z += 0.01;
    }
  });

  return (
    <group
      onPointerEnter={() => { if (gl?.domElement) gl.domElement.style.cursor = "pointer"; }}
      onPointerLeave={() => { if (gl?.domElement) gl.domElement.style.cursor = ""; }}
      onClick={handleClick}
    >
      {/* Transparent hit-sphere (r=1.5) — invisible but raycasted, makes clicking reliable */}
      <mesh position={[-5, 2, 1]}>
        <sphereGeometry args={[1.5, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <mesh ref={birdRef} position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]}>
        <primitive object={scene} />
      </mesh>
    </group>
  );
}

useGLTF.preload(birdScene);
