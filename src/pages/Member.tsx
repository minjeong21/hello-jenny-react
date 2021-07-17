import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useStores } from "states/Context";
import PathManager from "utils/PathManager";
import DotMenuIcon from "components/icons/DotMenuIcon";
import LocalStorage from "utils/LocalStorage";
import SectionSolvedWriting from "components/section/SectionSolvedWriting";
import SectionBookmark from "components/section/SectionBookmark";
import SectionBadge from "components/section/SectionBadge";

const Main = styled.main`
  min-height: calc(100vh - 45px);
  .bg-main {
    background-image: url(/assets/bg-main-8.jpg);
    background-size: cover;
  }
  .margin-auto {
    margin-left: auto;
    margin-right: auto;
  }
`;

const TabView = [
  // { code: "bookmark", name: "좋아요", icon: null },
  { code: "contact", name: "최근 푼 테마", icon: null },
  { code: "correct", name: "완성한 문장", icon: null },
];
const Member = observer(() => {
  const pathManager = new PathManager(useHistory());
  const { userStore, userActivityStore } = useStores();
  const [tab, setTab] = useState("bookmark");

  useEffect(() => {
    const token = LocalStorage.getToken();
    if (token) {
      userActivityStore.fetchAllSolvedWritings(token);
    } else {
      alert("유저 정보를 찾을 수 없습니다");
    }

    document.querySelector("#profile-main")?.addEventListener("click", () => {
      document.querySelector("#setting-modal")?.classList.add("hidden");
    });
  }, []);

  const logout = (e: any) => {
    e.preventDefault();
    userStore.logout();
    pathManager.goHome();
  };
  const changeUserInfo = (e: any) => {
    // TODO: 유저 정보 페이지로 변경
    e.preventDefault();
    alert("유저 정보 변경");
  };

  const toggleSettingModal = () => {
    document.querySelector("#setting-modal")?.classList.toggle("hidden");
  };
  const sendMessageToAdmin = () => {
    alert("메일보내기 ");
  };

  const goBookmarkWritings = (e: any) => {
    // TODO: 북마크 문제 리스트 불러오는 로직 추가
    if (userActivityStore.bookmarkIds) {
      pathManager.goWritingDetail(userActivityStore.bookmarkIds[0]);
    } else {
      alert("북마크 문제 발생");
    }
  };

  const goSolvedWritings = (e: any) => {
    // TODO: 푼문제 문제 리스트 불러오는 로직 추가
    if (userActivityStore.solvedWritings) {
      pathManager.goWritingDetail(
        userActivityStore.solvedWritings[0].writing.id
      );
    } else {
      alert("문제 불러오기 문제 발생");
    }
  };

  const onClickHeart = (e: any, writingId: number) => {
    e.preventDefault();
    const token = LocalStorage.getToken();
    const targetElement: any = document.querySelector(
      `.heart[data-id='${writingId}']`
    );
    const isMarked = targetElement.classList.contains("active");
    if (token && isMarked) {
      userActivityStore.removeBookmark(writingId, token);
      targetElement?.classList.remove("active");
    } else if (token) {
      userActivityStore.addBookmark(writingId, token);
      targetElement?.classList.add("active");
    } else {
      alert("유저 정보를 찾을 수 없습니다");
    }
  };

  return (
    <Main className="sm:pt-20 pt-12 pb-56 bg-gray-100" id="profile-main">
      <div className="mt-6 p-2 w-full max-w-screen-md  margin-auto">
        <section className="bg-white shadow-md rounded-md sm:p-8 p-6 w-full">
          <div className="flex ">
            <div className="sm:w-28 sm:h-28 w-12 h-12 relative">

              <ul className="flex gap-12 pb-6 text-gray-700">
                <li className="py-1 rounded-lg">
                  <span className="font-bold">100 </span> tried
                </li>
                <li className="py-1 rounded-lg">
                  <span className="font-bold">41</span> solved
                </li>
                <li className="py-1 rounded-lg">
                  <span className="font-bold">150 </span> days visited
                </li>
              </ul>
            </div>
          </div>
        </section>
        <SectionBadge />
        <>
          <div className="pt-12">
            <nav className="flex justify-center text-gray-400 ">
              {TabView.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setTab(item.code)}
                  className={`border-t-2 px-6 cursor-pointer py-2 font-medium text-sm leading-5 rounded-sm flex items-center gap-1 ${tab === item.code
                    ? "text-gray-800 border-gray-800 fade-in"
                    : ""
                    }`}
                >
                  {item.icon}
                  <div>{item.name}</div>
                </button>
              ))}
            </nav>

            {/* 북마크 */}

            {tab === "bookmark" && (
              <>
                {userActivityStore.bookmarks &&
                  userActivityStore.bookmarks.length > 0 ? (
                  <SectionBookmark
                    bookmarks={userActivityStore.bookmarks}
                    pathManager={pathManager}
                    goBookmarkWritings={goBookmarkWritings}
                    onClickHeart={onClickHeart}
                  />
                ) : (
                  <>아직 좋아요를 누른 영작문이 없어요!</>
                )}
              </>
            )}

            {tab === "correct" && (
              <>
                {userActivityStore.solvedWritings &&
                  userActivityStore.solvedWritings.length > 0 ? (
                  <SectionSolvedWriting
                    writings={userActivityStore.solvedWritings}
                    pathManager={pathManager}
                    goSolvedWritings={goSolvedWritings}
                    onClickHeart={onClickHeart}
                  />
                ) : (
                  <div>아직 푼 문제가 없어요</div>
                )}
              </>
            )}
          </div>
        </>

        {/* 뱃지 */}
      </div>
    </Main>
  );
});

export default Member;
