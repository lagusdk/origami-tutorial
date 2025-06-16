import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

interface OBJLoaderWrapperProps {
  objUrl: string;
  fbxUrl?: string;
  position?: [number, number, number];
  scale?: [number, number, number];
}

const OBJLoaderWrapper: React.FC<OBJLoaderWrapperProps> = ({
  objUrl,
  fbxUrl,
  position = [0, 0, 0],
  scale = [1, 1, 1],
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const obj = useLoader(OBJLoader, objUrl) as THREE.Group;
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (fbxUrl && groupRef.current) {
      const fbxLoader = new FBXLoader();
      fbxLoader.load(
        fbxUrl,
        (object: THREE.Group) => {
          const mixer = new THREE.AnimationMixer(groupRef.current!);
          object.animations.forEach((clip: THREE.AnimationClip) => {
            mixer.clipAction(clip).play();
          });
          mixerRef.current = mixer;
        },
        undefined,
        (error: ErrorEvent) => {
          console.error("Error loading FBX:", error);
        }
      );
    }
  }, [fbxUrl]);

  useFrame((state, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={obj} />
    </group>
  );
};

export default OBJLoaderWrapper;
