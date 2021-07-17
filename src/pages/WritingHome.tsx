import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import styled from "styled-components";
import PathManager from "utils/PathManager";
import { LEVEL_MENU } from "properties/Filter";
import ITheme from "interface/ITheme";
import ThemeCard from "components/ThemeCard";
import SkeletonTheme from "components/SkeletonTheme";
import LocalStorage from "utils/LocalStorage";
import ModalTheme from "components/ModalTheme";
import IVisitedTheme from "interface/IvisitedTheme";
import { toJS } from "mobx";

const Main = styled.main`
  .level {
    background-color: var(--color-white);
  }
  .level.active {
    color: var(--color-white);
    background: var(--color-primary-700);
  }

  label {
    display: flex;
    cursor: pointer;
    font-weight: 500;
    position: relative;
    overflow: hidden;
    margin-bottom: 0.375em;
    /* Accessible outline */
    /* Remove comment to use */
    /*
      &:focus-within {
          outline: .125em solid var(--color-primary-700);
      }
    */
    input {
      position: absolute;
      left: -9999px;
      &:checked + span {
        background: linear-gradient(to right, #f2ffed, #fffaeb);
        border: 1px solid var(--color-primary-600);
        &:before {
          box-shadow: inset 0 0 0 0.4375em var(--color-primary-700);
        }
      }
    }
    span {
      display: flex;
      align-items: center;
      padding: 0.375em 0.75em 0.375em 0.375em;
      border-radius: 99em; // or something higher...
      transition: 0.25s ease;
      &:hover {
        background-color: linear-gradient(to right, #f2ffed, #fffaeb);
      }
      &:before {
        display: flex;
        flex-shrink: 0;
        content: "";
        background-color: #fff;
        width: 1.5em;
        height: 1.5em;
        border-radius: 50%;
        margin-right: 0.375em;
        transition: 0.25s ease;
        box-shadow: inset 0 0 0 0.125em var(--color-gray-300);
      }
    }
  }
`;
export default observer(() => {
  const pathManager = new PathManager(useHistory());
  const { writingStore } = useStores();
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [isMember, setIsMember] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<ITheme>();
  const [isValidated, setIsValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [targetVisitedTheme, setTargetVisitiedTheme] = useState<
    IVisitedTheme
  >();

  useEffect(() => {
    writingStore.fetchThemes();

    const token = LocalStorage.getToken();
    // TODO: 로그인 되어 있으면
    if (token) {
      console.log(token);
      writingStore.fetchActivityWritings(token);
    }

    // theme 리스트 불러오기
  }, [writingStore]);

  const onClickTheme = (theme: ITheme) => {
    setSelectedTheme(theme);
    setVisiblePopup(true);
    console.log(writingStore.visitedThemes);
    const foundedTheme = writingStore.visitedThemes?.find((item) => {
      return item.theme_id === theme.id;
    });
    if (foundedTheme) {
      setTargetVisitiedTheme(foundedTheme);
    }
    setIsValidated(selectedLevel !== null);
  };

  const onClickLevel = (level: number) => {
    setSelectedLevel(level);
    setIsValidated(selectedTheme != null);
    setTimeout(() => {
      var themeSectionElement: any = document.querySelector("#level-section");
      if (themeSectionElement) {
        window.scrollTo({
          top: themeSectionElement.offsetTop,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const onClickStartFirstWriting = async () => {
    console.log(selectedLevel, toJS(selectedTheme));
    if (selectedLevel && selectedTheme) {
      writingStore.saveCurrentLevel(selectedLevel);
      writingStore.saveCurrentTheme(toJS(selectedTheme));
    }
    if (selectedTheme && selectedTheme.id) {
      await writingStore.fetchWritingsByTheme(selectedTheme.id);
      if (writingStore.writings && writingStore.writings.length > 0) {
        pathManager.goWritingDetail(writingStore.writings[0].id);
      }
    }
  };
  const onClickStartNextWriting = async () => {
    // TODO: 이미 푼 영작 ID 기준으로 제거
    if (selectedTheme && selectedTheme.id) {
      await writingStore.fetchWritingsByTheme(selectedTheme.id);
      if (writingStore.writings && writingStore.writings.length > 0) {
        pathManager.goWritingDetail(writingStore.writings[0].id);
      }
    }
  };

  return (
    <Main className="sm:py-36 py-20 px-4 bg-gray-100">
      {/* 문제 풀기 섹션 */}
      <section className="pb-12">
        <div className="sm:text-3xl text-2xl font-bold pb-2">
          내가 도전하고 싶은 난이도는?
        </div>
        <div className="sm:text-base text-sm text-gray-500 pb-12">
          편하게 즐겁게 도전할 수 있는 난이도로 시작해봐요!
        </div>
        <div>
          <form className="flex gap-1">
            {LEVEL_MENU.map((item, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="level"
                  checked={selectedLevel === Number(item.value)}
                  data-level={item.value}
                  onChange={() => onClickLevel(Number(item.value))}
                />
                <span className="border-1 bg-gray-200">{item.displayName}</span>
              </label>
            ))}
          </form>
        </div>
      </section>
      <section className="sm:pt-12 pb-6" id="theme-section">
        <div className="sm:text-3xl text-2xl font-bold pb-2">
          어떤 주제의 문장부터 만나볼까요?
        </div>
        <div className="sm:text-base text-sm sm:pb-8 pb-4 text-gray-500">
          관심가는 주제로 영어 문장을 만들어보세요. 어렵지 않게 영어를 익힐 수
          있을거에요.
        </div>
        <div className="sm:grid grid-cols-3 gap-x-2 gap-y-3">
          {writingStore.themes ? (
            writingStore.themes
              .filter((item) => item.level == Number(selectedLevel))
              .map((theme, index) => {
                let disabled = !isMember && theme.name !== "trial";
                return (
                  <ThemeCard
                    key={index}
                    onClick={() => onClickTheme(theme)}
                    theme={theme}
                    disabled={disabled}
                    active={selectedTheme?.name === theme.name}
                  />
                );
              })
          ) : (
            <>
              <SkeletonTheme />
              <SkeletonTheme />
              <SkeletonTheme />
              <SkeletonTheme />
              <SkeletonTheme />
            </>
          )}
        </div>
      </section>
      <ModalTheme open={visiblePopup} closePopup={() => setVisiblePopup(false)}>
        <>
          <div>
            {selectedLevel && selectedTheme ? (
              <div className="pb-6">
                <div className="flex pb-2 items-center gap-1 sm:text-lg font-semibold flex-wrap">
                  <div className="font-semibold">
                    {selectedTheme.display_name}
                  </div>
                </div>
                <div className="">
                  <div className="text-sm text-gray-600">
                    - 전체 문장 : {selectedTheme.count}개
                  </div>
                  <div className="text-sm text-gray-600">
                    - 완료한 문장 :{" "}
                    {targetVisitedTheme ? targetVisitedTheme.count_done : 0}개
                  </div>
                  <div className="text-sm text-gray-600">
                    - 남은 문장 수 :{" "}
                    {targetVisitedTheme
                      ? selectedTheme.count - targetVisitedTheme.count_done
                      : selectedTheme.count}
                    개
                  </div>
                </div>
              </div>
            ) : null}

            {isMember ? (
              <div className="flex justify-center gap-1">
                <button
                  className={`px-3 py-2 rounded shadow-lg text-right flex items-center border-1 border-gray-300`}
                  onClick={() => setVisiblePopup(false)}
                >
                  <div className="flex items-center">
                    <span>취소</span>
                  </div>
                </button>
                <button
                  className={`px-4 py-2 rounded shadow-lg text-right font-bold flex items-center bg-primary-700 text-white`}
                  onClick={onClickStartFirstWriting}
                >
                  <div className="flex items-center">
                    <span>처음부터 풀기</span>
                  </div>
                </button>
                <button
                  className={`px-4 py-2 rounded shadow-lg text-right font-bold flex items-center bg-primary-700 text-white`}
                  onClick={onClickStartNextWriting}
                >
                  <div className="flex items-center">
                    <span>이어서 풀기</span>
                  </div>
                </button>
              </div>
            ) : (
              <button
                className={`px-3 py-2 rounded shadow text-right font-bold flex items-center ${isValidated
                  ? "bg-primary-700 text-white "
                  : "bg-gray-100 text-gray-200"
                  }`}
                onClick={onClickStartFirstWriting}
              >
                <img className="w-8 mr-2" src="/assets/write-icon.png" />
                <div className="flex items-center gap-3">
                  <span>영작 시작하기</span>
                  {loading && (
                    <div className="loader-orange ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                  )}
                </div>
              </button>
            )}
          </div>
        </>
      </ModalTheme>
    </Main>
  );
});

{
  /* <section className="pb-8 flex rounded cursor-pointer ">
        {isMember &&
        writingStore.visitedThemes &&
        writingStore.visitedThemes.length > 0 ? (
          <div>
            <div className="sm:text-3xl text-2xl font-bold pb-2">
              최근에 푼 테마를 이어서 만나볼까요?
            </div>
            <div className="flex">
              {writingStore.visitedThemes.map((theme) => (
                <div
                  className="bg-gradient-200 sm:px-4 px-4 py-2 shadow-lg rounded-lg"
                  onClick={onClickStartNextWriting}
                >
                  <div className="text-gray-800 text-left flex justify-between items-center">
                    <div className="font-semibold"> {theme.theme_name}</div>
                    <div className="text-xs bg-white rounded px-1 py-1 ml-2">
                      ({theme.count_done}/{theme.count_total})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          
        )}
      </section> */
}
