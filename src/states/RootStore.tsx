import { WritingStore } from "states/WritingStore";

export class RootStore {
  writingStore;

  constructor() {
    this.writingStore = new WritingStore(this);
  }
}
