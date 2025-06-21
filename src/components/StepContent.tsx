import React from "react";
// import OBJMTLViewer from "./OBJMTLViewer";
import GLBViewer from "./GLBViewer";
import "../styles/StepContent.css";

interface StepContentProps {
  stepData: {
    // objFile: string | null;
    // mtlFile: string;
    // fbxFile?: string;
    glbFile: string;
    diagramFile: string | null;
    description: string;
    title: string;
  };
  showDiagram: boolean;
  hasSubSteps?: boolean;
  currentSubStep?: number;
  subStepCount?: number;
  onPrevSubStep?: () => void;
  onNextSubStep?: () => void;
  currentStep?: { mainStep: number };
}

const StepContent: React.FC<StepContentProps> = ({
  stepData,
  showDiagram,
  hasSubSteps,
  currentSubStep = 0,
  subStepCount = 0,
  onPrevSubStep,
  onNextSubStep,
  currentStep = { mainStep: 0 },
}) => {
  if (!stepData.glbFile) {
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
        {/* <OBJMTLViewer objPath={stepData.objFile} mtlPath={stepData.mtlFile} /> */}
        <GLBViewer
          glbPath={stepData.glbFile}
          stepIndex={currentStep.mainStep}
        />

        {/* 서브스텝 네비게이션 화살표 */}
        {hasSubSteps && (
          <>
            {currentSubStep > 0 && (
              <button
                className="substep-nav-button left"
                onClick={onPrevSubStep}
              >
                &lt;
              </button>
            )}
            {currentSubStep < subStepCount - 1 && (
              <button
                className="substep-nav-button right"
                onClick={onNextSubStep}
              >
                &gt;
              </button>
            )}
          </>
        )}

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
        <p className="step-description">
          {stepData.description.split("\n").map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default StepContent;
