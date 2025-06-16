import { useState, useEffect } from "react";
import "./App.css";

import WelcomeScreen from "./pages/WelcomeScreen";
import TutorialGuide from "./pages/TutorialGuide";

function App() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    function handleResize() {
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      document.documentElement.style.setProperty("--vw", `${vw}px`);

      // iPad Pro 11" 비율 유지
      const targetRatio = 178.5 / 247.6;
      const currentRatio = window.innerWidth / window.innerHeight;

      if (currentRatio > targetRatio) {
        // 너비가 비율보다 큰 경우 (세로 모드)
        document.documentElement.style.setProperty(
          "--scale-factor",
          `${window.innerHeight / 247.6}`
        );
      } else {
        // 높이가 비율보다 큰 경우 (가로 모드)
        document.documentElement.style.setProperty(
          "--scale-factor",
          `${window.innerWidth / 178.5}`
        );
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-container">
      {started ? (
        <TutorialGuide />
      ) : (
        <WelcomeScreen onStart={() => setStarted(true)} />
      )}
    </div>
  );
}

export default App;
