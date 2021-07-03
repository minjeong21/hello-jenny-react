import { makeObservable, observable, runInAction, toJS } from "mobx";
import ITheme from "interface/ITheme";
import IWriting from "interface/IWriting";

import {
  fetchDoneWritingsByTheme,
  fetchThemeList,
  fetchWritingByNumId,
  fetchWritingsByTheme,
} from "apis/WritingApi";
import PathManager from "utils/PathManager";
import Writing from "utils/Writing";
import SessionStorage from "utils/SessionStorage";
import IVisitedTheme from "interface/IvisitedTheme";

export class WritingStore {
  rootStore;
  writings: IWriting[] | null;
  themes: ITheme[] | null;
  currentWriting: Writing | null;
  currentIndex: number;
  currentLevel: number;
  currentTheme: ITheme | null;
  isNotFoundWriting: boolean;
  visitedThemes: IVisitedTheme[] | null;
  page: number;

  constructor(root: any) {
    makeObservable(this, {
      writings: observable,
      currentWriting: observable,
      themes: observable,
      currentLevel: observable,
      currentTheme: observable,
      isNotFoundWriting: observable,
      visitedThemes: observable,
    });
    this.isNotFoundWriting = false;
    this.rootStore = root;
    this.currentIndex = 0;
    this.writings = null;
    this.themes = null;
    this.currentWriting = null;
    this.currentLevel = 1;
    this.currentTheme = null;
    this.visitedThemes = null;
    this.page = 1;
  }

  findIndex = (writingId: number) => {
    if (this.writings) {
      for (let i = 0; i < this.writings?.length; i++) {
        if (this.writings[i].id === writingId) {
          return i + 1;
        }
      }
    } else {
      return 1;
    }
  };
  changeOrfetchWriting = (id: number) => {
    let targetWriting: IWriting | undefined;
    targetWriting = this.writings
      ? this.writings.find((item) => item.id === id)
      : undefined;
    if (targetWriting) {
      this.setWriting(targetWriting);
    } else {
      this.fetchWriting(id);
    }
  };

  fetchWriting = async (id: number) => {
    const response = await fetchWritingByNumId(id);
    runInAction(() => {
      if (response instanceof Error) {
        alert("다시 시도해주세요 🙏🏻");
      } else {
        if (response === 404) {
          this.isNotFoundWriting = true;
        } else {
          this.isNotFoundWriting = false;
          this.setWriting(response.data);
        }
      }
    });
  };

  fetchThemes = async () => {
    const response = await fetchThemeList();
    console.log(response);
    runInAction(() => {
      if (response instanceof Error) {
        console.log(response);
      } else {
        if (response === 404) {
          console.log(response);
        } else {
          this.setThemes(response.data);
        }
      }
    });
  };

  fetchActivityWritings = async (jwt: string) => {
    const response = await fetchDoneWritingsByTheme(jwt);
    runInAction(() => {
      if (response instanceof Error) {
        console.log(response);
      } else if (response.data && response.data.length > 0) {
        this.visitedThemes = response.data;
      } else {
        this.visitedThemes = [];
      }
    });
  };

  setWriting = (writing: any) => {
    runInAction(() => {
      this.setCurrentWriting(writing);
    });
  };

  fetchWritingsByTheme = async (theme_id: number, page?: number) => {
    let response = null;
    try {
      if (!page) {
        response = await fetchWritingsByTheme(theme_id);
        this.writings = response.data;
      } else {
        response = await fetchWritingsByTheme(theme_id, page);
        const writings = toJS(this.writings);
        if (writings) {
          this.writings = writings.concat(response.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  setThemes = (themes: ITheme[]) => {
    this.themes = themes;
  };
  setCurrentWriting = (writing: IWriting) => {
    this.currentWriting = new Writing(writing);
  };
  setWritings = (writings: IWriting[]) => {
    if (writings) {
      this.writings = Object.assign(writings);
    }
  };
  setCurrentIndex = (index: number) => {
    this.currentIndex = index;
  };

  getCurrentIndex = (id: number) => {
    if (this.writings && this.currentIndex === 0) {
      this.currentIndex = this.writings.findIndex((item) => item.id === id);
    }
    return this.currentIndex;
  };
  getWritingSize = () => {
    return this.writings?.length;
  };

  getOrFetchNextWritingId = async () => {
    // 영작문 리스트 없을때 Fetch
    if (!this.writings || this.writings.length === 0) {
      this.loadCurrentTheme();
      if (this.currentTheme) {
        await this.fetchWritingsByTheme(this.currentTheme.id);
        this.setCurrentIndex(this.currentIndex + 1);
      }
    }
    // 2문제 전에 fetch
    if (
      this.writings &&
      this.currentTheme &&
      this.currentTheme.count > this.writings.length &&
      this.writings.length > this.currentIndex + 3
    ) {
      await this.fetchWritingsByTheme(this.currentTheme.id, this.page + 1);
    }

    if (this.writings && this.writings.length > this.currentIndex + 1) {
      this.setCurrentIndex(this.currentIndex + 1);
      return this.writings[this.currentIndex].id;
    } else if (
      this.writings &&
      this.currentTheme &&
      this.currentTheme.count > this.writings.length
    ) {
      await this.fetchWritingsByTheme(this.currentTheme.id, this.page + 1);
      return this.writings[this.currentIndex].id;
    } else {
      return -1;
    }
  };

  moveWritingDetail = async (pathManager: PathManager, theme: ITheme) => {
    this.writings = null;
    let writing: IWriting;
    runInAction(() => {
      if (this.writings) {
        writing = this.writings[0];
        pathManager.goWritingWithTheme(writing.id, theme.name);
      }
    });
  };

  saveCurrentLevel = (level: number) => {
    this.currentLevel = level;
    SessionStorage.saveCurrentLevel(level);
  };
  saveCurrentTheme = (theme: ITheme) => {
    this.currentTheme = theme;
    SessionStorage.saveCurrentTheme(theme);
  };
  getCurrentLevel = () => {
    if (!this.currentLevel) {
      this.currentLevel = SessionStorage.loadCurrentLevel();
    }
    switch (this.currentLevel) {
      case 1:
        return "Easy";
      case 2:
        return "Medium";
      case 3:
        return "Advanced";
      default:
        return "Easy";
    }
  };
  loadCurrentTheme = () => {
    if (!this.currentTheme) {
      this.currentTheme = SessionStorage.loadCurrentTheme();
    }
  };
  getCurrentThemeDisplayName = () => {
    this.loadCurrentTheme();
    return this.currentTheme?.display_name;
  };
}
