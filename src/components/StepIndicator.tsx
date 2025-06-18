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
  const stepCount = totalSteps - 1;

  return (
    <div className="step-indicator">
      {Array.from({ length: stepCount }, (_, index) => (
        <div
          key={index}
          className={`step-dot ${
            index === currentStep
              ? "step-dot--current"
              : index < currentStep
              ? "step-dot--completed"
              : "step-dot--pending"
          }`}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
