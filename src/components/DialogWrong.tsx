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
              <div>π {moreDescription}</div>
            ) : (
              <div>π μ μμ¬μμ, {percent}% λ¨μ΄κ° λ§μμ΄μ.</div>
            )}

            {!isShowHelp && (
              <div className="inline">
                <span className="text-blue-700">&nbsp;(νλμ΄ λ§λ λ¨μ΄, </span>
                <span className="text-pink-600">λΉ¨κ°μ΄ νλ¦° λ¨μ΄μμ.</span>)
              </div>
            )}
          </DialogTitle>

          <DialogDescription>
            (λμ  λ¬Έμ₯)&nbsp;
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
