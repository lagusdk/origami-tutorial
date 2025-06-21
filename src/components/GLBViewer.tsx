import React, { Suspense, useEffect, useState } from "react";
import * as THREE from "three";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useProgress } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface GLBViewerProps {
  glbPath: string;
  stepIndex?: number;
}

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)} %</Html>;
}

const GLBModel: React.FC<{
  path: string;
  setTarget: (target: [number, number, number]) => void;
}> = ({ path, setTarget }) => {
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const loader = new GLTFLoader();

    loader.load(
      path,
      (gltf) => {
        const object = gltf.scene;

        // 중심 계산
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center);

        // targetCenter를 상위에 전달
        setTarget([0, 0, 0]); // 중심으로 이동한 후 기준점은 항상 (0,0,0)

        // object.position.x += 0.5;
        // object.position.z += 2.5;
        object.rotation.set(0, 0, 0);

        object.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => {
                m.side = THREE.DoubleSide;
                m.needsUpdate = true;
              });
            } else {
              mesh.material.side = THREE.DoubleSide;
              mesh.material.needsUpdate = true;
            }
          }
        });

        setModel(object);
        console.log("GLB 로딩 완료");
      },
      undefined,
      (error) => {
        console.error("GLB Load Error:", error);
      }
    );
  }, [path, setTarget]);

  return model ? <primitive object={model} scale={6} /> : null;
};

const GLBViewer: React.FC<GLBViewerProps> = ({ glbPath, stepIndex = 0 }) => {
  const [targetCenter, setTargetCenter] = useState<[number, number, number]>([
    0, 0, 0,
  ]);

  // 스텝 인덱스에 따른 카메라 포지션 계산
  const getCameraPosition = (): [number, number, number] => {
    switch (true) {
      case stepIndex <= 1:
        return [0, -2, 0]; // 0~1 스텝
      case stepIndex >= 2 && stepIndex <= 6:
        return [0, -1, 0]; // 2~6 스텝
      default:
        return [0, -2, 0];
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas key={glbPath} camera={{ position: getCameraPosition(), fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, -5, 5]} intensity={1.5} />
        <directionalLight position={[0, 5, -5]} intensity={1.5} />
        <pointLight position={[0, 0, 10]} intensity={0.5} />

        <Suspense fallback={<Loader />}>
          <GLBModel path={glbPath} setTarget={setTargetCenter} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            target={targetCenter}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GLBViewer;
