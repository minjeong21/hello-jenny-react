import { useEffect, useState } from "react";
import WritingImage from "./atoms/WritingImage";
import styled from "styled-components";
import Writing from "utils/Writing";
import Level from "components/atoms/Level";
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
  const [isShowColorHelp, setIsShowColorHelp] = useState(false);
  const { dialogStore } = useStores();
  dialogStore.setMoveNextWriing(props.moveNextWriting);

  /**
   * 도전하기 버튼 클릭 Event
   * */
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
      <div className="bg-white  md:flex p-4 rounded-lg shadow-custom">
        <div className="md:flex-shrink-0">
          <WritingImage imageUrl={writing.getImageURL()} size={null} />
        </div>
        <div className="mt-4 md:mt-0 md:ml-6 flex-1">
          <div>
            <div className="uppercase tracking-wide text-sm">
              <div className="flex pb-6">
                <Level levelNumber={writing.getLevel()} />
                <div className="ml-2 ">{writing.getMainTheme()}</div>
              </div>
            </div>

            {writing.getSituation() && (
              <p className="mt-2 text-gray-500 text-sm">
                {writing.getSituation()}
              </p>
            )}
            <div className="block mt-1 text-2xl leading-tight font-semibold text-gray-900 font-bold pb-3">
              {writing.getKoreanSentence()}
            </div>
          </div>

          <WritingForm
            setTextInWrinting={dialogStore.setTextInWriting}
            onSubmitChallenge={onSubmitChallenge}
            textInWrinting={dialogStore.textInWrinting}
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
