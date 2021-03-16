import React, { useState, useEffect } from "react";
import { Box } from "grommet";
interface IProps {
  imageUrl: string;
}
const PracticeImage = ({ imageUrl }: IProps) => {
  return (
    <Box
      background={{
        color: "lightgray",
        dark: true,
        image: `url(${imageUrl})`,
        repeat: "no-repeat",
        size: "cover",
        position: "center",
      }}
      width="large"
      height={{ min: "250px" }}
    />
  );
};

export default PracticeImage;
