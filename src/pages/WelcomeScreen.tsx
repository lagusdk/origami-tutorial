import React from "react";
import "../styles/WelcomeScreen.css";

type WelcomeScreenProps = {
  onStart: () => void;
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="logo-container">
          <img
            src="/assets/FoldingBirding-Logo.png"
            alt="FordingBirding Logo"
            className="logo"
          />
        </div>

        <p className="description">체험을 시작하려면 버튼을 누르세요</p>

        <button onClick={onStart} className="start-button">
          시작하기
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
