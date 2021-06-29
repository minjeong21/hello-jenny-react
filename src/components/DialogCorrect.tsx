import DialogBase, {
  DialogDescription,
  DialogTitle,
} from "components/DialogBase";

const DialogCorrect = ({ userSentence }: { userSentence: string }) => {
  return (
    <>
      <DialogBase>
        <DialogTitle>
         
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
