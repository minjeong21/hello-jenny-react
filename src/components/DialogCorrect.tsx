import DialogBase, {
  DialogDescription,
  DialogTitle,
} from "components/DialogBase";

const DialogCorrect = ({ userSentence }: { userSentence: string }) => {
  return (
    <>
      <DialogBase>
        <DialogTitle>
          π μ~ λ§μμ΄μ!! μ λ§ λλ¨ν΄μ!! &nbsp;
          <img
            className="inline"
            src="/assets/party_blob.gif"
            width="25"
            alt="happy emoji"
          />
        </DialogTitle>
        <DialogDescription>
          <div className="flex">
            <div className="bg-brown-200 rounded px-1 mr-2">λμ  λ¬Έμ₯</div>
            <div>{userSentence}</div>
          </div>
        </DialogDescription>
      </DialogBase>
    </>
  );
};

export default DialogCorrect;
