import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import StepIndicator from "../components/StepIndicator";
import "../styles/TutorialGuide.css";
import EnhancedThreeViewer from "../components/EnhancedThreeViewer";

const stepData = [
  {
    title: "Step0. 준비하기",
    description:
      "종이접기를 시작해볼까요? 총 7단계로 진행돼요. 원하는 각도로 새를 둘러볼 수 있어요.",
    objFile: null,
    animationFile: undefined,
    diagramFile: null,
  },
  {
    title: "Step1. 삼각형 접기",
    description:
      "정사각형 색종이를 한쪽 대각선 방향으로 반 접어 삼각형을 만들고 다시 반대 방향 대각선으로도 반 접어주어 삼각형을 만들어 줍니다.",
    objFile: "/assets/object1.obj",
    animationFile: "/assets/animation1.fbx",
    diagramFile: "/assets/diagram1.png",
  },
  {
    title: "Step2. 작은 삼각형 접기",
    description:
      "접어놓은 삼각형의 양쪽 모서리를 중앙선에 맞춰 접어 마름모 모양을 만듭니다.",
    objFile: "/assets/object2.obj",
    animationFile: "/assets/animation2.fbx",
    diagramFile: "/assets/diagram2.png",
  },
  {
    title: "Step3. 몸통 선 접기",
    description:
      "종이를 역삼각형 방향으로 놓고 윗부분의 꼭짓점을 아래 중앙선에 맞춰 접었다가 다시 펼칩니다. 아래 꼭짓점도 윗쪽 가장자리까지 반 접고 다시 펼칩니다.",
    objFile: "/assets/object3.obj",
    animationFile: "/assets/animation3.fbx",
    diagramFile: "/assets/diagram3.png",
  },
  {
    title: "Step4. 몸통 만들기",
    description:
      "종이의 위쪽을 살짝 벌려 펼치면, 앞에서 만든 접힌 선이 안쪽에 보입니다.",
    objFile: "/assets/object4.obj",
    animationFile: "/assets/animation4.fbx",
    diagramFile: "/assets/diagram4.png",
  },
  {
    title: "Step5. 날개 만들기",
    description:
      "종이의 벌려지는 부분 선을 따라 펼치며 새의 날개 모양을 만들어 줍니다. 그리고 종이를 뒤집고, 반대쪽도 같은 방식으로 펼쳐 접어 줍니다.",
    objFile: "/assets/object5.obj",
    animationFile: "/assets/animation5.fbx",
    diagramFile: "/assets/diagram5.png",
  },
  {
    title: "Step6. 머리 만들기",
    description:
      "앞쪽 끝 부분을 보이는 선에 맞춰 아래 방향으로 눌러 접어줍니다. 부리처럼 뾰족하게 내려오며, 새의 머리 모양이 완성됩니다.",
    objFile: "/assets/object6.obj",
    animationFile: "/assets/animation6.fbx",
    diagramFile: "/assets/diagram6.png",
  },
];

interface TutorialStepProps {
  stepData: (typeof stepData)[0];
  isActive: boolean;
}

const TutorialStep: React.FC<TutorialStepProps> = ({ stepData }) => {
  const [showDiagram, setShowDiagram] = useState(false);

  return (
    <div className="tutorial-step">
      <div className="step-header">
        <h2 className="step-title">{stepData.title}</h2>
        <p className="step-description">{stepData.description}</p>
      </div>

      {stepData.objFile ? (
        <div className="step-content">
          {!showDiagram ? (
            <EnhancedThreeViewer
              objFile={stepData.objFile}
              animationFile={stepData.animationFile}
            />
          ) : (
            <div className="diagram-container">
              <img
                src={stepData.diagramFile}
                alt={`${stepData.title} 도면`}
                className="diagram-image"
              />
            </div>
          )}
          <div className="diagram-button-container">
            <button
              onClick={() => setShowDiagram(!showDiagram)}
              className="diagram-button"
            >
              {showDiagram ? "3D 모델 보기" : "도면 보기"}
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

const TutorialGuide: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (swiperRef.current && currentStep < stepData.length - 1) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="tutorial-guide">
      <div className="tutorial-header">
        <div className="header-content">
          <StepIndicator
            currentStep={currentStep}
            totalSteps={stepData.length}
          />
        </div>
        {currentStep < stepData.length - 1 && (
          <button onClick={handleNextStep} className="next-step-button">
            다음 단계
          </button>
        )}
      </div>

      <div className="tutorial-content">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={(swiper) => setCurrentStep(swiper.activeIndex)}
          className="tutorial-swiper"
        >
          {stepData.map((step, index) => (
            <SwiperSlide key={index}>
              <TutorialStep stepData={step} isActive={currentStep === index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TutorialGuide;
