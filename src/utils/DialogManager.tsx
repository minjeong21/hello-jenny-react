import IWriting from "interface/IWriting";
import {
  DialogHint,
  DialogJenny,
  DialogAnswer,
  DialogCorrect,
  DialogWrong,
  DialogUser,
} from "components/Dialog";
import WritingManager from "./WritingManager";
class DialogManager {
  dialogList: { type: string; element: JSX.Element }[];
  writingManager: WritingManager;
  answerCentence: string;
  hintCount: number;

  constructor(writingManager: WritingManager) {
    this.dialogList = [];
    this.writingManager = writingManager;
    this.answerCentence = writingManager.getAnswerCentence();
    this.hintCount = 0;
  }

  getDialogs = () => {
    return this.dialogList;
  };

  appendDialog = (type: string, element: JSX.Element) => {
    this.dialogList.push({ type, element });
    setTimeout(() => {
      var dialogSection = document.getElementById("explain-section");

      if (dialogSection) {
        dialogSection.scrollTop = dialogSection.scrollHeight;
      }
    }, 500);
  };

  addHelpJenny = () => {
    this.appendDialog("jenny", <DialogJenny />);
  };

  addCorrect = (answerCentence: string, userCentence: string) => {
    this.appendDialog(
      "jenny",
      <DialogCorrect
        answerCentence={answerCentence}
        userCentence={userCentence}
      />
    );
  };

  addWrong = (userCentence: string) => {
    this.appendDialog(
      "jenny",
      <DialogWrong
        answerCentence={this.answerCentence}
        userCentence={userCentence}
        percent={this.writingManager.getMatchedWordPercent(userCentence)}
      />
    );
  };
  addShowAnswer = (userCentence: string) => {
    this.appendDialog(
      "jenny",
      <DialogAnswer userCentence={userCentence} answer={this.answerCentence} />
    );
  };
  addSubjectiveHint = () => {
    this.appendDialog(
      "jenny",
      <DialogHint
        talkText={"첫 단어는 주어에요!"}
        hint={this.writingManager.getSubjective()}
      />
    );
  };

  // getHintByNumber = () => {
  //   if (this.hintCount < this.writing.hints.length) {
  //     return this.writing.hints[this.hintCount].description;
  //   } else {
  //     return "";
  //   }
  // };

  getHintSize = () => {
    return this.writingManager.getHintSize();
  };

  addHint = (hintCount: number) => {
    let talkText = "그 다음 힌트에요!";
    switch (hintCount) {
      case 0:
        talkText = "첫번째 힌트에요.";
        break;
      case 1:
        talkText = "두번째 힌트에요.";
        break;
      case 2:
        talkText = "세번째 힌트에요.";
        break;
      case 3:
        talkText = "네번째 힌트에요.";
        break;
    }

    this.appendDialog(
      "jenny",
      <DialogHint
        talkText={talkText}
        hint={this.writingManager.getHintByNumber(hintCount).description}
      />
    );
  };
}

export default DialogManager;
