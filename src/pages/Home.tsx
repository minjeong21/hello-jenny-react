import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import styled from "styled-components";
import WritingBox from "components/WritingBox";
import SkeletonWritingBox from "components/SkeletonWritingBox";
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
    background-size: 100%;
    background-position: top;
    background-repeat: no-repeat;
  }
  @media (max-width: 640px) {
    .bg-main {
      background-image: url(/assets/bg-main-7-mobile.jpg);
      background-size: cover;
      background-position: center;
      height: 350px;
    }
  }
`;

export default observer(() => {
  const pathManager = new PathManager(useHistory());
  const { writingStore } = useStores();

  useEffect(() => {
    writingStore.fetchRepWriting();
    if (!writingStore.writings || writingStore.writings.length === 0) {
      writingStore.fetchWritingsDefault();
    }
  }, [writingStore]);

  const goFirstWriting = (e: any) => {
    pathManager.goNextWriting(
      e,
      writingStore.repWriting && writingStore.repWriting.getId()
        ? writingStore.repWriting.getId()
        : 0
    );
  };

  const goWritingBase = () => {
    pathManager.goWritingPage();
  };

  const advantages = [
    {
      title: "스피킹 연습 기능",
      text: "바로 인간이 따뜻한 원대하고, 못하다 천하를 것이다. 무엇을",
    },
    {
      title: "다양한 테마",
      text: "바로 인간이 따뜻한 원대하고, 못하다 천하를 것이다. 무엇을",
    },
    {
      title: "다양한 테마",
      text: "바로 인간이 따뜻한 원대하고, 못하다 천하를 것이다. 무엇을",
    },
  ];
  return (
    <Main>
      <>
        <div className=" pt-20 pb-10 bg-main bg-primary-600">
          {/* 문제 풀기 섹션 */}
          <section id="writing-section" className="px-2 pt-36">
            <div className="whitespace-pre-line">
              {`그동안 해왔던, 보고 듣기만하는 영어 공부, 괜찮을까요?
            영작은 다른 영어공부의 10배의 효과를 냅니다. 
            제니와 함께 하루에 3문장씩, 어떠세요?`}
            </div>
            <div className="" onClick={goFirstWriting}>
              <img src="/assets/main-writing.png" alt="main writing" />
            </div>

            <div className="flex justify-center gap-2 pt-3">
              <button
                className="bg-yellow-500 text-white px-5 py-2 rounded shadow text-lg"
                onClick={goWritingBase}
              >
                헬로제니 체험하기
              </button>
              <button
                className="bg-yellow-500 text-white px-5 py-2 rounded shadow text-lg"
                onClick={pathManager.goMembershipPage}
              >
                제니 멤버되기(얼리버드할인)
              </button>
            </div>
          </section>
          {/* 문제 리스트 */}
        </div>
        <div className="bg-white">
          <section className="py-32 px-4 text-center">
            <div className="sm:text-4xl text-2xl font-bold pb-2">
              영어를 잘하고 싶은 이유는 무엇인가요?
            </div>
            <div className="sm:text-base text-sm sm:pb-16 pb-4 text-gray-500">
              우리는 언제까지 영어를 평생 숙제로 가져가야 할까요?
            </div>
            <div className="sm:flex justify-center gap-3">
              {advantages.map((item) => (
                <div className="flex-1 bg-gray-100 shadow-lg p-6 rounded">
                  <div className="h-20 bg-primary-200  flex justify-center items-center mx-auto rounded">
                    (이모지)
                  </div>
                  <h3 className="pt-3 text-lg font-bold">{item.title}</h3>
                  <div className="text-left pt-4">{item.text}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <section className="sm:py-20 px-4 flex justify-between whitespace-pre-line">
          <div>
            <div className="sm:text-4xl text-2xl font-bold pb-2 ">
              {`퀴즈 풀 듯\n 재미있게 공부할 수 있어요.`}
            </div>
            <div className="sm:text-base text-sm sm:pb-8 pb-4 text-gray-500">
              제니의 도움을 받아, 힌트 쾅쾅
            </div>
          </div>
          <div className="w-1/2">
            <img
              src="assets/main-advantage-1.png"
              alt="advantage 1"
              className=""
            />
          </div>
        </section>
        {/*  */}
        <div className="bg-white">
          <section className="sm:py-20 px-4 flex justify-between">
            <div className="w-1/2">
              <img
                src="assets/main-advantage-2.png"
                alt="advantage 1"
                className=""
              />
            </div>
            <div>
              <div className="sm:text-4xl text-2xl font-bold pb-2">
                {`관심있는 주제로 \n공부할 수 있어요.`}
              </div>
              <div className="sm:text-base text-sm sm:pb-8 pb-4 text-gray-500">
                1000여개가 넘는 문장이 재미있는 구성으로 준비되어 있답니다.
                문장은 매주 추가되고 있어요 :)
              </div>
            </div>
          </section>
        </div>
        {/*  */}
        <section className="sm:py-20 px-4 flex justify-between flex gap-3">
          <div>
            <div className="sm:text-4xl text-2xl font-bold pb-2">
              {`꾸준함을 이길 수 있는게 없죠! \n매일 카톡으로 문제를 받을 수 있어요.`}
            </div>
            <div className="sm:text-base text-sm sm:pb-8 pb-4 text-gray-500">
              1000여개가 넘는 문장이 재미있는 구성으로 준비되어 있답니다. 문장은
              매주 추가되고 있어요 :)
            </div>
          </div>
          <div className="w-1/2">
            <img
              src="assets/main-advantage-3.png"
              alt="advantage 1"
              className=""
            />
          </div>
        </section>

        <div className="bg-primary-700">
          <section className="sm:py-20 py-16 px-4 ">
            <div className="sm:text-4xl text-2xl font-bold pb-2 text-white text-center">
              {`제니와 함께, \n재미있는 영작 연습 시작해봐요`}
            </div>

            <div>
              <img
                src="assets/main-advantage-5.png"
                alt="advantage 1"
                className=""
              />
            </div>
            <div className="bg-yellow-500 py-3 rounded text-white font-bold shadow-lg w-32 mx-auto text-center">
              시작하러 가기
            </div>
          </section>
        </div>
      </>
    </Main>
  );
});
