import React from "react";

import { Card, Box, Text } from "grommet";
import { IPractice } from "../interface/IPractice";
import { cardBgColors } from "../theme";

interface IProps {
  practice: IPractice;
  index: number;
}

export const CardSimple = ({ practice, index }: IProps) => {
  return (
    <Card
      onClick={() => (window.location.href = `/practice?index=${index}`)}
      justify="between"
      background={"#e7e7e7"}
      round={"0"}
      pad="small"
    >
      <Box>
        <Text size="small" weight="bold">
          {practice.kor_text}
        </Text>
      </Box>

      <Box height="small" pad="medium"></Box>

      <Box height="50px" direction="row" justify="between">
        <Text size="13px" weight="bold" color="#333333">
          {practice.date}
        </Text>
        <Box>
          {practice.type && practice.type.length > 0
            ? practice.type.map((item) => (
                <Text size="small" weight="bold">
                  {item}
                </Text>
              ))
            : null}
        </Box>
      </Box>
      {practice.related_images ? (
        <Box align="center">
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
            width="100%"
            height="medium"
          />
        </Box>
      ) : null}
    </Card>
  );
};
