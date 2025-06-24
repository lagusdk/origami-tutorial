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
  const [stage, setStage] = useState<"deco" | "save">("deco");

  const openConfirmModal = () => setModalStep("confirm");
  const closeModal = () => setModalStep("none");

  // 첫번째 모달에서 '다 했어요' 클릭시 두번째 모달로 전환
  const confirmDone = () => setModalStep("callAdmin");

  // 두번째 모달에서 다음 버튼 클릭
  const handleNext = () => {
    setModalStep("none");
    setStage("save");
  };

  return (
    <div
      className={`bird-decoration ${
        stage === "save" ? "save-stage" : "deco-stage"
      }`}
    >
      {stage === "deco" && (
        <>
          <header className="bird-header">
            <h1 className="bird-title">
              색칠하고, 장식하고
              <br />
              나의 상상력을 마음껏 펼쳐보세요.
            </h1>
          </header>

          <main className="bird-main-content">
            <div className="bird-textbox">
              <p className="bird-subtitle">꾸미기 전 유의사항</p>
              <p className="bird-text-content">
                <p>
                  <strong>
                    <span className="colored-text1">
                      1. 색이 그대로 반영되지 않을 수 있어요
                    </span>
                  </strong>
                </p>
                <p>
                  카메라로 촬영한 이미지를 기반으로 3D 모델에 색을 입히는
                  과정에서는 조명, 해상도, 인식 정확도에 따라 색이 조금 다르게
                  나타날 수 있어요. 너무 세밀한 표현보다는, 명확하고 뚜렷한
                  색상을 사용하는 것이 좋아요.
                </p>
              </p>
              <p className="bird-text-content">
                <p>
                  <strong>
                    <span className="colored-text3">
                      2. 머리 부분은 인식이 어려울 수 있어요
                    </span>
                  </strong>
                </p>
                <p>
                  스캔 과정에서 새의 머리는 구조상 잘 인식되지 않을 수 있어요.
                  그래서 몸통과 날개 중심으로 꾸며주는 것이 가장 효과적입니다.
                </p>{" "}
              </p>

              <p className="bird-text-content">
                <p>
                  <strong>
                    <span className="colored-text2">
                      3. 안쪽까지 꼼꼼히 색칠해 주세요
                    </span>
                  </strong>
                </p>
                <p>
                  날개의 바깥뿐 아니라 날개 안쪽까지 골고루 색칠해 주시면, 3D
                  모델에서도 더 자연스럽고 풍부한 텍스처로 표현돼요.
                </p>{" "}
              </p>
            </div>

            <div className="bird-bottom-container">
              {modalStep === "none" && (
                <button
                  className="bird-complete-button"
                  onClick={openConfirmModal}
                >
                  완료
                </button>
              )}
            </div>
          </main>

          {modalStep !== "none" && (
            <div className="modal-overlay">
              <div className="modal-content">
                {modalStep === "confirm" && (
                  <>
                    <h2 className="modal-title">꾸미기를 완료하셨나요?</h2>
                    <p className="modal-description">
                      직접 그린 디자인이 실제 MR 세계에서 반영됩니다.
                    </p>
                    <div className="modal-buttons">
                      <button
                        className="modal-button cancel"
                        onClick={closeModal}
                      >
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
                      <h2 className="modal-title">운영자를 불러주세요.</h2>
                      <pre className="modal-description">
                        {`이제 MR 세상에서 당신의 새를 만나볼 수 있어요.`}
                      </pre>
                    </div>
                    <button className="modal-button next" onClick={handleNext}>
                      확인했어요
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {stage === "save" && (
        <div className="bird-save-content">
          <div className="bird-save-container">
            <GLBViewer glbPath="/assets/glb/welcome-bird.glb" />
          </div>
          <h2>나만의 새를 저장하고 있어요!</h2>
          <p>그동안 FOLDING BIRDING 팀의 이야기를 들려드릴게요</p>
          <button className="modal-button next" onClick={onNext}>
            좋아요
          </button>
        </div>
      )}
    </div>
  );
};

export default BirdDecoration;
