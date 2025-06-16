import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

declare global {
  interface OBJLoader {
    setMaterials(materials: MTLLoader.MaterialCreator): void;
  }
}

interface OBJLoaderWrapperProps {
  objUrl: string;
  mtlUrl?: string;
  fbxUrl?: string;
  position?: [number, number, number];
  scale?: [number, number, number];
}

interface OBJLoaderWrapperProps {
  objUrl: string;
  mtlUrl?: string;
  fbxUrl?: string;
  position?: [number, number, number];
  scale?: [number, number, number];
}

const OBJLoaderWrapper: React.FC<OBJLoaderWrapperProps> = ({
  objUrl,
  mtlUrl,
  fbxUrl,
  position = [0, 0, 0],
  scale = [1, 1, 1],
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  const materials = mtlUrl ? useLoader(MTLLoader, mtlUrl) : null;

  const obj = useLoader(OBJLoader, objUrl, (loader) => {
    if (materials) {
      const objLoader = loader as unknown as {
        setMaterials: (m: MTLLoader.MaterialCreator) => void;
      };
      objLoader.setMaterials(materials);
    }
  }) as THREE.Group;

  useEffect(() => {
    if (!fbxUrl || !groupRef.current) return;

    const fbxLoader = new FBXLoader();
    let mixer: THREE.AnimationMixer | null = null;

    fbxLoader.load(
      fbxUrl,
      (object) => {
        mixer = new THREE.AnimationMixer(groupRef.current!);
        object.animations.forEach((clip) => {
          const action = mixer!.clipAction(clip);
          action.clampWhenFinished = true;
          action.play();
        });
        mixerRef.current = mixer;
      },
      undefined,
      (error) => console.error("FBX 로딩 실패:", error)
    );

    return () => {
      if (mixer) {
        mixer.stopAllAction();
      }
    };
  }, [fbxUrl]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={obj} />
    </group>
  );
};

export default OBJLoaderWrapper;
