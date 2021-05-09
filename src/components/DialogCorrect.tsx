import DialogBase, {
  DialogDescription,
  DialogTitle,
} from "components/DialogBase";
import React from "react";
import styled from "styled-components";

const DialogCorrect = ({
  answerSentence,
  userSentence,
}: {
  answerSentence: string;
  userSentence: string;
}) => {
  return (
    <>
      <DialogBase>
        <DialogTitle>
          와~ 맞췄구나. 정말 대단하다! 대단한 내 친구 뿌듯해! 💕
        </DialogTitle>
        <DialogDescription>
          <div>정답문장 : {answerSentence}</div>
          <div>도전문장 : {userSentence}</div>
        </DialogDescription>
      </DialogBase>
    </>
  );
};

export default DialogCorrect;
