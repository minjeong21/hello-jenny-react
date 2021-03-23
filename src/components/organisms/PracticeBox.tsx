import { Play } from "grommet-icons";
import { Paragraph, Heading, Button, TextInput, Keyboard } from "grommet";
import { IPractice } from "../../interface/IPractice";
import React from "react";
import CorrectBox from "../molecules/CorrectBox";
import HintBox from "../molecules/HinBox";
import PracticeImage from "../atoms/PracticeImage";
import { convertThemesToMainTheme } from "../../properties/Theme";
import styled from "styled-components";
const Container = styled.div`
  textarea {
    border: 0.5px solid #333333;
    box-sizing: border-box;
    border-radius: 8px;
    width: 50vw;
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
  textInWrinting: string;
  visibleIsCorrect: boolean;
  isCorrect: boolean;
  tryText: string;
  hintNumber: number;
  matchedPercent: number;
  visibleAnswer: boolean;
  clickChallengeButton: (practice: IPractice, value: string) => void;
  setTextInWrinting: (e: any) => void;
  moveNextPractice: () => void;
  increaseHintNumber: () => void;
  showAnswer: (practice: IPractice) => void;
}

const PracticeBox = ({
  practice,
  textInWrinting,
  clickChallengeButton,
  setTextInWrinting,
  visibleIsCorrect,
  isCorrect,
  tryText,
  hintNumber,
  matchedPercent,
  visibleAnswer,
  moveNextPractice,
  increaseHintNumber,
  showAnswer,
}: IProps) => {
  console.log(practice);
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
            {practice.themes && practice.themes.length > 0 ? (
              <div className=" font-body weigth-400 font-gray-2 pb-l">
                {convertThemesToMainTheme(practice.themes)}
              </div>
            ) : null}

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
            <Button primary label="다음 문제" onClick={moveNextPractice} />
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
};

export default PracticeBox;
