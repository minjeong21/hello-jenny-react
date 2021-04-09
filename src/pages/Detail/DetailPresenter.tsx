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
  moveNextPractice: () => void;
  practice: IPractice | undefined;
  fetcedPractice: boolean;
}
const DetailPresenter = ({
  moveRandomPractice,
  moveLevelPractice,
  moveThemePractice,
  moveNextPractice,
  practice,
  fetcedPractice,
}: IProps) => {
  return (
    <Grommet theme={defaultTheme}>
      <TopBar
        moveRandomPractice={moveRandomPractice}
        moveLevelPractice={moveLevelPractice}
        moveThemePractice={moveThemePractice}
      />

      {practice ? (
        <main>
          <ResponsiveContext.Consumer>
            {(size) => (
              <section
                id="section-1"
                className={`max-width margin-center ${
                  size === "small" ? "pad-xs" : "pad-l"
                }`}
              >
                <PracticeBox
                  viewSize={size}
                  practice={practice}
                  moveNextPractice={moveNextPractice}
                />
              </section>
            )}
          </ResponsiveContext.Consumer>
          {/* <Box margin="medium" />
          {visibleAnswer || isCorrect ? (
            <DescriptionSection
              isCorrect={isCorrect}
              visibleAnswer={visibleAnswer}
              practice={practice}
            />
          ) : null} */}
        </main>
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
