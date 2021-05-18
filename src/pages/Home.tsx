import styled from "styled-components";
import WritingBox from "components/WritingBox";
import HeaderSection from "../components/GreetingSection";
import PathManager from "utils/PathManager";
import { useHistory } from "react-router";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import { useEffect } from "react";

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

export default observer(() => {
  const pathManager = new PathManager(useHistory());
  const { writingStore } = useStores();

  useEffect(() => {
    writingStore.fetchRepWriting();
  }, []);

  return (
    <main className="pt-20">
      <Container>
        <>
          {/* Header 토끼*/}
          <HeaderSection />
          {/* 문제 풀기 섹션 */}
          <section className="pt-12 ">
            {writingStore.repWriting ? (
              <WritingBox
                writingId={writingStore.repWriting.getId()}
                writing={writingStore.repWriting}
                moveNextWriting={(e) =>
                  pathManager.goNextWriting(e, writingStore.getNextWritingId())
                }
                selectedThemes={[]}
                selectedLevels={[]}
              />
            ) : (
              <div>Loading...</div>
            )}
          </section>
          {/* 문제 리스트 */}

          <div className="bg-white mt-12 border-t">
            <section className="py-20">
              <div className="text-2xl pb-5">테마별 문제 풀기</div>

              {/* {writings && writings.length ? (
                <WritingList
                  writingList={writings.splice(0, 3)}
                  moveWriting={(e) => pathManager.goWritingPage()}
                />
              ) : (
                <div>Loading...</div>
              )} */}
            </section>
          </div>
        </>
      </Container>
    </main>
  );
});
