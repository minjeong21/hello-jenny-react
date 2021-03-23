import { Play } from "grommet-icons";
import { Box, Paragraph, Heading, Button, TextInput, Keyboard } from "grommet";
import { IPractice } from "../../interface/IPractice";
import React from "react";
import CorrectBox from "../molecules/CorrectBox";
import HintBox from "../molecules/HinBox";

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
const PracticeTryBox = ({
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
  return (
    <Box pad="medium" background="#F1EAE5" width="large" flex justify="center">
      {practice.situation ? (
        <Paragraph
          alignSelf="center"
          size="small"
          color={"#333333"}
          style={{ whiteSpace: "pre-line" }}
        >
          {practice.situation}
        </Paragraph>
      ) : null}

      <Heading alignSelf="center" size="h3" color="#3849a8">
        {practice.korean_text}
      </Heading>

      <Keyboard onEnter={() => clickChallengeButton(practice, textInWrinting)}>
        <TextInput
          reverse
          placeholder="입력하기 ..."
          id="english_input"
          icon={
            <Play
              onClick={() => clickChallengeButton(practice, textInWrinting)}
            />
          }
          onChange={(e) => setTextInWrinting(e.target.value)}
        />
      </Keyboard>
      {/* {visibletryText ? <div>{tryText}</div> : null} */}

      <CorrectBox
        visibleIsCorrect={visibleIsCorrect}
        isCorrect={isCorrect}
        tryText={tryText}
        hintNumber={hintNumber}
        matchedPercent={matchedPercent}
      />
      <Box margin={{ top: "14px", bottom: "small" }}>
        {/* 다음 문장 버튼 */}
        {isCorrect || visibleAnswer ? (
          <Button primary label="다음 문제" onClick={moveNextPractice} />
        ) : (
          <>
            {/* 유저가 도전 버튼을 눌렀으면? */}
            {tryText ? (
              <Box
                align="center"
                pad="small"
                flex
                direction="row"
                justify="around"
              >
                <Button
                  primary
                  label={"다시 도전!"}
                  onClick={() => clickChallengeButton(practice, textInWrinting)}
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
              </Box>
            ) : (
              <Box align="center" pad="medium" flex direction="row">
                <Button
                  margin="0 auto"
                  primary
                  label={"정답 도전!"}
                  onClick={() => clickChallengeButton(practice, textInWrinting)}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default PracticeTryBox;
