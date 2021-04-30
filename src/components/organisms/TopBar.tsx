import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  generateRandomPath,
  generateLevelPath,
  generateThemePath,
  getNextRandomNum,
} from "utils/Path";
import IWriting from "interface/IWriting";
import { levelMenus, themeMenus } from "../../properties/Menu";

const TopBar = ({ writingList }: { writingList?: IWriting[] }) => {
  const history = useHistory();
  const [thisWritingList, setThisWritingList] = useState<IWriting[]>([]);

  useEffect(() => {
    if (writingList) {
      setThisWritingList(writingList);
    }
  }, [writingList]);

  const moveLevelWriting = (level: string) => {
    history.push(generateLevelPath(level));
  };

  const moveThemeWriting = (theme: string) => {
    history.push(generateThemePath(theme));
  };
  const moveRandomWriting = () => {
    if (thisWritingList) {
      const randomNumber = getNextRandomNum(thisWritingList.length);
      history.push(generateRandomPath(thisWritingList[randomNumber].id));
    } else {
      alert("새로고침 후 다시 시도해주세요.");
    }
  };
  return (
    <header>
      <a href="/">
        <img src="/logo.png" width="200px" />
      </a>
      <div>
        <div>
          <a onClick={moveRandomWriting}>Random</a>
        </div>
        {/* getArrayMenu("theme", moveThemeWriting) */}
        {/* getArrayMenu("level", moveLevelWriting) */}
      </div>
    </header>
  );
};

const MenuLabel = ({
  text,
  isSmallView,
}: {
  text: string;
  isSmallView?: boolean;
}) => {
  return (
    <div>
      <div>
        {isSmallView ? "> " : null}
        {text}
      </div>
    </div>
  );
};

const getArrayMenu = (
  type: "level" | "theme",
  getLink: any,
  isSmallView?: boolean
) => {
  const menuList = type === "level" ? levelMenus : themeMenus;
  let resultMenu: { label: any; onClick: any }[] = [];

  if (isSmallView) {
    menuList.map((item) =>
      resultMenu.push({
        label: <MenuLabel text={item.text} isSmallView />,
        onClick: () => getLink(item.value),
      })
    );
  } else {
    menuList.map((item) =>
      resultMenu.push({
        label: <MenuLabel text={item.text} />,
        onClick: () => getLink(item.value),
      })
    );
  }

  return resultMenu;
};

const getArrayMenuAll = (
  moveNextRandom: any,
  moveLevelWriting: (value: string) => void,
  moveThemeWriting: (value: string) => void
) => {
  let resultMenu: { label: any; onClick: any }[] = [];
  resultMenu.push({
    label: <div>랜덤 문제</div>,
    onClick: moveNextRandom,
  });

  // 레벨 문제
  resultMenu.push({
    label: <div>Level 문제</div>,
    onClick: moveNextRandom,
  });
  const levelMenus = getArrayMenu("level", moveLevelWriting, true);
  levelMenus.map((item) => resultMenu.push(item));

  // 테마 문제
  resultMenu.push({
    label: <div>테마 문제</div>,
    onClick: moveNextRandom,
  });

  const themeMenus = getArrayMenu("theme", moveThemeWriting, true);
  themeMenus.map((item) => resultMenu.push(item));

  return resultMenu;
};

export default TopBar;

{
  /* <header background="white" pad={{ top: "medium" }} direction="row">
<a href="/" margin="small">
  <Image src="/logo.svg" width="200px" />
</a>
<div justify="end" direction="row" gap="medium">
  <Menu
    icon={<MenuIcon />}
    a11yTitle=" Menu"
    dropProps={{ align: { top: "bottom", right: "right" } }}
    items={getArrayMenuAll(
      moveRandomWriting,
      moveLevelWriting,
      moveThemeWriting
    )}
  />
</div>
</header> */
}
