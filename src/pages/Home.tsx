import styled from "styled-components";
import WritingBox from "components/WritingBox";
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
  .bg-main {
    background-image: url(/assets/bg-main3.jpg);
    background-size: cover;
    background-position: center 80%;
  }
`;

interface IProps {
  writings: IWriting[] | null;
  manager: WritingManager | null;
}

const Home = ({ writings, manager }: IProps) => {
  const pathManager = new PathManager(useHistory());

  return (
    <main className="pt-20">
      <Container>
        <>
          {/* Header 토끼*/}
          <HeaderSection />
          {/* 문제 풀기 섹션 */}
          <section className="pt-12 ">
            {manager && writings ? (
              <WritingBox
                writingId={manager.getId()}
                writingManager={manager}
                moveNextWriting={() => pathManager.goRandomPath(writings)}
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
                  writingList={writings.splice(0, 3)}
                  moveWriting={() => pathManager.goRandomPath(writings)}
                />
              ) : (
                <div>Loading...</div>
              )}
            </section>
          </div>
        </>
      </Container>
    </main>
  );
};

export default Home;
