import React from "react";
import DialogAnswer from "components/DialogAnswer";
import DialogCorrect from "components/DialogCorrect";
import DialogHint from "components/DialogHInt";
import DialogJenny from "components/DialogJenny";
import DialogWrong from "components/DialogWrong";
import WritingManager from "./WritingManager";
class DialogManager {
  dialogList: { type: string; element: JSX.Element }[];
  writingManager: WritingManager;
  answerSentence: string;
  hintCount: number;

  constructor(writingManager: WritingManager) {
    this.dialogList = [];
    this.writingManager = writingManager;
    this.answerSentence = writingManager.getAnswerSentence();
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

  addCorrect = (answerSentence: string, userSentence: string) => {
    this.appendDialog(
      "jenny",
      <DialogCorrect
        answerSentence={answerSentence}
        userSentence={userSentence}
      />
    );
  };

  addWrong = (userSentence: string, moreDescription?: string) => {
    this.appendDialog(
      "jenny",
      <DialogWrong
        moreDescription={moreDescription}
        userSentenceWords={this.writingManager.getUserSentenceWords(
          userSentence
        )}
        answerWords={this.writingManager.getAnswerWords()}
        percent={this.writingManager.getMatchedWordPercent(userSentence)}
      />
    );
  };
  addShowAnswer = (userSentence: string) => {
    this.appendDialog(
      "jenny",
      <DialogAnswer userSentence={userSentence} answer={this.answerSentence} />
    );
  };
  addSubjectiveHint = () => {
    this.appendDialog(
      "jenny",
      <DialogHint
        talkText={"첫 단어 힌트 갑니다!"}
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
        hintMore={
          this.writingManager.getHintByNumber(hintCount).description_more
        }
      />
    );
  };
}

export default DialogManager;
