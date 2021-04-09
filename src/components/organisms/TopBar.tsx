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
import { defaultTheme } from "../../theme";
import { levelMenus, themeMenus } from "../../properties/Menu";
import { Menu as MenuIcon } from "grommet-icons/icons";

// src/components/organisms/TopBar.tsx
interface IProps {
  moveRandomWriting: () => void;
  moveLevelWriting: (theme: string) => void;
  moveThemeWriting: (level: string) => void;
}
const TopBar = ({
  moveRandomWriting,
  moveLevelWriting,
  moveThemeWriting,
}: IProps) => {
  return (
    <Grommet theme={defaultTheme}>
      <ResponsiveContext.Consumer>
        {(size) =>
          size === "small" ? (
            <Header background="white" pad={{ top: "medium" }} direction="row">
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
            <Header
              background="white"
              pad={{ top: "medium" }}
              direction="column"
            >
              <Anchor href="/" margin="small">
                <Image src="/logo.svg" width="200px" />
              </Anchor>
              <Box
                justify="end"
                direction="row"
                gap="medium"
                align="center"
                color="#333333"
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
            </Header>
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

export default TopBar;
