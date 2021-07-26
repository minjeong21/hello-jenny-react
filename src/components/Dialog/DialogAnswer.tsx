import DialogBase, { DialogTitle } from "./DialogBase";

const DialogAnswer = ({
  answer,
  userSentence,
  shortDescription
}: {
  answer: string;
  userSentence: string;
  shortDescription: string | null;
}) => {
  return (
    <DialogBase>
      <DialogTitle>모범 답안은 이거에요! 잘했어요!!</DialogTitle>
      <div className="pt-2 sm:text-sm text-xs">
        <div className="flex flex-wrap">
          <div className="bg-brown-200 rounded px-1 mr-2 mb-1">모범답안</div>
          <div>{answer}</div>
        </div>
        {shortDescription && <div className="flex flex-wrap">
          <div className="bg-brown-200 rounded px-1 mr-2 mb-1">짧은 설명</div><div>{shortDescription}</div></div>}

      </div>
    </DialogBase>
  );
};
export default DialogAnswer;
