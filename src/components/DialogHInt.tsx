import React, { useState } from "react";
import DialogBase, { DialogTitle, DialogDescription } from "./DialogBase";
const DialogHint = ({
  talkText,
  hint,
  hintMore,
}: {
  talkText: string;
  hint: string;
  hintMore?: string;
}) => {
  const [visibleMore, setVisibleMore] = useState(false);
  return (
    <DialogBase>
      <DialogTitle>{talkText}</DialogTitle>
      <DialogDescription
        children={
          <>
            {hint}
            {hintMore && !visibleMore && (
              <button
                className="ml-2 bg-primary-500 p-3 text-white rounded px-2 py-1 text-sm"
                onClick={() => setVisibleMore(true)}
              >
                자세히
              </button>
            )}

            {visibleMore && (
              <div className="py-2 text-sm text-gray-600">
                {hintMore}
                <button
                  className="ml-2 bg-primary-500 p-3 text-white rounded px-2 py-1 text-sm"
                  onClick={() => setVisibleMore(false)}
                >
                  접기
                </button>
              </div>
            )}
          </>
        }
      />
    </DialogBase>
  );
};
export default DialogHint;
