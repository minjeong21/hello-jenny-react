import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import styled from "styled-components";
import PathManager from "utils/PathManager";
import { LEVEL_MENU } from "properties/Filter";
import ITheme from "interface/ITheme";
import ThemeCard from "components/ThemeCard";

const Main = styled.main`
  .level {
    background-color: var(--color-white);
  }
  .level.active {
    color: var(--color-white);
    background-color: var(--color-primary-700);
  }
`;
export default observer(() => {
  const pathManager = new PathManager(useHistory());
  const { writingStore } = useStores();
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [isMember, setIsMember] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<ITheme>();
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    if (!writingStore.repThemes || writingStore.repThemes.length === 0) {
      writingStore.fetchRepWriting();
    }
    writingStore.resetFilter();
  }, [writingStore]);

  const onClickThemeWritings = (theme: ITheme) => {
    setSelectedTheme(theme);
    setTimeout(() => {
      var levelSectionElement: any = document.querySelector("#level-section");
      window.scrollTo({
        top: levelSectionElement.offsetTop,
        behavior: "smooth",
      });
    }, 100);
    setIsValidated(selectedLevel.length > 0);
  };

  const onClickLevel = (level: string) => {
    setSelectedLevel(level);
    setIsValidated(selectedTheme != null);
  };

  const alertTrialMode = () => {
    alert("헬로제니의 멤버가 되시면 주제를 열어볼 수 있어요 🤩");
  };

  const goWritingDetail = (e: any) => {
    console.log(
      "최종 테마: ",
      selectedTheme?.display_name,
      "최종 레벨:",
      selectedLevel
    );
    if (!selectedTheme) {
      var levelSectionElement: any = document.querySelector("#theme-section");
      window.scrollTo({
        top: levelSectionElement.offsetTop,
        behavior: "smooth",
      });
    } else if (isValidated) {
      writingStore.moveWritingWithThemeLevel(
        e,
        pathManager,
        selectedTheme,
        selectedLevel
      );
    } else {
    }
  };

  return (
    <Main className="sm:py-36 py-20 px-4">
      {/* 문제 풀기 섹션 */}
      <div className="pb-8 flex justify-center rounded">
        <div className="bg-white rounded-3xl flex text-gray-700 items-center px-5 py-2  shadow">
          <img
            className="w-6 h-7 mr-2"
            src="/assets/small-quokka.png"
            alt="quokka character"
          />
          <div className="text-gray-800 text-sm">
            원하는 <b>테마</b>와 <b>난이도</b>를 선택할 수 있어요!
          </div>
        </div>
      </div>
      <section className="sm:pt-12 pb-6" id="theme-section">
        <div className="sm:text-3xl text-2xl font-bold pb-2">
          어떤 주제의 문장부터 만나볼까요?
        </div>
        <div className="sm:text-base text-sm sm:pb-8 pb-4 text-gray-500">
          관심가는 주제로 영어 문장을 만들어보세요. 어렵지 않게 영어를 익힐 수
          있을거에요.
        </div>
        <div className="sm:grid grid-cols-3 gap-x-2 gap-y-3">
          {writingStore.repThemes ? (
            writingStore.repThemes.map((theme, index) => {
              // let disabled = !isMember && theme.name !== "trial";
              let disabled = false;
              return (
                <ThemeCard
                  key={index}
                  onClick={() => onClickThemeWritings(theme)}
                  theme={theme}
                  disabled={disabled}
                  active={selectedTheme?.name === theme.name}
                />
              );
            })
          ) : (
            <div>스켈레톤</div>
          )}
        </div>
      </section>
      <section className="pt-32 text-center" id="level-section">
        <div className="sm:text-3xl text-2xl font-bold pb-2">
          내가 도전하고 싶은 난이도는?
        </div>
        <div className="sm:text-base text-sm text-gray-500 pb-12">
          마음은 편하게! 약간 높은 난이도로 도전하길 추천해요!
        </div>
        <div>
          <div className="gap-5 flex justify-center">
            {LEVEL_MENU.map((item, index) => (
              <div key={index} className="">
                <button
                  className={`level px-3 py-2 rounded shadow border-2 ${
                    selectedLevel === item.value
                      ? "bg-gradient-200 border-primary-500"
                      : "border-white"
                  }`}
                  data-level={item.value}
                  onClick={() => onClickLevel(item.value)}
                >
                  {item.displayName}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center pt-24 items-center">
          <button
            className={`px-5 py-3 rounded shadow text-right font-bold flex text-xl items-center ${
              isValidated
                ? "bg-primary-700 text-white "
                : "bg-gray-100 text-gray-200"
            }`}
            onClick={(e) => goWritingDetail(e)}
          >
            <img className="w-8 mr-2" src="/assets/write-icon.png" />
            <div> 영작 시작하기</div>
          </button>
        </div>
      </section>
    </Main>
  );
});
