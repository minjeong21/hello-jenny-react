import { makeObservable, observable, runInAction } from "mobx";
import ITheme from "interface/ITheme";
import IWriting from "interface/IWriting";

import {
  fetchRepWriting,
  fetchWritingByNumId,
  fetchWritingListFiltered,
  fetchWritings,
} from "apis/WritingApi";
import PathManager from "utils/PathManager";
import Writing from "utils/Writing";
import SessionStorage from "utils/SessionStorage";

export class WritingStore {
  rootStore;
  writings: IWriting[] | null;
  repWriting: Writing | null;
  repThemes: ITheme[] | null;
  currentWriting: Writing | null;
  currentIndex: number;
  selectedLevels: string[];
  selectedThemes: string[];
  isNotFoundWriting: boolean;

  constructor(root: any) {
    makeObservable(this, {
      writings: observable,
      repWriting: observable,
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
    this.repWriting = null;
    this.repThemes = null;
    this.currentWriting = null;
    this.selectedLevels = [];
    this.selectedThemes = [];
  }

  fetchRepWriting = async () => {
    const response = await fetchRepWriting();
    runInAction(() => {
      this.setRepWriting(response.rep_writing);
      this.setRepThemes(response.themes);
    });
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
      this.setSelectedLevel(levels);
      this.setSelectedThemes(themes);
    }
  };
  fetchWriting = async (id: number) => {
    const response = await fetchWritingByNumId(id);
    console.log(response);
    runInAction(() => {
      if (response === 404) {
        this.isNotFoundWriting = true;
      } else {
        this.isNotFoundWriting = false;
        this.settingWriting(response.data);
      }
    });
  };

  settingWriting = (writing: any) => {
    this.setCurrentWriting(writing);
    if (this.currentWriting && this.selectedLevels.length === 0) {
      this.setSelectedLevel([`${this.currentWriting.getLevel()}`]);
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
  };

  fetchWritingsDefault = async () => {
    const response = await fetchWritings();
    this.setWritings(response.data);
  };

  fetchFilteredWritingAndUpdate = async (
    e: any,
    levels: string,
    themes: string,
    pathManager: PathManager
  ) => {
    try {
      const response = await fetchWritingListFiltered(levels, themes);
      this.setWritings(response.data);
      pathManager.goNextWriting(e, response.data[0].id);
    } catch (err) {
      console.log(err);
    }
  };

  setRepWriting = (writing: IWriting) => {
    this.repWriting = new Writing(writing);
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

  getNextWritingId = () => {
    if (this.writings && this.writings.length > this.currentIndex - 1) {
      this.setCurrentIndex(this.currentIndex + 1);
    } else {
      alert("잠시 후에 다시 시도해주세요🙏🏻");
    }
    return this.writings ? this.writings[this.currentIndex].id : -1;
  };

  moveWritingWithTheme = async (
    e: any,
    pathManager: PathManager,
    themeName: string
  ) => {
    this.writings = null;
    let writing: IWriting;
    await this.fetchFilteredWritingAndUpdate(e, "", themeName, pathManager);

    runInAction(() => {
      this.setSelectedThemes([themeName]);
      if (this.writings) {
        writing = this.writings[0];
        pathManager.goWritingWithTheme(e, writing.id, themeName);

        this.setSelectedLevel([`${writing.level}`]);
      } else {
        alert("다시 시도해주세요.");
      }
    });
  };

  setSelectedLevel = (values: string[]) => {
    this.selectedLevels = values;
  };
  setSelectedThemes = (values: string[]) => {
    this.selectedThemes = values;
  };
}
