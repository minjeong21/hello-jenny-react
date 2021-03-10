import React from "react";
import { Card, Box, Text } from "grommet";
import { convertPracticeATtoPractice } from "../ManagerSentence";
import { IPracticeAT } from "../interface/IPracticeAT";
import { IPractice } from "../interface/IPractice";

interface IProps {
  practiceAT: IPracticeAT;
  index: number;
}

export const CardSimple = ({ practiceAT, index }: IProps) => {
  const practice: IPractice = convertPracticeATtoPractice(practiceAT);

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
          {practice.korean_text}
        </Text>
      </Box>

      <Box height="small" pad="medium"></Box>

      <Box height="50px" direction="row" justify="between">
        <Text size="13px" weight="bold" color="#333333">
          {practice.publish_date}
        </Text>
        <Box>
          {practice.source_type ? (
            <Text size="small" weight="bold">
              {practice.source_type}
            </Text>
          ) : null}
        </Box>
      </Box>
      {practice.image_url ? (
        <Box align="center">
          <Box
            background={{
              color: "lightgray",
              dark: true,
              image: `url(${practice.image_url})`,
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
