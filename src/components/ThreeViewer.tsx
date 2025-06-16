import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress, Html } from "@react-three/drei";
import OBJLoaderWrapper from "../components/OBJLoaderWrapper";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

interface ThreeViewerProps {
  objFile: string;
  mtlFile?: string;
  fbxFile?: string;
}

const ThreeViewer: React.FC<ThreeViewerProps> = ({
  objFile,
  mtlFile,
  fbxFile,
}) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={<Loader />}>
        <OBJLoaderWrapper
          objUrl={objFile}
          mtlUrl={mtlFile}
          fbxUrl={fbxFile}
          position={[0, -1, 0]}
          scale={[0.5, 0.5, 0.5]}
        />
        <OrbitControls makeDefault />
      </Suspense>
    </Canvas>
  );
};

export default ThreeViewer;
