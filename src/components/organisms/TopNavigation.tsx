import { useEffect, useState, Fragment, useContext } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
// import { MenuIcon, XIcon } from "@heroicons/react/outline";

import PathManager from "utils/PathManager";
import IWriting from "interface/IWriting";
import { useHistory } from "react-router-dom";
import { levelMenus, themeMenus } from "../../properties/Menu";

const TopNavigation = ({ writings }: { writings: IWriting[] | null }) => {
  const pathManager = new PathManager(useHistory());
  const [thiswritings, setThiswritings] = useState<IWriting[]>([]);

  useEffect(() => {
    if (writings) {
      setThiswritings(writings);
    }
  }, [writings]);

  const moveThemeWriting = (theme: string) => {
    pathManager.goThemePath(theme);
  };
  const moveRandomWriting = () => {
    if (writings) {
      pathManager.goRandomPath(writings);
    } else {
      alert("새로고침 후 다시 시도해주세요.");
    }
  };
  return (
    <header>
      <div className="flex shadow-underline w-40 h-3 bg-gradient-to-br f">
        <a href="/">
          <img src="/logo.png" width="200px" />
        </a>
        <div>
          <div>
            <a onClick={moveRandomWriting}>Random</a>
            <a onClick={() => moveThemeWriting("friend")}>친구 테마</a>
          </div>
          <Menu>
            <Menu.Button>More</Menu.Button>
            <Menu.Button>More</Menu.Button>
            <Menu.Button>More</Menu.Button>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
