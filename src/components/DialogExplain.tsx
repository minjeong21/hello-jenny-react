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
                ({index + 1})
                <div
                  className="font-bold p-1"
                  dangerouslySetInnerHTML={{ __html: hint.description }}
                />
                {hint.description_more && (
                  <div
                    className="p-2 text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: hint.description_more }}
                  />
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
