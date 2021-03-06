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
import SettingIcon from "./SettingIcon";

const Container = styled.div`
  input {
    width: 100%;
    outline: none;
    background-color: inherit;
  }
  #explain-section {
    max-height: 60vh;
    overflow-y: auto;
  }
`;

interface IProps {
  writingId: number;
  writing: Writing;
  moveNextWriting: (e: any) => void;
  openPopup?: () => void;
  isDetailPage?: boolean;
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

  const onSubmitChallenge = (e: any) => {
    const userSentence = dialogStore.textInWrinting;
    e.preventDefault();

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
    <Container className="sm:p-0">
      {props.isDetailPage && (
        <>
          <div id="firework">
            <div className="before"></div>
            <div className="after"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex cursor-pointer" onClick={props.openPopup}>
              <div className="flex flex-wrap">
                {writingStore.selectedLevels.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 rounded-lg sm:text-sm text-xs px-2 py-1 text-gray-700  mr-1 shadow-sm mb-1"
                  >
                    {getLevelName(item)}
                  </div>
                ))}
                {writingStore.selectedThemes.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 rounded-lg sm:text-sm text-xs px-2 py-1 text-gray-700  mr-1 shadow-sm mb-1"
                  >
                    {getThemeName(item)}
                  </div>
                ))}
                <div>
                  <SettingIcon />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* <!-- A marketing page card built entirely with utility classes --> */}

      <div className="sm:hidden block">
        <DialogBox writing={writing} />
      </div>
      <section id="writing-box">
        <div className="bg-white sm:p-6 mt-2 p-3 sm:flex rounded-lg shadow-custom">
          <div className="sm:flex-shrink-0 bg-gray-100 sm:w-40 md:w-56 w-0">
            <WritingImage imageUrl={writing.getImageURL()} size={null} />
          </div>
          <div className="sm:ml-6 flex-1 relative">
            {/* 레벨/테마 */}
            <div
              className={`tracking-wide:sm text-sm ${
                props.isDetailPage ? "hidden" : ""
              }`}
            >
              <div className="flex justify-between ">
                <div className="flex sm:pb-6 pb-1">
                  <div className="bg-gray-200 rounded-lg sm:text-sm text-xs px-2 py-1 text-gray-700 shadow-sm mr-1">
                    <div>{writing.getLevelDisplayName()}</div>
                  </div>
                  {writing.getThemes()?.map((theme, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 rounded-lg text-sm p-1 text-gray-700 shadow-sm mr-1"
                    >
                      {theme.display_name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                {writing.getSituation() && (
                  <p className="sm:mt-3 mt-2 text-gray-500 sm:text-sm text-xs">
                    {writing.getSituation()}
                  </p>
                )}
                <div className="block mt-1 sm:text-2xl leading-tight sm:font-semibold text-gray-900 font-bold pb-3">
                  {writing.getKoreanSentence()}
                </div>
              </div>
              <div className="px-1 " onClick={onClickBookmark}>
                <BookMarkIcon />
              </div>
            </div>

            <WritingForm
              onChange={onChange}
              onSubmitChallenge={onSubmitChallenge}
              textInWrinting={textInWriting}
              onClickHelpJenny={dialogStore.addHelpJenny}
              moveNextWriting={props.moveNextWriting}
            />
            <section>
              {dialogStore.dialogButtons && (
                <div className="flex justify-end sm:pt-3 pt-1 flex-wrap">
                  {dialogStore.dialogButtons.map((item, index) => (
                    <SmallButton
                      key={index}
                      text={item.label}
                      onClick={item.onClick}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
      <div className="sm:block hidden">
        <DialogBox writing={writing} />
      </div>
    </Container>
  );
});

export default WritingBox;

const SmallButton = ({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) => (
  <button
    onClick={onClick}
    className="focus:outline-none text-xs sm:text-base font-bold sm:font-medium py-1 px-2 rounded  bg-gray-200 shadow-sm ml-1"
  >
    {text}
  </button>
);
