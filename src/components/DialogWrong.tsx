import React from "react";
import DialogBase, {
  DialogDescription,
  DialogTitle,
} from "components/DialogBase";

const DialogWrong = ({
  percent,
  userSentenceWords,
  moreDescription,
  isShowHelp,
}: {
  percent: number;
  userSentenceWords: {
    word: string;
    correct: boolean;
    isLastChar?: boolean;
  }[];
  moreDescription?: string;
  isShowHelp: boolean;
}) => {
  return (
    <>
      <DialogBase>
        <div>
          <DialogTitle>
            {moreDescription ? (
              <div>🍀 {moreDescription}</div>
            ) : (
              <div>🍀 앗 아쉬워요, {percent}% 단어가 맞았어요.</div>
            )}

            {!isShowHelp && (
              <div className="inline">
                <span className="text-blue-700">&nbsp;(파랑이 맞는 단어, </span>
                <span className="text-pink-600">빨강이 틀린 단어에요.</span>)
              </div>
            )}
          </DialogTitle>

          <DialogDescription>
            (도전 문장)&nbsp;
            {userSentenceWords.map((item, index) => {
              return (
                <span
                  key={index}
                  className={`${
                    item.correct ? "text-blue-700" : "text-pink-600"
                  }`}
                >
                  {item.word}&nbsp;
                </span>
              );
            })}
          </DialogDescription>
        </div>
      </DialogBase>
    </>
  );
};

export default DialogWrong;
