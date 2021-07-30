import styled from "styled-components";
import SpeakingBox from "components/SpeakingBox";
import { useStores } from "states/Context";
import MovePath from "utils/PathManager";

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

const Speaking = () => {
  // const pathManager = new MovePath(useHistory());
  const { speakingStore } = useStores();
  return (
    <main className="pt-24">
      <Container>
        <>
          <main style={{padding:"10px"}}>
            {/* 문제 풀기 섹션 */}
            <section  className="bg-gray-6 pb-xl pt-12">
              <div className="pad-l writing-box bg-white mb-l rounded-lg">
                {/* {writingStore.currentWriting ? (
                  <SpeakingBox
                    writing={writingStore.currentWriting.writing}
                    // moveNextWriting={(e) =>
                    //   pathManager.goNextWriting(
                    //     e,
                    //     writingStore.getNextWritingId()
                    //   )
                    // }
                  />
                ) : (
                  <div>스켈레톤</div>
                )} */}
                <SpeakingBox
                    // writing={writingStore.currentWriting.writing}
                    // moveNextWriting={(e) =>
                    //   pathManager.goNextWriting(
                    //     e,
                    //     writingStore.getNextWritingId()
                    //   )
                    // }
                  />
              </div>
            </section>
          </main>
        </>
      </Container>
    </main>
  );
};

export default Speaking;

function useHistory(): any {
  throw new Error("Function not implemented.");
}
