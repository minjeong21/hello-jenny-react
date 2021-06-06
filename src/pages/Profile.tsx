import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import styled from "styled-components";
import { useStores } from "states/Context";
import PathManager from "utils/PathManager";
import WritingHistoryCard from "components/WritingHistoryCard";
import DotMenuIcon from "components/icons/DotMenuIcon";
import SmileIcon from "components/icons/SmileIcon";
import HeartIcon from "components/icons/HeartIcon";
import LocalStorage from "utils/LocalStorage";
import IWriting from "interface/IWriting";
import { WritingStore } from "states/WritingStore";

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
  { code: "bookmark", name: "좋아요", icon: <HeartIcon size={5} /> },
  { code: "correct", name: "맞춘 문제", icon: <SmileIcon /> },
];
const Profile = observer(() => {
  const pathManager = new PathManager(useHistory());
  const { userStore, userActivityStore, writingStore } = useStores();
  const [tab, setTab] = useState("bookmark");
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    setUser(LocalStorage.getUser());
    setUserLoaded(true);
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

  const changeTab = (tab: string) => {
    setTab(tab);
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

  return (
    <Main className="sm:pt-20 pt-12 pb-56" id="profile-main">
      <div className="mt-6 p-2 w-full max-w-screen-md  margin-auto">
        <section className="bg-white shadow-md rounded-md sm:p-8 p-6 w-full">
          <div className="flex ">
            <div className="sm:w-28 w-12 relative">
              <img
                className="w-full rounded-full"
                src="https://d1telmomo28umc.cloudfront.net/media/public/avatars/congchu-avatar.jpg"
              />
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

              <div className="pb-3 flex items-end">
                <span className="w-12 text-xs text-gray-500">이메일</span>
                <h4>{userStore.getUser()?.email}</h4>
              </div>
              <div className="flex items-end">
                <span className="w-12 text-xs text-gray-500 ">전화</span>

                <button>번호 등록</button>
              </div>

              <div className="flex items-end">
                <span className="w-12 text-xs text-gray-500 ">전호</span>

                <button>번호 등록</button>
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
                {userActivityStore.bookmarks ? (
                  <SectionBookmark
                    bookmarks={userActivityStore.bookmarks}
                    pathManager={pathManager}
                    goBookmarkWritings={goBookmarkWritings}
                  />
                ) : (
                  <>아직 좋아요를 누른 영작문이 없어요!</>
                )}
              </>
            )}

            {tab === "correct" && <SectionCorrectWriting />}
          </div>
        </>

        {/* 뱃지 */}
      </div>
    </Main>
  );
});

const SectionCorrectWriting = () => {
  return (
    <section className="flex flex-col fade-in">
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-white text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  LEVEL
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-white text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  THEME
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-white text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Sentence
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-white text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="px-6 capitalize py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  <a href="#" className="text-blue-600 hover:text-blue-900">
                    아주 쉬워요
                  </a>
                </td>
                <td className="px-6 capitalize py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  <a href="#" className="text-blue-600 hover:text-blue-900">
                    친구만들기
                  </a>
                  ,
                  <a href="#" className="text-blue-600 hover:text-blue-900">
                    영화 명대사
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  <a
                    href="#"
                    target="_blank"
                    className="text-blue-600 hover:text-blue-900"
                  >
                    이번주에 런던에 갈 계획입니다.
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                  2020.8.25
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Profile;
const SectionBadge = () => {
  return (
    <>
      <section className=" mt-3 bg-white shadow-md rounded-md p-5">
        <div className="col-span-2 flex items-center">
          <div className="mr-5 bg-gray-200">
            <img
              src="https://i.pinimg.com/originals/52/66/81/52668161fff4bea0d9bca989bdb8a1ae.jpg"
              className="w-16"
            />
          </div>
          <div className="flex flex-col">
            <span className="mb-2 text-gray-800 text-2xl font-medium leading-4">
              꽃 뱃지를 모아봐요 💕
            </span>
            <span className=" text-sm text-gray-700 font-normal leading-4">
              3개의 뱃지를 더 모으면, 쥬디 캐릭터를 열 수 있어요!
            </span>
          </div>
          {/* 뱃지 설명 */}
        </div>
        <div className="pt-6 pb-3">
          <div className="flex gap-2 justify-center">
            <Badge
              label={"3일 연속 출석"}
              lock={false}
              imageUrl={"/assets/flower-1.png"}
            />
            <Badge
              label={"7일 누적 출석"}
              lock={false}
              imageUrl={"/assets/flower-2.png"}
            />
            <Badge
              label={"7일 연속 출석"}
              lock={false}
              imageUrl={"/assets/flower-3.png"}
            />
            <Badge
              label={"14일 누적 출석"}
              lock={false}
              imageUrl={"/assets/flower-1.png"}
            />
          </div>
        </div>
      </section>
      {/* 실제 뱃지 */}
      <div className="mt-6 xl:mt-0 rounded-lg h-48 bg-main">
        <div className="flex h-full justify-between">
          <div className="relative h-full flex-1">
            <FlowerBadges index={6} url={"/assets/flower-1.png"} />
          </div>

          <div className="relative h-full flex-1">
            <FlowerBadges index={3} url={"/assets/flower-2.png"} />
          </div>
          <div className="relative h-full flex-1">
            <FlowerBadges index={2} url={"/assets/flower-3.png"} />
          </div>
        </div>
      </div>
    </>
  );
};

const SectionBookmark = ({
  bookmarks,
  pathManager,
  goBookmarkWritings,
}: {
  bookmarks: { writing: IWriting }[];
  pathManager: PathManager;
  goBookmarkWritings: (e: any) => void;
}) => {
  return (
    <section className="py-12">
      <button
        className="border rounded bg-white px-2 py-1 text-sm shadow-sm"
        onClick={goBookmarkWritings}
      >
        좋아요한 영작문 풀기
      </button>

      <div className="sm:grid grid-cols-3 gap-x-2 gap-y-3 py-2">
        {bookmarks.map((bookmark) => {
          const writing: IWriting = bookmark.writing;
          return (
            <WritingHistoryCard
              id={writing.id}
              key={writing.id}
              imageUrl={writing.image_url}
              level={writing.level}
              themes={writing.themes}
              korSentence={writing.kr_sentence}
              pathManager={pathManager}
            />
          );
        })}
      </div>
    </section>
  );
};

// 뱃지
const Badge = ({
  label,
  lock,
  imageUrl,
}: {
  label: string;
  lock: boolean;
  imageUrl: string;
}) => {
  return (
    <div className="flex flex-col self-end items-center relative">
      <img
        src={
          lock
            ? "https://st2.depositphotos.com/3907761/7233/v/600/depositphotos_72338459-stock-illustration-01208a.jpg"
            : imageUrl
        }
        className={`w-14 h-14 border-2 border-white rounded-full shadow-md ${
          lock ? "opacity-50" : ""
        }`}
      />
      <span
        className={`${
          lock
            ? "bg-gray-200 text-gray-500"
            : "bg-brown-600 text-white font-bold"
        } mt-1 shadow text-sm font-medium px-2 py-x rounded-md`}
      >
        {label}
      </span>
    </div>
  );
};

const FlowerBadges = ({ index, url }: { index: number; url: string }) => {
  const fields: JSX.Element[] = [];
  let margin = "ml-0";
  for (let i = 0; i < index; i++) {
    fields.push(<BadgeImage index={i} imageUrl={url} />);
  }

  switch (index) {
    case 1:
      margin = "ml-1";
      break;
    case 2:
      margin = "ml-30 mb-20";
  }
  return <div className={`absoulte ${margin}`}>{fields}</div>;
};

const BadgeImage = ({
  imageUrl,
  index,
}: {
  imageUrl: string;
  index: number;
}) => {
  const random = Math.ceil(Math.random() * 5);
  return (
    <div className="p">
      <img
        style={{ left: index * 10 }}
        src={imageUrl}
        className={`w-14 h-14 rounded-full absolute bottom-${random}`}
      />
    </div>
  );
};
