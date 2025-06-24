import { useEffect, useState, useRef } from "react";
import "../styles/ScanLoading.css";

interface Scene {
  type: "text" | "modal";
  lines: string[];
  button?: string;
  noFade?: boolean;
  waitForClick?: boolean;
  spacing?: "normal" | "wide";
  tightenQuote?: boolean;
  tightenParagraph?: boolean;
  compressLines?: boolean;
}

const scenesByPage: Scene[][] = [
  // 1페이지
  [
    {
      type: "text",
      lines: [
        "운영자에게 종이새를 잘 전달하셨나요?",
        "종이새를 띄우는 데까지는 약 1분 정도 소요됩니다.",
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
      lines: ["정말일까?"],
      tightenParagraph: true,
      spacing: "normal",
    },
    {
      type: "text",
      lines: [
        "정말 종이였던 내가",
        "누군가의 손길로 접히고",
        "알록달록 예쁘게 꾸며진 뒤",
        "하늘을 날아다니는 새가 될 수 있을까?",
      ],
      tightenParagraph: true,
      spacing: "normal",
    },
  ],
  // 7페이지
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
  // 8페이지
  [
    {
      type: "modal",
      lines: ["척추에 변화 감지", "날개가 돋아나는 중입니다.  .  ."],
      button: "확인",
    },
  ],

  // 9페이지
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
        "나를 이리 저리 접어주던 그 손길 덕분에!",
      ],
      tightenParagraph: true,
      spacing: "normal",
    },
  ],

  // 10페이지
  [
    {
      type: "modal",
      lines: ["잠시 후 스캔이 완료됩니다.", "곧 나만의 새를 만나볼 수 있어요."],
      button: "확인",
    },
  ],

  // 11페이지
  [
    {
      type: "text",
      lines: [
        "너의 손길로 탄생한 내가",
        "날개를 달고 나는 모습을 지켜봐 줘.",
        ".",
        ".",
      ],
      spacing: "normal",
    },
    {
      type: "text",
      lines: ["나랑 함께 숲속을 돌아다니자!"],
      spacing: "normal",
    },
  ],
  //12페이지
  [
    {
      type: "text",
      lines: ["새가 전한 메시지는 모두 끝이 났습니다."],
      button: "확인",
      noFade: true,
      waitForClick: true,
      tightenParagraph: true,
    },
  ],
];

const ScanLoading = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [visibleLinesByElement, setVisibleLinesByElement] = useState<
    string[][]
  >([]);
  const [currentElementIndex, setCurrentElementIndex] = useState(0);
  const [isPageFadingOut, setIsPageFadingOut] = useState(false);

  const timeouts = useRef<NodeJS.Timeout[]>([]);

  const currentPageElements = scenesByPage[pageIndex];

  const clearAllTimeouts = () => {
    timeouts.current.forEach((t) => clearTimeout(t));
    timeouts.current = [];
  };

  const nextPage = () => {
    clearAllTimeouts();
    if (pageIndex + 1 < scenesByPage.length) {
      setPageIndex((prev) => prev + 1);
      setCurrentElementIndex(0);
    }
  };

  const showElementLines = (elementIndex: number) => {
    const scene = currentPageElements[elementIndex];
    if (!scene) return;

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

        if (i === scene.lines.length - 1) {
          const isLastElementInPage =
            elementIndex === currentPageElements.length - 1;

          const nextElementTimeout = setTimeout(() => {
            if (!isLastElementInPage) {
              setCurrentElementIndex(elementIndex + 1);
            } else {
              if (!hasButtonInPage()) {
                const pageFadeOutTimeout = setTimeout(() => {
                  setIsPageFadingOut(true);
                  const autoPageTimeout = setTimeout(() => {
                    setIsPageFadingOut(false);
                    nextPage();
                  }, 1000);
                  timeouts.current.push(autoPageTimeout);
                }, 0);
                timeouts.current.push(pageFadeOutTimeout);
              }
            }
          }, 2000);
          timeouts.current.push(nextElementTimeout);
        }
      }, 1000 * i);
      timeouts.current.push(timeoutId);
    });
  };

  const hasButtonInPage = () => {
    return currentPageElements.some((scene) => !!scene.button);
  };

  useEffect(() => {
    clearAllTimeouts();
    setVisibleLinesByElement(currentPageElements.map(() => []));
    setCurrentElementIndex(0);
  }, [pageIndex]);

  useEffect(() => {
    if (currentElementIndex < currentPageElements.length) {
      showElementLines(currentElementIndex);
    }
  }, [currentElementIndex, pageIndex]);

  return (
    <div
      className={`scan-loading-container 
    ${pageIndex === 0 || pageIndex === 11 ? "first-page" : ""}
    ${pageIndex === 10 ? "final-scan-page" : ""}
    ${
      currentPageElements.some((scene) => scene.type === "modal")
        ? "modal-page"
        : ""
    }
  `}
    >
      {currentPageElements.some((scene) => scene.type === "modal") && <div />}
      <div className={`scene-content ${isPageFadingOut ? "fade-out" : ""}`}>
        {currentPageElements.map((scene, idx) => (
          <div
            key={idx}
            className={`scene-element ${scene.type} ${
              scene.spacing || "normal"
            }`}
            style={{
              visibility: idx <= currentElementIndex ? "visible" : "hidden",
              pointerEvents: idx === currentElementIndex ? "auto" : "none",
            }}
          >
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
                  } ${
                    scene.type === "modal" && lineIdx === 1
                      ? "modal-second-line"
                      : ""
                  }${
                    pageIndex === 10 && lineIdx === scene.lines.length - 1
                      ? "final-line-accent"
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

            {scene.button && idx === currentElementIndex && (
              <button
                className={`scene-button ${
                  scene.type === "modal" ? "modal-button" : ""
                }`}
                onClick={() => {
                  if (pageIndex === 11) {
                    window.location.href = "/";
                  } else {
                    nextPage();
                  }
                }}
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
