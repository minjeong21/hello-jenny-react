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
        <div className="font-quite">{talkText}</div>
        <div className="flex">
          <div className="flex pb-l">
            <div className="font-small text-gray-500 pr-12">{hint}</div>
          </div>
        </div>
      </div>
    </DialogBase>
  );
};

export const DialogJenny = () => {
  return (
    <DialogBase>
      <div className="font-quite">저 왔어요~ 뭘 도와드릴까요? </div>
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
        <div className="font-quite">정답은 이거에요! 잘하셨어요! </div>
        <div>
          <div className="font-small text-gray-500 pr-12">
            정답 문장: {answer}
          </div>
          <div className="font-small text-gray-500 pr-12">
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
          <div className="font-small text-gray-500 pr-12">
            정답문장 : {answerSentence}
          </div>
          <div className="font-small text-gray-500 pr-12">
            도전 문장 : {userSentence}
          </div>
        </div>
      </DialogBase>
    </>
  );
};
export const DialogWrong = ({
  percent,
  answerSentence,
  userSentence,
}: {
  percent: number;
  answerSentence: string;
  userSentence: string;
}) => {
  return (
    <>
      <DialogBase>
        <div>
          <div>앗 아쉬워요, {percent}%. 맞췄어요 💕</div>
          <div className="font-small text-gray-500 pr-12">
            정답문장 : {answerSentence}
          </div>
          <div className="font-small text-gray-500 pr-12">
            도전 문장 : {userSentence}
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
