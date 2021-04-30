import { Box, Grommet, Heading, Button, ResponsiveContext } from "grommet";
import { defaultTheme } from "../../theme";

import Footer from "../../components/organisms/Footer";
import TopBar from "../../components/organisms/TopBar";
import IWriting from "../../interface/IWriting";
import WritingBox from "components/WritingBox";
import WritingManager from "utils/WritingManager";

interface IProps {
  moveNextWriting: () => void;
  writingManager: WritingManager;
  fetcedWriting: boolean;
}
const DetailPresenter = ({
  writingManager,
  fetcedWriting,
  moveNextWriting,
}: IProps) => {
  console.log(writingManager);
  return (
    <Grommet theme={defaultTheme}>
      <TopBar />
      {writingManager ? (
        <main>
          <ResponsiveContext.Consumer>
            {(size) => (
              <section
                id="section-1"
                className={`max-width margin-center ${
                  size === "small" ? "pad-xs" : "pad-l"
                }`}
              >
                <WritingBox
                  viewSize={size}
                  writingManager={writingManager}
                  moveNextWriting={moveNextWriting}
                />
              </section>
            )}
          </ResponsiveContext.Consumer>
          {/* <Box margin="medium" />
          {visibleAnswer || isCorrect ? (
            <DescriptionSection
              isCorrect={isCorrect}
              visibleAnswer={visibleAnswer}
              writing={writing}
            />
          ) : null} */}
        </main>
      ) : (
        <>
          {fetcedWriting ? (
            <Box height="80vh" flex justify="center">
              <Heading alignSelf="center">
                문장이 사라졌어요..
                <br />
                (어디갔을까...😭)
                <Button onClick={moveNextWriting}>다른 문제 풀어보기</Button>
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
