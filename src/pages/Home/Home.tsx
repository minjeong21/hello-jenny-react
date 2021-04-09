import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Grommet, Box, ResponsiveContext } from "grommet";
import { defaultTheme } from "theme";
import styled from "styled-components";
import { generateRandomPath, getNextRandomNum } from "properties/Path";
import { fetchMainWritingList } from "apis/WritingApi";
import { IWriting } from "interface/IWriting";
import WritingBox from "components/organisms/WritingBox";
import TopBar from "components/organisms/TopBar";
import Footer from "components/organisms/Footer";
import HeaderSection from "./HeaderSection";

import WritingList from "./WritingList";

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

export default Home;