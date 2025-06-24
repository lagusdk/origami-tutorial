import React from "react";
// import OBJMTLViewer from "./OBJMTLViewer";
import GLBViewer from "./GLBViewer";
import "../styles/StepContent.css";

interface StepContentProps {
  stepData: {
    glbFile: string;
    planFile: string | null;
    description: string;
    title: string;
  };
  showPlan: boolean;
  hasSubSteps?: boolean;
  currentSubStep?: number;
  subStepCount?: number;
  onPrevSubStep?: () => void;
  onNextSubStep?: () => void;
  currentStep?: { mainStep: number };
}

const StepContent: React.FC<StepContentProps> = ({
  stepData,
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
      {stepData.planFile && (
        <div className="plan-fixed-banner">
          <span>평면도</span>
          <img src={stepData.planFile} alt="접기 도면" className="plan-image" />
        </div>
      )}

      {/* 3D 뷰어는 항상 표시 */}
      <div className="model-viewer-container">
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
