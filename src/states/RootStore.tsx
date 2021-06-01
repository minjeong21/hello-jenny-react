import { WritingStore } from "states/WritingStore";
import { DialogStore } from "states/DialogStore";
import { ProfileStore } from "states/ProfileStore";
import { SpeakingStore } from "states/SpeakingStore";

export class RootStore {
  speakingStore;
  writingStore;
  dialogStore;
  profileStore;

  constructor() {
    this.writingStore = new WritingStore(this);
    this.dialogStore = new DialogStore(this);
    this.profileStore = new ProfileStore(this);
    this.speakingStore = new SpeakingStore(this);
  }
}
