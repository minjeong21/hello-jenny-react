import React from "react";
import {
  Box,
  Grommet,
  Heading,
  Button,
  Main,
  ResponsiveContext,
} from "grommet";
import { defaultTheme } from "../../theme";
import PracticeBox from "../../components/organisms/PracticeBox";
import DescriptionSection from "../../components/organisms/DescriptionSection";

import Footer from "../../components/organisms/Footer";
import TopBar from "../../components/organisms/TopBar";
import { IPractice } from "../../interface/IPractice";

interface IProps {
  moveRandomPractice: () => void;
  moveLevelPractice: (theme: string) => void;
  moveThemePractice: (level: string) => void;
  practice: IPractice | undefined;
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
  fetcedPractice: boolean;
}
const DetailPresenter = ({
  moveRandomPractice,
  moveLevelPractice,
  moveThemePractice,
  practice,
  textInWrinting,
  visibleIsCorrect,
  isCorrect,
  tryText,
  hintNumber,
  matchedPercent,
  visibleAnswer,
  fetcedPractice,
  clickChallengeButton,
  setTextInWrinting,
  moveNextPractice,
  increaseHintNumber,
  showAnswer,
}: IProps) => {
  return (
    <Grommet theme={defaultTheme}>
      <TopBar
        moveRandomPractice={moveRandomPractice}
        moveLevelPractice={moveLevelPractice}
        moveThemePractice={moveThemePractice}
      />

      {practice ? (
        <Main pad="large" align="center" margin="0 auto">
          <Box tag="section" id="section-1">
            <ResponsiveContext.Consumer>
              {(size) => {
                if (size === "small") {
                  return (
                    <Box>
                      <PracticeBox
                        practice={practice}
                        textInWrinting={textInWrinting}
                        visibleIsCorrect={visibleIsCorrect}
                        isCorrect={isCorrect}
                        tryText={tryText}
                        hintNumber={hintNumber}
                        matchedPercent={matchedPercent}
                        visibleAnswer={visibleAnswer}
                        clickChallengeButton={clickChallengeButton}
                        setTextInWrinting={setTextInWrinting}
                        moveNextPractice={moveNextPractice}
                        increaseHintNumber={increaseHintNumber}
                        showAnswer={showAnswer}
                      />
                    </Box>
                  );
                } else {
                  //  문제 풀이 섹션
                  return (
                    <PracticeBox
                      practice={practice}
                      textInWrinting={textInWrinting}
                      visibleIsCorrect={visibleIsCorrect}
                      isCorrect={isCorrect}
                      tryText={tryText}
                      hintNumber={hintNumber}
                      matchedPercent={matchedPercent}
                      visibleAnswer={visibleAnswer}
                      clickChallengeButton={clickChallengeButton}
                      setTextInWrinting={setTextInWrinting}
                      moveNextPractice={moveNextPractice}
                      increaseHintNumber={increaseHintNumber}
                      showAnswer={showAnswer}
                    />
                  );
                }
              }}
            </ResponsiveContext.Consumer>
          </Box>
          <Box margin="medium" />
          {visibleAnswer || isCorrect ? (
            <DescriptionSection
              isCorrect={isCorrect}
              visibleAnswer={visibleAnswer}
              practice={practice}
            />
          ) : null}
        </Main>
      ) : (
        <>
          {fetcedPractice ? (
            <Box height="80vh" flex justify="center">
              <Heading alignSelf="center">
                문장이 사라졌어요..
                <br />
                (어디갔을까...😭)
                <Button onClick={moveNextPractice}>다른 문제 풀어보기</Button>
              </Heading>
            </Box>
          ) : (
            <Box height="80vh" flex justify="center">
              <Heading alignSelf="center">문장 불러오는 중...</Heading>
            </Box>
          )}
        </>
      )}
      <Footer />
    </Grommet>
  );
};

export default DetailPresenter;
