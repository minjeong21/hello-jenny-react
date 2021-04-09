import { IWriting } from "../interface/IWriting";
import { useEffect, useState } from "react";
import WritingImage from "./atoms/WritingImage";
import styled from "styled-components";
import MainTheme from "components/MainTheme";
import { compareAnswer, getMatchedWordPercent } from "utils/ManagerSentence";
import Level from "components/atoms/Level";
import WritingForm from "components/WritingForm";
import HelpJennySection from "components/HelpJennySection";

const Container = styled.div``;

interface IProps {
  writing: IWriting;
  viewSize: string;
  moveNextWriting: () => void;
}

function WritingBox(props: IProps) {
  const { writing } = props;
  const [textInWrinting, setTextInWrinting] = useState("");
  const [callHelp, setCallHelp] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [tryText, setTryText] = useState("");
  const [matchedPercent, setMatchedPercent] = useState(0);

  useEffect(() => {
    setTextInWrinting("");
    setTryText("");
    setMatchedPercent(0);
  }, []);

  const onClickHelpJenny = () => {
    setCallHelp((prev) => !prev);
  };

  /**
   * 도전하기 버튼 클릭 Event
   * */
  const onSubmitChallenge = (event: any) => {
    event.preventDefault();
    const result = compareAnswer(writing.alternative_en_texts, textInWrinting);
    console.log(textInWrinting);
    console.log(result);
    setIsCorrect(result.isCorrect);
    const element: any = document.getElementById("english_input");
    if (result.isCorrect) {
      // 맞았을 때
      element.setAttribute("readonly", true);
      element.setAttribute("style", "background-color: #e6ddd7; color:#141937");
      showAnswer(writing);
    } else {
      // 정답 틀렸을 때
      const percent = getMatchedWordPercent(
        result.bestMatchedText,
        textInWrinting
      );
      setMatchedPercent(percent);
    }

    setTryText(textInWrinting);
    setTextInWrinting("");
  };

  // 유저가 '정답보기' 버튼을 누른 경우
  const showAnswer = (writing: IWriting) => {
    setTryText(writing.main_en_text);
  };

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
            <div className="flex">
              <WritingImage imageUrl={writing.image_url} size={null} />
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
                  {writing.kr_text}
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
          <HelpJennySection
            writing={writing}
            callHelp={callHelp}
            moveNextWriting={props.moveNextWriting}
          />
        </div>
      </section>
    </Container>
  );
}

export default WritingBox;
