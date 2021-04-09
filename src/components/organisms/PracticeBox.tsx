import { IPractice } from "../../interface/IPractice";
import { useEffect, useState } from "react";
import PracticeImage from "../atoms/PracticeImage";
import { convertThemesToMainTheme } from "../../properties/Theme";
import styled from "styled-components";
import {
  compareAnswer,
  getMatchedWordPercent,
} from "../../utils/ManagerSentence";
import Level from "../atoms/Level";
const Container = styled.div`
  input {
    border: 0.5px solid #333333;
    box-sizing: border-box;
    border-radius: 8px;
    width: 100%;
    min-height: 80px;
    padding: 10px;
    caret-color: #f44483;
  }

  input:focus {
    outline: none !important;
    border-color: #666666;
    box-shadow: 0 0 10px #edc3d0;
  }
`;

interface IProps {
  practice: IPractice;
  viewSize: string;
  moveNextPractice: () => void;
}

function PracticeBox(props: IProps) {
  const { practice } = props;
  const [textInWrinting, setTextInWrinting] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [visibleAnswer, setVisibleAnswer] = useState(false);
  const [visibleIsCorrect, setVisibleIsCorrect] = useState(false);
  const [tryText, setTryText] = useState("");
  const [visibleFirstHint, setVisibleFirstHint] = useState(false);
  const [visibleSecondHint, setVisibleSecondHint] = useState(false);
  const [visibleThirdHint, setVisibleThirdHint] = useState(false);
  const [matchedPercent, setMatchedPercent] = useState(0);

  useEffect(() => {
    setTextInWrinting("");
    setTryText("");
    setIsCorrect(false);
    setVisibleAnswer(false);
    setVisibleIsCorrect(false);
    setVisibleFirstHint(false);
    setVisibleSecondHint(false);
    setVisibleThirdHint(false);
    setMatchedPercent(0);
  }, [practice]);

  /**
   * 도전하기 버튼 클릭 Event
   * */
  const clickChallengeButton = (
    practice: IPractice,
    textInWrinting: string
  ) => {
    const result = compareAnswer(practice.english_texts, textInWrinting);
    setIsCorrect(result.isCorrect);
    const element: any = document.getElementById("english_input");
    if (result.isCorrect) {
      // 맞았을 때
      element.setAttribute("readonly", true);
      element.setAttribute("style", "background-color: #e6ddd7; color:#141937");
      showAnswer(practice);
    } else {
      // 정답 틀렸을 때
      const percent = getMatchedWordPercent(
        result.bestMatchedText,
        textInWrinting
      );
      setMatchedPercent(percent);
      setVisibleFirstHint(true);
    }

    setTryText(textInWrinting);
    setVisibleIsCorrect(true);
    // setTextInWrinting("");
  };

  // 유저가 '정답보기' 버튼을 누른 경우
  const showAnswer = (practice: IPractice) => {
    setVisibleIsCorrect(false);
    setVisibleAnswer(true);
    setTryText(practice.english_texts[0]);
  };

  return (
    <Container>
      <section
        className={`${
          props.viewSize === "small" ? "flex-column small-view" : "flex"
        }`}
      >
        {/* 왼쪽 이미지 */}
        <div className="pad-xs ">
          {practice.image_url ? (
            <PracticeImage
              imageUrl={practice.image_url}
              size={props.viewSize === "small" ? "100%" : null}
            />
          ) : null}
        </div>
        {/* 오른쪽 섹션 */}
        <article className="pad-xs flex-1 solving-article">
          <div className="flex justify-between">
            {/* theme */}
            <div className=" font-body weigth-400 font-gray-2 pb-l">
              {convertThemesToMainTheme(practice.themes)}
            </div>

            {/* Level */}
            {practice.level ? (
              <div className=" font-body weigth-400 font-gray-2 pb-l">
                <Level levelNumber={practice.level} />
              </div>
            ) : null}
          </div>
          {practice.situation ? (
            <div className="font-body weigth-400 font-gray-3 pb-xxs pt-xxs">
              {practice.situation}
            </div>
          ) : null}

          <div className="font-large weigth-700 font-gray-1 pb-m">
            {practice.korean_text}
          </div>

          <input
            className="border-gray-3 font-medium"
            placeholder="영작하기"
            id="english_input"
            onChange={(e) => setTextInWrinting(e.target.value)}
          />
          {/* {visibletrydiv ? <div>{trydiv}</div> : null} */}
        </article>
      </section>
      <section>
        <div>
          <>
            {/* 유저가 도전 버튼을 눌렀으면? */}
            {tryText ? (
              <div className="flex justify-between pt-l font-medium">
                <div className="flex">
                  <div className="font-primary font-xl">{matchedPercent}%</div>
                  맞췄어요.
                  {isCorrect ? (
                    <div>Wow!! 맞았습니다!! 🎉</div>
                  ) : (
                    <div>아쉬워요. 다시 도전해주세요!</div>
                  )}
                </div>
                {visibleAnswer ? (
                  <button
                    className="btn-primary"
                    onClick={props.moveNextPractice}
                  >
                    다음 문제!
                  </button>
                ) : (
                  <button
                    className="btn-primary"
                    onClick={() =>
                      clickChallengeButton(practice, textInWrinting)
                    }
                  >
                    다시 도전!
                  </button>
                )}
              </div>
            ) : (
              <div className="text-right pt-s">
                <button
                  className="btn-primary font-body weight-700"
                  onClick={() => clickChallengeButton(practice, textInWrinting)}
                >
                  정답 도전!
                </button>
              </div>
            )}
          </>

          <>
            {tryText ? (
              <>
                <div>
                  <div className="pt-l">
                    {practice.hint1 ? (
                      <div className="flex pb-l">
                        <div className="font-small font-gray-2 pr-l">hint1</div>

                        {visibleFirstHint ? (
                          <div className="font-small font-gray-1">
                            {practice.hint1}
                          </div>
                        ) : null}
                      </div>
                    ) : null}

                    {practice.hint2 ? (
                      <div className="flex pb-l">
                        <div className="font-small font-gray-2 pr-l">hint2</div>
                        {visibleSecondHint ? (
                          <div className="font-small font-gray-1">
                            {" "}
                            {practice.hint2}
                          </div>
                        ) : (
                          <button
                            className="btn"
                            onClick={() => setVisibleSecondHint(true)}
                          >
                            확인
                          </button>
                        )}
                      </div>
                    ) : null}

                    {practice.hint3 ? (
                      <div className="flex pb-l">
                        <div className="font-small font-gray-2 pr-l">hint3</div>

                        {visibleThirdHint ? (
                          <div className="font-small font-gray-1">
                            {practice.hint3}
                          </div>
                        ) : (
                          <button
                            className="btn"
                            onClick={() => setVisibleThirdHint(true)}
                          >
                            확인
                          </button>
                        )}
                      </div>
                    ) : null}

                    {/* 정답 */}
                    <div className="flex pb-l">
                      <div className="font-small font-gray-2 pr-l">정답</div>
                      {visibleAnswer ? (
                        <div className="font-small font-gray-1">
                          {practice.english_texts[0]}
                        </div>
                      ) : (
                        <button
                          className="btn"
                          onClick={() => showAnswer(practice)}
                        >
                          확인
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </>
        </div>
      </section>
    </Container>
  );
}

export default PracticeBox;
