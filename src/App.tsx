import React, { useState, useEffect } from "react";
import "./App.css";
import practiceBundle from "./sample/practiceBundle.json";
import queryString from "query-string";
import { convertPlainText } from "./ManagerSentence";
import { IPracticeBundle } from "./interface/IPracticeBundle";

function App() {
  const [textInWrinting, setTextInWrinting] = useState("");
  const [tryText, setTryText] = useState("");
  const [visibletryText, setVisibletryText] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [visibleAnswer, setVisibleAnswer] = useState(false);
  const [visibleIsCorrect, setVisibleIsCorrect] = useState(false);
  const [targetPractice, setTargetPractice] = useState<IPracticeBundle>();
  const [nextIndex, setNextIndex] = useState(0);

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    let targetIndex = Number(parsed.index);
    if (
      typeof targetIndex !== "number" ||
      targetIndex >= practiceBundle.length
    ) {
      targetIndex = 0;
    }
    const targetPractice = practiceBundle[targetIndex];

    setTargetPractice(targetPractice);
    const nextIndex = (targetIndex + 1) % practiceBundle.length;
    setNextIndex(nextIndex);
  }, []);

  const compareAnswer = (
    targetPractice: IPracticeBundle,
    textInWrinting: string
  ) => {
    const correctPlainText = convertPlainText(targetPractice.enTexts[0]);
    const tryPlainText = convertPlainText(textInWrinting);
    if (correctPlainText === tryPlainText) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setTryText(textInWrinting);

    setVisibletryText(true);
    setVisibleIsCorrect(true);
  };

  // 유저가 '정답보기' 버튼을 누른 경우
  const showAnswer = (targetPractice: IPracticeBundle) => {
    setVisibleIsCorrect(false);
    setVisibleAnswer(true);
    setTryText(targetPractice.enTexts[0]);
  };

  if (targetPractice) {
    return (
      <>
        <nav>
          <div>영작 연습소</div>
        </nav>
        <div className="App">
          <header className="flex">
            <article className="flex-center">
              {/* 이미지  */}
              {targetPractice.related_images ? (
                <div>
                  <img
                    width="300"
                    src={targetPractice.related_images[0].link}
                  />
                </div>
              ) : null}
            </article>
            <article className="right-article flex-center">
              {/* 상황 설명 */}
              <div>
                {targetPractice.situation ? (
                  <div
                    style={{
                      color: "gray",
                      fontSize: "14px",
                      whiteSpace: "pre",
                      padding: "10px",
                    }}
                  >
                    {targetPractice.situation}
                  </div>
                ) : null}
              </div>
              <div>{targetPractice.korText}</div>

              <div>
                <input
                  width="500"
                  name="english_sentence"
                  id="english_input"
                  onChange={(e) => setTextInWrinting(e.target.value)}
                />
              </div>
              <div>
                {isCorrect || visibleAnswer ? (
                  <button
                    onClick={() =>
                      (window.location.href = `?index=${nextIndex}`)
                    }
                  >
                    다음 문제
                  </button>
                ) : (
                  <>
                    <button
                      className="btn-white"
                      onClick={() =>
                        compareAnswer(targetPractice, textInWrinting)
                      }
                    >
                      {tryText ? "다시 도전!" : "정답 도전!"}
                    </button>
                    {tryText ? (
                      <button
                        className="btn-white"
                        onClick={() => showAnswer(targetPractice)}
                      >
                        정답보기
                      </button>
                    ) : null}
                  </>
                )}
              </div>
              {visibletryText ? <div>{tryText}</div> : null}
              {visibleIsCorrect ? (
                <>
                  <div>
                    {isCorrect ? <>맞았습니다!! 👏</> : <div>틀렸어요 😹</div>}
                  </div>
                  <div></div>
                </>
              ) : null}
            </article>
          </header>
          {isCorrect || visibleAnswer ? (
            <>
              <section className="flex">
                <article>
                  {/* 또 다른 표현 */}
                  {targetPractice.enTexts.length > 1 ? (
                    <div>
                      <h3>또 다른 표현</h3>
                      {targetPractice.enTexts.map((item, index) => {
                        if (index > 0) {
                          return <div>{item}</div>;
                        }
                      })}
                    </div>
                  ) : null}
                </article>
                <article>
                  {/* 문제 해설 */}
                  {targetPractice.helpGrammars ? (
                    <div>
                      {targetPractice.helpGrammars.map((item) => (
                        <>
                          <h3>{item.title}</h3>
                          <div style={{ whiteSpace: "pre-line" }}>
                            {item.description}
                          </div>
                        </>
                      ))}
                    </div>
                  ) : null}
                </article>
              </section>
            </>
          ) : null}

          {isCorrect || visibleAnswer ? (
            <section>
              {/* 영상 해설*/}
              <article>
                {targetPractice.helpVideos ? (
                  <div>
                    {targetPractice.helpVideos.map((item) => (
                      <>
                        <h3>{item.title}</h3>
                        <div style={{ whiteSpace: "pre-line" }}>
                          <iframe
                            width="300"
                            height="180"
                            src={item.link}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </>
                    ))}
                  </div>
                ) : null}
              </article>
            </section>
          ) : null}
        </div>
      </>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">문장 불러오는 중...</header>
      </div>
    );
  }
}

export default App;
