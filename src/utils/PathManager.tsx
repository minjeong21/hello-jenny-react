import { generatePath } from "react-router";
const THEME_PATH = "/theme/:theme/";
const WRITING_PATH = "/writing/:numid/";
const SPEACKING_PATH = "/speaking/:numid/";
const WRITING_BASE_PATH = "/writing/";

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

  goWritingPage = () => {
    return this.history.push(generatePath(WRITING_BASE_PATH));
  };

  goNextWriting = (e: any, writingId: number) => {
    e.preventDefault();
    this.history.push(
      generatePath(WRITING_PATH, {
        numid: writingId,
      })
    );
  };

  goSpeakingPath = (numid: number) => {
    this.history.push(
      generatePath(SPEACKING_PATH, {
        numid: numid,
      })
    );
  };
}

export default MovePath;
