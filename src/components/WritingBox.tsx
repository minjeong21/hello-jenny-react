import React, { useEffect, useState } from "react";
import WritingImage from "./atoms/WritingImage";
import styled from "styled-components";
import Writing from "utils/Writing";
import WritingForm from "components/WritingForm";
import DialogBox from "components/Dialog/DialogBox";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import { getLevelName } from "properties/Filter";
import HeartIcon from "./icons/HeartIcon";
import LocalStorage from "utils/LocalStorage";
import RightArrowIcon from "./icons/RightArrowIcon";
import LeftArrowIcon from "./icons/LeftArrowIcon";

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

  .checked {
    color: var(--color-primary-600) !important;
  }
`;

interface IProps {
  writingId: number;
  writing: Writing;
  goNextWriting: () => void;
  goPreviosWriting: () => void;
}

const WritingBox = observer((props: IProps) => {
  const { writingId, writing } = props;
  const [textInWriting, setTextInWriting] = useState("");
  const [checkedBookmark, setCheckedBookmark] = useState(false);
  const [tryStatusText, setTryStatusText] = useState<any>();
  const [userSentence, setUserSentence] = useState("");
  const { dialogStore, writingStore, userActivityStore } = useStores();
  useEffect(() => {
    dialogStore.resetWriting();
    setTextInWriting("");
    setUserSentence("");
    setTryStatusText("");
    setCheckedBookmark(userActivityStore.hasBookmark(writingId));
  }, [writingId, dialogStore, userActivityStore]);

  /**
   * 도전하기 버튼 클릭 Event
   * */
  const onChange = (e: any) => {
    setTextInWriting(e.target.value);
    dialogStore.setTextInWriting(e.target.value);
  };

  const addSolvedWritingIfSolved = () => {
    const token = LocalStorage.getToken();
    if (!dialogStore.isShownAnswer && token) {
      userActivityStore.addSolvedWriting(writingId, token);
    }
  };

  const onSubmitChallenge = (e: any) => {
    const userSentence = dialogStore.textInWrinting;
    dialogStore.userSentence = userSentence;
    setUserSentence(userSentence);
    e.preventDefault();

    const isCorrect = writing.isCorrect(userSentence);
    if (isCorrect) {
      setTryStatusText(
        <div>
          💕 와~ 맞았어요!! 정말 대단해요!! &nbsp;
          <img
            className="inline"
            src="/assets/party_blob.gif"
            width="25"
            alt="happy emoji"
          />
        </div>
      );
      // dialogStore.addCorrect();
      addSolvedWritingIfSolved();
      // 폭죽 효과
      document.querySelector("#firework")?.classList.add("firework");
      window.setTimeout(() => {
        document.querySelector("#firework")?.classList.remove("firework");
      }, 2000);
    } else {
      const percent = writing.getMatchedWordPercent(userSentence);
      // 정답 틀렸을 때
      if (writing.isIgnoreCaseCorrect(userSentence)) {
        setTryStatusText("대소문자를 확인해주세요!");
      } else if (writing.isIgnoreSpecialCharCorrect(userSentence)) {
        setTryStatusText("마침표와 쉼표같은 특수문자를 확인해주세요!");
      } else if (writing.isContainsAllWords(userSentence)) {
        setTryStatusText("단어가 더 필요해요!");
      } else if (percent == 100) {
        setTryStatusText(`🍀 단어는 모두 맞았지만, 순서가 달라요 😭`);
      } else {
        setTryStatusText(`🍀 앗 아쉬워요, ${percent}% 단어가 맞았어요.`);
      }
    }
  };
  const onClickBookmark = (e: any) => {
    const token = LocalStorage.getToken();
    if (token && !checkedBookmark) {
      userActivityStore.addBookmark(writingId, token);
      setCheckedBookmark(true);
    } else if (token) {
      userActivityStore.removeBookmark(writingId, token);
      setCheckedBookmark(false);
    } else {
      alert("로그인을 먼저 진행해주세요.");
    }
  };

  return (
    <Container className="sm:p-0">
      <>
        <div id="firework">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      </>

      {/* <!-- A marketing page card built entirely with utility classes --> */}
      {/* <div className="sm:hidden block">
        <DialogBox writing={writing} />
      </div> */}
      <section id="writing-box">
        {/* 태그 시작 */}
        <div className="flex items-center justify-between sm:pb-1">
          <div className="flex flex-wrap cursor-default">
            <div className="bg-gray-200 rounded-lg sm:text-sm text-xs px-2 py-1 text-gray-700  mr-1 shadow-sm mb-1">
              {writingStore.getCurrentThemeDisplayName()}
            </div>
            <div className="bg-gray-200 rounded-lg sm:text-sm text-xs px-2 py-1 text-gray-700  mr-1 shadow-sm mb-1">
              {writingStore.getCurrentLevel()}
            </div>
          </div>
          <div className="flex">
            <div className="bg-primary-200 rounded-lg sm:text-sm text-xs py-1 text-gray-700  mr-1 shadow-sm mb-1 items-center flex">
              <button onClick={props.goPreviosWriting}>
                <LeftArrowIcon />
              </button>
              <div className="flex">
                {writingStore.currentIndex + 1}/
                {writingStore.currentTheme?.count}
              </div>
              <button onClick={props.goNextWriting}>
                <RightArrowIcon />
              </button>
            </div>
          </div>
          <div
            className={`px-1 cursor-pointer ${
              checkedBookmark ? "text-primary-600" : "text-gray-300"
            }`}
            onClick={onClickBookmark}
          >
            <HeartIcon />
          </div>
        </div>
        {/* 태그 끝 */}

        <div className="bg-white sm:p-6 mt-2 p-3 shadow-custom rounded-lg">
          <div className="sm:flex">
            <div className="sm:flex-shrink-0 bg-gray-100 sm:w-40 md:w-56 w-0">
              <WritingImage imageUrl={writing.getImageURL()} size={null} />
            </div>
            <div className="sm:ml-6 flex-1 relative">
              {/* 레벨/테마 */}
              <div className={`text-sm hidden`}>
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
                  <p className="sm:mt-3 mt-2 text-gray-500 sm:text-sm text-xs">
                    {writing.getSituation()}
                  </p>

                  <div className="block mt-1 sm:text-2xl leading-tight sm:font-semibold text-gray-900 font-bold pb-3">
                    {writing.getKoreanSentence()}
                  </div>
                </div>
              </div>
              {/* 도전 문장 */}
              <>
                {dialogStore.userSentence &&
                  writing
                    .getCompareUserSentenceWords(dialogStore.userSentence)
                    .map((item, index) => {
                      return (
                        <span
                          key={index}
                          className={`text-sm ${
                            item.correct ? "text-blue-700" : "text-pink-600"
                          }`}
                        >
                          {item.word}&nbsp;
                        </span>
                      );
                    })}

                {tryStatusText && (
                  <div className="text-xs pt-1 pb-2">{tryStatusText}</div>
                )}
              </>

              <WritingForm
                onChange={onChange}
                onSubmitChallenge={onSubmitChallenge}
                textInWrinting={textInWriting}
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
        </div>
      </section>
      <div>
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
    className="focus:outline-none text-xs sm:text-base font-bold sm:font-medium py-1 px-2 rounded  bg-gray-200 shadow-sm ml-1 relative"
  >
    {text}
  </button>
);
