import PathManager from "utils/PathManager";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useStores } from "states/Context";
import { useState } from "react";
const Container = styled.nav`
  @media only screen and (min-width: 768px) {
    .parent:hover .child {
      opacity: 1;
      height: auto;
      overflow: none;
      transform: translateY(0);
    }
    .child {
      opacity: 0;
      height: 0;
      overflow: hidden;
      transform: translateY(-10%);
    }
  }
`;

const TopNavigation = () => {
  const pathManager = new PathManager(useHistory());
  const { writingStore } = useStores();

  const goNextWriting = (e: any) => {
    pathManager.goNextWriting(e, writingStore.getNextWritingId());
  };

  return (
    <Container className="absolute top-0 w-full">
      <div className="md:p-4 md:min-h-0">
        <nav className="flex md:p-4 p-2 items-center relative justify-between">
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
            <HamberMenu />
          </ul>
          <ul className="md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0 hidden md:block">
            <li className="self-center">
              <button
                onClick={goNextWriting}
                className="rounded-md px-4 py-2 font-semibold text-gray-600  px-4 py-2"
              >
                영작 연습
              </button>
            </li>

            <li className="self-center">
              <Link
                to={pathManager.getSpeakingPath(1)}
                className="rounded-md px-4 py-2 font-semibold text-gray-600  px-4 py-2"
              >
                스피킹 연습
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Container>
  );
};

export default TopNavigation;

const HamberMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-gray-100 flex flex-col justify-center ">
      <div className="relative sm:max-w-xl mx-auto">
        <nav x-data="{ open: false }">
          <button
            className="text-gray-500 w-10 h-10 relative focus:outline-none bg-white"
            onClick={() => setOpen(!open)}
          >
            <div className="block w-5 absolute left-1/2 top-1/2   transform  -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                  open ? "rotate-45" : " -translate-y-1.5"
                }`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out ${
                  open ? "opacity-0" : ""
                }`}
              ></span>
              <span
                aria-hidden="true"
                className={`block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              ></span>
            </div>
          </button>
        </nav>
      </div>
    </div>
  );
};
