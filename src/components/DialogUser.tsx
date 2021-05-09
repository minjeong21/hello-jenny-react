import DialogBase from "components/DialogBase";
import styled from "styled-components";

export const DialogUser = ({ text }: { text: string }) => {
  return (
    <div className="text-right">
      <div className="bg-yellow-100 p-2 rounded-lg ml-4">{text}</div>
    </div>
  );
};
