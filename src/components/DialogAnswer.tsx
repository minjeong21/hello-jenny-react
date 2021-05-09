import React from "react";
import DialogBase, {
  DialogDescription,
  DialogTitle,
} from "components/DialogBase";

const DialogAnswer = ({
  answer,
  userSentence,
}: {
  answer: string;
  userSentence: string;
}) => {
  return (
    <DialogBase>
      <DialogTitle>정답은 이거에요! 잘했어요!!</DialogTitle>
      <DialogDescription>
        <div className="font-small pr-12 whitespace-pre-line">
          정답 문장: {answer}
        </div>
        <div className="font-small pr-12 whitespace-pre-line">
          도전 문장: {userSentence}
        </div>
      </DialogDescription>
    </DialogBase>
  );
};
export default DialogAnswer;
