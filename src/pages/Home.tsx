import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import styled from "styled-components";
import PathManager from "utils/PathManager";
import ThemeCardSwiper from "components/ThemeCardSwiper";
import SkeletonTheme from "components/SkeletonTheme";
import ThemeCard from "components/ThemeCard";
import ITheme from "interface/ITheme";

const Main = styled.main`
  .margin-small {
    margin-bottom: -3px;
  }
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
    backgrounc-color: #a3d3af;
    background-image: url(/assets/home/bg-main-2.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: repeat-x;
  }
  @media (max-width: 640px) {
    .bg-main {
      background-image: url(/assets/home/bg-main-2.jpg);
      background-size: cover;
      background-position: center;
    }
  }

  .bg-main-2 {
    background-image: url(/assets/home/bg-main-2.png);
    background-size: cover;
  }
  .bg-color {
    background-color: #a3d3af;
  }
  .bg-base {
    background-color: #fbf9f3;
  }
`;

export default observer(() => {
  const pathManager = new PathManager(useHistory());
  const { writingStore } = useStores();


  useEffect(() => {
    writingStore.fetchThemes();

  }, []);

  const goWritingBase = () => {
    document.location.href = "/writing/";
  };

  const advantages = [

    {
      title: "1. 목표가 있어야 해요.\n 여러분은 왜 영어를 잘하고 싶으신가요?",
      text:
        "영어로 된 영화를 이해하고 싶나요? \n영어를 하며 멋지게 여행하고 싶나요? \n외국계 회사에 취직하고 싶나요? \n모든 학습의 시작은 \'why\'에 있다고 생각해요.\n 내가 원하는 목표에 맞게, \n원하는 테마를 선택해서 공부하세요!",
      image_url: "/assets/home/section-pros-2.png",
    },
    {
      title: "2. 나에게 딱 맞는 난이도로!",
      text:
        "영어 공부의 시작은 나에게 맞는 난이도로 시작하는 거에요.",
      image_url: "/assets/home/section-pros-2.png",
    },
    {
      title: "3. 부담없이 몰입하는 상태일수록\n 효과가 배가 되요! ",
      text:
        "짧은 시간이라도, 스스로 생각하는 몰입상태에서\n 학습 효과가 배가 된다는 사실! 알고 계셨나요? \n듣고 읽기만 하는 수동적인 학습은 이제 그만! \n한 문장을 풀어도 내것으로 만들어요 :)",
      image_url: "/assets/home/section-pros-1.png",
    },
    {
      title: "4.꾸준함은 모든 것을 해냅니다!",
      text:
        "매일 원하는 시간에 영어 문장을 보내드려요. \n통상 기본 회화를 하려면 500문장이 필요하다고 합니다.",
      image_url: "/assets/home/section-pros-3.png",
    },
    {
      title: "5. 망각을 대비하는 반복학습!",
      text:
        "1일이면 50, 3일이면 100을 잊어버리는 것을 아시나요? 틀린 문제를 반복해서 풀도록 도와드려요!",
      image_url: "/assets/home/section-pros-3.png",
    },
  ];
  return (
    <Main className="tracking-tighter">
      <>
        <div className="pt-20 bg-main tracking-tighter">
          {/* 문제 풀기 섹션 */}
          <section
            id="writing-section"
            className="px-2 flex flex-col justify-center items-center h-screen"
          >
            <h3 className="whitespace-pre-line sm:text-6xl text-2xl font-bold pb-6">{`스스로 완성하는 영작, 헬로제니!`}</h3>

            <div className="font-normal text-xl text-center">
              <div>하루 3문장이면1년에 1000문장!</div>
              <div>영어를 배우는 새로운 세상을 경험하세요.</div>
            </div>


            <div className="pb-6">
              <img
                className="w-full"
                src="/assets/home/section-slogan-1.png"
              />
            </div>

            <button
              className="sm:px-24 w-full sm:w-auto sm:py-6 py-3 my-16 rounded shadow-lg sm:text-3xl text-xl bg-gradient-300 font-bold mx-auto"
              onClick={goWritingBase}
            >
              <div>100문장 무료 체험하기 💕 </div>
            </button>
          </section>
          {/* 문제 리스트 */}
        </div>
        <div className="bg-base">
          <section className="py-24 px-4 text-center">
            <div className="sm:text-4xl text-xl font-bold pb-6">

              영어 공부는 이렇게 해야해요!
            </div>
            <div className="text-gray-600">지금까지 우리는 왜, 그렇게 많은 시간을 투자하고도 영어가 잘 되지 않았을까요?</div>
            <div className="text-gray-600 pb-6">헬로 제니가 제안하는 '독학하는 영어 공부법'</div>
            <div className="sm:text-base text-sm sm:pb-6 pb-4 text-gray-800 whitespace-pre-line">
              {`선생님과 함께하는 공부, 시간을 따로 내야 하는 공부. 부담스럽지 않으셨나요? \n헬로 제니에서는 매일 3문장씩 만들어내는 습관을 만들 수 있어요!`}
            </div>
          </section>
        </div>
        <SectionProsTheme content={advantages[0]} isImageLeft={false} themes={writingStore.themes ? writingStore.themes : null} />
        <SectionAdvantage content={advantages[1]} isImageLeft={true} />
        <SectionAdvantage content={advantages[2]} isImageLeft={false} />
        <SectionAdvantage content={advantages[3]} isImageLeft={true} />
        <SectionAdvantage content={advantages[4]} isImageLeft={false} />

        <div className="bg-main-2">
          <section className="py-12 px-4 flex flex-col items-center">
            <div className="flex pb-6">
              <div className="text-center">
                <div className="text-gray-700 text-xl pb-1">
                  하루 3문장, 1년이면 1073 문장!!
                </div>
                <div className="text-4xl text-center font-bold margin-small">
                  1천 문장의 기적
                </div>
                <div className="text-3xl">
                  {`제니와 함께 만들어볼까요?`}
                </div>
              </div>
              <div className="ml-8 w-20 sm:block hidden">
                <img src="/assets/home/avatar-2.png" />
              </div>
            </div>
            <div
              className="mt-4 sm:px-20 w-full sm:w-auto py-4 rounded shadow-lg text-2xl bg-gradient-300 font-bold mx-auto"
              onClick={goWritingBase}
            >
              <div className="text-center items-center">
                100문장 무료 체험하기
              </div>
            </div>
          </section>
        </div>
      </>
    </Main >
  );
});

const SectionAdvantage = ({
  content,
  isImageLeft,
}: {
  content: any;
  isImageLeft: boolean;
}) => (
  <>
    {/* 모바일 뷰 */}
    <section className={`p-4 gap-8 sm:hidden`}>
      <div className="sm:text-3xl text-2xl font-bold pb-4 pt-4 text-center whitespace-pre-line">
        {content.title}
      </div>
      <div className="w-1/2 mx-auto">
        <img src={content.image_url} alt="advantage 1" className="" />
      </div>
      <div className="flex flex-col justify-center pt-4">
        <div className="sm:text-base text-sm sm:pb-8 pb-4 text-gray-500">
          {content.text}
        </div>
      </div>
    </section>
    {/* PC 뷰 */}

    <div className={isImageLeft ? "" : "bg-base"}>
      <section
        className={`sm:py-20 sm:flex hidden justify-between gap-12`}
      >
        {isImageLeft && (
          <div className="w-1/2">
            <img src={content.image_url} alt="advantage 1" className="" />
          </div>
        )}
        <div className="w-1/2 flex flex-col justify-center whitespace-pre-line">
          <div className="sm:text-3xl text-xl font-bold pb-4">
            {content.title}
          </div>
          <div className="sm:text-base text-sm sm:pb-8 pb-4 text-gray-500 leading-3">
            {content.text}
          </div>
        </div>
        {!isImageLeft && (
          <div className="w-1/2">
            <img src={content.image_url} alt="advantage 1" className="" />
          </div>
        )}
      </section>
    </div>
  </>
);


const SectionProsTheme = ({
  content,
  isImageLeft,
  themes
}: {
  content: any;
  isImageLeft: boolean;
  themes: ITheme[] | null;
}) => (
  <>
    {/* 모바일 뷰 */}
    <section className={`p-4 gap-8 sm:hidden`}>
      <div className="sm:text-3xl text-2xl font-bold pb-4 pt-4 text-center whitespace-pre-line">
        {content.title}
      </div>
      <div className="w1/2 mx-auto">
        {themes ?
          <div className="sm:block hidden">
            <ThemeCardSwiper themes={themes} />
          </div>
          : <SkeletonTheme />
        }
      </div>
      <div className="flex flex-col justify-center pt-4">
        <div className="sm:text-base text-sm sm:pb-8 pb-4 text-gray-500">
          {content.text}
        </div>
      </div>
    </section>
    {/* PC 뷰 */}

    <div className={isImageLeft ? "" : "bg-base"}>
      <section
        className={`sm:py-20 sm:flex hidden justify-between gap-12`}
      >
        {isImageLeft && (
          <div className="w-1/2">
            {themes ?
              <div className="sm:block hidden">
                <ThemeCardSwiper themes={themes} />
              </div>
              : <SkeletonTheme />
            }
          </div>
        )}
        <div className="w-1/2 flex flex-col justify-center whitespace-pre-line">
          <div className="sm:text-3xl text-xl font-bold pb-4">
            {content.title}
          </div>
          <div className="sm:text-base text-sm sm:pb-8 pb-4 text-gray-500 leading-3">
            {content.text}
          </div>

        </div>
        {!isImageLeft && (
          <div className="w-1/2">
            {themes ?
              <div className="sm:block hidden">
                <ThemeCardSwiper themes={themes} />
              </div>
              : <SkeletonTheme />
            }
          </div>
        )}
      </section>
    </div>
  </>
);
