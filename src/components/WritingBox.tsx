import React, { useEffect, useState } from "react";
import WritingImage from "./atoms/WritingImage";
import styled from "styled-components";
import MainTheme from "components/MainTheme";
import WritingManager from "utils/WritingManager";
import Level from "components/atoms/Level";
import FilterNavigation from "components/molecules/FilterNavigation";
import WritingForm from "components/WritingForm";
import {
  DialogHint,
  DialogJenny,
  DialogAnswer,
  DialogCorrect,
  DialogWrong,
  DialogUser,
} from "components/Dialog";
import DialogButtons from "components/DialogButtons";
import IWriting from "interface/IWriting";

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
  const [dialogType, setDialogType] = useState("help");
  const { writingManager } = props;
  const [writing, setWriting] = useState(writingManager.getWriting());
  const [textInWrinting, setTextInWrinting] = useState("");
  const [userCentence, setUserCentence] = useState("");
  const [dialogList, setDialogList] = useState<
    { type: string; element: JSX.Element }[]
  >([]);

  useEffect(() => {
    setTextInWrinting("");
    setUserCentence("");
  }, []);

  const onClickHelpJenny = (event: any) => {
    event.preventDefault();

    setDialogType("help");
    appendDialog("jenny", <DialogJenny />);
  };

  /**
   * 도전하기 버튼 클릭 Event
   * */
  const onSubmitChallenge = (event: any) => {
    event.preventDefault();
    let Dialog = null;

    console.log(writing);
    const result = writingManager.compareAnswer(
      writing.alter_sentences ? writing.alter_sentences : [],
      textInWrinting
    );
    console.log(textInWrinting);
    console.log(result);

    const element: any = document.getElementById("english_input");
    if (result.isCorrect) {
      // 맞았을 때
      element.setAttribute("readonly", true);
      element.setAttribute("style", "background-color: #e6ddd7; color:#141937");

      setDialogType("correct");
      Dialog = (
        <DialogCorrect writing={writing} userCentence={textInWrinting} />
      );
    } else {
      // 정답 틀렸을 때
      const percent = writingManager.getMatchedWordPercent(textInWrinting);
      setDialogType("wrong");
      Dialog = <DialogWrong writing={writing} userCentence={textInWrinting} />;
    }
    appendDialog("jenny", Dialog);
  };

  const appendDialog = (type: string, element: JSX.Element) => {
    setDialogList((prev) => [...prev, { type, element }]);
    setTimeout(() => {
      var dialogSection = document.getElementById("explain-section");
      console.log(dialogSection);

      if (dialogSection) {
        dialogSection.scrollTop = dialogSection.scrollHeight;
      }
    }, 500);
  };

  const onShowAnswer = () => {
    setUserCentence(textInWrinting);
    const Dialog = (
      <DialogAnswer userCentence={userCentence} answer={writing.en_sentence} />
    );

    setDialogType("answer");
    appendDialog("jenny", Dialog);
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
        appendDialog={appendDialog}
        moveNextWriting={props.moveNextWriting}
        onShowAnswer={onShowAnswer}
        setDialogType={setDialogType}
        dialogList={dialogList}
        dialogType={dialogType}
      />
    </Container>
  );
};

export default WritingBox;

interface IPropss {
  writingManager: WritingManager;
  appendDialog: any;
  moveNextWriting: () => void;
  onShowAnswer: () => void;
  setDialogType: any;
  dialogList: { type: string; element: JSX.Element }[];
  dialogType: string;
}
const DialogBox = ({
  writingManager,
  appendDialog,
  moveNextWriting,
  onShowAnswer,
  setDialogType,
  dialogType,
  dialogList,
}: IPropss) => {
  const [hintCount, setHintCount] = useState(0);

  const onShowSubjective = () => {
    const Dialog = (
      <DialogHint
        talkText={"주어 힌트는 여기있어!"}
        hint={writingManager.getSubjective()}
      />
    );
    writingManager.increaseHintNumber();
    setDialogType("hint");
    appendDialog("jenny", Dialog);
  };

  const onShowHint = () => {
    const Dialog = (
      <DialogHint
        talkText={writingManager.getHintTitle()}
        hint={writingManager.getHintByNumber()}
      />
    );
    writingManager.increaseHintNumber();
    setDialogType("hint");
    appendDialog("user", <DialogUser text={"힌트 보여줘!"} />);
    appendDialog("jenny", Dialog);
  };

  const BUTTON_ACTION = {
    HELP: [
      {
        text: "👍첫단어 힌트",
        onClick: onShowSubjective,
      },
      { text: "🙋🏻‍♀️힌트", onClick: onShowHint },
      { text: "🍰정답 알려줘", onClick: onShowAnswer },
      { text: "🤞🏻다음 문제 풀래", onClick: moveNextWriting },
    ],
    HINT_LAST: [
      { text: "🍰정답 알려줘", onClick: onShowAnswer },
      { text: "🤞🏻다음 문제 풀래", onClick: moveNextWriting },
    ],
    HINT_NOT_LAST: [
      { text: "🙋🏻‍♀️힌트", onClick: onShowHint },
      { text: "🍰정답 알려줘", onClick: onShowAnswer },
      { text: "🤞🏻다음 문제 풀래", onClick: moveNextWriting },
    ],
    ANSWER: [
      { text: "👨‍🏫설명해줘", onClick: () => alert("준비중인 기능이야") },
      { text: "🕺다시 풀래", onClick: () => window.location.reload() },
      { text: "🤞🏻다음 문제 풀래", onClick: moveNextWriting },
    ],
    WRONG: [
      { text: "🙋🏻‍♀️힌트", onClick: onShowHint },
      { text: "😎다시 풀래", onClick: () => window.location.reload() },
      { text: "👊🏻다음 문제 풀래", onClick: moveNextWriting },
    ],
    CORRECT: [
      { text: "문장 설명👨‍🏫", onClick: () => alert("준비중인 기능이야") },
      { text: "다음 문제 풀래😎", onClick: moveNextWriting },
    ],
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
            {dialogList.map((dialog, index) => (
              <div key={index}>{dialog.element}</div>
            ))}
          </div>
        </section>
        <section>
          {dialogList.length > 0 && (
            <DialogButtons
              type={dialogType}
              isLastHint={writingManager.hasMoreHint()}
              buttonActions={BUTTON_ACTION}
            />
          )}
        </section>
      </div>
    </section>
  );
};
