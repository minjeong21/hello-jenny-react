import { Play } from "grommet-icons";
import { Paragraph, Heading, Button, TextInput, Keyboard } from "grommet";
import { IPractice } from "../../interface/IPractice";
import React, { useState } from "react";
import CorrectBox from "../molecules/CorrectBox";
import HintBox from "../molecules/HinBox";
import PracticeImage from "../atoms/PracticeImage";
import { convertThemesToMainTheme } from "../../properties/Theme";
import styled from "styled-components";
import {
  compareAnswer,
  getMatchedWordPercent,
} from "../../utils/ManagerSentence";
const Container = styled.div`
  textarea {
    border: 0.5px solid #333333;
    box-sizing: border-box;
    border-radius: 8px;
    width: 100%;
    min-height: 80px;
    padding: 10px;
    caret-color: #f44483;
  }

  textarea:focus {
    outline: none !important;
    border-color: #666666;
    box-shadow: 0 0 10px #edc3d0;
  }
`;

interface IProps {
  practice: IPractice;
  moveNextPractice: () => void;
}

// practice,
// textInWrinting,
// clickChallengeButton,
// setTextInWrinting,
// visibleIsCorrect,
// isCorrect,
// tryText,
// hintNumber,
// matchedPercent,
// visibleAnswer,
// moveNextPractice,
// increaseHintNumber,
// showAnswer,
// }: IProps) => {
// console.log(practice);

function PracticeBox(props: IProps) {
  const { practice } = props;
  const [textInWrinting, setTextInWrinting] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [visibleAnswer, setVisibleAnswer] = useState(false);
  const [visibleIsCorrect, setVisibleIsCorrect] = useState(false);

  const [tryText, setTryText] = useState("");
  const [hintNumber, setHintNumber] = useState(0);
  const [matchedPercent, setMatchedPercent] = useState(0);

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
    } else {
      // 정답 틀렸을 때
      element.value = "";
      const percent = getMatchedWordPercent(
        result.bestMatchedText,
        textInWrinting
      );
      setMatchedPercent(percent);
      if (hintNumber === 0) {
        increaseHintNumber();
      }
    }

    setTryText(textInWrinting);
    setVisibleIsCorrect(true);
    // setTextInWrinting("");
  };

  const increaseHintNumber = () => {
    if (hintNumber < 3) {
      setHintNumber(hintNumber + 1);
    }
  };
  // 유저가 '정답보기' 버튼을 누른 경우
  const showAnswer = (practice: IPractice) => {
    setVisibleIsCorrect(false);
    setVisibleAnswer(true);
    setTryText(practice.english_texts[0]);
  };

  return (
    <Container>
      <section className="flex">
        {/* 왼쪽 이미지 */}
        <div className="pad-xs flex-1">
          {practice.image_url ? (
            <PracticeImage imageUrl={practice.image_url} />
          ) : null}
        </div>
        {/* 오른쪽 섹션 */}
        <article className="pad-xs flex-2">
          <div className="flex justify-between">
            {/* theme */}
            <div className=" font-body weigth-400 font-gray-2 pb-l">
              {convertThemesToMainTheme(practice.themes)}
            </div>

            {practice.level ? (
              <div className=" font-body weigth-400 font-gray-2 pb-l">
                {`Level ${practice.level} `}
              </div>
            ) : null}
          </div>
          {practice.situation ? (
            <div className="font-body weigth-400 font-gray-3 pb-xxs pt-xxs">
              {practice.situation}
            </div>
          ) : null}

          <div className="font-medium weigth-700 font-gray-1 pb-m">
            {practice.korean_text}
          </div>

          <textarea
            className="border-gray-3 font-medium"
            placeholder="영작하기"
            id="english_input"
            onChange={(e) => setTextInWrinting(e.target.value)}
          />
          {/* {visibletryText ? <div>{tryText}</div> : null} */}
        </article>
      </section>
      <section>
        <div>
          {/* 다음 문장 버튼 */}
          {isCorrect || visibleAnswer ? (
            <Button
              primary
              label="다음 문제"
              onClick={props.moveNextPractice}
            />
          ) : (
            <>
              {/* 유저가 도전 버튼을 눌렀으면? */}
              {tryText ? (
                <div>
                  <Button
                    primary
                    label={"다시 도전!"}
                    onClick={() =>
                      clickChallengeButton(practice, textInWrinting)
                    }
                  />
                  <Button
                    primary
                    label={"힌트보기"}
                    onClick={() => increaseHintNumber()}
                  />
                  <Button
                    primary
                    label="정답보기"
                    onClick={() => showAnswer(practice)}
                  />
                </div>
              ) : (
                <div className="text-right pt-s">
                  <button
                    className="btn-primary font-body weight-700"
                    onClick={() =>
                      clickChallengeButton(practice, textInWrinting)
                    }
                  >
                    정답 도전!
                  </button>
                </div>
              )}
            </>
          )}
          <>
            <CorrectBox
              visibleIsCorrect={visibleIsCorrect}
              isCorrect={isCorrect}
              tryText={tryText}
              hintNumber={hintNumber}
              matchedPercent={matchedPercent}
            />
          </>
        </div>
      </section>
    </Container>
  );
}

export default PracticeBox;
