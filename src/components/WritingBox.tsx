import React, { useEffect, useState } from "react";
import WritingImage from "./atoms/WritingImage";
import styled from "styled-components";
import Writing from "utils/Writing";
import WritingForm from "components/WritingForm";
import DialogBox from "components/DialogBox";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import { getLevelName, getThemeName } from "properties/Filter";
import BookMarkIcon from "./BookMarkIcon";
import FilterIcon from "./FilterIcon";

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
  openPopup?: () => void;
}

const WritingBox = observer((props: IProps) => {
  const { writingId, writing } = props;
  const [textInWriting, setTextInWriting] = useState("");
  const [isShowColorHelp, setIsShowColorHelp] = useState(false);
  const { dialogStore, writingStore } = useStores();

  useEffect(() => {
    dialogStore.setMoveNextWriing(props.moveNextWriting);
    dialogStore.resetWriting();
    setTextInWriting("");
    setIsShowColorHelp(false);
  }, [writingId, dialogStore]);
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
    if (isCorrect) {
      dialogStore.addCorrect();
      // 폭죽 효과
      document.querySelector("#firework")?.classList.add("firework");
      window.setTimeout(() => {
        document.querySelector("#firework")?.classList.remove("firework");
      }, 2000);
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
  const onClickBookmark = (e: any) => {
    // TODO: 북마크 구현
    e.target.classList.toggle("text-gray-300");
    e.target.classList.toggle("text-red-300");
  };

  return (
    <Container className="p-4 md:p-0" id="writing-box">
      <div id="firework">
        <div className="before"></div>
        <div className="after"></div>
      </div>
      <div
        className="flex cursor-pointer items-center"
        onClick={props.openPopup}
      >
        <div className="flex">
          {writingStore.selectedLevels.map((item) => (
            <div className="bg-primary-200 rounded-lg text-sm px-2 py-1 text-gray-700  mr-1 shadow-sm">
              {getLevelName(item)}
            </div>
          ))}
        </div>
        <div className="flex">
          {writingStore.selectedThemes.map((item) => (
            <div className="bg-primary-200 rounded-lg text-sm px-2 py-1 text-gray-700  mr-1 shadow-sm">
              {getThemeName(item)}
            </div>
          ))}
        </div>
        <div>
          <FilterIcon />
        </div>
      </div>
      {/* <!-- A marketing page card built entirely with utility classes --> */}
      <div className="bg-white md:p-6 mt-2 p-3 md:flex rounded-lg shadow-custom">
        <div className="md:flex-shrink-0 bg-gray-100">
          <WritingImage imageUrl={writing.getImageURL()} size={null} />
        </div>
        <div className="md:ml-6 flex-1">
          <div>
            <div className="tracking-wide:sm text-sm">
              <div className="flex justify-between">
                <div className="flex md:pb-6 pb-1">
                  <button
                    className="bg-gray-200 rounded-lg text-sm p-1 text-gray-700 shadow-sm mr-1"
                    onClick={props.openPopup}
                  >
                    <div>{writing.getLevelDisplayName()}</div>
                  </button>
                  {writing.getThemes()?.map((theme, index) => (
                    <button
                      key={index}
                      className="bg-gray-200 rounded-lg text-sm p-1 text-gray-700 shadow-sm mr-1"
                      onClick={props.openPopup}
                    >
                      {theme.display_name}
                    </button>
                  ))}
                </div>
                <div className="pl-6 pr-1" onClick={onClickBookmark}>
                  <BookMarkIcon />
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
