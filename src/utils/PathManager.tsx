import IWriting from "interface/IWriting";
import { generatePath } from "react-router";

const LEVEL_PATH_WITH_NUMID = "/level/:level/:numid";
const LEVEL_PATH = "/level/:level";
const THEME_PATH_WITH_NUMID = "/theme/:theme/:numid";
const THEME_PATH = "/theme/:theme";
const RANDOM_PATH = "/writing/:numid";
const SPEACKING_PATH = "/speaking/:numid";
const WRITING_BASE_PATH = "/writing";

class MovePath {
  history: any;
  currentId: number;

  constructor(history: any, currentId?: number) {
    this.history = history;
    this.currentId = currentId ? currentId : 0;
  }

  setCurrentId = (id: number) => {
    this.currentId = id;
  };

  goLevelPath = (level: string, numid?: number) => {
    const path = numid
      ? generatePath(LEVEL_PATH_WITH_NUMID, {
          level: level,
          numid: numid,
        })
      : generatePath(LEVEL_PATH, {
          level: level,
        });
    this.history.push(path);
  };

  goWritingPage = () => {
    return this.history.push(generatePath(WRITING_BASE_PATH));
  };

  getThemePath = (theme: string, numid?: number) => {
    const path = numid
      ? generatePath(THEME_PATH_WITH_NUMID, {
          theme: theme,
          numid: numid,
        })
      : generatePath(THEME_PATH, {
          theme: theme,
        });
    return path;
    // this.history.push(path);
  };

  goRandomPath = (writings: IWriting[]) => {
    const randomNumber = Math.floor(Math.random() * 100) % writings.length;
    const randomId = writings[randomNumber].id;
    this.history.push(
      generatePath(RANDOM_PATH, {
        numid: randomId,
      })
    );
  };

  getSpeakingPath = (numid: number) => {
    return generatePath(SPEACKING_PATH, {
      numid: numid,
    });
  };
}

export default MovePath;
