import { useState, useEffect, useMemo } from "react";
import "./App.css";

import WelcomeScreen from "./pages/WelcomeScreen";
import TutorialGuide from "./pages/TutorialGuide";
import BirdDecoration from "./pages/BirdDecoration";
import ScanLoading from "./pages/ScanLoading";

function App() {
  const [currentPage, setCurrentPage] = useState<
    "title" | "tutorial" | "decorate" | "loading"
  >("title");

  const clickSound = useMemo(
    () => new Audio("/assets/sounds/userinterface-32114.mp3"),
    []
  );

  useEffect(() => {
    // 윈도우 리사이즈 핸들러
    function handleResize() {
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      document.documentElement.style.setProperty("--vw", `${vw}px`);

      const targetRatio = 178.5 / 247.6;
      const currentRatio = window.innerWidth / window.innerHeight;

      if (currentRatio > targetRatio) {
        document.documentElement.style.setProperty(
          "--scale-factor",
          `${window.innerHeight / 247.6}`
        );
      } else {
        document.documentElement.style.setProperty(
          "--scale-factor",
          `${window.innerWidth / 178.5}`
        );
      }
    }

    // 버튼 클릭 사운드 핸들러
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button")) {
        clickSound.currentTime = 0; // 재생 위치 0초로 초기화
        clickSound.play().catch((err) => {
          console.log("재생 차단됨:", err);
        });
        // 1초 뒤에 사운드 일시정지 및 위치 초기화
        setTimeout(() => {
          clickSound.pause();
          clickSound.currentTime = 0;
        }, 1000);
      }
    };

    // 이벤트 등록
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClick);
    handleResize(); // 초기 실행

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="app-container">
      {currentPage === "title" && (
        <WelcomeScreen onStart={() => setCurrentPage("tutorial")} />
      )}
      {currentPage === "tutorial" && (
        <TutorialGuide onFinish={() => setCurrentPage("decorate")} />
      )}
      {currentPage === "decorate" && (
        <BirdDecoration
          onNext={() => {
            setCurrentPage("loading");
          }}
        />
      )}
      {currentPage === "loading" && <ScanLoading />}
    </div>
  );
}

export default App;
