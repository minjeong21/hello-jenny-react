import { generatePath } from "react-router";

const Path = {
  PROFILE: "/profile/",
  LOGIN: "/signin/",
  REGISTER: "/signup/",
  WRITING_DETAIL: "/writing/:numid/",
  SPEACKING: "/speaking/:numid/",
  WRITING_BASE: "/writing/",
};
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
    return this.history.push(generatePath(Path.WRITING_BASE));
  };

  goNextWriting = (e: any, writingId: number) => {
    e.preventDefault();
    this.history.push(
      generatePath(Path.WRITING_DETAIL, {
        numid: writingId,
      })
    );
  };

  goUserProfile = (e: any) => {
    e.preventDefault();
    this.history.push(Path.PROFILE);
  };

  goSignIn = (e: any) => {
    e.preventDefault();
    this.history.push(Path.LOGIN);
  };
  goReigster = (e: any) => {
    e.preventDefault();
    this.history.push(Path.REGISTER);
  };

  goSpeakingPath = (numid: number) => {
    this.history.push(
      generatePath(Path.SPEACKING, {
        numid: numid,
      })
    );
  };
}

export default MovePath;
