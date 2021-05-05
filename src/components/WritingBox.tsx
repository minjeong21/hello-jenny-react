import { useEffect, useState } from "react";
import WritingImage from "./atoms/WritingImage";
import styled from "styled-components";
import WritingManager from "utils/WritingManager";
import Level from "components/atoms/Level";
import FilterNavigation from "components/molecules/FilterNavigation";
import WritingForm from "components/WritingForm";
import DialogManager from "utils/DialogManager";

const Container = styled.div`
  input {
    width: 100%;
    padding: 10px;
  }
`;

interface IProps {
  writingId: number;
  writingManager: WritingManager;
  moveNextWriting: () => void;
}

const WritingBox = (props: IProps) => {
  const { writingId, writingManager } = props;
  const [dialogManager, setDialogManager] = useState<DialogManager>(
    new DialogManager(writingManager)
  );

  const [dialogCount, setDialogCount] = useState(0);
  const [textInWrinting, setTextInWrinting] = useState("");
  const [userSentence, setUserSentence] = useState("");
  const [currentDialogType, setCurrentDialogType] = useState("");

  useEffect(() => {
    setTextInWrinting("");
    setUserSentence("");
    setDialogManager(new DialogManager(writingManager));
    const englishInput = document.getElementById("english_input");
    if (englishInput) {
      englishInput.addEventListener("focus", scrollEvent);
    }
  }, [writingId]);

  const onClickHelpJenny = (event: any) => {
    event.preventDefault();

    setCurrentDialogType("help");
    dialogManager.addHelpJenny();
    setDialogCount(dialogCount + 1);
  };

  /**
   * 도전하기 버튼 클릭 Event
   * */
  const onSubmitChallenge = (event: any) => {
    event.preventDefault();

    const isCorrect = writingManager.isCorrect(textInWrinting);
    const element: any = document.getElementById("english_input");
    if (isCorrect) {
      // 맞았을 때
      element.setAttribute("readonly", true);
      element.setAttribute("style", "background-color: #e6ddd7; color:#141937");
      setCurrentDialogType("correct");
      dialogManager.addCorrect(
        writingManager.getAnswerSentence(),
        textInWrinting
      );
    } else {
      // 정답 틀렸을 때

      if (writingManager.isIgnoreCaseCorrect(textInWrinting)) {
        setCurrentDialogType("wrong");
        dialogManager.addWrong(textInWrinting, "대소문자를 확인해주세요!");
      } else if (writingManager.isIgnoreSpecialCharCorrect(textInWrinting)) {
        setCurrentDialogType("wrong");
        dialogManager.addWrong(
          textInWrinting,
          "점이나 쉼표같은 특수문자를 확인해보세요!"
        );
      } else {
        setCurrentDialogType("wrong");
        dialogManager.addWrong(textInWrinting);
      }
    }
    setDialogCount(dialogCount + 1);
  };

  const onShowAnswer = () => {
    setUserSentence(textInWrinting);
    setCurrentDialogType("showAnswer");
    dialogManager.addShowAnswer(textInWrinting);
    setDialogCount(dialogCount + 1);
  };

  const scrollEvent = () => {
    const writingBoxElement: any = document.querySelector("#writing-box");
    const offsetTop = writingBoxElement.offsetTop;

    window.scroll({
      top: offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <Container className="" id="writing-box">
      <FilterNavigation />
      {/* <!-- A marketing page card built entirely with utility classes --> */}
      <div className="bg-white  md:flex p-4 rounded-lg shadow-custom">
        <div className="md:flex-shrink-0">
          <WritingImage imageUrl={writingManager.getImageURL()} size={null} />
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 flex-1">
          <div>
            <div className="uppercase tracking-wide text-sm">
              <div className="flex justify-between pb-6">
                <div className="text-gray-500">
                  {writingManager.getMainTheme()}
                </div>
                <Level levelNumber={writingManager.getLevel()} />
              </div>
            </div>

            {writingManager.getSituation() && (
              <p className="mt-2 text-gray-400 text-sm">
                {writingManager.getSituation()}
              </p>
            )}
            <div className="block mt-1 text-lg leading-tight font-semibold text-gray-900 font-bold pb-3">
              {writingManager.getKoreanSentence()}
            </div>
          </div>

          <WritingForm
            setTextInWrinting={setTextInWrinting}
            onSubmitChallenge={onSubmitChallenge}
            textInWrinting={textInWrinting}
            onClickHelpJenny={onClickHelpJenny}
          />
        </div>
      </div>
      <DialogBox
        writingManager={writingManager}
        moveNextWriting={props.moveNextWriting}
        onShowAnswer={onShowAnswer}
        setCurrentDialogType={setCurrentDialogType}
        dialogManager={dialogManager}
        dialogType={currentDialogType}
        dialogCount={dialogCount}
        setDialogCount={setDialogCount}
      />
    </Container>
  );
};

export default WritingBox;

interface IPropsDialogBox {
  writingManager: WritingManager;
  setCurrentDialogType: any;
  dialogType: string;
  dialogManager: DialogManager;
  dialogCount: number;
  moveNextWriting: () => void;
  onShowAnswer: () => void;
  setDialogCount: (value: number) => void;
}
const DialogBox = ({
  moveNextWriting,
  onShowAnswer,
  setDialogCount,
  setCurrentDialogType,
  dialogManager,
  dialogType,
  dialogCount,
}: IPropsDialogBox) => {
  const [hintCount, setHintCount] = useState(0);
  const [dialogButtons, setDialogButtons] = useState<
    { text: string; onClick: () => void }[]
  >();
  const [shownSubjectiveHint, setShownSubjectiveHint] = useState(false);

  useEffect(() => {
    getButtonActions();
  }, [dialogCount]);

  const onShowSubjective = () => {
    setCurrentDialogType("giveHint");
    setShownSubjectiveHint(true);
    setDialogCount(dialogCount + 1);
    dialogManager.addSubjectiveHint();
  };

  const onShowHint = () => {
    setCurrentDialogType("giveHint");
    dialogManager.addHint(hintCount);
    setHintCount(hintCount + 1);
    setDialogCount(dialogCount + 1);
  };
  const hasMoreHint = () => {
    return hintCount < dialogManager.getHintSize();
  };

  const BUTTON_ACTION = {
    FIRST_WORD_HINT: {
      text: "👍 첫단어 힌트",
      onClick: onShowSubjective,
    },
    GIVE_HINT: { text: "🙋🏻‍♀️ 힌트", onClick: onShowHint },
    GIVE_ANSWER: { text: "🍰 정답 알려줘", onClick: onShowAnswer },
    NEXT: { text: "😎 다음 문제 풀래", onClick: moveNextWriting },
    EXPLAIN: { text: "👨‍🏫 설명해줘", onClick: () => alert("준비중인 기능이야") },
    AGAIN: { text: "🕺다시 풀래", onClick: () => window.location.reload() },
  };

  const getButtonActions = () => {
    let buttons: { text: string; onClick: () => void }[] = [];

    switch (dialogType) {
      case "help": // 도와줘 제니.
      case "giveHint":
      case "wrong":
        if (!shownSubjectiveHint) {
          buttons.push(BUTTON_ACTION.FIRST_WORD_HINT);
        }
        if (hasMoreHint()) {
          buttons.push(BUTTON_ACTION.GIVE_HINT);
        }
        buttons.push(BUTTON_ACTION.GIVE_ANSWER);
        buttons.push(BUTTON_ACTION.NEXT);
        break;

      case "correct":
      case "showAnswer":
        if (hasMoreHint()) {
          buttons.push(BUTTON_ACTION.EXPLAIN);
        }
        buttons.push(BUTTON_ACTION.AGAIN);
        buttons.push(BUTTON_ACTION.NEXT);
        break;
      default:
        buttons.push(BUTTON_ACTION.NEXT);
    }
    setDialogButtons(Object.assign(buttons));
  };
  return (
    <section>
      {/* 왼쪽 이미지 */}
      <div className="pad-xs ">
        <article className="pad-xs flex-1 solving-article">
          <div className={`dynamic-flex`}>
            <div className="pad-m"></div>
            {/* 설명 */}
          </div>
        </article>
        <section id="explain-section relative">
          <div>
            {dialogManager.getDialogs().map((dialog, index) => (
              <div key={index}>{dialog.element}</div>
            ))}
          </div>
        </section>
        <section>
          {dialogManager.getDialogs().length > 0 && dialogButtons && (
            <div className="flex justify-end">
              {dialogButtons.map((item, index) => (
                <SmallButton
                  key={index}
                  text={item.text}
                  onClick={item.onClick}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  );
};

const SmallButton = ({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) => (
  <button
    onClick={onClick}
    className="focus:outline-none text-blue-600 text-sm py-1 px-2 rounded-md border border-blue-600 hover:bg-blue-50 ml-1"
  >
    {text}
  </button>
);
