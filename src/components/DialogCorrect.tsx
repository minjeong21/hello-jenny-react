import DialogBase, {
  DialogDescription,
  DialogTitle,
} from "components/DialogBase";

const DialogCorrect = ({ userSentence }: { userSentence: string }) => {
  return (
    <>
      <DialogBase>
        <DialogTitle>
          💕 와~ 맞았어요!! 정말 대단해요!! &nbsp;
          <img
            className="inline"
            src="/assets/party_blob.gif"
            width="25"
            alt="happy emoji"
          />
        </DialogTitle>
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
