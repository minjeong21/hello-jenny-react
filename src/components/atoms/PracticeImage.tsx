import React, { useState, useEffect } from "react";
import styled from "styled-components";
const Image = styled.div<{ src: any }>`
  background-image: url(${(props) => props.src});
  height: 205px;
  width: 250px;
  background-size: cover;
  background-position: center;
  border-radius: 7px;
`;
interface IProps {
  imageUrl: string;
}
const PracticeImage = ({ imageUrl }: IProps) => {
  return (
    <div>
      <Image src={imageUrl} />
    </div>
  );
};

export default PracticeImage;
