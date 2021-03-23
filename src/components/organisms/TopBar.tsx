import React, { useState, useEffect } from "react";
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

// src/components/organisms/TopBar.tsx
interface IProps {
  moveRandomPractice: () => void;
  moveLevelPractice: (theme: string) => void;
  moveThemePractice: (level: string) => void;
}
const TopBar = ({
  moveRandomPractice,
  moveLevelPractice,
  moveThemePractice,
}: IProps) => {
  return (
    <Grommet theme={defaultTheme}>
      <Header background="white" pad={{ top: "medium" }} direction="column">
        <ResponsiveContext.Consumer>
          {(size) =>
            size === "small" ? (
              <>
                <Anchor href="/" label="Hello, Jennie." color="#030303" />
                <Anchor href="/">
                  <Image src="/logo.png" width="120px" height="40px" />
                </Anchor>
                <Box justify="end" direction="row" gap="medium">
                  <Menu
                    a11yTitle="Navigation Menu"
                    dropProps={{ align: { top: "bottom", right: "right" } }}
                    items={getArrayMenuAll(
                      moveRandomPractice,
                      moveLevelPractice,
                      moveThemePractice
                    )}
                  />
                </Box>
              </>
            ) : (
              <>
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
                      onClick={moveRandomPractice}
                      label="Random"
                      weight="normal"
                      color="dark-1"
                    />
                  </Box>
                  <Menu
                    a11yTitle="Navigation Menu"
                    label="Theme"
                    items={getArrayMenu("theme", moveThemePractice)}
                    color="dark-1"
                  />
                  <Menu
                    a11yTitle="Navigation Menu"
                    label="Level"
                    items={getArrayMenu("level", moveLevelPractice)}
                    color="dark-1"
                  />
                </Box>
              </>
            )
          }
        </ResponsiveContext.Consumer>
      </Header>
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
  console.log(type);
  console.log(menuList);
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
  moveLevelPractice: (value: string) => void,
  moveThemePractice: (value: string) => void
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
  const levelMenus = getArrayMenu("level", moveLevelPractice, true);
  levelMenus.map((item) => resultMenu.push(item));

  // 테마 문제
  resultMenu.push({
    label: <Box pad="small">테마 문제</Box>,
    onClick: moveNextRandom,
  });

  const themeMenus = getArrayMenu("theme", moveThemePractice, true);
  themeMenus.map((item) => resultMenu.push(item));

  return resultMenu;
};

export default TopBar;
