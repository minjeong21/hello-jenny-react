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
  writingManager: WritingManager;
  moveNextWriting: () => void;
}

const WritingBox = (props: IProps) => {
  const { writingManager } = props;
  const [dialogManager] = useState<DialogManager>(
    new DialogManager(writingManager)
  );
  const [writing] = useState(writingManager.getWriting());
  const [textInWrinting, setTextInWrinting] = useState("");
  const [userSentence, setUserSentence] = useState("");
  const [currentDialogType, setCurrentDialogType] = useState("");

  useEffect(() => {
    setTextInWrinting("");
    setUserSentence("setUserSentence");
  }, []);

  const onClickHelpJenny = (event: any) => {
    event.preventDefault();

    setCurrentDialogType("help");
    dialogManager.addHelpJenny();
  };

  /**
   * 도전하기 버튼 클릭 Event
   * */
  const onSubmitChallenge = (event: any) => {
    event.preventDefault();

    const result = writingManager.compareAnswer(
      writing.alter_sentences ? writing.alter_sentences : [],
      textInWrinting
    );
    const element: any = document.getElementById("english_input");
    if (result.isCorrect) {
      // 맞았을 때
      element.setAttribute("readonly", true);
      element.setAttribute("style", "background-color: #e6ddd7; color:#141937");

      setCurrentDialogType("correct");
      dialogManager.addCorrect(writing.en_sentence, textInWrinting);
    } else {
      // 정답 틀렸을 때
      setCurrentDialogType("wrong");
      dialogManager.addWrong(textInWrinting);
    }
  };

  const onShowAnswer = () => {
    setUserSentence(textInWrinting);

    setCurrentDialogType("answer");
    dialogManager.addShowAnswer(textInWrinting);
  };
  return (
    <Container className="bg-white p-4 rounded-lg shadow-sm">
      <FilterNavigation />
      {/* <!-- A marketing page card built entirely with utility classes --> */}
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <WritingImage imageUrl={writing.image_url} size={null} />
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 flex-1">
          <div>
            <div className="uppercase tracking-wide text-sm">
              <div className="flex justify-between pb-6">
                <div className="text-gray-500">
                  {writing.themes[0].display_name.toLowerCase()}
                </div>
                <Level levelNumber={writing.level} />
              </div>
            </div>

            {writing.situation && (
              <p className="mt-2 text-gray-400 text-sm">{writing.situation}</p>
            )}
            <div className="block mt-1 text-lg leading-tight font-semibold text-gray-900 font-bold pb-3">
              {writing.kr_sentence}
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
  moveNextWriting: () => void;
  onShowAnswer: () => void;
}
const DialogBox = ({
  moveNextWriting,
  onShowAnswer,
  setCurrentDialogType,
  dialogManager,
  dialogType,
}: IPropsDialogBox) => {
  const [hintCount, setHintCount] = useState(0);
  const [dialogButtons, setDialogButtons] = useState<
    { text: string; onClick: () => void }[]
  >();
  const [visibleSubjectiveHint, setVisibleSubjectiveHint] = useState(false);

  useEffect(() => {
    getButtonActions();
  }, [hintCount, dialogButtons]);

  const onShowSubjective = () => {
    setCurrentDialogType("hint");
    dialogManager.addSubjectiveHint();
  };

  const onShowHint = () => {
    setCurrentDialogType("hint");
    dialogManager.addHint(hintCount);
    setHintCount(hintCount + 1);
    console.log(hintCount);
  };
  const hasMoreHint = () => {
    console.log(
      hintCount,
      dialogManager.getHintSize(),
      hintCount < dialogManager.getHintSize()
    );
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
    let buttons = [BUTTON_ACTION.GIVE_ANSWER];

    switch (dialogType) {
      case "help": // 도와줘 제니.
        buttons = [
          BUTTON_ACTION.FIRST_WORD_HINT,
          BUTTON_ACTION.GIVE_HINT,
          BUTTON_ACTION.GIVE_ANSWER,
          BUTTON_ACTION.NEXT,
        ];
        break;
      case "hint":
        buttons = hasMoreHint()
          ? [
              BUTTON_ACTION.GIVE_HINT,
              BUTTON_ACTION.GIVE_ANSWER,
              BUTTON_ACTION.NEXT,
            ]
          : [BUTTON_ACTION.GIVE_ANSWER, BUTTON_ACTION.NEXT];

        break;
      case "answer":
        buttons = [
          BUTTON_ACTION.EXPLAIN,
          BUTTON_ACTION.AGAIN,
          BUTTON_ACTION.NEXT,
        ];
        break;
      case "wrong":
        buttons = buttons = [
          BUTTON_ACTION.EXPLAIN,
          BUTTON_ACTION.AGAIN,
          BUTTON_ACTION.NEXT,
        ];
        break;

      case "correct":
        buttons = buttons = [
          BUTTON_ACTION.EXPLAIN,
          BUTTON_ACTION.AGAIN,
          BUTTON_ACTION.NEXT,
        ];
        break;
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
