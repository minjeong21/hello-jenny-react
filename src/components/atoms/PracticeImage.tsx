import React, { useState, useEffect } from "react";
import styled from "styled-components";
const Image = styled.div<{ src: string; size?: string }>`
  background-image: url(${(props) => props.src});
  height: 205px;
  width: ${(props) => (props.size ? props.size : "250px")};
  background-size: cover;
  background-position: center;
  border-radius: 7px;
`;
interface IProps {
  imageUrl: string;
  size: string | null;
}
const PracticeImage = ({ imageUrl, size }: IProps) => {
  return (
    <div>
      {size ? <Image src={imageUrl} size={size} /> : <Image src={imageUrl} />}
    </div>
  );
};

export default PracticeImage;
