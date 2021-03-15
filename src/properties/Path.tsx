import { generatePath } from "react-router";

const LEVEL_PATH = "/level/:level/:numid";
const THEME_PATH = "/theme/:theme/:numid";
const RANDOM_PATH = "/random/:numid";

export const generateLevelPath = (level: string, numid: number) => {
  return generatePath(LEVEL_PATH, {
    level: level,
    numid: numid,
  });
};

export const generateThemePath = (theme: string, numid: number) => {
  return generatePath(THEME_PATH, {
    theme: theme,
    numid: numid,
  });
};

export const generateRandomPath = (numid: number) => {
  return generatePath(RANDOM_PATH, {
    numid: numid,
  });
};
