import React from "react";

import { Card, Box, Text } from "grommet";
import { IPractice } from "../interface/IPractice";
import { cardBgColors } from "../theme";

interface IProps {
  practice: IPractice;
  index: number;
}

export const CardColor = ({ practice, index }: IProps) => {
  return (
    <Card
      onClick={() => (window.location.href = `/practice?index=${index}`)}
      justify="between"
      background={cardBgColors[index]}
      key={"baba"}
      round={"0"}
      pad="small"
      elevation="none"
    >
      <Box height="120px" direction="row" justify="between">
        <Box>
          <Text size="small" weight="normal" color="#333333">
            {practice.date}
          </Text>
        </Box>
        {practice.type && practice.type.length > 0
          ? practice.type.map((item) => (
              <Text size="small" weight="normal" color="#333333">
                {item}
              </Text>
            ))
          : null}
      </Box>

      {practice.related_images ? (
        <Box pad="small" align="center">
          <Box
            background={{
              color: "lightgray",
              dark: true,
              image: `url(${practice.related_images[0].link})`,
              opacity: 0.9,
              repeat: "no-repeat",
              size: "cover",
              position: "center",
            }}
            width="90%"
            height="300px"
          />
        </Box>
      ) : null}

      <Box height="small" pad="18px" align="center">
        <Text size="16px" weight="bold">
          {practice.korText}
        </Text>
      </Box>

      <Box height="50px" direction="row" justify="between">
        <Box>
          <Text size="small">Level 1</Text>
        </Box>
        <Text size="13px" color="#333333">
          created by koo
        </Text>
      </Box>
    </Card>
  );
};
