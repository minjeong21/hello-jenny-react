import { useEffect, useState } from "react";
import WritingImage from "./atoms/WritingImage";
import styled from "styled-components";
import Writing from "utils/Writing";
import Level from "components/atoms/Level";
import FilterNavigation from "components/molecules/FilterNavigation";
import WritingForm from "components/WritingForm";
import DialogManager from "utils/DialogManager";
import DialogBox from "components/DialogBox";

const Container = styled.div`
  input {
    width: 100%;
    padding: 10px;
  }
  #explain-section {
    max-height: 250px;
    overflow-y: auto;
  }
`;

interface IProps {
  writingId: number;
  Writing: Writing;
  moveNextWriting: (e: any) => void;
  updateFilter?: (e: any) => void;
  selectedLevels: string[];
  selectedThemes: string[];
}

const WritingBox = (props: IProps) => {
  const { writingId, Writing } = props;
  const [dialogManager, setDialogManager] = useState<DialogManager>(
    new DialogManager(Writing)
  );

  const [dialogCount, setDialogCount] = useState(0);
  const [textInWrinting, setTextInWrinting] = useState("");
  const [currentDialogType, setCurrentDialogType] = useState("");
  const [isShowColorHelp, setIsShowColorHelp] = useState(false);

  useEffect(() => {
    resetWriting();
  }, [writingId]);

  const resetWriting = () => {
    setDialogCount(0);
    setTextInWrinting("");
    setIsShowColorHelp(false);
    setDialogManager(new DialogManager(Writing));
    const englishInput: any = document.getElementById("english_input");

    if (englishInput) {
      englishInput.readOnly = false;
      englishInput.setAttribute("style", "background-color: white");
      englishInput.addEventListener("focus", scrollEvent);
    }
  };

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

    const isCorrect = Writing.isCorrect(textInWrinting);
    const element: any = document.getElementById("english_input");
    if (isCorrect) {
      // 맞았을 때
      element.setAttribute("readonly", true);
      element.setAttribute("style", "background-color: #e6ddd7; color:#141937");
      setCurrentDialogType("correct");
      dialogManager.addCorrect(Writing.getAnswerSentence());
    } else {
      // 정답 틀렸을 때
      if (Writing.isIgnoreCaseCorrect(textInWrinting)) {
        setCurrentDialogType("wrong");
        dialogManager.addWrong(
          textInWrinting,
          isShowColorHelp,
          "대소문자를 확인해주세요!"
        );
      } else if (Writing.isIgnoreSpecialCharCorrect(textInWrinting)) {
        setCurrentDialogType("wrong");
        dialogManager.addWrong(
          textInWrinting,
          isShowColorHelp,
          "마침표와 쉼표같은 특수문자를 확인해주세요!"
        );
      } else {
        setCurrentDialogType("wrong");
        dialogManager.addWrong(textInWrinting, isShowColorHelp);
      }
      setIsShowColorHelp(true);
    }
    setDialogCount(dialogCount + 1);
  };

  const onShowAnswer = () => {
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
      {props.updateFilter ? (
        <FilterNavigation
          updateFilter={props.updateFilter}
          selectedLevels={props.selectedLevels}
          selectedThemes={props.selectedThemes}
        />
      ) : null}
      {/* <!-- A marketing page card built entirely with utility classes --> */}
      <div className="bg-white  md:flex p-4 rounded-lg shadow-custom">
        <div className="md:flex-shrink-0">
          <WritingImage imageUrl={Writing.getImageURL()} size={null} />
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 flex-1">
          <div>
            <div className="uppercase tracking-wide text-sm">
              <div className="flex pb-6">
                <Level levelNumber={Writing.getLevel()} />
                <div className="ml-2 ">{Writing.getMainTheme()}</div>
              </div>
            </div>

            {Writing.getSituation() && (
              <p className="mt-2 text-gray-500 text-sm">
                {Writing.getSituation()}
              </p>
            )}
            <div className="block mt-1 text-2xl leading-tight font-semibold text-gray-900 font-bold pb-3">
              {Writing.getKoreanSentence()}
            </div>
          </div>

          <WritingForm
            setTextInWrinting={setTextInWrinting}
            onSubmitChallenge={onSubmitChallenge}
            textInWrinting={textInWrinting}
            onClickHelpJenny={onClickHelpJenny}
            moveNextWriting={props.moveNextWriting}
          />
        </div>
      </div>
      <DialogBox
        Writing={Writing}
        moveNextWriting={props.moveNextWriting}
        onShowAnswer={onShowAnswer}
        setCurrentDialogType={setCurrentDialogType}
        dialogManager={dialogManager}
        dialogType={currentDialogType}
        dialogCount={dialogCount}
        setDialogCount={setDialogCount}
        resetWriting={resetWriting}
      />
    </Container>
  );
};

export default WritingBox;
