import PathManager from "utils/PathManager";
import { useState } from "react";
import { useStores } from "states/Context";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
const Container = styled.nav`
  min-width: 320px;
`;

const TopNavigation = () => {
  const pathManager = new PathManager(useHistory());
  const { writingStore, userStore } = useStores();
  const [openMenu, setMenuOpen] = useState(false);
  const [openUserMenu, setProfileOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!openMenu);
  };

  const goNextWriting = (e: any) => {
    pathManager.goNextWriting(e, writingStore.getNextWritingId());
    toggleMenu();
  };
  const goSpeaking = () => {
    pathManager.goSpeakingPath(writingStore.getNextWritingId());
    toggleMenu();
  };

  return (
    <Container className="absolute top-0 w-screen">
      <div className="sm:min-h-0">
        <nav className="flex sm:p-3 px-2 items-center relative justify-between z-10">
          <div className="font-bold sm:block hidden">
            <a href="/">
              <img
                src="/logo2.png"
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
                src="/logo192.png"
                width="50"
                height="50"
                alt="Hello Jenny Logo"
                title="Hello Jenny Logo"
              />
            </a>
          </div>
          <ul className="sm:px-2 ml-0 ml-auto flex space-x-2 items-center">
            <WideButton onClick={(e) => goNextWriting(e)} label={"영작 연습"} />
            <WideButton onClick={goSpeaking} label={"스피킹 연습"} />
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
                      {userStore.getUser()?.username}
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
  label: string;
  onClick: (e?: any) => void;
}) => (
  <li className="block pl-2 mb-1 sm:border-0">
    <button
      className="text-sm sm:text-center rounded-md sm:px-2 py-2 w-max flex items-center "
      onClick={onClick}
    >
      {label === "영작 연습" ? (
        <img
          className="w-8 h-5"
          src="https://banner2.cleanpng.com/20190716/fza/kisspng-computer-icons-scalable-vector-graphics-encapsulat-first-year-writing-the-writing-program-at-john-j-5d2e690f829e47.294590941563322639535.jpg"
        />
      ) : (
        <img
          className="w-8 h-8"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPwAuhUQV982DREwJV7gHKHt_p22QOrOwke0nFz9657dGgCJa--OEpeALlyu7t_gjLxGE&usqp=CAU"
        />
      )}

      {label}
    </button>
  </li>
);

const HamberMenu = ({
  open,
  toggleMenu,
}: {
  open: boolean;
  toggleMenu: () => void;
}) => {
  return (
    <>
      <div className="bg-gray-100 flex flex-col justify-center rounded">
        <div className="relative sm:max-w-xl mx-auto">
          <nav x-data="{ open: false }">
            <button
              className="text-gray-500 w-9 h-9 relative focus:outline-none bg-white rounded"
              onClick={toggleMenu}
            >
              <div className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
                <span
                  aria-hidden="true"
                  className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                    open ? "rotate-45" : " -translate-y-1.5"
                  }`}
                ></span>
                <span
                  aria-hidden="true"
                  className={`block absolute  h-0.5 w-5 bg-current   transform transition duration-200 ease-in-out ${
                    open ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  aria-hidden="true"
                  className={`block absolute  h-0.5 w-5 bg-current transform  transition duration-200 ease-in-out ${
                    open ? "-rotate-45" : "translate-y-1.5"
                  }`}
                ></span>
              </div>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};
