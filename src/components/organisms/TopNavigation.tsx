import { Popover, Transition, Menu } from "@headlessui/react";
import PathManager from "utils/PathManager";
import IWriting from "interface/IWriting";
import { useHistory } from "react-router-dom";
import { levelMenus, themeMenus } from "../../properties/Menu";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import styled from "styled-components";
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

const TopNavigation = ({ writings }: { writings: IWriting[] | null }) => {
  const pathManager = new PathManager(useHistory());

  const moveRandomWriting = () => {
    if (writings) {
      pathManager.goRandomPath(writings);
    } else {
      alert("새로고침 후 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <div className="p-4 bg-white min-h-screen md:min-h-0 border-b ">
        <nav className="flex px-4 items-center relative">
          <div className="text-lg font-bold md:py-0 py-4">
            <img
              src="/logo.png"
              width="200"
              height="100"
              alt="Hello Jenny Logo"
              title="Hello Jenny Logo"
            />
          </div>
          <ul className="md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0">
            <li className="self-center">
              <a
                onClick={moveRandomWriting}
                className="rounded-md px-4 py-2 font-semibold text-gray-600  px-4 py-2"
              >
                랜덤 영작
              </a>
            </li>

            <li className="relative parent">
              <a
                href="#"
                className="flex justify-between md:inline-flex p-4 items-center hover:bg-gray-50 space-x-2"
              >
                <span>테마로 영작</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-current pt-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
                </svg>
              </a>
              <ul className="child transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:rounded-b ">
                {themeMenus.map((theme, index) => (
                  <li key={index}>
                    <a
                      onClick={() => pathManager.goThemePath(theme.value)}
                      className="flex px-4 py-3 hover:bg-gray-50"
                    >
                      {theme.text}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li className="relative parent">
              <a
                href="#"
                className="flex justify-between md:inline-flex p-4 items-center hover:bg-gray-50 space-x-2"
              >
                <span>레벨맞춰 영작</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 fill-current pt-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
                </svg>
              </a>
              <ul className="child transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:rounded-b ">
                {levelMenus.map((item, index) => (
                  <li key={index}>
                    <a
                      onClick={() => pathManager.goThemePath(item.value)}
                      className="flex px-4 py-3 hover:bg-gray-50"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <div className="ml-auto md:hidden text-gray-500 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
          </div>
        </nav>
      </div>
    </Container>
  );
};

export default TopNavigation;
