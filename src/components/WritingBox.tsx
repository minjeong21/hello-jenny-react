import { useEffect, useState } from "react";
import WritingImage from "./atoms/WritingImage";
import styled from "styled-components";
import MainTheme from "components/MainTheme";
import { compareAnswer, getMatchedWordPercent } from "utils/ManagerSentence";
import Level from "components/atoms/Level";
import IWriting from "interface/IWriting";
import WritingForm from "components/WritingForm";
import {
  DialogHint,
  DialogJenny,
  DialogAnswer,
  DialogCorrect,
  DialogWrong,
} from "components/Dialog";
import DialogButtons from "components/DialogButtons";

const Container = styled.div`
  input {
    width: 100%;
    padding: 10px;
  }

  #explain-section {
    max-height: 200px;
    scrollbar-color: yellow;
    overflow-y: auto;
    margin-bottom: 10px;
  }
`;

interface IProps {
  writing: IWriting;
  viewSize: string;
  moveNextWriting: () => void;
}

const WritingBox = (props: IProps) => {
  const { writing } = props;
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

    const result = compareAnswer(writing.alter_sentences, textInWrinting);
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
      const percent = getMatchedWordPercent(
        result.bestMatchedText,
        textInWrinting
      );
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

  const onClickShowHint = () => {
    let talkText = "";

    setHintCount(hintCount + 1);
    switch (hintCount) {
      case 0:
        talkText = "첫번째 힌트야";
        break;
      case 1:
        talkText = "두번째 힌트야";
        break;
      case 2:
        talkText = "마지막 힌트야";
    }
    const Dialog = (
      <DialogHint
        talkText={talkText}
        hint={writing.hints[hintCount].description}
      />
    );
    setDialogType("hint");
    appendDialog("hint", Dialog);
  };

  console.log(
    hintCount,
    writing.hints.length - 1,
    hintCount >= writing.hints.length - 1
  );

  return (
    <Container>
      <section
        className={`${
          props.viewSize === "small" ? "flex-column small-view" : "flex"
        }`}
      >
        {/* 왼쪽 이미지 */}
        <div className="pad-xs ">
          <article className="pad-xs flex-1 solving-article">
            <div
              className={`${
                props.viewSize === "small" ? "flex-column" : "flex"
              }`}
            >
              <div className="pad-m">
                <WritingImage imageUrl={writing.image_url} size={null} />
              </div>
              {/* 설명 */}
              <div>
                <div className="flex justify-between">
                  <MainTheme themes={writing.themes} />
                  <Level levelNumber={writing.level} />
                </div>

                {writing.situation && (
                  <div className="font-body weigth-400 font-gray-3 pb-xxs pt-xxs">
                    {writing.situation}
                  </div>
                )}

                <div className="font-large weigth-700 font-gray-1 pb-m">
                  {writing.kr_sentence}
                </div>

                <WritingForm
                  setTextInWrinting={setTextInWrinting}
                  onSubmitChallenge={onSubmitChallenge}
                  textInWrinting={textInWrinting}
                  onClickHelpJenny={onClickHelpJenny}
                />
              </div>
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
                isLastHint={hintCount >= writing.hints.length - 1}
                onShowHint={onClickShowHint}
                showAnswer={onClickShowAnswer}
                moveNextWriting={props.moveNextWriting}
              />
            )}
          </section>
        </div>
      </section>
    </Container>
  );
};

export default WritingBox;
