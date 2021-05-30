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
      <div className="md:text-sm text-xs pt-2">
        <div className="text-xs md:text-base">
          <div>
            <div
              className="inline"
              dangerouslySetInnerHTML={{ __html: hint }}
            ></div>

            {hintMore && !visibleMore && (
              <button
                className="ml-2 bg-primary-700 rounded px-2 py-1 font-bold text-white "
                onClick={() => setVisibleMore(true)}
              >
                자세히
              </button>
            )}
          </div>

          {visibleMore && hintMore && (
            <div className="flex flex-col">
              <div
                className="text-gray-600 pt-3"
                dangerouslySetInnerHTML={{ __html: hintMore }}
              />

              <button
                className="m-1 bg-primary-700 rounded px-2 py-1 font-bold text-white mt-2 self-end"
                onClick={() => setVisibleMore(false)}
              >
                접기
              </button>
            </div>
          )}
        </div>
      </div>
    </DialogBase>
  );
};
export default DialogHint;
