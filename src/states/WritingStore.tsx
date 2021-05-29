import {
  fetchRepWriting,
  fetchWritingByNumId,
  fetchWritingListFiltered,
  fetchWritings,
} from "apis/WritingApi";
import ITheme from "interface/ITheme";
import IWriting from "interface/IWriting";
import { makeObservable, observable, runInAction } from "mobx";
import PathManager from "utils/PathManager";
import Writing from "utils/Writing";

export class WritingStore {
  rootStore;
  writings: IWriting[] | null;
  repWriting: Writing | null;
  repThemes: ITheme[] | null;
  currentWriting: Writing | null;
  currentIndex: number;
  selectedLevels: string[];
  selectedThemes: string[];

  constructor(root: any) {
    makeObservable(this, {
      writings: observable,
      repWriting: observable,
      currentWriting: observable,
      repThemes: observable,
      selectedLevels: observable,
      selectedThemes: observable,
    });
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

  fetchWriting = async (id: number) => {
    const response = await fetchWritingByNumId(id);
    runInAction(() => {
      this.setCurrentWriting(response.data);
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
        console.log(themes);
      }
    });
  };

  fetchWritingsDefault = async () => {
    const response = await fetchWritings();
    this.setWritings(response.data);
  };

  fetchFilteredWritingAndUpdate = async (levels: string, themes: string) => {
    const response = await fetchWritingListFiltered(levels, themes);
    this.setWritings(response.data);
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
    this.writings = Object.assign(writings);
  };
  setCurrentIndex = (index: number) => {
    this.currentIndex = index;
  };

  getNextWritingId = () => {
    if (this.writings && this.writings.length > this.currentIndex - 1) {
      this.setCurrentIndex(this.currentIndex + 1);
    } else {
      this.setCurrentIndex(0);
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
    await this.fetchFilteredWritingAndUpdate("", themeName);

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
