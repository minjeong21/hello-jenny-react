import React from "react";
import CardSimpleV2 from "components/molecules/CardSimpleV2";
import IWriting from "interface/IWriting";
import Writing from "utils/Writing";

const WritingList = ({
  writingList,
  moveWriting,
}: {
  writingList: IWriting[];
  moveWriting: (value: number) => void;
}) => {
  return (
    <div className="md:flex">
      {writingList.map((item, index) => (
        <CardSimpleV2
          key={index}
          Writing={new Writing(item)}
          index={index}
          id={item.id}
          moveWriting={moveWriting}
        />
      ))}
    </div>
  );
};

export default WritingList;
