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
`;

interface IProps {
  writings: IWriting[] | null;
  manager: WritingManager | null;
}

const Home = ({ writings, manager }: IProps) => {
  const pathMaanger = new PathManager(useHistory());

  return (
    <main className="bg-gray-100">
      <Container>
        <>
          {/* Header 토끼*/}
          <HeaderSection />
          {/* 문제 풀기 섹션 */}
          <section className="bg-gray-6 pb-xl ">
            {manager && writings ? (
              <WritingBox
                writingManager={manager}
                writings={writings}
                moveNextWriting={() => pathMaanger.goRandomPath(writings)}
              />
            ) : (
              <div>Loading...</div>
            )}
          </section>
          {/* 문제 리스트 */}

          <div className="bg-white mt-12 border-t">
            <section className="py-20">
              <div className="text-2xl pb-5">Lastest</div>

              {writings && writings.length ? (
                <WritingList
                  writingList={writings}
                  moveWriting={() => pathMaanger.goRandomPath(writings)}
                />
              ) : (
                <div>Loading...</div>
              )}
            </section>
          </div>
        </>
      </Container>
      <Footer />
    </main>
  );
};

export default Home;
