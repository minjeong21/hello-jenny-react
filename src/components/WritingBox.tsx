import { useEffect, useState } from "react";
import WritingImage from "./atoms/WritingImage";
import styled from "styled-components";
import Writing from "utils/Writing";
import FilterNavigation from "components/molecules/FilterNavigation";
import WritingForm from "components/WritingForm";
import DialogBox from "components/DialogBox";
import { useStores } from "states/Context";
import { observer } from "mobx-react";

const Container = styled.div`
  input {
    width: 100%;
    padding: 10px;
  }
  #explain-section {
    max-height: 300px;
    overflow-y: auto;
  }
`;

interface IProps {
  writingId: number;
  writing: Writing;
  moveNextWriting: (e: any) => void;
  updateFilter?: (e: any) => void;
  selectedLevels: string[];
  selectedThemes: string[];
}

const WritingBox = observer((props: IProps) => {
  const { writingId, writing } = props;
  const [textInWriting, setTextInWriting] = useState("");
  const [isShowColorHelp, setIsShowColorHelp] = useState(false);
  const { dialogStore } = useStores();

  useEffect(() => {
    dialogStore.setMoveNextWriing(props.moveNextWriting);
    dialogStore.resetWriting();
  }, []);
  /**
   * 도전하기 버튼 클릭 Event
   * */
  const onChange = (e: any) => {
    setTextInWriting(e.target.value);
    dialogStore.setTextInWriting(e.target.value);
  };

  const onSubmitChallenge = (event: any) => {
    const userSentence = dialogStore.textInWrinting;
    event.preventDefault();

    const isCorrect = writing.isCorrect(userSentence);
    const element: any = document.getElementById("english_input");
    if (isCorrect) {
      // 맞았을 때
      element.setAttribute("readonly", true);
      element.setAttribute("style", "background-color: #e6ddd7; color:#141937");
      dialogStore.addCorrect();
    } else {
      // 정답 틀렸을 때
      if (writing.isIgnoreCaseCorrect(userSentence)) {
        dialogStore.addWrong(isShowColorHelp, "대소문자를 확인해주세요!");
      } else if (writing.isIgnoreSpecialCharCorrect(userSentence)) {
        dialogStore.addWrong(
          isShowColorHelp,
          "마침표와 쉼표같은 특수문자를 확인해주세요!"
        );
      } else {
        dialogStore.addWrong(isShowColorHelp);
      }
      setIsShowColorHelp(true);
    }
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
      <div className="bg-white md:p-6 mt-2 p-3 md:flex rounded-lg shadow-custom">
        <div className="md:flex-shrink-0">
          <WritingImage imageUrl={writing.getImageURL()} size={null} />
        </div>
        <div className="md:ml-6 flex-1">
          <div>
            <div className="tracking-wide:sm text-sm">
              <div className="flex md:pb-6 pb-1">
                <div className="bg-gray-100 rounded-lg text-sm p-1 text-gray-700 border border-gray-300 mr-1">
                  <div>{writing.getLevelDisplayName()}</div>
                </div>
                <div className="bg-gray-100 rounded-lg text-sm p-1 text-gray-700 border border-gray-300 mr-1">
                  {writing.getMainTheme()}
                </div>
              </div>
            </div>

            {writing.getSituation() && (
              <p className="mt-3 text-gray-500 text-sm">
                {writing.getSituation()}
              </p>
            )}
            <div className="block mt-1 text-2xl leading-tight font-semibold text-gray-900 font-bold pb-3">
              {writing.getKoreanSentence()}
            </div>
          </div>

          <WritingForm
            onChange={onChange}
            onSubmitChallenge={onSubmitChallenge}
            textInWrinting={textInWriting}
            onClickHelpJenny={dialogStore.addHelpJenny}
            moveNextWriting={props.moveNextWriting}
          />
        </div>
      </div>
      <DialogBox writing={writing} />
    </Container>
  );
});

export default WritingBox;
