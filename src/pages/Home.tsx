import styled from "styled-components";
import WritingBox from "components/WritingBox";
import Footer from "components/organisms/Footer";
import HeaderSection from "../components/GreetingSection";
import WritingManager from "utils/WritingManager";
import IWriting from "interface/IWriting";

import WritingList from "components/WritingList";
import PathManager from "utils/PathManager";
import { useHistory } from "react-router";

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

interface IProps {
  writings: IWriting[] | null;
  manager: WritingManager | null;
}

const Home = ({ writings, manager }: IProps) => {
  const pathMaanger = new PathManager(useHistory());

  return (
    <main>
      <Container>
        <>
          <main>
            {/* Header 토끼*/}
            <HeaderSection />
            {/* 문제 풀기 섹션 */}
            <section className="bg-gray-6 pb-xl">
              <div className="pad-l writing-box bg-white mb-l">
                {manager && writings ? (
                  <WritingBox
                    writingManager={manager}
                    writings={writings}
                    moveNextWriting={() => pathMaanger.goRandomPath(writings)}
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </section>
          </main>
          {/* 문제 리스트 */}

          <section className="list-section">
            <div className="font-large section-box px-l">Lastest</div>

            {writings && writings.length ? (
              <WritingList
                writingList={writings}
                moveWriting={() => pathMaanger.goRandomPath(writings)}
              />
            ) : (
              <div>Loading...</div>
            )}
          </section>
        </>
        );
      </Container>
      <Footer />
    </main>
  );
};

export default Home;
