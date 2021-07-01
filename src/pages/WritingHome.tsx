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
import { fetchWritingListFiltered } from "apis/WritingApi";
import LocalStorage from "utils/LocalStorage";
import ThemePopup from "components/ThemePopup";

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
  const [selectedLevel, setSelectedLevel] = useState<string>("1");
  const [isMember, setIsMember] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<ITheme>();
  const [isValidated, setIsValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visiblePopup, setVisiblePopup] = useState(false);
  useEffect(() => {
    writingStore.resetFilter();
    writingStore.fetchThemes();

    const token = LocalStorage.getToken();
    // TODO: 로그인 되어 있으면
    if (token) {
      writingStore.fetchActivityWritings(token);
    }
  }, [writingStore]);

  const onClickThemeWritings = (theme: ITheme) => {
    setSelectedTheme(theme);
    setVisiblePopup(true);
    setIsValidated(selectedLevel.length > 0);
  };

  const onClickLevel = (level: string) => {
    setSelectedLevel(level);
    setIsValidated(selectedTheme != null);
    setTimeout(() => {
      var themeSectionElement: any = document.querySelector("#theme-section");
      if (themeSectionElement) {
        window.scrollTo({
          top: themeSectionElement.offsetTop,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const fetchWritingsAndGoDetail = async (e: any) => {
    if (!selectedTheme) {
      var levelSectionElement: any = document.querySelector("#theme-section");
      window.scrollTo({
        top: levelSectionElement.offsetTop,
        behavior: "smooth",
      });
    } else if (isValidated) {
      setLoading(true);
      await fetchWritingListFiltered(selectedLevel, selectedTheme.name);
      writingStore.moveWritingWithThemeLevel(
        e,
        pathManager,
        selectedTheme,
        selectedLevel
      );
    }
  };

  return (
    <Main className="sm:py-36 py-20 px-4">
      {/* 문제 풀기 섹션 */}
      <div className="pb-8 flex justify-center rounded cursor-pointer ">
        {/* 로그인  */}
        {isMember && writingStore.lastVisitedTheme ? (
          <div>
            <div
              className="bg-gradient-200 sm:px-16 px-6 py-6 flex flex-col items-center bg-white shadow-lg rounded-lg"
              onClick={() => alert("shortcut")}
            >
              <div className="flex gap-1 items-center pb-4">
                <img
                  className="w-6 h-7 mr-2"
                  src="/assets/small-quokka.png"
                  alt="quokka character"
                />
                <div className="text-gray-800 text-sm">
                  마지막 테마를 이어서 만나볼까요?
                </div>
              </div>
              <div className="text-gray-800 text-lg font-bold pb-2">
                {writingStore.lastVisitedTheme.theme_name}
              </div>
              <div className="pb-4 text-center">
                <div className="text-sm text-gray-600">
                  v 전체 <b>{writingStore.lastVisitedTheme.count_total}개</b> 중{" "}
                  <b>{writingStore.lastVisitedTheme.count_done}개</b> 완성!!
                </div>
                <div className="text-sm text-gray-600">
                  v 남은 문제
                  <b>
                    {writingStore.lastVisitedTheme.count_total -
                      writingStore.lastVisitedTheme.count_done}
                    개
                  </b>
                  !
                </div>
              </div>
              <button>
                <div className="bg-primary-600 text-white font-bold border-primary-600 self-right px-6 py-2 border-1 rounded-lg shadow">
                  이어서 풀러가기
                </div>
              </button>
            </div>
          </div>
        ) : (
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
        )}
      </div>

      <section className="text-center py-12">
        <div className="sm:text-3xl text-2xl font-bold pb-2">
          내가 도전하고 싶은 난이도는?
        </div>
        <div className="sm:text-base text-sm text-gray-500 pb-12">
          편하게 즐겁게 도전할 수 있는 난이도로 시작해봐요!
        </div>
        <div>
          {/* TODO: radio 만든는 중 */}
          <form className="flex gap-1 justify-center">
            {LEVEL_MENU.map((item, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="level"
                  checked={selectedLevel === item.value}
                  data-level={item.value}
                  onChange={() => onClickLevel(item.value)}
                />
                <span className="border-1 bg-gray-100">{item.displayName}</span>
              </label>
            ))}
          </form>
        </div>
      </section>
      <section className="sm:pt-12 pb-6 text-center" id="theme-section">
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
              let disabled = !isMember && theme.name !== "trial";
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
      <ThemePopup open={visiblePopup} closePopup={() => setVisiblePopup(false)}>
        <>
          <div>
            {selectedLevel && selectedTheme ? (
              <div className="pb-6">
                <div className="flex pb-2 items-center gap-1 sm:text-lg font-semibold flex-wrap">
                  <div className="">{selectedTheme?.display_name}</div>
                  <span className="font-semibold text-primary-700">
                    {selectedLevel === "1"
                      ? "(Easy)"
                      : selectedLevel === "2"
                      ? "(Medium)"
                      : "(Advanced)"}
                  </span>
                  <span>풀러 갈까요?</span>
                </div>
                <div className="">
                  <div className="text-sm text-gray-600">- 전체 100개</div>
                  <div className="text-sm text-gray-600">- 푼 문제 16개</div>
                  <div className="text-sm text-gray-600">
                    - 남은 문제 수 : 86개
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
                  onClick={fetchWritingsAndGoDetail}
                >
                  <div className="flex items-center">
                    <span>처음부터</span>
                  </div>
                </button>
                <button
                  className={`px-4 py-2 rounded shadow-lg text-right font-bold flex items-center bg-primary-700 text-white`}
                  onClick={() => alert("이어서 풀기")}
                >
                  <div className="flex items-center">
                    <span>이어서 풀기</span>
                  </div>
                </button>
              </div>
            ) : (
              <button
                className={`px-3 py-2 rounded shadow text-right font-bold flex items-center ${
                  isValidated
                    ? "bg-primary-700 text-white "
                    : "bg-gray-100 text-gray-200"
                }`}
                onClick={fetchWritingsAndGoDetail}
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
      </ThemePopup>
    </Main>
  );
});
