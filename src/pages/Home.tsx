import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import styled from "styled-components";
import WritingBox from "components/WritingBox";
import SkeletonWritingBox from "components/SkeletonWritingBox";
import PathManager from "utils/PathManager";
import ThemeCard from "components/ThemeCard";
import ThemeCardSwiper from "components/ThemeCardSwiper";

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
    background-image: url(/assets/home/bg-main-1.jpg);
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
  }
  @media (max-width: 640px) {
    .bg-main {
      background-image: url(/assets/home/bg-main-1.jpg);
      background-size: cover;
      background-position: center;
      height: 350px;
    }
  }

  .bg-main-2 {
    background-image: url(/assets/home/bg-main-2.jpg);
    background-size: cover;
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
      title: "나에게 딱 맞는\n난이도와 테마를 선택해요",
      text:
        "실시간 피드백으로 자연스러운 원어민의 영어를 바로 배울 수 있어요.\n원어민 튜터의 꼼꼼한 피드백을 통해 나의 영어가 풍성해져요.",
      image_url: "/assets/home/section-adv-2.png",
    },
    {
      title: "나도 모르는 새 \n문법과 영단어가 머릿 속에 쏘옥!",
      text:
        "창공에 예수는 가는 사는가 눈이 것은 옷을 인류의 약동하다.\n끓는 풀이 청춘의 길지 가진 실현에 인생을 구하지 운다. ",
      image_url: "/assets/home/section-adv-1.png",
    },
    {
      title: "하루 3문장이면?\n1년에 1,000문장이라구요!",
      text:
        "매일 원하는 시간에 영어 문장을 보내드려요. \n통상 기본 회화를 하려면 500문장이 필요하다고 합니다.",
      image_url: "/assets/home/section-adv-3.png",
    },
    {
      title: "하루 43원 놀라운 가성비!!",
      text:
        " 사는가 눈이 것은 옷을 인류의 약동하다. \n길지 가진 실현에 인생을 구하지 운다. ",
      image_url: "/assets/home/section-adv-4.png",
    },
  ];
  return (
    <Main>
      <>
        <div className=" pt-20 pb-36 bg-main bg-primary-600">
          {/* 문제 풀기 섹션 */}
          <section id="writing-section" className="px-16 pt-36">
            <div className="flex justify-center gap-2 pt-3">
              <div className="flex-1">
                <h3 className="whitespace-pre-line  text-3xl font-bold">{`게임처럼 스스로 만드는 영작\n헬로제니`}</h3>
                <div className="whitespace-pre-line pt-2 text-gray-700">
                  {`하루에 3문장이면 1년에 1000천 문장. \n헬로 제니, 영어를 배우는 새로운 세상을 경험하세요.`}
                </div>
              </div>
              <div className="flex-1">
                <img src="/assets/home/header-image.png" alt="main writing" />
              </div>
            </div>
            <div className="flex justify-center gap-2 pt-10">
              <button
                className="px-5 py-2 rounded shadow-lg text-lg bg-white flex gap-2 font-bold"
                onClick={goWritingBase}
              >
                <img className="w-6" src="/assets/write-icon.png" />
                <div>100문장 무료 체험하기</div>
              </button>
            </div>
          </section>
          {/* 문제 리스트 */}
        </div>
        <div className="bg-white">
          <section className="py-32 px-4 text-center">
            <div className="sm:text-4xl text-2xl font-bold pb-6">
              영작으로 시작하는 나만의 새로운 세상
            </div>
            <div className="sm:text-base text-sm sm:pb-6 pb-4 text-gray-500 whitespace-pre-line">
              {`창공에 예수는 가는 사는가 눈이 것은 옷을 인류의 약동하다. \n끓는 풀이 청춘의 길지 가진 실현에 인생을 구하지 운다. \n귀는 몸이 무엇을 있을 위하여 이는 보라 이는 보라.`}
            </div>
            <div>
              <img
                className="w-2/3 mx-auto"
                src="/assets/home/main-slogan.png"
              />
            </div>
          </section>
        </div>
        <SectionAdvantage content={advantages[0]} isImageLeft={true} />
        <SectionAdvantage content={advantages[1]} isImageLeft={false} />
        <SectionAdvantage content={advantages[2]} isImageLeft={true} />
        <SectionAdvantage content={advantages[3]} isImageLeft={false} />

        <div className="bg-main-2">
          <section className="sm:py-20 py-16 px-4 flex flex-col items-center">
            <div className="flex">
              <div className="text-center">
                <div className="text-gray-700 text-sm pb-1">
                  하루 3문장, 1년이면 1073 문장!!
                </div>
                <div className="sm:text-5xl text-2xl text-center font-bold text-white ">
                  1천 문장의 기적
                </div>
                <div className="sm:te xt-2xl text-2xl pb-6 text-white">
                  {`제니와 함께 만들어볼까요?`}
                </div>
                <div className="flex bg-white py-2 px-4 rounded-lg font-bold shadow-lg mx-auto gap-2 justify-center items-center">
                  <img
                    src="/assets/write-icon.png"
                    alt="advantage 1"
                    className="w-6 h-6"
                  />
                  <div className="text-center items-center text-xl">
                    100문장 무료 체험하기
                  </div>
                </div>
              </div>
              <div className="w-24">
                <img src="/assets/home/avatar-left.png" />
              </div>
            </div>
          </section>
        </div>
        <section className="py-20 px-12 " id="more">
          <h3 className="text-2xl text-center whitespace-pre-line pb-6">
            {`3152개 이상의 문장, 152개의 테마를\n원하는 대로, 원하는 만큼`}
          </h3>
          <div>
            {writingStore.repThemes ? (
              <ThemeCardSwiper themes={writingStore.repThemes} />
            ) : (
              <div>스켈레톤</div>
            )}
          </div>
        </section>
      </>
    </Main>
  );
});

const SectionAdvantage = ({
  content,
  isImageLeft,
}: {
  content: any;
  isImageLeft: boolean;
}) => (
  <section className="sm:py-20 sm:px-12 px-4 flex justify-between flex gap-8">
    {isImageLeft && (
      <div className="w-2/5">
        <img src={content.image_url} alt="advantage 1" className="" />
      </div>
    )}
    <div className="w-3/5 flex flex-col justify-center whitespace-pre-line">
      <div className="sm:text-3xl text-xl font-bold pb-2 ">{content.title}</div>
      <div className="sm:text-base text-sm sm:pb-8 pb-4 text-gray-500">
        {content.text}
      </div>
    </div>
    {!isImageLeft && (
      <div className="w-2/5">
        <img src={content.image_url} alt="advantage 1" className="" />
      </div>
    )}
  </section>
);
