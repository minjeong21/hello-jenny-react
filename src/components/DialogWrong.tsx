import React from "react";
import DialogBase, {
  DialogDescription,
  DialogTitle,
} from "components/DialogBase";

const DialogWrong = ({
  percent,
  userSentenceWords,
  answerWords,
  moreDescription,
  isShowHelp,
}: {
  percent: number;
  userSentenceWords: string[];
  answerWords: string[];
  moreDescription?: string;
  isShowHelp: boolean;
}) => {
  return (
    <>
      <DialogBase>
        <div>
          <DialogTitle>
            {moreDescription ? (
              <div>🍀 단어는 모두 맞았지만.. {moreDescription}</div>
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
            {userSentenceWords.map((word, index) => {
              const has = answerWords.includes(word);
              return (
                <span
                  key={index}
                  className={`${has ? "text-blue-700" : "text-pink-600"}`}
                >
                  {word}&nbsp;
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
