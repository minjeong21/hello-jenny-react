import { useState, useEffect } from "react";
import DialogManager from "utils/DialogManager";
import Writing from "utils/Writing";

interface IPropsDialogBox {
  Writing: Writing;
  setCurrentDialogType: any;
  dialogType: string;
  dialogManager: DialogManager;
  dialogCount: number;
  moveNextWriting: (e: any) => void;
  onShowAnswer: () => void;
  setDialogCount: (value: number) => void;
  resetWriting: () => void;
}
const DialogBox = ({
  moveNextWriting,
  onShowAnswer,
  setDialogCount,
  setCurrentDialogType,
  dialogManager,
  dialogType,
  dialogCount,
  resetWriting,
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
  const onShowExplain = () => {
    setCurrentDialogType("explain");
    dialogManager.addExplain(hintCount);
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
    EXPLAIN: { text: "👨‍🏫 설명해줘", onClick: onShowExplain },
    AGAIN: { text: "🕺다시 풀래", onClick: () => resetWriting() },
  };

  const getButtonActions = () => {
    let buttons: { text: string; onClick: (e?: any) => void }[] = [];

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
        buttons.push(BUTTON_ACTION.AGAIN);
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
        <section className="relative" id="explain-section">
          <div>
            {dialogManager.getDialogs().map((dialog, index) => (
              <div key={index}>{dialog.element}</div>
            ))}
          </div>
        </section>
        <section>
          {dialogManager.getDialogs().length > 0 && dialogButtons && (
            <div className="flex justify-end pt-3">
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
    className="focus:outline-none text-sm py-1 px-2 rounded-md text-white bg-brown-500 hover:bg-brown-700 ml-1"
  >
    {text}
  </button>
);
export default DialogBox;
