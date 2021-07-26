import IHint from "interface/IHint";
import React, { ReactElement, useState } from "react";
import DialogBase, { DialogTitle } from "./DialogBase";
const DialogHint = ({ hint }: { hint: IHint }) => {
  let title = "";
  let description: string = hint.description;
  let descriptionMore = hint.description_more;

  switch (hint.type) {
    case "first":
      description = `<div>문장이 <span class="text-red-500">${description}</span>로 시작해요!</div>`;
      break;
    case "word":
      const postFix = ["가 쓰였어요.", " 단어가 있어요."];
      const index = Math.floor(Math.random() * postFix.length);
      description = `<div><span class="text-red-500">${description}</span>${postFix[index]}</div>`;
      break;
    case "blank":
      title = `마지막 힌트에요~! 화이팅~!`;
      break;
    case "grammar":
      title = `문법 힌트에요!`;
      break;
    case "keyword":
      title = `단어 힌트 나갑니다!`;
      break;
    default:
      title = "힌트 나갑니다~";
  }

  const [visibleMore, setVisibleMore] = useState(false);
  return (
    <DialogBase>
      <DialogTitle>
        <div className="flex mb-1 items-center">
          {title && <div>{title}</div>}
          <div>
            {descriptionMore && !visibleMore && (
              <button
                className="ml-3 bg-primary-700 rounded px-3 h-6 font-bold text-white text-right text-sm "
                onClick={() => setVisibleMore(true)}
              >
                자세히
              </button>
            )}
          </div>
        </div>
      </DialogTitle>
      <div className="sm:text-sm text-xs">
        <div className="text-xs sm:text-base">
          {description && (
            <div>
              <div
                className="inline"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </div>
          )}

          {visibleMore && descriptionMore && (
            <div className="flex flex-col">
              <div
                className="text-gray-600 pt-3"
                dangerouslySetInnerHTML={{ __html: descriptionMore }}
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
