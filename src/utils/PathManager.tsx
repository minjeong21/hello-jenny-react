import { generatePath } from "react-router";

const Path = {
  HOME: "/",
  PROFILE: "/profile/",
  LOGIN: "/signin/",
  REGISTER: "/signup/",
  WRITING_DETAIL: "/writing/:numid/",
  WRITING_DETAIL_THEME: "/writing/:numid/?theme=:theme",
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

  goHome = () => {
    return this.history.push(Path.HOME);
  };
  goWritingPage = () => {
    return this.history.push(Path.WRITING_BASE);
  };

  goNextWriting = (e: any, writingId: number) => {
    e.preventDefault();
    this.history.push(
      generatePath(Path.WRITING_DETAIL, {
        numid: writingId,
      })
    );
  };

  goWritingWithTheme = (e: any, writingId: number, theme: string) => {
    e.preventDefault();
    this.history.push(
      generatePath(Path.WRITING_DETAIL_THEME, {
        numid: writingId,
        theme: theme,
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
