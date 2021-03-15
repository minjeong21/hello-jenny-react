import { generatePath } from "react-router";

const LEVEL_PATH_WITH_NUMID = "/level/:level/:numid";
const LEVEL_PATH = "/level/:level";
const THEME_PATH_WITH_NUMID = "/theme/:theme/:numid";
const THEME_PATH = "/theme/:theme";
const RANDOM_PATH = "/random/:numid";

export const generateLevelPath = (level: string, numid?: number) => {
  return numid
    ? generatePath(LEVEL_PATH_WITH_NUMID, {
        level: level,
        numid: numid,
      })
    : generatePath(LEVEL_PATH, {
        level: level,
      });
};

export const generateThemePath = (theme: string, numid?: number) => {
  return numid
    ? generatePath(THEME_PATH_WITH_NUMID, {
        theme: theme,
        numid: numid,
      })
    : generatePath(THEME_PATH, {
        theme: theme,
      });
};

export const generateRandomPath = (numid: number) => {
  return generatePath(RANDOM_PATH, {
    numid: numid,
  });
};
