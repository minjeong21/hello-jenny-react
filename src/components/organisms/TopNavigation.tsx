import PathManager from "utils/PathManager";
import IWriting from "interface/IWriting";
import { Link, useHistory } from "react-router-dom";
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

const TopNavigation = ({
  getNextWritingId,
  writings,
}: {
  getNextWritingId: () => number;
  writings: IWriting[] | null;
}) => {
  const pathManager = new PathManager(useHistory());

  const moveRandomWriting = (e: any) => {
    if (writings) {
      const nextWritingId = getNextWritingId();
      pathManager.goNextWriting(e, nextWritingId);
    } else {
      alert("새로고침 후 다시 시도해주세요.");
    }
  };

  // const goSpeaking = (e: any) => {
  //   if (writings) {
  //     const nextWritingId = getNextWritingId();
  //     pathManager.goNextWriting(e, nextWritingId);
  //   } else {
  //     alert("새로고침 후 다시 시도해주세요.");
  //   }
  // };

  return (
    <Container className="absolute top-0 w-full">
      <div className="p-4 bg-white md:min-h-0 border-b ">
        <nav className="flex px-4 items-center relative">
          <div className="text-lg font-bold md:py-0 py-4">
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
          <ul className="md:hidden">햄버거</ul>
          <ul className="md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0 hidden md:block">
            <li className="self-center">
              <button
                onClick={moveRandomWriting}
                className="rounded-md px-4 py-2 font-semibold text-gray-600  px-4 py-2"
              >
                영작 연습
              </button>
            </li>

            {/* <li className="relative parent">
              <button
                onClick={moveRandomWriting}
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
              </button>
              <ul className="child transition duration-300 md:absolute top-full right-0 md:w-48 bg-white md:rounded-b ">
                {THEME_MENU.map((theme, index) => (
                  <li key={index}>
                    <Link
                      to={pathManager.getThemePath(theme.value)}
                      className="flex px-4 py-3 hover:bg-gray-50"
                    >
                      {theme.text}
                    </Link>
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
                {LEVEL_MENU.map((item, index) => (
                  <li key={index}>
                    <a
                      onClick={() => pathManager.getThemePath(item.value)}
                      className="flex px-4 py-3 hover:bg-gray-50"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </li> */}

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
