import { makeObservable, observable, runInAction } from "mobx";
import ITheme from "interface/ITheme";
import IWriting from "interface/IWriting";

import {
  fetchRepWriting,
  fetchWritingByNumId,
  fetchWritingListFiltered,
} from "apis/WritingApi";
import PathManager from "utils/PathManager";
import Writing from "utils/Writing";
import SessionStorage from "utils/SessionStorage";

export class WritingStore {
  rootStore;
  writings: IWriting[] | null;
  repThemes: ITheme[] | null;
  currentWriting: Writing | null;
  currentIndex: number;
  selectedLevels: string[];
  selectedThemes: ITheme[];
  isNotFoundWriting: boolean;

  constructor(root: any) {
    makeObservable(this, {
      writings: observable,
      currentWriting: observable,
      repThemes: observable,
      selectedLevels: observable,
      selectedThemes: observable,
      isNotFoundWriting: observable,
    });
    this.isNotFoundWriting = false;
    this.rootStore = root;
    this.currentIndex = 0;
    this.writings = null;
    this.repThemes = null;
    this.currentWriting = null;
    this.selectedLevels = [];
    this.selectedThemes = [];
  }

  fetchRepWriting = async () => {
    const response = await fetchRepWriting();
    runInAction(() => {
      if (response instanceof Error) {
        setTimeout(async () => {
          const response2 = await fetchRepWriting();
          if (response instanceof Error) {
            console.log(response);
          } else {
            this.setRepThemes(response2.themes);
          }
        }, 1000);
      } else {
        this.setRepThemes(response.themes);
      }
    });
  };

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
      this.settingWriting(targetWriting);
    } else {
      this.fetchWriting(id);
    }
  };

  updateFilterFromSession = () => {
    if (this.selectedLevels.length === 0 || this.selectedThemes.length === 0) {
      const levels = SessionStorage.getSelectedLevels();
      const themes = SessionStorage.getSelectedThemes();
      this.setSelectedLevels(levels);
      this.setSelectedThemes(themes);
    }
  };

  fetchWriting = async (id: number) => {
    const response = await fetchWritingByNumId(id);
    runInAction(() => {
      if (response instanceof Error) {
        alert("다시 시도해주세요 🙏🏻?? ");
      } else {
        if (response === 404) {
          this.isNotFoundWriting = true;
        } else {
          this.isNotFoundWriting = false;
          this.settingWriting(response.data);
        }
      }
    });
  };

  settingWriting = (writing: any) => {
    runInAction(() => {
      this.setCurrentWriting(writing);
      if (this.currentWriting && this.selectedLevels.length === 0) {
        this.setSelectedLevels([`${this.currentWriting.getLevel()}`]);
      }
      if (
        this.currentWriting &&
        this.selectedThemes.length === 0 &&
        this.currentWriting.getThemes()
      ) {
        let themes: any = this.currentWriting
          .getThemes()
          ?.map((item) => item.name);
        this.setSelectedThemes(themes);
      }
    });
  };

  fetchRepWritingIfNone = () => {
    if (!this.repThemes || this.repThemes.length === 0) {
      this.fetchRepWriting();
    }
  };

  fetchFilteredWritingAndUpdate = async (
    e: any,
    levels: string[],
    themes: ITheme[],
    pathManager: PathManager
  ) => {
    const themesString = themes.map((item) => item.name).join(",");
    console.log("ThemeString:", themesString);
    console.log("levels:", levels);
    try {
      const response = await fetchWritingListFiltered(
        levels.join(","),
        themesString
      );
      this.currentIndex = 0;
      pathManager.goNextWriting(e, response.data[0].id);
    } catch (err) {
      console.log(err);
    }
  };

  setRepThemes = (themes: ITheme[]) => {
    this.repThemes = themes;
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

  getNextWritingId = () => {
    if (this.writings && this.writings.length > this.currentIndex - 1) {
      this.setCurrentIndex(this.currentIndex + 1);
    }
    return this.writings ? this.writings[this.currentIndex].id : -1;
  };

  moveWritingWithThemeLevel = async (
    e: any,
    pathManager: PathManager,
    theme: ITheme,
    level: string
  ) => {
    this.writings = null;
    let writing: IWriting;
    await this.fetchFilteredWritingAndUpdate(e, [level], [theme], pathManager);

    runInAction(() => {
      this.setSelectedThemes([theme]);
      if (this.writings) {
        writing = this.writings[0];
        pathManager.goWritingWithTheme(e, writing.id, theme.name);
        this.setSelectedLevels([`${writing.level}`]);
      }
    });
  };

  setSelectedLevels = (values: string[]) => {
    this.selectedLevels = values;
    SessionStorage.saveSelectedLevels(values);
  };
  setSelectedThemes = (values: ITheme[]) => {
    this.selectedThemes = values;
    SessionStorage.saveSelectedThemes(values);
  };
  getThemeDisplayName = (name: string) => {
    console.log("name", name);
    const theme = this.repThemes?.find((item) => item.name === name);
    return theme ? theme.display_name : "이름없음";
  };

  resetFilter = () => {
    this.setSelectedThemes([]);
    this.setSelectedLevels([]);
  };
}
