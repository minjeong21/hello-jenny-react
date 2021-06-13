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
  { code: "bookmark", name: "좋아요", icon: null },
  { code: "correct", name: "맞춘 문제", icon: null },
];
const Profile = observer(() => {
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
    alert("이게 필요할까나.");
  };

  const goBookmarkWritings = (e: any) => {
    // TODO: 북마크 문제 리스트 불러오는 로직 추가
    if (userActivityStore.bookmarkIds) {
      pathManager.goNextWriting(e, userActivityStore.bookmarkIds[0]);
    } else {
      alert("북마크 문제 발생");
    }
  };

  const goSolvedWritings = (e: any) => {
    // TODO: 푼문제 문제 리스트 불러오는 로직 추가
    if (userActivityStore.solvedWritings) {
      pathManager.goNextWriting(
        e,
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
    <Main className="sm:pt-20 pt-12 pb-56" id="profile-main">
      <div className="mt-6 p-2 w-full max-w-screen-md  margin-auto">
        <section className="bg-white shadow-md rounded-md sm:p-8 p-6 w-full">
          <div className="flex ">
            <div className="sm:w-28 sm:h-28 w-12 h-12 relative">
              {userStore.userProfile?.photo ? (
                <img
                  className="w-full rounded-full"
                  src="https://d1telmomo28umc.cloudfront.net/media/public/avatars/congchu-avatar.jpg"
                  alt="user profile"
                />
              ) : (
                <div className="bg-primary-600 sm:w-20 sm:h-20 w-12 h-12 rounded-full text-white flex justify-center items-center truncate">
                  {userStore.getUser()?.username}
                </div>
              )}
            </div>
            <div className="sm:ml-6 w-full">
              <div className="mb-4 flex items-center">
                <h3 className="font-medium text-2xl leading-8">
                  {userStore.getUser()?.username}
                </h3>
              </div>
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

              <div className="pb-6 flex items-end">
                <span className="w-12 text-xs text-gray-500">이메일</span>
                <h4>{userStore.getUser()?.email}</h4>
              </div>

              <div className="flex items-center">
                <span className="w-12 text-xs text-gray-500 ">전화</span>

                <button className="bg-gray-200 rounded-lg px-3 py-1 text-xs">
                  번호 등록
                </button>
              </div>
            </div>

            <div className="relative">
              <div onClick={toggleSettingModal} className="cursor-pointer">
                <DotMenuIcon />
              </div>

              <div
                className="absolute right-0 w-36 bg-white shadow-lg fade-in-down hidden"
                id="setting-modal"
              >
                <button
                  className=" px-3 border-b py-2 rounded mr-2 text-sm"
                  onClick={changeUserInfo}
                >
                  <label>회원 정보 변경</label>
                </button>
                <button
                  className=" px-3 border-b py-2 rounded mr-2 text-sm"
                  onClick={logout}
                >
                  <label>로그아웃하기</label>
                </button>
                <button
                  className=" px-3 border-b py-2 rounded mr-2 text-sm"
                  onClick={sendMessageToAdmin}
                >
                  <label>개발자에게 문의</label>
                </button>
              </div>
            </div>
          </div>
        </section>
        <>
          <div className="pt-12">
            <nav className="flex justify-center text-gray-400 ">
              {TabView.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setTab(item.code)}
                  className={`border-t-2 px-6 cursor-pointer py-2 font-medium text-sm leading-5 rounded-sm flex items-center gap-1 ${
                    tab === item.code
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

export default Profile;
