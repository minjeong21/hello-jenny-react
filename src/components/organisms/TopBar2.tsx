import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Anchor,
  Box,
  Grommet,
  Header,
  Menu,
  Image,
  ResponsiveContext,
  Text,
} from "grommet";
import {
  generateRandomPath,
  generateLevelPath,
  generateThemePath,
  getNextRandomNum,
} from "properties/Path";
import IWriting from "interface/IWriting";
import { defaultTheme } from "../../theme";
import { levelMenus, themeMenus } from "../../properties/Menu";
import { Menu as MenuIcon } from "grommet-icons/icons";
import { fetchMainWritingList } from "apis/WritingApi";
import styled from "styled-components";

const TopContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  padding: 0 3% 0 3%;
`

const TopSelection = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`

const TopSelectionButton = styled.button`
  background-color: transparent;
  color: black;
  font-size: 15px;
  border: 0;
  outline: 0;
  margin: 0 10px 0 10px;
`


const TopBar2 = ({ writingList }: { writingList?: IWriting[] }) => {
  const history = useHistory();
  const [thisWritingList, setThisWritingList] = useState<IWriting[]>([]);

  useEffect(() => {
    if (writingList) {
      setThisWritingList(writingList);
    } else {
      fetchWritingList();
    }
  }, [writingList]);

  const fetchWritingList = async () => {
    const writingList = await fetchMainWritingList();
    setThisWritingList(writingList);
  };

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
    <Grommet theme={defaultTheme}>
      <ResponsiveContext.Consumer>
        {(size) =>
          size === "small" ? (
            <Header background="white" pad={{ top: "medium" }} direction="row" style={{display:"flex", flexFlow: "row nowrap", justifyContent: "space-between"}}>
              <Anchor href="/" margin="small">
                <Image src="/logo.svg" width="200px" />
              </Anchor>
              <Box justify="end" direction="row" gap="medium">
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
              </Box>
            </Header>
          ) : (
            <div style={{backgroundColor:"#faf8f8"}}>
              <Header
                background="white"
                pad={{ top: "medium" }}
                direction="row"
              >
                <TopContainer>
                  <Anchor href="/" margin="small">
                    <Image src="/logo.svg" width="200px" />
                  </Anchor>
                  <TopSelection>
                    <TopSelectionButton>Go Writing</TopSelectionButton>
                    <TopSelectionButton>Go Reading</TopSelectionButton>
                    <TopSelectionButton>Go Speaking</TopSelectionButton>
                    <TopSelectionButton>About us</TopSelectionButton>
                  </TopSelection>
                </TopContainer>
                
              </Header>
              <div style={{margin: 60, marginLeft: 100}}>
                <Box
                  justify="start"
                  direction="row"
                  gap="medium"
                  align="center"
                  color="#333333"
                  style={{marginRight:30}}
                >
                <Box width="100px">
                  <Anchor
                    onClick={moveRandomWriting}
                    label="Random"
                    weight="normal"
                    color="dark-1"
                  />
                </Box>
                <Menu
                  a11yTitle="Navigation Menu"
                  label="Theme"
                  items={getArrayMenu("theme", moveThemeWriting)}
                  color="dark-1"
                />
                <Menu
                  a11yTitle="Navigation Menu"
                  label="Level"
                  items={getArrayMenu("level", moveLevelWriting)}
                  color="dark-1"
                />
              </Box>
            </div>
          </div>
          )
        }
      </ResponsiveContext.Consumer>
    </Grommet>
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
    <Box pad={{ left: "4px", right: "4px" }}>
      <Text size="small">
        {isSmallView ? "> " : null}
        {text}
      </Text>
    </Box>
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
    label: <Box pad="small">랜덤 문제</Box>,
    onClick: moveNextRandom,
  });

  // 레벨 문제
  resultMenu.push({
    label: <Box pad="small">Level 문제</Box>,
    onClick: moveNextRandom,
  });
  const levelMenus = getArrayMenu("level", moveLevelWriting, true);
  levelMenus.map((item) => resultMenu.push(item));

  // 테마 문제
  resultMenu.push({
    label: <Box pad="small">테마 문제</Box>,
    onClick: moveNextRandom,
  });

  const themeMenus = getArrayMenu("theme", moveThemeWriting, true);
  themeMenus.map((item) => resultMenu.push(item));

  return resultMenu;
};

export default TopBar2;
