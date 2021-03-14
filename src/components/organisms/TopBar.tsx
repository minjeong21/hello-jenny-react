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

const list = [
  1,
  2,
  3,
  4,
  5,
  6,
  63,
  7,
  59,
  60,
  61,
  62,
  64,
  12,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  43,
  46,
  47,
  48,
  53,
];

// src/components/organisms/TopBar.tsx

const levelMenus = [
  {
    text: "아주 짧아요 👶",
    level: "level1",
  },
  { text: "조금 문장같아요 🤭", level: "level2" },
  { text: "조금 복잡해요 😇", level: "level3" },
];
const themeMenus = [
  { text: "친구만들기 🙋🏻‍♀️", theme: "friend" },
  { text: "애인 만들기 💕", theme: "love" },
  { text: "비즈니스 영어 👔", theme: "business" },
  { text: "영화 속 대사 🍿", theme: "movie" },
  { text: "팝송 부르자 🎙", theme: "song" },
  { text: "초등학생 영어 🧚🏻‍♂️", theme: "elementary" },
];

const TopBar = () => {
  return (
    <Grommet theme={defaultTheme}>
      <Header background="white" pad="medium" height="xsmall">
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
                    items={[
                      {
                        label: <Box pad="small">랜덤 문제</Box>,
                        href: getRandomLink(),
                      },
                      {
                        label: <Box pad="small">Level 문제</Box>,
                        href: "#",
                      },
                      {
                        label: (
                          <MenuLabel text={levelMenus[0].text} isSmallView />
                        ),
                        href: getLevelLink(levelMenus[0].level),
                      },
                      {
                        label: (
                          <MenuLabel text={levelMenus[1].text} isSmallView />
                        ),
                        href: getLevelLink(levelMenus[1].level),
                      },
                      {
                        label: (
                          <MenuLabel text={levelMenus[2].text} isSmallView />
                        ),
                        href: getLevelLink(levelMenus[2].level),
                      },
                      {
                        label: <Box pad="small">테마 문제</Box>,
                        href: "#",
                      },

                      {
                        label: (
                          <MenuLabel text={themeMenus[0].text} isSmallView />
                        ),
                        href: getThemeLink(themeMenus[0].theme),
                      },
                      {
                        label: (
                          <MenuLabel text={themeMenus[1].text} isSmallView />
                        ),
                        href: getThemeLink(themeMenus[1].theme),
                      },
                      {
                        label: (
                          <MenuLabel text={themeMenus[2].text} isSmallView />
                        ),
                        href: getThemeLink(themeMenus[2].theme),
                      },
                      {
                        label: (
                          <MenuLabel text={themeMenus[3].text} isSmallView />
                        ),
                        href: getThemeLink(themeMenus[3].theme),
                      },
                      {
                        label: (
                          <MenuLabel text={themeMenus[4].text} isSmallView />
                        ),
                        href: getThemeLink(themeMenus[4].theme),
                      },
                      {
                        label: (
                          <MenuLabel text={themeMenus[5].text} isSmallView />
                        ),
                        href: getThemeLink(themeMenus[5].theme),
                      },
                    ]}
                  />
                </Box>
              </>
            ) : (
              <>
                <Anchor href="/" label="Hello, Jennie." color="#030303" />

                <Anchor href="/">
                  <Image src="/logo.png" width="120px" height="40px" />
                </Anchor>
                <Box justify="end" direction="row" gap="medium" align="center">
                  <Anchor
                    href={getRandomLink()}
                    label="랜덤 문제"
                    weight="normal"
                  />
                  <Menu
                    a11yTitle="Navigation Menu"
                    label="레벨별"
                    items={[
                      {
                        label: <MenuLabel text={levelMenus[0].text} />,
                        href: getLevelLink(levelMenus[0].level),
                      },
                      {
                        label: <MenuLabel text={levelMenus[1].text} />,
                        href: getLevelLink(levelMenus[1].level),
                      },
                      {
                        label: <MenuLabel text={levelMenus[2].text} />,
                        href: getLevelLink(levelMenus[2].level),
                      },
                    ]}
                  />
                  <Menu
                    a11yTitle="Navigation Menu"
                    label="테마별"
                    items={[
                      {
                        label: <MenuLabel text={themeMenus[0].text} />,
                        href: getThemeLink(themeMenus[0].theme),
                      },
                      {
                        label: <MenuLabel text={themeMenus[1].text} />,
                        href: getThemeLink(themeMenus[1].theme),
                      },
                      {
                        label: <MenuLabel text={themeMenus[2].text} />,
                        href: getThemeLink(themeMenus[2].theme),
                      },
                      {
                        label: <MenuLabel text={themeMenus[3].text} />,
                        href: getThemeLink(themeMenus[3].theme),
                      },
                      {
                        label: <MenuLabel text={themeMenus[4].text} />,
                        href: getThemeLink(themeMenus[4].theme),
                      },
                      {
                        label: <MenuLabel text={themeMenus[5].text} />,
                        href: getThemeLink(themeMenus[5].theme),
                      },
                    ]}
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

const getRandomLink = () => {
  const ranmdomNumber = Math.floor(Math.random() * 100) % list.length;
  const randomLink = `practice?numid=${list[ranmdomNumber]}`;
  return randomLink;
};
const getLevelLink = (theme: string) => {
  const ranmdomNumber = Math.floor(Math.random() * 100) % list.length;
  const randomLink = `practice?numid=${list[ranmdomNumber]}`;
  return `${randomLink}&level=${theme}`;
};

const getThemeLink = (level: string) => {
  const ranmdomNumber = Math.floor(Math.random() * 100) % list.length;
  const randomLink = `practice?numid=${list[ranmdomNumber]}`;
  return `${randomLink}&theme=${level}`;
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

export default TopBar;
