// EnhancedThreeViewer.tsx
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useProgress, Html } from "@react-three/drei";

import OBJLoaderWrapper from "./OBJLoaderWrapper";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

interface EnhancedThreeViewerProps {
  objFile: string | null;
  animationFile?: string;
}

const EnhancedThreeViewer: React.FC<EnhancedThreeViewerProps> = ({
  objFile,
  animationFile,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const updateSize = () => {
        if (containerRef.current) {
          setDimensions({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
          });
        }
      };

      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  if (!objFile) {
    return (
      <div
        className="placeholder"
        style={{
          width: "100%",
          height: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        준비 중...
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Canvas style={{ width: dimensions.width, height: dimensions.height }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <OBJLoaderWrapper
            objUrl={objFile}
            fbxUrl={animationFile}
            scale={[0.5, 0.5, 0.5]}
          />
          <OrbitControls enablePan={false} enableZoom={true} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default EnhancedThreeViewer;
