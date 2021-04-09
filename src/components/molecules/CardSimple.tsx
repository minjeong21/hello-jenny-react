import React from "react";
import { Card, Box, Text } from "grommet";
import { convertWritingATtoWriting } from "../../utils/ManagerSentence";
import { IWritingAT } from "../../interface/IWritingAT";
import { IWriting } from "../../interface/IWriting";

interface IProps {
  writingAT: IWritingAT;
  index: number;
}

export const CardSimple = ({ writingAT, index }: IProps) => {
  const writing: IWriting = convertWritingATtoWriting(writingAT);

  return (
    <Card
      onClick={() => (window.location.href = `/writing?index=${index}`)}
      justify="between"
      background={"#e7e7e7"}
      round={"0"}
      pad="small"
    >
      <Box>
        <Text size="small" weight="bold">
          {writing.korean_text}
        </Text>
      </Box>

      <Box height="small" pad="medium"></Box>

      <Box height="50px" direction="row" justify="between">
        <Text size="13px" weight="bold" color="#333333">
          {writing.publish_date}
        </Text>
        <Box>
          {writing.source_type ? (
            <Text size="small" weight="bold">
              {writing.source_type}
            </Text>
          ) : null}
        </Box>
      </Box>
      {writing.image_url ? (
        <Box align="center">
          <Box
            background={{
              color: "lightgray",
              dark: true,
              image: `url(${writing.image_url})`,
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
