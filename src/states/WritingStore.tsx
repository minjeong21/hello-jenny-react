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

  constructor(root: any) {
    makeObservable(this, {
      writings: observable,
      repWriting: observable,
      currentWriting: observable,
    });
    this.rootStore = root;
    this.currentIndex = 0;
    this.writings = null;
    this.repWriting = null;
    this.repThemes = null;
    this.currentWriting = null;
    this.fetchWritingsDefault();
  }

  fetchRepWriting = async () => {
    const response = await fetchRepWriting();

    runInAction(() => {
      this.setRepWriting(response.rep_writing);
      this.setRepThemes(response.themes);
      console.log(response.themes);
    });
  };

  fetchWriting = async (id: number) => {
    const response = await fetchWritingByNumId(id);

    runInAction(() => {
      this.setCurrentWriting(response.data);
    });
  };

  fetchWritingsDefault = async () => {
    const response = await fetchWritings();
    this.setWritings(response.data);
  };

  fetchFilteredWritingAndUpdate = async (levels: string, themes: string) => {
    const response = await fetchWritingListFiltered(levels, themes);
    this.setWritings(response.data);
    // this.currentWriting = new Writing(response.data[0]);
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
    if (this.writings) {
      writing = this.writings[0];
      pathManager.goWritingWithTheme(e, writing.id, themeName);
    } else {
      alert("다시 시도해주세요.");
    }
  };
}
