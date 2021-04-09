import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grommet, Box, ResponsiveContext, Image } from "grommet";
import WritingBox from "components/organisms/WritingBox";
import { defaultTheme } from "theme";
import TopBar from "components/organisms/TopBar";
import Footer from "components/organisms/Footer";
import WritingList from "./WritingList";
import {
  generateRandomPath,
  generateLevelPath,
  generateThemePath,
  getNextRandomNum,
} from "properties/Path";
import { fetchMainWritingList } from "apis/WritingApi";
import { IWriting } from "interface/IWriting";
import styled from "styled-components";

const Container = styled.div`
  padding-bottom: 80px;
  .writing-box {
    max-width: 860px;
    margin: 0 auto;
  }

  header {
    max-width: 860px;
    margin: 0 auto;
    line-height: 1.3;
  }

  .list-section {
    padding-top: 70px;
    margin: 0 auto;
    max-width: 860px;
  }
  .section-box {
  }
`;

const Home = () => {
  const [writingList, setWritingList] = useState<IWriting[]>();
  const [writing, setWriting] = useState<IWriting>();
  const history = useHistory();

  useEffect(() => {
    fetchWritingList();
  }, []);

  const fetchWritingList = async () => {
    const writingList = await fetchMainWritingList();
    console.log(writingList);
    setWritingList(writingList);
    setWriting(writingList[0]);
  };
  const moveRandomPath = () => {
    let randomNumber = 0;
    if (writingList) {
      randomNumber = getNextRandomNum(writingList.length);
    }
    history.push(generateRandomPath(randomNumber));
  };

  const moveWriting = (numid: number) => {
    history.push(generateRandomPath(numid));
  };
  return (
    <Grommet theme={defaultTheme}>
      <TopBar />
      <Container>
        <ResponsiveContext.Consumer>
          {(size) => {
            return (
              <>
                <main>
                  {/* Header 토끼*/}
                  <HeaderSection viewSize={size} />
                  {/* 문제 풀기 섹션 */}
                  <section className="bg-gray-6 pb-xl">
                    <div className="pad-l writing-box bg-white mb-l">
                      {writing ? (
                        <WritingBox
                          viewSize={size}
                          writing={writing}
                          moveNextWriting={moveRandomPath}
                        />
                      ) : (
                        <div>스켈레톤</div>
                      )}
                    </div>
                  </section>
                </main>
                {/* 문제 리스트 */}

                <section className="list-section">
                  <div className="font-large section-box px-l">Lastest</div>

                  {writingList && writingList.length ? (
                    <WritingList
                      writingList={writingList}
                      moveWriting={moveWriting}
                      viewSize={size}
                    />
                  ) : (
                    <Box>Loading...</Box>
                  )}
                </section>
              </>
            );
          }}
        </ResponsiveContext.Consumer>
      </Container>
      <Footer />
    </Grommet>
  );
};

const HeaderSection = ({ viewSize }: { viewSize: string }) => {
  const mainText = `따끈따끈~ 오늘의 문장이 도착했어요!\n같이 한번 풀어볼까요?? `;
  const subText = "문제를 모두 맞춘다면, 기분 좋은 하루가 될꺼에요!!";
  return (
    <Box background="#faf8f8">
      <header>
        <div
          className={` pt-l margin-center ${
            viewSize === "small" ? "flex-column" : "flex"
          }`}
        >
          {viewSize === "small" ? (
            <>
              <div className="flex-1 text-center">
                <Image src="/assets/header-rabit-bottom.png" width="200px" />
              </div>
              <div className="flex-2 flex flex-column justify-center pad-m">
                <div className="pre-line font-large font pb-xs">{mainText}</div>
                <div className="font-small font-gray-3">{subText}</div>
              </div>
              {/* 이미지 */}
            </>
          ) : (
            <>
              <div className="flex-2 flex flex-column justify-center pad-m">
                <div className="pre-line font-large font pb-xs">{mainText}</div>
                <div className="font-small font-gray-3">{subText}</div>
              </div>
              {/* 이미지 */}
              <div className="flex-1">
                <Image src="/assets/header-rabit3.png" width="300px" />
              </div>
            </>
          )}
          {/* Text */}
        </div>
      </header>
    </Box>
  );
};
export default Home;
