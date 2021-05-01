import React from "react";
import CardSimpleV2 from "components/molecules/CardSimpleV2";
import IWriting from "interface/IWriting";
import WritingManager from "utils/WritingManager";

const WritingList = ({
  writingList,
  moveWriting,
}: {
  writingList: IWriting[];
  moveWriting: (value: number) => void;
}) => {
  return (
    <div className="flex">
      {writingList.map((item, index) => (
        <CardSimpleV2
          key={index}
          writingManager={new WritingManager(item)}
          index={index}
          id={item.id}
          moveWriting={moveWriting}
        />
      ))}
    </div>
  );
};

export default WritingList;
