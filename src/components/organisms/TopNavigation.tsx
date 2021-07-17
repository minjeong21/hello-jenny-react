import PathManager from "utils/PathManager";
import { useState } from "react";
import { useStores } from "states/Context";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PencilIcon from "components/icons/PencilIcon";
import SmileIcon from "components/icons/SmileIcon";
const Container = styled.nav`
  min-width: 320px;
`;

const TopNavigation = () => {
  const pathManager = new PathManager(useHistory());
  const { writingStore, userStore } = useStores();
  const [openMenu, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!openMenu);
  };
  const goWritingBase = (e: any) => {
    pathManager.goWritingBase();
    toggleMenu();
  };
  const goMemgership = (e: any) => {
    pathManager.goMembershipPage();
    toggleMenu();
  };
  const goMember = () => {
    pathManager.goMember();
    toggleMenu();
  };

  return (
    <Container className="absolute top-0 w-screen">
      <div className="sm:min-h-0">
        <nav className="flex sm:p-3 px-2 items-center relative justify-between z-10">
          <div className="font-bold sm:block hidden">
            <a href="/">
              <img
                src="/logo3.png"
                width="200"
                height="100"
                alt="Hello Jenny Logo"
                title="Hello Jenny Logo"
              />
            </a>
          </div>
          <div className="font-bold sm:hidden block">
            <a href="/">
              <img
                src="/logo3.png"
                width="50"
                height="50"
                alt="Hello Jenny Logo"
                title="Hello Jenny Logo"
              />
            </a>
          </div>
          <ul className="sm:px-2 ml-0 ml-auto flex space-x-2 items-center">
            <WideButton
              onClick={(e) => goWritingBase(e)}
              label={
                <>
                  테마/난이도 선택
                </>
              }
            />
            <WideButton
              onClick={goMember}
              label={
                <>
                  <span className="ml-1">멤버 기능</span>
                </>
              }
            />
            <WideButton
              onClick={goMemgership}
              label={
                <>
                  <span className="ml-1">멤버십 혜택</span>
                </>
              }
            />
            {/* <WideButton onClick={goSpeaking} label={"스피킹 연습"} /> */}
            {userStore.isLogined() ? (
              <>
                <button
                  onClick={(e) => pathManager.goUserProfile(e)}
                  className="flex ml-3 text-gray-400 text-sm border-2 border-white
            rounded-full focus:outline-none focus:border-gray-300 transition
            duration-150 ease-in-out"
                >
                  {userStore.userProfile && userStore.userProfile.photo ? (
                    <img
                      className="w-7 h-7"
                      src={userStore.userProfile.photo}
                      alt="member icon"
                    />
                  ) : (
                    <div className="bg-primary-600 rounded-3xl text-white w-8 h-8 flex justify-center items-center truncate">
                      {userStore.getUser()?.username.substr(0, 1)}
                    </div>
                  )}
                </button>
              </>
            ) : (
              <>
                <div className="sm:block hidden">
                  <WideButton
                    onClick={pathManager.goSignIn}
                    label={"로그인·회원가입"}
                  />
                </div>
                <button
                  className="sm:hidden block pt-2 pl-2 text-gray-600 w-8 h-8"
                  onClick={pathManager.goSignIn}
                >
                  <img src="/assets/ico-member.png" alt="member icon" />
                </button>
              </>
            )}
          </ul>
        </nav>
      </div>
    </Container>
  );
};

export default TopNavigation;

const WideButton = ({
  label,
  onClick,
}: {
  label: any;
  onClick: (e?: any) => void;
}) => (
  <li className="block pl-2 mb-1 sm:border-0">
    <button
      className="text-sm sm:text-center rounded-md sm:px-2 py-2 w-max flex items-center "
      onClick={onClick}
    >
      {label}
    </button>
  </li>
);
