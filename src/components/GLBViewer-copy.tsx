import React, { Suspense, useEffect, useState, useRef } from "react";
import * as THREE from "three";

import { Canvas, useFrame } from "@react-three/fiber";
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
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  // 애니메이션 프레임 업데이트
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  useEffect(() => {
    const loader = new GLTFLoader();

    loader.load(
      path,
      (gltf) => {
        const object = gltf.scene;

        // 중심 계산
        const box = new THREE.Box3().setFromObject(object);
        const sphere = box.getBoundingSphere(new THREE.Sphere());

        const center = sphere.center;
        object.position.sub(center); // 중심 보정

        // targetCenter를 상위에 전달
        setTarget([0, 0, 0]); // 중심으로 이동한 후 기준점은 항상 (0,0,0)

        object.position.x += 0.5;
        object.position.z += 2.5;
        object.rotation.set(Math.PI / 2, Math.PI / 2, 0);

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

        // 애니메이션 설정
        if (gltf.animations && gltf.animations.length > 0) {
          mixerRef.current = new THREE.AnimationMixer(object);
          gltf.animations.forEach((clip) => {
            const action = mixerRef.current!.clipAction(clip);
            action.setLoop(THREE.LoopRepeat, Infinity); // 무한 루프 설정
            action.play(); // 애니메이션 재생
          });
        }

        setModel(object);
        console.log("GLB 로딩 완료");
      },
      undefined,
      (error) => {
        console.error("GLB Load Error:", error);
      }
    );

    // 컴포넌트 언마운트 시 클린업
    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, [path, setTarget]);

  return model ? <primitive object={model} scale={6} /> : null;
};

const GLBViewer: React.FC<GLBViewerProps> = ({ glbPath }) => {
  const [targetCenter, setTargetCenter] = useState<[number, number, number]>([
    0, 0, 0,
  ]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas key={glbPath} camera={{ position: [0, -5, 0], fov: 45 }}>
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
