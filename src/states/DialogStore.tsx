import Ping from "components/atoms/Ping";
import DialogAnswer from "components/DialogAnswer";
import DialogCorrect from "components/DialogCorrect";
import DialogExplain from "components/DialogExplain";
import DialogHint from "components/DialogHInt";
import DialogJenny from "components/DialogJenny";
import DialogWrong from "components/DialogWrong";
import RightArrowIcon from "components/icons/RightArrowIcon";
import { action, makeObservable, observable, runInAction } from "mobx";
import Writing from "utils/Writing";

export class DialogStore {
  rootStore;
  dialogList: { type: string; element: JSX.Element }[];
  writing: Writing | null;
  hintCount: number;
  dialogButtons: DialogButton[];
  showSubjectiveHint: boolean;
  isShownAnswer: boolean;

  textInWrinting: string;
  userSentence: string;
  moveNextWriting: any;
  tempButtons: DialogButton[];

  constructor(root: any) {
    makeObservable(this, {
      writing: observable,
      dialogList: observable,
      hintCount: observable,
      dialogButtons: observable,
    });
    this.moveNextWriting = null;
    this.rootStore = root;
    this.writing = null;
    this.dialogList = [];
    this.showSubjectiveHint = false;
    this.isShownAnswer = false;
    this.hintCount = 0;
    this.textInWrinting = "";
    this.userSentence = "";
    this.tempButtons = [];
    this.dialogButtons = [];
  }

  @action setTextInWriting = (value: string) => {
    this.textInWrinting = value;
  };
  @action setUserCentence = (userSentence: string) => {
    this.userSentence = userSentence;
  };
  @action setWriting = (writing: Writing) => {
    this.writing = writing;
  };
  getDialogs = () => {
    return this.dialogList;
  };

  hasMoreHint = () => {
    return this.writing && this.writing.getWriting().hints
      ? this.writing.getWriting().hints.length > this.hintCount
      : false;
  };

  @action appendDialog = (
    type:
      | "INIT"
      | "HELP"
      | "HINT"
      | "WRONG"
      | "CORRECT"
      | "SHOW_ANSWER"
      | "EXPLAIN",
    element: JSX.Element
  ) => {
    runInAction(() => {
      this.dialogList = [...this.dialogList, { type, element }];
      this.updateButtonActions(type);
    });

    if (window.innerWidth < 480) {
      const dialogSection: any = document.querySelector("#explain-section");
      const offsetTop = dialogSection.scrollHeight;

      dialogSection.scroll({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  @action setMoveNextWriing = (moveNextWriting: (e: any) => void) => {
    this.moveNextWriting = moveNextWriting;
  };

  @action resetWriting = () => {
    this.setUserCentence("");
    this.setTextInWriting("");
    runInAction(() => {
      this.dialogList = [];
    });
    this.hintCount = 0;
    this.showSubjectiveHint = false;
    this.isShownAnswer = false;
    this.textInWrinting = "";
    this.userSentence = "";
    const englishInput: any = document.getElementById("english_input");
    if (englishInput) {
      englishInput.readOnly = false;
      englishInput.addEventListener("focus", this.scrollEvent);
    }
    this.updateButtonActions("INIT");
  };

  scrollEvent = () => {
    if (window.innerWidth < 480) {
      const writingBoxElement: any = document.querySelector("#writing-box");
      const offsetTop = writingBoxElement.offsetTop;

      window.scroll({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  addHelpJenny = (e: any) => {
    e.preventDefault();
    this.appendDialog("HINT", <DialogJenny />);
  };

  addCorrect = () => {
    this.userSentence = this.textInWrinting;
    this.appendDialog(
      "CORRECT",
      <DialogCorrect userSentence={this.userSentence} />
    );
  };
  addWrong = (isShowColorHelp: boolean, moreDescription?: string) => {
    this.userSentence = this.textInWrinting;
    if (this.writing) {
      this.appendDialog(
        "WRONG",
        <DialogWrong
          isShowHelp={isShowColorHelp}
          moreDescription={moreDescription}
          userSentenceWords={this.writing.getCompareUserSentenceWords(
            this.userSentence
          )}
          percent={this.writing.getMatchedWordPercent(this.userSentence)}
        />
      );
    }
  };
  addShowAnswer = () => {
    if (this.writing) {
      this.isShownAnswer = true;
      this.appendDialog(
        "SHOW_ANSWER",
        <DialogAnswer
          userSentence={this.userSentence}
          answer={this.writing.getAnswerSentence()}
        />
      );
    }
  };
  addHint = () => {
    const currentHintCount = this.hintCount;
    this.hintCount += 1;
    if (this.writing) {
      const hint = this.writing.getHint(currentHintCount);
      if (hint) {
        this.appendDialog("HINT", <DialogHint hint={hint} />);
      }
    }
  };
  addExplain = (startIndex: number) => {
    let talkText = "문장에 대해 더 깊게 이해해보아요 :) ";
    if (this.writing) {
      this.appendDialog(
        "EXPLAIN",
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

  @action updateButtonActions = (
    type:
      | "INIT"
      | "HELP"
      | "HINT"
      | "WRONG"
      | "CORRECT"
      | "SHOW_ANSWER"
      | "EXPLAIN"
  ) => {
    const hintText = [
      "1번째 힌트",
      "2번째 힌트",
      "3번째 힌트",
      "4번째 힌트",
      "5번째 힌트",
      "6번째 힌트",
      "7번째 힌트",
      "8번째 힌트",
      "9번째 힌트",
      "10번째 힌트",
    ];
    const HintButton = new DialogButton(
      (
        <div>
          <Ping />
          {hintText[this.hintCount]} 🔑
        </div>
      ),
      this.addHint
    );
    const NextButton = new DialogButton(
      <div className="flex items-center">다음 문제</div>,
      (e: any) => this.moveNextWriting(e)
    );
    const AnswerButton = new DialogButton(
      "😎 모범답안 보기",
      this.addShowAnswer
    );
    const ReTryButton = new DialogButton("🕺다시 풀래", this.reload);

    this.tempButtons = [];
    switch (type) {
      case "INIT": // 도와줘 제니.
        if (this.hasMoreHint()) {
          this.tempButtons.push(HintButton);
        }
        break;

      case "HELP": // 도와줘 제니.
      case "HINT":
      case "WRONG":
        if (this.hasMoreHint()) {
          this.tempButtons.push(HintButton);
        } else {
          this.tempButtons.push(AnswerButton);
        }
        break;
      case "CORRECT":
      case "SHOW_ANSWER":
        if (this.hasMoreHint()) {
          this.tempButtons.push(
            new DialogButton("👨‍🏫 설명해줘", () =>
              this.addExplain(this.hintCount)
            )
          );
        }
        this.tempButtons.push(ReTryButton);
        this.tempButtons.push(NextButton);
        break;
      default:
        this.tempButtons.push(ReTryButton);
        this.tempButtons.push(NextButton);
    }

    runInAction(() => {
      this.dialogButtons = Object.assign(this.tempButtons);
    });
  };
}

class DialogButton {
  label: any;
  onClick: () => void;

  constructor(label: any, onClick: any) {
    this.label = label;
    this.onClick = onClick;
  }
}
