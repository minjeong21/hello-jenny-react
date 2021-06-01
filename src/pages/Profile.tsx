import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import styled from "styled-components";
import PathManager from "utils/PathManager";
import { useStores } from "states/Context";

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

const Badges = [
  {
    label: "",
    lock: false,
    url: "/assets/flower-1.png",
  },
  {
    label: "",
    lock: false,
    url: "/assets/flower-1.png",
  },
  {
    label: "7일 발도장",
    lock: false,
    url:
      "https://cdn3.iconfinder.com/data/icons/medal-7/64/01_Medal_badge_ribbon_award_veteran-512.png",
  },

  {
    label: "7일 연속 발도장",
    lock: true,
    url:
      "https://cdn4.iconfinder.com/data/icons/pets-and-animals-3/24/dog-badge-pet-animal--512.png",
  },
  {
    label: "Level 7 달성!",
    lock: true,
    url:
      "https://www.clipartmax.com/png/middle/280-2805834_the-following-are-appropriate-level-7-qualifications-level-7.png",
  },
];

const Profile = observer(() => {
  const pathManager = new PathManager(useHistory());
  const { profileStore } = useStores();
  const [page, setPage] = useState("history");
  const [tab, setTab] = useState("correct");

  useEffect(() => {}, []);

  const logout = () => {
    profileStore.logout();
    pathManager.goHome();
  };
  const changeUsername = () => {
    // TODO: 닉네임 변경
    alert("닉네임 변경");
  };

  const changeTab = (tab: string) => {
    // TODO: 문제 가져오기.
    setTab(tab);
  };

  return (
    <Main className="md:pt-20 pt-12 pb-56">
      <nav className="flex justify-center mt-12">
        <button
          onClick={() => setPage("history")}
          className={` ${
            page === "history" ? "bg-gray-200" : ""
          } cursor-pointer mr-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-900 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200 `}
        >
          History
        </button>{" "}
        <button
          onClick={() => setPage("bookmark")}
          className={` ${
            page === "bookmark" ? "bg-gray-200" : ""
          } cursor-pointer mr-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-900 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200 `}
        >
          Bookmark
        </button>
        <button
          onClick={() => setPage("profile")}
          className={`${
            page === "profile" ? "bg-gray-200" : ""
          } cursor-pointer mr-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-900 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200 
            `}
        >
          Profile
        </button>
      </nav>
      <div className="mt-6 w-full max-w-screen-md  margin-auto">
        {page === "profile" && (
          <section className="bg-white shadow-md rounded-md md:p-8 p-6 w-full">
            <div className="flex flex-col items-center  md:items-start md:flex-row">
              <div className="w-28 relative">
                <img
                  className="w-full rounded-full"
                  src="https://d1telmomo28umc.cloudfront.net/media/public/avatars/congchu-avatar.jpg"
                />
              </div>
              <div className="md:ml-6 w-full">
                <div className="mb-2 md:mb-4 flex items-center">
                  <span className="w-12 text-xs text-gray-500">닉네임</span>
                  <h3 className="font-medium text-3xl leading-8">
                    {profileStore.getUser()?.username}
                  </h3>
                </div>
                <div className="pb-3 flex items-end">
                  <span className="w-12 text-xs text-gray-500">email</span>
                  <h4>{profileStore.getUser()?.email}</h4>
                </div>
                <div className="flex items-end">
                  <span className="w-12 text-xs text-gray-500 ">phone</span>
                  <h4>폰번호</h4>
                </div>
                <div className="flex justify-end">
                  <div className="mt-12 bg-gray-300 px-3 py-2 rounded mr-2">
                    <button onClick={changeUsername}>닉네임 변경</button>
                  </div>
                  <div className="mt-12 bg-gray-300 px-3 py-2 rounded mr-2">
                    <button onClick={logout}>번호 변경</button>
                  </div>
                  <div className="mt-12 bg-gray-300 px-3 py-2 rounded mr-2">
                    <button onClick={logout}>로그아웃</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {page === "history" && (
          <>
            <section className="pt-12">
              <nav className="flex">
                <button
                  onClick={() => changeTab("correct")}
                  className="border cursor-pointer bg-white px-3 py-2 font-medium text-sm leading-5 rounded-sm text-white font-bold hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-primary-700 bg-primary-700"
                >
                  맞춘 문제
                </button>
                <button
                  onClick={() => changeTab("pass")}
                  className="border cursor-pointer bg-white px-3 py-2 font-medium text-sm leading-5 rounded-sm text-gray-900 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200"
                >
                  건너 뛴 문제
                </button>
                <button
                  onClick={() => changeTab("bookmark")}
                  className="border cursor-pointer bg-white px-3 py-2 font-medium text-sm leading-5 rounded-sm text-gray-900 hover:text-gray-800 focus:outline-none focus:text-gray-800 focus:bg-gray-200"
                >
                  북마크
                </button>
              </nav>

              <div className="flex flex-col">
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
                            <a
                              href="#"
                              className="text-blue-600 hover:text-blue-900"
                            >
                              아주 쉬워요
                            </a>
                          </td>
                          <td className="px-6 capitalize py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                            <a
                              href="#"
                              className="text-blue-600 hover:text-blue-900"
                            >
                              친구만들기
                            </a>
                            ,
                            <a
                              href="#"
                              className="text-blue-600 hover:text-blue-900"
                            >
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
              </div>
            </section>
          </>
        )}
        {/* 뱃지 */}
        {page == "badge" && (
          <>
            {" "}
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
        )}
      </div>
    </Main>
  );
});

export default Profile;

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
