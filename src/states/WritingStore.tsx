import {
  fetchRepWriting,
  fetchWritingByNumId,
  fetchWritingListFiltered,
  fetchWritings,
} from "apis/WritingApi";
import IWriting from "interface/IWriting";
import { makeObservable, observable } from "mobx";
import Writing from "utils/Writing";

export class WritingStore {
  rootStore;
  writings: IWriting[] | null;
  repWriting: Writing | null;
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
    this.currentWriting = null;
    this.fetchWritingsDefault();
  }

  fetchRepWriting = async () => {
    const response = await fetchRepWriting();
    this.setRepWriting(response.rep_writing);
  };

  fetchWriting = async (id: number) => {
    const response = await fetchWritingByNumId(id);
    this.setCurrentWriting(response.data);
  };

  fetchWritingsDefault = async () => {
    const response = await fetchWritings();
    this.setWritings(response.data);
  };

  updateWritings = async (levels: string[], themes: string[]) => {
    const response = await fetchWritingListFiltered(levels, themes);
    this.setWritings(response.data);
    console.log("갯수는 이것이다=> ", response.data.length);
    console.log(response.data);
    this.currentWriting = new Writing(response.data[0]);
  };

  setRepWriting = (writing: IWriting) => {
    this.repWriting = new Writing(writing);
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
}
