import React, { useState } from "react";
import "../styles/WelcomeScreen.css";
// import GLBViewer from "../components/GLBViewer-copy";

type WelcomeScreenProps = {
  onStart: () => void;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [stage, setStage] = useState<"title" | "onboarding">("title");

  return (
    <div className={`welcome-screen ${stage}-stage`}>
      <div className={`welcome-content ${stage}-stage`}>
        {stage === "title" && (
          <>
            <div className="logo-container">
              <img
                src="/assets/FoldingBirding-Logo.png"
                alt="FoldingBirding Logo"
                className="logo"
              />
            </div>
            <div className="intro-section">
              <p className="description">
                종이접기 체험을
                <br />
                시작하려면 버튼을 눌러주세요
              </p>
              <button
                onClick={() => setStage("onboarding")}
                className="start-button"
              >
                <span className="gradient-text">시작하기</span>
              </button>
            </div>
          </>
        )}

        {stage === "onboarding" && (
          <>
            <p className="main-description">
              지금부터 종이접기를 시작해볼까요?
            </p>
            <p className="sub-description">
              종이접기는 총 7단계로 진행돼요.
              <br />
              <span className="sub-description2">
                원하는 각도로 종이 새를 돌려볼 수 있어요.
              </span>
            </p>
            {/* <div className="bird-3d-container">
              <GLBViewer glbPath="/assets/glb/welcome-bird.glb" />
            </div> */}
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
