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
  writings: IWriting[];
  moveNextWriting: () => void;
}

const WritingBox = (props: IProps) => {
  const { writingManager } = props;
  const [writing, setWriting] = useState(writingManager.getWriting());
  const [dialogType, setDialogType] = useState("help");
  const [textInWrinting, setTextInWrinting] = useState("");
  const [userCentence, setUserCentence] = useState("");
  const [hintCount, setHintCount] = useState(0);
  const [dialogList, setDialogList] = useState<
    { type: string; element: JSX.Element }[]
  >([]);

  useEffect(() => {
    setTextInWrinting("");
    setUserCentence("");
  }, []);

  const onClickHelpJenny = () => {
    setDialogType("help");
    appendDialog("open", <DialogJenny />);
  };

  const onClickShowAnswer = () => {
    setUserCentence(textInWrinting);
    const Dialog = (
      <DialogAnswer userCentence={userCentence} answer={writing.en_sentence} />
    );

    setDialogType("answer");
    appendDialog("answer", Dialog);
  };
  /**
   * 도전하기 버튼 클릭 Event
   * */
  const onSubmitChallenge = (event: any) => {
    event.preventDefault();
    let Dialog = null;

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
    appendDialog("hint", Dialog);
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

  const onShowSubjective = () => {
    const Dialog = (
      <DialogHint
        talkText={"주어 힌트는 여기있어!"}
        hint={writingManager.getSubjective()}
      />
    );
    writingManager.increaseHintNumber();
    setDialogType("hint");
    appendDialog("hint", Dialog);
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
    appendDialog("hint", Dialog);
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

      <section className="dynamic">
        {/* 왼쪽 이미지 */}
        <div className="pad-xs ">
          <article className="pad-xs flex-1 solving-article">
            <div className={`dynamic-flex`}>
              <div className="pad-m"></div>
              {/* 설명 */}
            </div>
          </article>
          <section id="explain-section">
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
                onShowHint={onShowHint}
                showAnswer={onClickShowAnswer}
                moveNextWriting={props.moveNextWriting}
                onShowSubjective={onShowSubjective}
              />
            )}
          </section>
        </div>
      </section>
    </Container>
  );
};

export default WritingBox;
