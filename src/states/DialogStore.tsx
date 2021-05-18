import DialogAnswer from "components/DialogAnswer";
import DialogCorrect from "components/DialogCorrect";
import DialogExplain from "components/DialogExplain";
import DialogHint from "components/DialogHInt";
import DialogJenny from "components/DialogJenny";
import DialogWrong from "components/DialogWrong";
import { action, makeObservable, observable } from "mobx";
import Writing from "utils/Writing";

export class DialogStore {
  rootStore;
  dialogList: { type: string; element: JSX.Element }[];
  writing: Writing | null;
  hintCount: number;
  dialogButtons: DialogButton[];
  showSubjectiveHint: boolean;
  currentType:
    | "HELP"
    | "HINT"
    | "WRONG"
    | "CORRECT"
    | "SHOW_ANSWER"
    | "EXPLAIN";
  textInWrinting: string;
  userSentence: string;
  moveNextWriting: any;

  constructor(root: any) {
    makeObservable(this, {
      writing: observable,
      dialogList: observable,
      hintCount: observable,
      dialogButtons: observable,
      textInWrinting: observable,
    });
    this.moveNextWriting = null;
    this.rootStore = root;
    this.writing = null;
    this.dialogList = [];
    this.dialogButtons = [];
    this.showSubjectiveHint = false;
    this.hintCount = 0;
    this.currentType = "HELP";
    this.textInWrinting = "";
    this.userSentence = "";
  }

  setTextInWriting = (textInWrinting: string) => {
    this.textInWrinting = textInWrinting;
  };

  setUserCentence = (userSentence: string) => {
    this.userSentence = userSentence;
  };
  setWriting = (writing: Writing) => {
    this.writing = writing;
  };
  getDialogs = () => {
    return this.dialogList;
  };

  hasMoreHint = () => {
    return this.writing ? this.writing.hasMoreHint(this.hintCount) : false;
  };

  @action appendDialog = (type: string, element: JSX.Element) => {
    console.log(this.dialogList);
    this.dialogList = [...this.dialogList, { type, element }];
    this.updateButtonActions();
    setTimeout(() => {
      var dialogSection = document.getElementById("explain-section");

      if (dialogSection) {
        dialogSection.scrollTop = dialogSection.scrollHeight;
      }
    }, 500);
  };

  setMoveNextWriing = (moveNextWriting: (e: any) => void) => {
    this.moveNextWriting = moveNextWriting;
    this.resetWriting();
  };

  resetWriting = () => {
    this.setUserCentence("");
    this.setTextInWriting("");
    this.dialogList = [];
    this.hintCount = 0;
    this.showSubjectiveHint = false;
    this.currentType = "HELP";
    this.textInWrinting = "";
    this.userSentence = "";
    const englishInput: any = document.getElementById("english_input");
    if (englishInput) {
      englishInput.readOnly = false;
      englishInput.setAttribute("style", "background-color: white");
      englishInput.addEventListener("focus", this.scrollEvent);
    }
  };

  scrollEvent = () => {
    const writingBoxElement: any = document.querySelector("#writing-box");
    const offsetTop = writingBoxElement.offsetTop;

    window.scroll({
      top: offsetTop,
      behavior: "smooth",
    });
  };
  addHelpJenny = () => {
    this.appendDialog("jenny", <DialogJenny />);
  };

  addCorrect = () => {
    this.userSentence = this.textInWrinting;
    this.appendDialog(
      "jenny",
      <DialogCorrect userSentence={this.userSentence} />
    );
  };
  addWrong = (isShowColorHelp: boolean, moreDescription?: string) => {
    this.userSentence = this.textInWrinting;
    if (this.writing) {
      this.appendDialog(
        "jenny",
        <DialogWrong
          isShowHelp={isShowColorHelp}
          moreDescription={moreDescription}
          userSentenceWords={this.writing.getUserSentenceWords(
            this.userSentence
          )}
          answerWords={this.writing.getAnswerWords()}
          percent={this.writing.getMatchedWordPercent(this.userSentence)}
        />
      );
    }
  };
  addShowAnswer = () => {
    this.currentType = "SHOW_ANSWER";
    this.hintCount += 1;

    if (this.writing) {
      this.appendDialog(
        "jenny",
        <DialogAnswer
          userSentence={this.userSentence}
          answer={this.writing.getAnswerSentence()}
        />
      );
    }
  };
  addSubjectiveHint = () => {
    this.currentType = "HINT";
    this.showSubjectiveHint = true;
    if (this.writing) {
      this.appendDialog(
        "jenny",
        <DialogHint
          talkText={"첫 단어 힌트 갑니다!"}
          hint={this.writing.getSubjective()}
        />
      );
    }
  };
  addHint = () => {
    this.currentType = "HINT";
    let talkText = "그 다음 힌트에요!";
    switch (this.hintCount) {
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

    if (this.writing) {
      this.appendDialog(
        "jenny",
        <DialogHint
          talkText={talkText}
          hint={this.writing.getHintDescription(this.hintCount)}
          hintMore={this.writing.getHintDescriptionMore(this.hintCount)}
        />
      );
    }
    this.hintCount += 1;
  };
  addExplain = (startIndex: number) => {
    this.currentType = "EXPLAIN";
    let talkText = "문장에 대해 더 깊게 이해해보아요 :) ";
    if (this.writing) {
      this.appendDialog(
        "jenny",
        <DialogExplain
          talkText={talkText}
          hints={this.writing.getRemainedAllHints(startIndex)}
        />
      );
    }
  };

  reload = () => {
    window.location.reload();
  };

  @action updateButtonActions = () => {
    let buttons = [];
    console.log(this.dialogButtons);
    switch (this.currentType) {
      case "HELP": // 도와줘 제니.
      case "HINT":
      case "WRONG":
        if (!this.showSubjectiveHint) {
          buttons.push(
            new DialogButton("👍 첫단어 힌트", this.addSubjectiveHint)
          );
        }
        if (this.hasMoreHint()) {
          buttons.push(new DialogButton("🙋🏻‍♀️ 힌트", this.addHint));
        }
        buttons.push(new DialogButton("🍰 정답 알려줘", this.addShowAnswer));
        buttons.push(
          new DialogButton("😎 다음 문제 풀래", (e: any) =>
            this.moveNextWriting(e)
          )
        );

        break;
      case "CORRECT":
      case "SHOW_ANSWER":
        if (this.hasMoreHint()) {
          buttons.push(new DialogButton("👨‍🏫 설명해줘", this.addExplain));
        }
        buttons.push(new DialogButton("🕺다시 풀래", this.reload));
        buttons.push(
          new DialogButton("😎 다음 문제 풀래", (e: any) =>
            this.moveNextWriting(e)
          )
        );
        break;
      default:
        buttons.push(new DialogButton("🕺다시 풀래", this.reload));

        buttons.push(
          new DialogButton("😎 다음 문제 풀래", (e: any) =>
            this.moveNextWriting(e)
          )
        );
    }
    this.dialogButtons = Object.assign(buttons);
  };
}

class DialogButton {
  label: string;
  onClick: () => void;
  constructor(label: string, onClick: any) {
    this.label = label;
    this.onClick = onClick;
  }
}
