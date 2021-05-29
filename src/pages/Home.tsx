import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import styled from "styled-components";
import WritingBox from "components/WritingBox";
import SkeletonWritingBox from "components/SkeleontWritingBox";
import PathManager from "utils/PathManager";

const Main = styled.main`
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
  @media (max-width: 640px) {
    .bg-main {
      background-image: url(/assets/bg-main-7-mobile.jpg);
      background-size: cover;
      background-position: center;
      height: 350px;
    }
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
  }, [writingStore]);

  return (
    <Main>
      <>
        <div className="bg-main pt-20 pb-10"></div>
        {/* 문제 풀기 섹션 */}
        <section id="writing-section" className="px-2">
          {writingStore.repWriting ? (
            <div className="relative">
              <div
                className="w-full h-full absolute top-0 z-10 cursor-pointer absolute"
                onClick={(e) =>
                  pathManager.goNextWriting(
                    e,
                    writingStore.repWriting
                      ? writingStore.repWriting.getId()
                      : 0
                  )
                }
              ></div>

              <WritingBox
                writingId={writingStore.repWriting.getId()}
                writing={writingStore.repWriting}
                moveNextWriting={(e) =>
                  pathManager.goNextWriting(e, writingStore.getNextWritingId())
                }
              />
            </div>
          ) : (
            <div>
              <SkeletonWritingBox />
            </div>
          )}
        </section>
        {/* 문제 리스트 */}

        <div className="pt-48 pb-24">
          <section className="md:py-20 px-4">
            <div className="md:text-3xl text-2xl font-bold pb-2">
              영어를 잘하고 싶은 이유는 무엇인가요?
            </div>
            <div className="md:text-base text-sm md:pb-8 pb-4 text-gray-500">
              관심가는 주제로 영어 문장을 만들어보세요. 어렵지 않게 영어를 익힐
              수 있을거에요.
            </div>
            <div className="md:grid grid-cols-3 gap-x-2 gap-y-3">
              {writingStore.repThemes ? (
                writingStore.repThemes.map((theme, index) => (
                  <div
                    key={index}
                    className="bg-white md:p-4 p-4 my-4 rounded-lg shadow-custom cursor-pointer"
                    onClick={(e) =>
                      writingStore.moveWritingWithTheme(
                        e,
                        pathManager,
                        theme.name
                      )
                    }
                  >
                    <div className="flex justify-between pb-4 items-center">
                      <h4 className="text-lg font-bold">
                        {theme.display_name}
                      </h4>
                      <div className="text-xs bg-gray-100 rounded px-1 py-1">
                        {theme.count}문제
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{theme.description}</p>
                  </div>
                ))
              ) : (
                <div>스켈레톤</div>
              )}
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
    </Main>
  );
});
