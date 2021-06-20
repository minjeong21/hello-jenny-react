import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import styled from "styled-components";
import PathManager from "utils/PathManager";
import { LEVEL_MENU } from "properties/Filter";
import RightArrowIcon from "components/icons/RightArrowIcon";
import ITheme from "interface/ITheme";
import { url } from "inspector";
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
  const [level, setLevel] = useState<string>("");
  const [isMember, setIsMember] = useState(true);
  const [theme, setTheme] = useState<ITheme>();

  useEffect(() => {
    if (!writingStore.repThemes || writingStore.repThemes.length === 0) {
      writingStore.fetchRepWriting();
    }
    writingStore.resetFilter();
  }, [writingStore]);

  const onClickLevel = (e: any, level: string) => {
    console.log(level);
    const targetElement: any = document.querySelector(
      `[data-level='${level}']`
    );
    setLevel(level);
    if (theme) {
      writingStore.moveWritingWithThemeLevel(e, pathManager, theme, level);
    }
  };

  const onClickThemeWritings = (theme: ITheme) => {
    setTheme(theme);
  };

  const alertTrialMode = () => {
    alert("헬로제니의 멤버가 되시면 주제를 열어볼 수 있어요 🤩");
  };

  return (
    <Main className="sm:py-36 py-20 px-4">
      {/* 문제 풀기 섹션 */}
      {!theme && (
        <section className="py-12">
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
                  <div
                    key={index}
                    onClick={
                      disabled
                        ? alertTrialMode
                        : (e) => onClickThemeWritings(theme)
                    }
                  >
                    <ThemeCard theme={theme} disabled={disabled} />
                  </div>
                );
              })
            ) : (
              <div>스켈레톤</div>
            )}
          </div>
        </section>
      )}
      <section className="">
        <div className="sm:text-3xl text-2xl font-bold pb-2">
          내가 도전하고 싶은 난이도는?
        </div>
        <div className="sm:text-base text-sm text-gray-500">
          마음은 편하게! 약간 높은 난이도로 도전하길 추천해요!
        </div>
        <div>
          <div className="gap-2 sm:pt-3 pt-1">
            {LEVEL_MENU.map((item, index) => (
              <div key={index} className="">
                <button
                  className={`level px-3 py-2 rounded shadow ${
                    level === item.value ? "active" : ""
                  }`}
                  data-level={item.value}
                  onClick={(e) => onClickLevel(e, item.value)}
                >
                  {item.displayName}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Main>
  );
});
