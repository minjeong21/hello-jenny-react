import { Box, Grommet, Heading, Button, ResponsiveContext } from "grommet";
import { defaultTheme } from "../../theme";
import WritingBox from "../../components/WritingBox";

import Footer from "../../components/organisms/Footer";
import TopBar from "../../components/organisms/TopBar";
import IWriting from "../../interface/IWriting";

interface IProps {
  moveNextWriting: () => void;
  writing: IWriting | undefined;
  fetcedWriting: boolean;
}
const DetailPresenter = ({
  writing,
  fetcedWriting,
  moveNextWriting,
}: IProps) => {
  return (
    <Grommet theme={defaultTheme}>
      <TopBar />

      {writing ? (
        <main>
          <ResponsiveContext.Consumer>
            {(size) => (
              <section
                id="section-1"
                className={`max-width margin-center ${
                  size === "small" ? "pad-xs" : "pad-l"
                }`}
              >
                {/* <WritingBox
                  viewSize={size}
                  writing={writing}
                  moveNextWriting={moveNextWriting}
                /> */}
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
