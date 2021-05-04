import React from "react";
import DialogBase from "components/DialogBase";

export const DialogHint = ({
  talkText,
  hint,
}: {
  talkText: string;
  hint: string;
}) => {
  return (
    <DialogBase>
      <div className="">
        <div className="font-quite pb-2">{talkText}</div>
        <div className="flex">
          <div className="flex pb-l">
            <div className="font-small text-purple-700 pr-12 whitespace-pre-line">
              {hint}
            </div>
          </div>
        </div>
      </div>
    </DialogBase>
  );
};

export const DialogJenny = () => {
  return (
    <DialogBase>
      <div className="font-quite pb-2">저 왔어요~ 뭘 도와드릴까요? </div>
    </DialogBase>
  );
};

export const DialogAnswer = ({
  answer,
  userSentence,
}: {
  answer: string;
  userSentence: string;
}) => {
  return (
    <DialogBase>
      <div className="">
        <div className="font-quite pb-2">정답은 이거에요! 잘하셨어요! </div>
        <div>
          <div className="font-small text-purple-700 pr-12 whitespace-pre-line">
            정답 문장: {answer}
          </div>
          <div className="font-small text-purple-700 pr-12 whitespace-pre-line">
            도전 문장: {userSentence}
          </div>
        </div>
      </div>
    </DialogBase>
  );
};

export const DialogCorrect = ({
  answerSentence,
  userSentence,
}: {
  answerSentence: string;
  userSentence: string;
}) => {
  return (
    <>
      <DialogBase>
        <div className="">
          <div>와~ 맞췄구나. 정말 대단하다! 대단한 내 친구 뿌듯해! 💕</div>
          <div className="font-small text-purple-700 pr-12 whitespace-pre-line">
            정답문장 : {answerSentence}
          </div>
          <div className="font-small text-purple-700 pr-12 whitespace-pre-line">
            도전 문장 : {userSentence}
          </div>
        </div>
      </DialogBase>
    </>
  );
};
export const DialogWrong = ({
  percent,
  userSentenceWords,
  answerWords,
  moreDescription,
}: {
  percent: number;
  userSentenceWords: string[];
  answerWords: string[];
  moreDescription?: string;
}) => {
  return (
    <>
      <DialogBase>
        <div>
          <div className="font-quite pb-2">
            앗 아쉬워요, {percent}% 단어가 맞았어요.💕 (
            <span className="text-blue-700">&nbsp;파랑이 맞는 단어</span>,{" "}
            <span className="text-pink-600">빨강이 틀린 단어에요.</span>)
          </div>
          {moreDescription ? <div>{moreDescription}</div> : null}

          <div className="font-small pr-12 whitespace-pre-line">
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
          </div>
        </div>
      </DialogBase>
    </>
  );
};

export const DialogUser = ({ text }: { text: string }) => {
  return (
    <div className="text-right">
      <div className="bg-yellow-100 p-2 rounded-lg ml-4">{text}</div>
    </div>
  );
};
