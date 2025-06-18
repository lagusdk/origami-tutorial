import React, { Suspense, useEffect, useState } from "react";
import * as THREE from "three";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useProgress } from "@react-three/drei";

import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

declare global {
  interface OBJLoader {
    setMaterials(materials: MTLLoader.MaterialCreator): void;
  }
}

interface OBJMTLViewerProps {
  objPath: string;
  mtlPath: string;
}

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)} %</Html>;
}

const OBJModel: React.FC<OBJMTLViewerProps> = ({ objPath, mtlPath }) => {
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath("/assets/mtl/"); // 수정: MTL 파일의 기본 경로 설정
    mtlLoader.load(mtlPath.split("/").pop()!, (materials) => {
      console.log("MTL loaded successfully:", materials); // 성공 로그
      materials.preload();

      console.log("Materials preloaded"); // 프리로드 완료 로그

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath("/assets/obj/"); // 수정: OBJ 파일의 기본 경로 설정

      console.log(`Loading OBJ file: ${objPath.split("/").pop()}`); // OBJ 로드 시작 로그

      objLoader.load(
        objPath.split("/").pop()!, // 파일명만 추출
        (object) => {
          // 모델 크기 자동 조정
          const box = new THREE.Box3().setFromObject(object);
          // const size = box.getSize(new THREE.Vector3()).length();
          const center = box.getCenter(new THREE.Vector3());

          // 모델 위치 조정 (중심으로 이동)
          object.position.x -= center.x;
          object.position.y -= center.y;
          object.position.z -= center.z;

          // // 모델 크기 조정 (0.5배로 축소)
          // const scale = 0.5 / size;
          // object.scale.set(scale, scale, scale);

          setModel(object);
          console.log("obj ok");
        },
        undefined,
        (error) => {
          console.error("OBJ Load Error:", error);
        }
      );
    });
  }, [objPath, mtlPath]);

  return model ? <primitive object={model} scale={1.5} /> : null;
};

const OBJMTLViewer: React.FC<OBJMTLViewerProps> = ({ objPath, mtlPath }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, -5, 60], fov: 60 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={<Loader />}>
          <OBJModel objPath={objPath} mtlPath={mtlPath} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default OBJMTLViewer;
