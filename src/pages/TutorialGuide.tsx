import React, { useState } from "react";
import StepIndicator from "../components/StepIndicator";
import StepContent from "../components/StepContent";
import "../styles/TutorialGuide.css";

const stepData = [
  {
    title: "Step1. 삼각형 접기",
    description:
      "정사각형 색종이를 한쪽 대각선 방향으로 반 접어 삼각형을 만들고\n다시 반대 방향 대각선으로도 반 접어주어 삼각형을 만들어 줍니다.",
    glbFile: "/assets/glb/1st-folding.glb",
    planFile: "/assets/plan/plan1.png",
    hasSubSteps: false,
  },
  {
    title: "Step2. 작은 삼각형 접기",
    subSteps: [
      {
        title: "Step2-1",
        description:
          "접어놓은 삼각형의 양쪽 모서리를\n중앙선에 맞춰 접어 마름모 모양을 만듭니다.",
        glbFile: "/assets/glb/2nd-folding.glb",

        planFile: "/assets/plan/plan2-1.png",
      },
      {
        title: "Step2-2",
        description:
          "그 다음, 중앙선을 기준으로 다시 반 접어\n작은 삼각형을 만들어 주세요.",
        glbFile: "/assets/glb/2nd-folding.glb",

        planFile: "/assets/plan/plan2-2.png",
      },
    ],
    hasSubSteps: true,
  },
  {
    title: "Step3. 몸통 선 접기",
    subSteps: [
      {
        title: "Step3-1",
        description:
          "종이를 역삼각형 방향으로 놓고 종이 윗부분의 꼭짓점을 아래 중앙선에 맞춰\n접었다가 다시 펼칩니다. 아래 꼭짓점도 윗쪽 가장자리까지 반 접고 다시 펼칩니다.",
        glbFile: "/assets/glb/3rd-folding.glb",
        planFile: "/assets/plan/plan3-1.png",
      },
      {
        title: "Step3-2",
        description:
          "종이를 뒤집은 뒤, 반대쪽도 같은 방식으로 접었다가 펼칩니다.\n이 과정을 통해 몸통을 접기 위한 기준선이 만들어집니다.",
        glbFile: "/assets/glb/3rd-folding.glb",
        planFile: "/assets/plan/plan3-2.png",
      },
    ],
    hasSubSteps: true,
  },
  {
    title: "Step4. 몸통 만들기",
    subSteps: [
      {
        title: "Step4-1",
        description:
          "종이의 위쪽을 살짝 벌려 펼치면, 앞에서 만든 접힌 선이 안쪽에 보입니다.",
        glbFile: "/assets/glb/4th-folding.glb",
        planFile: "/assets/plan/plan4-1.png",
      },
      {
        title: "Step4-2",
        description: "접힌 선을 따라, 주황색 영역을 위로 접어 올려 주세요.",
        glbFile: "/assets/glb/4th-folding.glb",

        planFile: "/assets/plan/plan4-2.png",
      },
      {
        title: "Step4-3",
        description:
          "종이를 뒤집고, 반대쪽도 같은 방식으로 접어 올립니다.\n양쪽 모두 접으면, 종이 전체가 배처럼 생긴 모양이 됩니다.",
        glbFile: "/assets/glb/4th-folding.glb",
        planFile: "/assets/plan/plan4-3.png",
      },
    ],
    hasSubSteps: true,
  },
  {
    title: "Step5. 날개 만들기",
    description:
      "종이의 벌려지는 부분 선을 따라 펼치며 새의 날개 모양을 만들어 줍니다.\n그리고 종이를 뒤집고, 반대쪽도 같은 방식으로 펼쳐 접어 줍니다.",
    glbFile: "/assets/glb/5th-folding.glb",

    planFile: "/assets/plan/plan5.png",
    hasSubSteps: false,
  },
  {
    title: "Step6. 머리 만들기",
    description:
      "앞쪽 끝 부분을 보이는 선에 맞춰 아래 방향으로 눌러 접어줍니다.\n부리처럼 뾰족하게 내려오며, 새의 머리 모양이 완성됩니다.",
    glbFile: "/assets/glb/6th-folding.glb",

    planFile: "/assets/plan/plan6.png",
    hasSubSteps: false,
  },
  {
    title: "Step7. 꼬리 만들기",
    subSteps: [
      {
        title: "Step7-1",
        description: "새 몸통의 중심선에 맞춰 종이를 접었다가 펼쳐 주세요.",
        glbFile: "/assets/glb/7th-folding.glb",

        planFile: "/assets/plan/plan7-1.png",
      },
      {
        title: "Step7-2",
        description:
          "종이를 살짝 펼쳐 접힌 선에 따라 파란색 영역을 위쪽으로 올려 접어\n꼬리 모양을 만들어 줍니다.",
        glbFile: "/assets/glb/7th-folding.glb",

        planFile: "/assets/plan/plan7-2.png",
      },
    ],
    hasSubSteps: true,
  },
];

interface TutorialGuideProps {
  onFinish: () => void; // 페이지 전환 콜백
}

const TutorialGuide: React.FC<TutorialGuideProps> = ({
  onFinish = () => {},
}) => {
  const [currentStep, setCurrentStep] = useState({
    mainStep: 0,
    subStep: 0,
  });
  const [showPlan, setShowPlan] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 현재 스텝 데이터 가져오기
  const getCurrentData = () => {
    const mainStepData = stepData[currentStep.mainStep];
    if (mainStepData.hasSubSteps && mainStepData.subSteps) {
      const sub = mainStepData.subSteps[currentStep.subStep];
      return {
        ...sub,
        mainTitle: mainStepData.title,
        hasSubSteps: true,
        currentSubStep: currentStep.subStep,
        subStepCount: mainStepData.subSteps.length,
      };
    }

    return {
      ...mainStepData,
      mainTitle: mainStepData.title,
      hasSubSteps: false,
      currentSubStep: 0,
      subStepCount: 0,
    };
  };

  const currentData = getCurrentData();

  // Step7-2인지 체크하는 함수 추가
  const isStep7_2 = () => {
    console.log(
      "현재 mainStep:",
      currentStep.mainStep,
      "현재 subStep:",
      currentStep.subStep
    );
    return currentStep.mainStep === 6 && currentStep.subStep === 1;
  };

  // 다음 버튼 클릭 시 처리 함수 변경
  const handleNextButtonClick = () => {
    console.log("다음 버튼 클릭 - 현재 스텝:", currentStep);
    if (isStep7_2()) {
      console.log("7-2 스텝이므로 모달 열기");
      setShowModal(true);
    } else {
      handleNextStep();
    }
  };

  // 모달 "아직이에요" 클릭 -> 모달 닫고 다음 단계 버튼 다시 보임
  const handleModalCancel = () => {
    setShowModal(false);
  };

  // 모달 "다 했어요" 클릭 -> 꾸미기 화면으로 전환
  const navigateToDecorate = () => {
    onFinish();
  };

  const handlePrevStep = () => {
    const mainStepData = stepData[currentStep.mainStep - 1];

    // 서브스텝이 있으면 이전 서브스텝
    if (mainStepData.hasSubSteps && currentStep.subStep > 0) {
      setCurrentStep((prev) => ({
        ...prev,
        subStep: prev.subStep - 1,
      }));
    }
    // 첫 서브스텝이거나 서브스텝 없는 경우 → 이전 메인스텝으로
    else if (currentStep.mainStep > 0) {
      const prevMainStep = currentStep.mainStep - 1;
      const prevStepData = stepData[prevMainStep];

      setCurrentStep({
        mainStep: prevMainStep,
        subStep:
          prevStepData.hasSubSteps && prevStepData.subSteps
            ? prevStepData.subSteps.length - 1
            : 0,
      });
    }

    setShowPlan(false); // 도면 닫기
  };

  const handleNextStep = () => {
    const mainStepData = stepData[currentStep.mainStep];

    // 서브 스텝이 있는 경우
    if (mainStepData.hasSubSteps && mainStepData.subSteps) {
      // 아직 서브 스텝이 남아있는 경우
      if (currentStep.subStep < mainStepData.subSteps.length - 1) {
        setCurrentStep((prev) => ({
          ...prev,
          subStep: prev.subStep + 1,
        }));
      }
      // 마지막 서브 스텝인 경우 메인 스텝 이동
      else if (currentStep.mainStep < stepData.length - 1) {
        setCurrentStep({
          mainStep: currentStep.mainStep + 1,
          subStep: 0,
        });
      }
    }
    // 서브 스텝이 없는 경우
    else if (currentStep.mainStep < stepData.length - 1) {
      setCurrentStep({
        mainStep: currentStep.mainStep + 1,
        subStep: 0,
      });
    }

    setShowPlan(false);
  };

  const handlePrevSubStep = () => {
    if (currentStep.subStep > 0) {
      setCurrentStep((prev) => ({
        ...prev,
        subStep: prev.subStep - 1,
      }));
    }
  };

  const handleNextSubStep = () => {
    const mainStepData = stepData[currentStep.mainStep];
    if (
      mainStepData.hasSubSteps &&
      mainStepData.subSteps &&
      currentStep.subStep < mainStepData.subSteps.length - 1
    ) {
      setCurrentStep((prev) => ({
        ...prev,
        subStep: prev.subStep + 1,
      }));
    }
  };

  // 이전 버튼을 표시할지 여부 함수 추가
  const shouldShowPrevButton = () => {
    const mainStepData = stepData[currentStep.mainStep];

    // 첫 번째 메인 스텝이면 이전 버튼 무조건 안 보임
    if (currentStep.mainStep === 0) return false;

    if (mainStepData.hasSubSteps && mainStepData.subSteps) {
      // 서브스텝이 있으면 첫 번째 서브스텝인 경우에만 이전 버튼 표시
      return currentStep.subStep === 0;
    }

    // 서브스텝 없으면 항상 이전 버튼 표시
    return true;
  };

  // 다음 버튼을 표시할지 여부
  const shouldShowNextButton = () => {
    const mainStepData = stepData[currentStep.mainStep];

    // 서브 스텝이 있는 경우
    if (mainStepData.hasSubSteps && mainStepData.subSteps) {
      // 마지막 서브 스텝인 경우에만 표시
      return currentStep.subStep === mainStepData.subSteps.length - 1;
    }
    // 서브 스텝이 없는 경우 항상 표시
    return true;
  };

  return (
    <div className="tutorial-guide">
      <div className="tutorial-header">
        <div className="step-navigation">
          <div className="step-indicator-wrapper">
            <StepIndicator
              currentStep={currentStep.mainStep}
              totalSteps={stepData.length}
            />
          </div>
        </div>
        <h2 className="step-title">{currentData.mainTitle}</h2>
      </div>
      <div className={`tutorial-content`}>
        {currentData.glbFile && (
          <div className="step-main-content">
            <StepContent
              stepData={{
                title: currentData.mainTitle,
                description: currentData.description,
                glbFile: currentData.glbFile,
                planFile: currentData.planFile,
              }}
              showPlan={showPlan}
              hasSubSteps={currentData.hasSubSteps}
              currentSubStep={currentData.currentSubStep}
              subStepCount={currentData.subStepCount}
              onPrevSubStep={handlePrevSubStep}
              onNextSubStep={handleNextSubStep}
              currentStep={currentStep}
            />

            <div className="step-prev-next-button">
              {shouldShowPrevButton() && (
                <button onClick={handlePrevStep} className="prev-step-button">
                  &lt; 이전 단계
                </button>
              )}
              {shouldShowNextButton() && (
                <button
                  onClick={handleNextButtonClick}
                  className="next-step-button"
                >
                  {isStep7_2() ? "완성 >" : "다음 단계 >"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">종이접기를 완료하셨나요?</h2>
            <p className="modal-description">
              이제 꾸미기 단계로 넘어갈 수 있어요.
            </p>

            <div className="modal-buttons">
              <button
                className="modal-button cancel"
                onClick={handleModalCancel}
              >
                아직이에요
              </button>
              <button
                className="modal-button confirm"
                onClick={navigateToDecorate}
              >
                다 했어요
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorialGuide;
