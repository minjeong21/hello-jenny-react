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
        <DialogTitle>와~ 맞았어요! 정말 대단하시군요! 💕</DialogTitle>
        <DialogDescription>
          <div className="flex">
            <div className="bg-brown-200 rounded px-1 mr-2">도전 문장</div>
            <div>{userSentence}</div>
          </div>
        </DialogDescription>
      </DialogBase>
    </>
  );
};

export default DialogCorrect;
