import React, { useState } from "react";
import "../styles/WelcomeScreen.css";

type WelcomeScreenProps = {
  onStart: () => void;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [stage, setStage] = useState<"welcome" | "info">("welcome");

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        {stage === "welcome" && (
          <>
            <div className="logo-container">
              <img
                src="/assets/FoldingBirding-Logo.png"
                alt="FoldingBirding Logo"
                className="logo"
              />
            </div>
            <p className="description">체험을 시작하려면 버튼을 누르세요</p>
            <button onClick={() => setStage("info")} className="start-button">
              시작하기
            </button>
          </>
        )}

        {stage === "info" && (
          <>
            <p className="main-description">
              지금부터 종이접기를 먼저 시작하겠습니다.
            </p>
            <p className="sub-description">
              종이접기는 총 7단계로 진행돼요.
              <br />
              원하는 각도로 종이 새를 돌려볼 수 있어요.
            </p>
            <img
              src="/assets/paper-bird.png"
              alt="종이새"
              className="bird-image"
            />
            <button onClick={onStart} className="next-button">
              다음 단계로 &gt;
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
