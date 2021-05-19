import PathManager from "utils/PathManager";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useStores } from "states/Context";
import { useState } from "react";
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
  const { writingStore } = useStores();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const goNextWriting = (e: any) => {
    pathManager.goNextWriting(e, writingStore.getNextWritingId());
    toggleMenu();
  };
  const goSpeacking = () => {
    pathManager.goSpeakingPath(writingStore.getNextWritingId());
    toggleMenu();
  };

  return (
    <Container className="absolute top-0 w-full ">
      <div className="md:p-4 md:min-h-0">
        <nav className="flex md:p-4 items-center relative justify-between">
          <div className="text-lg font-bold">
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
          <ul className="md:hidden">
            <HamberMenu open={open} toggleMenu={toggleMenu} />
          </ul>
          <ul
            className={`md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative fade-in-box  ${
              open
                ? "bg-white top-full right-0  w-1/2 rounded-lg shadow-lg"
                : "hidden"
            }  
            `}
          >
            <WideButton onClick={(e) => goNextWriting(e)} label={"영작 연습"} />
            <WideButton onClick={goSpeacking} label={"스피킹 연습"} />
          </ul>
        </nav>
      </div>
    </Container>
  );
};

export default TopNavigation;

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

const WideButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: (e?: any) => void;
}) => (
  <li className="block active:border-purple-light hover:bg-grey-lighter border-l-4 pl-2 mb-1 md:border-0">
    <button
      className="text-left md:text-center rounded-md md:px-4 py-2 font-semibold text-gray-600 w-max"
      onClick={onClick}
    >
      {label}
    </button>
  </li>
);
