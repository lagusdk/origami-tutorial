import React, { useState } from "react";
import "../styles/BirdDecoration.css";
import GLBViewer from "../components/GLBViewer-copy";

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
          내가 접은 새를 <span className="colored-text1">색칠하고</span>{" "}
          <span className="colored-text2">꾸미면서</span>
          <br />
          <span className="colored-text3">상상력</span>을 마음껏 펼쳐보세요!
        </h1>
      </header>

      <main className="bird-main-content">
        <div className="bird-textbox">
          <div className="bird-text-content">
            <p>
              <strong>1. 색이 그대로 반영되지 않을 수 있어요</strong>
            </p>
            <p>
              - 카메라로 촬영한 이미지를 기반으로 3D 모델에 색을 입히는
              과정에서는 조명, 해상도, 인식 정확도에 따라 색이 조금 다르게
              나타날 수 있어요. 너무 세밀한 표현보다는, 명확하고 뚜렷한 색상을
              사용하는 것이 좋아요.
            </p>

            <p>
              <strong>2. 머리 부분은 인식이 어려울 수 있어요</strong>
            </p>
            <p>
              - 스캔 과정에서 새의 머리는 구조상 잘 인식되지 않을 수 있어요.
              그래서 몸통과 날개 중심으로 꾸며주는 것이 가장 효과적입니다.
            </p>

            <p>
              <strong>3. 안쪽까지 꼼꼼히 색칠해 주세요</strong>
            </p>
            <p>
              - 날개의 바깥뿐 아니라 날개 안쪽까지 골고루 색칠해 주시면, 3D
              모델에서도 더 자연스럽고 풍부한 텍스처로 표현돼요.
            </p>
          </div>
        </div>
      </main>

      <div className="bird-bottom-container">
        <p className="bird-subtitle">꾸민 새는 MR 세계에서도 반영돼요</p>
        {modalStep === "none" && (
          <button className="bird-complete-button" onClick={openConfirmModal}>
            완료
          </button>
        )}
      </div>

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
                  {/* <h3 className="modal-subtitle">운영자를 불러주세요.</h3> */}
                  <pre className="modal-description">
                    {`Folding Birding에서 당신의 새를 만나기 위해
근처의 운영자를 불러주세요.`}
                  </pre>
                </div>
                <button className="modal-button next" onClick={handleNext}>
                  다음
                </button>
              </>
            )}

            {/* <div className="bird-3d-container">
              <GLBViewer glbPath="/assets/glb/welcome-bird.glb" />
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default BirdDecoration;
