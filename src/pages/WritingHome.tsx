import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import styled from "styled-components";
import PathManager from "utils/PathManager";
import { LEVEL_MENU } from "properties/Filter";
import RightArrowIcon from "components/icons/RightArrowIcon";
import ITheme from "interface/ITheme";

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
  const [levels, setLevels] = useState<string[]>([]);

  useEffect(() => {
    if (!writingStore.repThemes || writingStore.repThemes.length === 0) {
      writingStore.fetchRepWriting();
    }
    writingStore.resetFilter();
  }, [writingStore]);

  const onClickLevel = (level: string) => {
    const targetElement: any = document.querySelector(
      `[data-level='${level}']`
    );
    if (targetElement.classList.contains("active")) {
      const idx = levels.indexOf(level);
      idx > -1 ? levels.splice(idx, 1) : levels.push(level);
      targetElement?.classList.remove("active");
    } else {
      levels.push(level);
      targetElement?.classList.add("active");
    }
    setLevels(levels);
  };

  const onClickThemeWritings = (e: any, theme: ITheme) => {
    writingStore.moveWritingWithThemeLevel(e, pathManager, theme, levels);
  };
  return (
    <Main className="sm:py-36 py-20 px-4">
      <section className="">
        <div className="sm:text-3xl text-2xl font-bold pb-2">
          내가 도전하고 싶은 난이도는?
        </div>
        <div className="sm:text-base text-sm text-gray-500">
          마음은 편하게! 약간 높은 난이도로 도전하길 추천해요!
        </div>
        <div>
          <div className="flex gap-2 sm:pt-3 pt-1 flex-wrap">
            {LEVEL_MENU.map((item, index) => (
              <div key={index} className="">
                <button
                  className="level px-3 py-2 rounded shadow "
                  data-level={item.value}
                  onClick={() => onClickLevel(item.value)}
                >
                  {item.displayName}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* 문제 풀기 섹션 */}
      <section className="sm:py-24">
        <div className="sm:text-3xl text-2xl font-bold pb-2">
          어떤 주제의 문장부터 만나볼까요?
        </div>
        <div className="sm:text-base text-sm sm:pb-8 pb-4 text-gray-500">
          관심가는 주제로 영어 문장을 만들어보세요. 어렵지 않게 영어를 익힐 수
          있을거에요.
        </div>
        <div className="sm:grid grid-cols-3 gap-x-2 gap-y-3">
          {writingStore.repThemes ? (
            writingStore.repThemes.map((theme, index) => (
              <div
                key={index}
                className="bg-white sm:p-4 p-4 my-4 rounded-lg shadow-custom cursor-pointer relative"
                onClick={(e) => onClickThemeWritings(e, theme)}
              >
                <div className="flex justify-between pb-4 items-center flex-wrap">
                  <h4 className="text-lg font-bold">{theme.display_name}</h4>
                  <div className="text-xs bg-gray-100 rounded px-1 py-1">
                    {theme.count}문제
                  </div>
                </div>
                <p className="text-gray-600 text-sm pb-3">
                  {theme.description}
                </p>
                <div className="absolute bottom-3 right-3 text-primary-600">
                  <RightArrowIcon />
                </div>
              </div>
            ))
          ) : (
            <div>스켈레톤</div>
          )}
        </div>
      </section>
    </Main>
  );
});
