import React, { useEffect, useState } from "react";
import WritingImage from "./atoms/WritingImage";
import styled from "styled-components";
import Writing from "utils/Writing";
import WritingForm from "components/WritingForm";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import BookMarkIcon from "./BookMarkIcon";
import HeartIcon from "./icons/HeartIcon";

const Container = styled.div`
  input {
    width: 100%;
    outline: none;
    background-color: inherit;
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
    dialogStore.resetWriting();
    setTextInWriting("");
    setIsShowColorHelp(false);
  }, [writingId, dialogStore]);

  return (
    <Container className="sm:p-0">
      {/* <!-- A marketing page card built entirely with utility classes --> */}

      <section id="writing-box">
        <div className="bg-white sm:p-6 mt-2 p-3 sm:flex rounded-lg shadow-custom">
          <div className="sm:flex-shrink-0 bg-gray-100 sm:w-40 md:w-56 w-0">
            <WritingImage imageUrl={writing.getImageURL()} size={null} />
          </div>
          <div className="sm:ml-6 flex-1 relative">
            {/* 레벨/테마 */}
            <div className={`tracking-wide:sm text-sm`}>
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
            <div className="">
              {writing.getSituation() ? (
                <p className="mt-3 text-gray-500 sm:text-sm text-xs">
                  {writing.getSituation()}
                </p>
              ) : (
                <>
                  {props.isDetailPage ? (
                    <p className="mt-3 text-gray-500 sm:text-sm text-xs">
                      Let's make it!
                    </p>
                  ) : null}
                </>
              )}

              <div className="pl-6 pr-1 absolute right-0 top-0 text-primary-600">
                <HeartIcon />
              </div>
            </div>

            <div className="block mt-1 sm:text-2xl leading-tight sm:font-semibold text-gray-900 font-bold pb-3">
              {writing.getKoreanSentence()}
            </div>

            <WritingForm
              onChange={(e) => {}}
              onSubmitChallenge={(e) => {}}
              textInWrinting={textInWriting}
            />
            <section>
              {dialogStore.dialogButtons && (
                <div className="flex justify-end pt-3 flex-wrap">
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
    className="focus:outline-none text-xs sm:text-base font-bold sm:font-medium py-1 px-2 rounded text-white bg-brown-500 hover:bg-brown-700 ml-1"
  >
    {text}
  </button>
);
