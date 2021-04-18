import React from "react";
import DialogBase from "components/DialogBase";
import IWriting from "interface/IWriting";

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
        <div>{talkText}</div>
        <div className="flex">
          <div className="flex pb-l">
            <div className="font-small font-gray-2 pr-l">{hint}</div>
          </div>
        </div>
      </div>
    </DialogBase>
  );
};

export const DialogJenny = () => {
  return (
    <DialogBase>
      <div>나 왔어~ 뭐 필요해? </div>
    </DialogBase>
  );
};

export const DialogAnswer = ({
  answer,
  userCentence,
}: {
  answer: string;
  userCentence: string;
}) => {
  return (
    <DialogBase>
      <div className="">
        <div>정답 문장은 여기있단다.... </div>
        <div>
          <div className="font-small font-gray-2 pr-l">정답 문장: {answer}</div>
          <div className="font-small font-gray-2 pr-l">
            도전 문장: {userCentence}
          </div>
        </div>
      </div>
    </DialogBase>
  );
};

export const DialogCorrect = ({
  writing,
  userCentence,
}: {
  writing: IWriting;
  userCentence: string;
}) => {
  return (
    <>
      <DialogBase>
        <div className="">
          <div>와~ 맞췄구나. 정말 대단하다! 대단한 내 친구 뿌듯해! 💕</div>
          <div className="font-small font-gray-2 pr-l">
            정답문장 : {writing.en_sentence}
          </div>
          <div className="font-small font-gray-2 pr-l">
            도전 문장 : {userCentence}
          </div>
        </div>
      </DialogBase>
    </>
  );
};
export const DialogWrong = ({
  writing,
  userCentence,
}: {
  writing: IWriting;
  userCentence: string;
}) => {
  return (
    <>
      <DialogBase>
        <div className="bg-primary-1">
          <div>앗 아쉽다! 조금만 더 도전해보자!</div>
          <div className="flex">
            <div className="flex pb-l">
              <div className="font-small font-gray-2 pr-l">
                도전 문장: {userCentence}
              </div>
            </div>
          </div>
        </div>
      </DialogBase>
    </>
  );
};
