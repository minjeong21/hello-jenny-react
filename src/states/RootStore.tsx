import { WritingStore } from "states/WritingStore";
import { DialogStore } from "states/DialogStore";

export class RootStore {
  writingStore;
  dialogStore;

  constructor() {
    this.writingStore = new WritingStore(this);
    this.dialogStore = new DialogStore(this);
  }
}
