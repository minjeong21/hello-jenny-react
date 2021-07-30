import { WritingStore } from "states/WritingStore";
import { DialogStore } from "states/DialogStore";
import { UserStore } from "states/UserStore";
import { SpeakingStore } from "states/SpeakingStore";

export class RootStore {
  speakingStore;
  writingStore;
  dialogStore;
  userStore;

  constructor() {
    this.writingStore = new WritingStore(this);
    this.dialogStore = new DialogStore(this);
    this.userStore = new UserStore(this);
    this.speakingStore = new SpeakingStore(this);
  }
}
