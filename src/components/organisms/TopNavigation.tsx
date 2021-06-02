import PathManager from "utils/PathManager";
import { useState } from "react";
import { useStores } from "states/Context";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
const Container = styled.nav`

  .fade-in-box {
    animation: fadein 0.2s;
  }
  @keyframes fadein {
    from {
      opacity: 0;
      transform: translateY(-15%);
      t
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const TopNavigation = () => {
  const pathManager = new PathManager(useHistory());
  const { writingStore, profileStore } = useStores();
  const [openMenu, setMenuOpen] = useState(false);
  const [openProfile, setProfileOpen] = useState(false);
  const [loggined, setLoggined] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!openMenu);
  };

  const goNextWriting = (e: any) => {
    pathManager.goNextWriting(e, writingStore.getNextWritingId());
    toggleMenu();
  };
  const goSpeacking = () => {
    pathManager.goSpeakingPath(writingStore.getNextWritingId());
    toggleMenu();
  };

  const isSignPage = () => {
    return window.location.href.includes("signin");
  };
  console.log(profileStore.getToken());
  return (
    <Container className="absolute top-0 w-full ">
      <div className="sm:p-4 sm:min-h-0">
        <nav className="flex sm:p-4 px-2 items-center relative justify-between z-10">
          <div className="text-lg font-bold sm:block hidden">
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
          <div className="text-lg font-bold sm:hidden block">
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
          {/* <ul className="sm:hidden">
            <HamberMenu open={openMenu} toggleMenu={toggleMenu} />
          </ul> */}
          <ul className="sm:px-2 ml-0 ml-auto flex space-x-2  fade-in-box">
            <WideButton onClick={(e) => goNextWriting(e)} label={"영작 연습"} />
            <WideButton onClick={goSpeacking} label={"스피킹 연습"} />
          </ul>
          {profileStore.isLogined() ? (
            <>
              <button
                onClick={(e) => pathManager.goUserProfile(e)}
                className="flex ml-3 text-gray-400 text-sm border-2 border-white
            rounded-full focus:outline-none focus:border-gray-300 transition
            duration-150 ease-in-out"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  alt="user avatar"
                  src="https://d1telmomo28umc.cloudfront.net/media/public/avatars/congchu-avatar.jpg"
                />
              </button>
              {openProfile ? <div>hello</div> : null}
            </>
          ) : (
            <>
              {!isSignPage() && (
                <button
                  onClick={(e) => pathManager.goSignIn(e)}
                  className="bg-primary-700 text-white font-bold ml-2 py-2 px-3 rounded shadow-sm"
                >
                  SignIn
                </button>
              )}
            </>
          )}
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
      className="text-left sm:text-center rounded-md sm:px-4 py-2 font-semibold text-gray-600 w-max"
      onClick={onClick}
    >
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
