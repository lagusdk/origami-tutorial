import React from "react";
import "../styles/StepIndicator.css";

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  const stepCount = totalSteps;

  const stepColors = [
    "#EA0047", // 빨간색
    "#FFb43a", // 노란색
    "#47c720", // 초록색
    "#379fff", // 파란색
    "#EA0047", // 빨간색
    "#FFb43a", // 노란색
    "#47c720", // 초록색
  ];

  return (
    <div className="step-indicator">
      {Array.from({ length: stepCount }, (_, index) => {
        const isCurrent = index === currentStep;
        const isCompleted = index < currentStep;

        const backgroundColor =
          isCompleted || isCurrent ? stepColors[index] || "#ffffff" : "#ffffff"; // 대기 상태일 땐 흰색

        return (
          <div
            key={index}
            className={`step-dot ${isCurrent ? "step-dot--current" : ""}`}
            style={{ backgroundColor }}
          />
        );
      })}
    </div>
  );
};

export default StepIndicator;
