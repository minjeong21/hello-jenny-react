import DialogBase, { DialogTitle, DialogDescription } from "./DialogBase";
const DialogExplain = ({
  talkText,
  hints,
}: {
  talkText: string;
  hints: {
    description: string;
    description_more: string;
  }[];
}) => {
  return (
    <DialogBase>
      <DialogTitle>{talkText}</DialogTitle>
      {hints.map((hint, index) => (
        <div key={index} className="bg-gray-200 rounded">
          <DialogDescription
            children={
              <>
                <div className="font-bold p-1">
                  ({index + 1}) {hint.description}
                </div>
                {hint.description_more && (
                  <div className="p-2 text-sm text-gray-600">
                    {hint.description_more}
                  </div>
                )}
              </>
            }
          />
        </div>
      ))}
    </DialogBase>
  );
};
export default DialogExplain;
