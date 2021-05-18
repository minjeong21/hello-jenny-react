import styled from "styled-components";
import WritingBox from "components/WritingBox";
import GreetingSection from "../components/GreetingSection";
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
    background-image: url(/assets/bg-main-6.jpg);
    background-size: cover;
    background-position: center;
    height: 600px;
  }

  #writing-section {
    margin: -130px auto;
  }
`;

export default observer(() => {
  const pathManager = new PathManager(useHistory());
  const { writingStore } = useStores();

  useEffect(() => {
    writingStore.fetchRepWriting();
  }, []);

  const themes = [
    {
      title: "🙋🏻‍♀️ 친구 만들기",
      description: "다른 나라에서 만날 수 있는 친구가 있다는 건 설레는 일이죠!",
    },
    {
      title: "👔 비즈니스 영어",
      description: "영어를 쓰는 회사에서 일하고 싶나요? 렛츠고!",
    },
    {
      title: "🎬 영화 속 명대사",
      description: "자막없이 영화를 볼 수 있다면 얼마나 멋있게요~?",
    },
    {
      title: "🎙 노랫 속 가사",
      description: "팝송 한번 멋지게 불러봐요우우~~🎧 ",
    },
  ];
  return (
    <main>
      <Container>
        <>
          {/* Header 토끼*/}
          <GreetingSection />
          {/* 문제 풀기 섹션 */}
          <section id="writing-section">
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

          <div className="pt-24">
            <section className="py-20">
              <div className="text-2xl pb-5">
                관심있는 주제로 영어 문장을 만들어봐요
              </div>
              <div className="md:grid grid-cols-3 ">
                {themes.map((theme, index) => (
                  <div
                    className="bg-white p-6 m-1 rounded-lg shadow-custom cursor-pointer"
                    onClick={(e) =>
                      pathManager.goNextWriting(
                        e,
                        writingStore.getNextWritingId()
                      )
                    }
                  >
                    <h4 className="text-lg font-bold pb-4">{theme.title}</h4>
                    <p className="text-gray-600 text-sm">{theme.description}</p>
                  </div>
                ))}
              </div>

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
