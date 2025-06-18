import React, { useState } from "react";
import "../styles/BirdDecoration.css";

interface BirdDecorationProps {
  onNext: () => void; // 다음 페이지 이동 콜백
}

const BirdDecoration: React.FC<BirdDecorationProps> = ({ onNext }) => {
  const [modalStep, setModalStep] = useState<"none" | "confirm" | "callAdmin">(
    "none"
  );

  const openConfirmModal = () => setModalStep("confirm");
  const closeModal = () => setModalStep("none");

  // 첫번째 모달에서 '다 했어요' 클릭시 두번째 모달로 전환
  const confirmDone = () => setModalStep("callAdmin");

  // 두번째 모달에서 다음 버튼 클릭
  const handleNext = () => {
    setModalStep("none");
    onNext();
  };

  return (
    <div className="bird-decoration">
      <header className="bird-header">
        <h1 className="bird-title">
          색칠하고, 장식하고, 상상력을 마음껏 펼쳐보세요.
        </h1>
        <p className="bird-subtitle">MR 세계에서도 반영돼요</p>
      </header>

      <main className="bird-main-content">
        <div className="bird-textbox">
          <pre>
            {`유의사항1
유의사항2
유의사항3`}
          </pre>
        </div>
      </main>

      {modalStep === "none" && (
        <button className="bird-complete-button" onClick={openConfirmModal}>
          완료
        </button>
      )}

      {modalStep !== "none" && (
        <div className="modal-overlay">
          <div className="modal-content">
            {modalStep === "confirm" && (
              <>
                <h2 className="modal-title">꾸미기를 완료하셨나요?</h2>

                <div className="modal-buttons">
                  <button className="modal-button cancel" onClick={closeModal}>
                    아직이에요
                  </button>
                  <button
                    className="modal-button confirm"
                    onClick={confirmDone}
                  >
                    다 했어요
                  </button>
                </div>
              </>
            )}
            {modalStep === "callAdmin" && (
              <>
                <div>
                  <h3 className="modal-subtitle">운영자를 불러주세요.</h3>
                  <pre className="modal-description">
                    {`MR 세상에서 당신의 새를 만나볼 수 있도록
스캔이 필요합니다.`}
                  </pre>
                </div>
                <button className="modal-button next" onClick={handleNext}>
                  다음
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BirdDecoration;
