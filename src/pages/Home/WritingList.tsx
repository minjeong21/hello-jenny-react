import React from "react";
import CardSimpleV2 from "../../components/molecules/CardSimpleV2";
import IWriting from "../../interface/IWriting";

const WritingList = ({
  writingList,
  moveWriting,
  viewSize,
}: {
  writingList: IWriting[];
  moveWriting: (value: number) => void;
  viewSize: string;
}) => {
  if (viewSize === "small") {
    return (
      <div className="flex-column">
        {writingList.map((item, index) => (
          <CardSimpleV2
            key={index}
            writing={item}
            index={index}
            id={item.id}
            moveWriting={moveWriting}
          />
        ))}
      </div>
    );
  } else if (viewSize === "medium") {
    return (
      <div className="flex">
        {writingList.map((item, index) => (
          <CardSimpleV2
            key={index}
            writing={item}
            index={index}
            id={item.id}
            moveWriting={moveWriting}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex">
        {writingList.map((item, index) => (
          <CardSimpleV2
            key={index}
            writing={item}
            index={index}
            id={item.id}
            moveWriting={moveWriting}
          />
        ))}
      </div>
    );
  }
};

export default WritingList;
