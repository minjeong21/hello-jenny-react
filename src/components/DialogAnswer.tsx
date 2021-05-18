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
      <DialogTitle>모범 답안은 이거에요! 잘했어요!!</DialogTitle>
      <>
        <div className="flex">
          <div className="bg-brown-200 rounded px-1 mr-2">모범 답안</div>
          <div>{answer}</div>
        </div>
        <div className="flex">
          <div className="bg-brown-200 rounded px-1 mr-2">도전 문장</div>
          <div> {userSentence}</div>
        </div>
      </>
    </DialogBase>
  );
};
export default DialogAnswer;
