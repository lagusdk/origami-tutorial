import { useEffect, useState, useRef } from "react";
import "../styles/ScanLoading.css";

interface Scene {
  type: "text" | "image" | "modal";
  lines: string[];
  button?: string;
  noFade?: boolean;
  waitForClick?: boolean;
  spacing?: "normal" | "wide";
  image?: string;
  imageDelay?: boolean;
  tightenQuote?: boolean;
  tightenParagraph?: boolean;
  compressLines?: boolean;
}

// 절취선을 기준으로 논리적으로 그룹화된 scenes
const scenesByPage: Scene[][] = [
  // 1페이지
  [
    {
      type: "text",
      lines: [
        "운영자에게 종이새를 잘 전달하셨나요?",
        "종이새 스캔에는 약 1분 정도 소요됩니다.",
        "그동안 당신의 새가 전해준 메시지를 읽어보시겠어요?",
      ],
      button: "좋아요",
      noFade: true,
      waitForClick: true,
      tightenParagraph: true,
    },
  ],

  // 2페이지
  [
    {
      type: "text",
      lines: ["나는... 새가 되고 싶었어", "하늘을 나는 새가."],
      tightenParagraph: true,
      spacing: "wide",
    },
  ],

  // 3페이지
  [
    {
      type: "text",
      lines: ["알록달록한 새와는 거리가 먼 하얀 종이로 태어났지만,"],
      tightenParagraph: true,
      spacing: "normal",
    },
    {
      type: "text",
      lines: ["언젠가는 파란 하늘을,", "푸르른 숲속을,"],
      tightenParagraph: true,
      spacing: "normal",
    },
    {
      type: "text",
      lines: ["울창한 나뭇가지 사이를", "날아다닐 수 있으리라 믿었어."],
      tightenParagraph: true,
      spacing: "normal",
    },
  ],

  // 4페이지
  [
    {
      type: "text",
      lines: ["그러던 어느 날"],
      tightenParagraph: true,
      spacing: "normal",
    },
    // {
    //   type: "image",
    //   lines: [],
    //   image: "/assets/FoldingBirding-Logo.png",
    //   imageDelay: true,
    //   spacing: "wide",
    // },
    {
      type: "text",
      lines: ["XREAL에 있는 'FOLDING BIRDING' 팀을 만났어!"],
      tightenParagraph: true,
      spacing: "normal",
    },
  ],

  // 5페이지
  [
    {
      type: "text",
      lines: ["그들은 내게 속삭였어."],
      tightenParagraph: true,
      spacing: "normal",
    },
    {
      type: "text",
      lines: [
        "“머지않아 누군가의 손길이 닿으면,\n넌 예쁜 숲속을 자유롭게 날아다니는 새가 될 거야.\n우리가 꼭 그렇게 만들어 줄게!”",
      ],
      tightenQuote: false,
      spacing: "wide",
    },
  ],

  // 6페이지
  [
    {
      type: "text",
      lines: [
        "그렇게 FOLDING BIRDING 팀은",
        "나를 위해 밤낮 쉬지 않고 개발에 매진해줬어",
      ],
      tightenParagraph: true,
      spacing: "normal",
    },
    {
      type: "text",
      lines: ["그리고 너도 나를 이렇게 예쁘게 만들어줬지!", "그렇게 해서..."],
      tightenParagraph: true,
      spacing: "normal",
    },
  ],
  // 7페이지
  [
    {
      type: "modal",
      lines: ["척추에 변화 감지.", "날개가 돋아나는 중입니다..."],
      button: "확인",
    },
  ],

  // 8페이지
  [
    {
      type: "text",
      lines: ["등에서 뭔가 피어나려는 것 같아!", "날개가 돋았나봐!"],
      tightenParagraph: true,
      spacing: "normal",
    },
    {
      type: "text",
      lines: [
        "FOLDING BIRDING 팀의 말이, 내 꿈이, 현실이 될지도 몰라.",
        "방금 내가 느낀 따스한 손길...",
      ],
      tightenParagraph: true,
      spacing: "normal",
    },
    {
      type: "text",
      lines: ["나를 이리 저리 접어주던 그 손길 덕분에!"],
      tightenParagraph: true,
      spacing: "normal",
    },
  ],

  // 9페이지
  [
    {
      type: "modal",
      lines: ["잠시 후 스캔이 완료됩니다."],
      button: "확인",
    },
  ],

  // // 10페이지
  // [
  //   {
  //     type: "text",
  //     lines: [
  //       "너의 손길로 탄생한 내가",
  //       "날개를 달고 나는 모습을 지켜봐 줘.",
  //       "나랑 함께 숲속을 돌아다니자!",
  //     ],
  //     spacing: "wide",
  //   },
  //   {
  //     type: "modal",
  //     lines: ["새의 메시지가 종료되었습니다."],
  //     button: "확인",
  //   },
  // ],

  // 11페이지
  [
    {
      type: "text",
      lines: [
        "“여러분의 종이새를 MR공간에서 만나볼 준비가 되셨나요?”",
        "이 화면이 나타나면 운영자에게 알려주세요.\nHMD 착용 및 체험을 바로 도와드리겠습니다.",
      ],
      spacing: "normal",
    },
  ],
];

const ScanLoading = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [visibleLinesByElement, setVisibleLinesByElement] = useState<
    string[][]
  >([]);
  const [imageVisibleByElement, setImageVisibleByElement] = useState<boolean[]>(
    []
  );
  const [currentElementIndex, setCurrentElementIndex] = useState(0); // 현재 보여주고 있는 요소 인덱스
  const [isPageFadingOut, setIsPageFadingOut] = useState(false);

  const timeouts = useRef<NodeJS.Timeout[]>([]);

  const currentPageElements = scenesByPage[pageIndex];

  const clearAllTimeouts = () => {
    timeouts.current.forEach((t) => clearTimeout(t));
    timeouts.current = [];
  };

  // 다음 페이지로 이동 함수
  const nextPage = () => {
    clearAllTimeouts();
    if (pageIndex + 1 < scenesByPage.length) {
      setPageIndex((prev) => prev + 1);
      setCurrentElementIndex(0);
    } else {
      // 마지막 페이지 도달 시 처리 (필요하면)
    }
  };

  // 하나의 요소(씬) 내 텍스트 라인들을 순차적으로 보여주는 함수
  const showElementLines = (elementIndex: number) => {
    const scene = currentPageElements[elementIndex];
    if (!scene) return;

    // 이미지 처리 (imageDelay 옵션 포함)
    if (scene.imageDelay) {
      const imgTimeout = setTimeout(() => {
        setImageVisibleByElement((prev) => {
          const copy = [...prev];
          copy[elementIndex] = true;
          return copy;
        });

        // 이미지가 보인 후 2초 뒤 다음 요소로 넘어가기
        const nextElementTimeout = setTimeout(() => {
          if (elementIndex + 1 < currentPageElements.length) {
            setCurrentElementIndex(elementIndex + 1);
          } else {
            if (!hasButtonInPage()) {
              const autoPageTimeout = setTimeout(nextPage, 2000);
              timeouts.current.push(autoPageTimeout);
            }
          }
        }, 2000);
        timeouts.current.push(nextElementTimeout);
      }, 1000);
      timeouts.current.push(imgTimeout);
      return;
    } else if (scene.image) {
      setImageVisibleByElement((prev) => {
        const copy = [...prev];
        copy[elementIndex] = true;
        return copy;
      });

      // 이미지 즉시 보이고 2초 뒤 다음 씬으로
      const nextElementTimeout = setTimeout(() => {
        if (elementIndex + 1 < currentPageElements.length) {
          setCurrentElementIndex(elementIndex + 1);
        } else {
          if (!hasButtonInPage()) {
            const autoPageTimeout = setTimeout(nextPage, 2000);
            timeouts.current.push(autoPageTimeout);
          }
        }
      }, 2000);
      timeouts.current.push(nextElementTimeout);
      return;
    }

    // noFade인 텍스트 씬은 바로 전부 보여주고 2초 대기 후 다음 씬
    if (scene.type === "text" && scene.lines && scene.noFade) {
      setVisibleLinesByElement((prev) => {
        const copy = [...prev];
        copy[elementIndex] = scene.lines;
        return copy;
      });

      const nextElementTimeout = setTimeout(() => {
        if (elementIndex + 1 < currentPageElements.length) {
          setCurrentElementIndex(elementIndex + 1);
        } else {
          if (!hasButtonInPage()) {
            const autoPageTimeout = setTimeout(nextPage, 2000);
            timeouts.current.push(autoPageTimeout);
          }
        }
      }, 2000);
      timeouts.current.push(nextElementTimeout);
      return;
    }

    // 한 줄씩 페이드인 (각 줄 간격 1초 유지)
    scene.lines.forEach((line, i) => {
      const timeoutId = setTimeout(() => {
        setVisibleLinesByElement((prev) => {
          const copy = [...prev];
          copy[elementIndex] = [...(copy[elementIndex] || []), line];
          return copy;
        });

        // 마지막 줄에 도달했을 때
        // 마지막 줄에 도달했을 때
        if (i === scene.lines.length - 1) {
          const isLastElementInPage =
            elementIndex === currentPageElements.length - 1;

          // 2초 대기 후 다음 요소 or 페이지 처리
          const nextElementTimeout = setTimeout(() => {
            if (!isLastElementInPage) {
              setCurrentElementIndex(elementIndex + 1);
            } else {
              if (!hasButtonInPage()) {
                // 4초 후에 페이지 페이드아웃
                const pageFadeOutTimeout = setTimeout(() => {
                  setIsPageFadingOut(true);
                  // 1초 페이드아웃 후 실제 페이지 넘기기
                  const autoPageTimeout = setTimeout(() => {
                    setIsPageFadingOut(false);
                    nextPage();
                  }, 1000);
                  timeouts.current.push(autoPageTimeout);
                }, 0); // 텍스트 끝난 후 4초 대기
                timeouts.current.push(pageFadeOutTimeout);
              }
            }
          }, 2000); // 텍스트 줄 마지막 도달 후 2초
          timeouts.current.push(nextElementTimeout);
        }
      }, 1000 * i);
      timeouts.current.push(timeoutId);
    });
  };

  // 현재 페이지에 버튼 있는지 체크 (버튼 있으면 자동 페이지 넘김 안함)
  const hasButtonInPage = () => {
    return currentPageElements.some((scene) => !!scene.button);
  };

  useEffect(() => {
    clearAllTimeouts();
    setVisibleLinesByElement(currentPageElements.map(() => []));
    setImageVisibleByElement(currentPageElements.map(() => false));
    setCurrentElementIndex(0);
  }, [pageIndex]);

  useEffect(() => {
    if (currentElementIndex < currentPageElements.length) {
      showElementLines(currentElementIndex);
    }
  }, [currentElementIndex, pageIndex]);

  return (
    <div
      className={`scan-loading-container ${
        pageIndex === 0 ? "first-page" : ""
      }`}
    >
      {currentPageElements.some((scene) => scene.type === "modal") && (
        <div className="modal-overlay" />
      )}
      <div className={`scene-content ${isPageFadingOut ? "fade-out" : ""}`}>
        {currentPageElements.map((scene, idx) => (
          <div
            key={idx}
            className={`${scene.type === "modal" ? "modal" : ""} ${
              scene.spacing || "normal"
            }`}
            style={{
              // 현재 보여줘야할 요소까지만 visible, 나머지는 숨김
              visibility: idx <= currentElementIndex ? "visible" : "hidden",
              pointerEvents: idx === currentElementIndex ? "auto" : "none",
            }}
          >
            {scene.image && imageVisibleByElement[idx] && (
              <img
                src={scene.image}
                alt="scene"
                className="fade-in scene-image"
              />
            )}

            <div className="text-content">
              {visibleLinesByElement[idx]?.map((line, lineIdx) => (
                <p
                  key={lineIdx}
                  className={`fade-in ${
                    scene.compressLines ? "compress" : ""
                  } ${
                    scene.tightenQuote || scene.tightenParagraph
                      ? "tighten"
                      : ""
                  }`}
                >
                  {line.split("\n").map((s, i) => (
                    <span key={i}>
                      {s}
                      {i < line.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))}
            </div>

            {/* 버튼은 현재 요소에만 활성화 */}
            {scene.button && idx === currentElementIndex && (
              <button
                className={`scene-button ${
                  scene.type === "modal" ? "modal-button" : "text-button"
                }`}
                onClick={nextPage}
              >
                {scene.button}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScanLoading;
