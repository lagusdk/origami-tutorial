import React from "react";
import ThreeViewer from "../components/ThreeViewer";
import "../styles/StepContent.css";

interface StepContentProps {
  stepData: {
    objFile: string | null;
    mtlFile: string;
    fbxFile?: string;
    diagramFile: string | null;
    description: string;
    title: string;
  };
  showDiagram: boolean;
}

const StepContent: React.FC<StepContentProps> = ({ stepData, showDiagram }) => {
  if (!stepData.objFile) {
    return (
      <div className="step-content">
        <div className="placeholder">준비 중...</div>
      </div>
    );
  }

  return (
    <div className="step-content">
      {/* 3D 뷰어는 항상 표시 */}
      <div className="model-viewer-container">
        <ThreeViewer
          objFile={stepData.objFile!}
          mtlFile={stepData.mtlFile}
          fbxFile={stepData.fbxFile}
        />

        {/* 도면 팝업 (showDiagram이 true일 때만 표시) */}
        {showDiagram && stepData.diagramFile && (
          <div className="diagram-popup">
            <img
              src={stepData.diagramFile}
              alt={`${stepData.title} 도면`}
              className="diagram-image"
            />
          </div>
        )}
      </div>

      <div className="step-description-box">
        <p className="step-description">{stepData.description}</p>
      </div>
    </div>
  );
};

export default StepContent;
