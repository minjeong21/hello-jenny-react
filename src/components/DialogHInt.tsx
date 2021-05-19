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
          <div className="text-xs md:text-base">
            <div>
              <div className="inline">{hint}</div>
              {hintMore && !visibleMore && (
                <button
                  className="ml-2 bg-primary-600 rounded px-2 py-1 font-bold text-white "
                  onClick={() => setVisibleMore(true)}
                >
                  자세히
                </button>
              )}
            </div>

            {visibleMore && (
              <div className="flex flex-col">
                <div className="text-gray-600">{hintMore}</div>
                <button
                  className="m-1 bg-primary-600 rounded px-2 py-1 font-bold text-white mt-2 self-end"
                  onClick={() => setVisibleMore(false)}
                >
                  접기
                </button>
              </div>
            )}
          </div>
        }
      />
    </DialogBase>
  );
};
export default DialogHint;
