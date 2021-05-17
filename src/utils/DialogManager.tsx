import React from "react";
import DialogAnswer from "components/DialogAnswer";
import DialogCorrect from "components/DialogCorrect";
import DialogHint from "components/DialogHInt";
import DialogJenny from "components/DialogJenny";
import DialogWrong from "components/DialogWrong";
import Writing from "./Writing";
import DialogExplain from "components/DialogExplain";
class DialogManager {
  dialogList: { type: string; element: JSX.Element }[];
  Writing: Writing;
  answerSentence: string;
  hintCount: number;

  constructor(Writing: Writing) {
    this.dialogList = [];
    this.Writing = Writing;
    this.answerSentence = Writing.getAnswerSentence();
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

  addCorrect = (userSentence: string) => {
    this.appendDialog("jenny", <DialogCorrect userSentence={userSentence} />);
  };

  addWrong = (
    userSentence: string,
    isShowColorHelp: boolean,
    moreDescription?: string
  ) => {
    this.appendDialog(
      "jenny",
      <DialogWrong
        isShowHelp={isShowColorHelp}
        moreDescription={moreDescription}
        userSentenceWords={this.Writing.getUserSentenceWords(userSentence)}
        answerWords={this.Writing.getAnswerWords()}
        percent={this.Writing.getMatchedWordPercent(userSentence)}
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
        hint={this.Writing.getSubjective()}
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
    return this.Writing.getHintSize();
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
        hint={this.Writing.getHintDescription(hintCount)}
        hintMore={this.Writing.getHintDescriptionMore(hintCount)}
      />
    );
  };
  addExplain = (startIndex: number) => {
    let talkText = "문장에 대해 더 깊게 이해해보아요 :) ";

    this.appendDialog(
      "jenny",
      <DialogExplain
        talkText={talkText}
        hints={this.Writing.getHints(startIndex)}
      />
    );
  };
}

export default DialogManager;
