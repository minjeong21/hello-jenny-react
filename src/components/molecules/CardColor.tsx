import { Card, Box, Text } from "grommet";
import { cardBgColors } from "../../theme";
import { IWritingAT } from "../../interface/IWritingAT";
import { IWriting } from "../../interface/IWriting";
import { convertWritingATtoWriting } from "../../utils/ManagerSentence";

interface IProps {
  writingAT: IWritingAT;
  index: number;
  numid: number;
  moveWriting: (value: number) => void;
}

export const CardColor = ({ writingAT, index, numid, moveWriting }: IProps) => {
  const writing: IWriting = convertWritingATtoWriting(writingAT);

  return (
    <Card
      onClick={() => moveWriting(numid)}
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
            {writing.publish_date}
          </Text>
        </Box>
        {writing.source_type ? (
          <Text size="small" weight="normal" color="#333333">
            {writing.source_type}
          </Text>
        ) : null}
      </Box>

      {writing.image_url ? (
        <Box pad="small" align="center">
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
            width="90%"
            height="300px"
          />
        </Box>
      ) : null}

      <Box height="small" pad="18px" align="center">
        <Text size="16px" weight="bold">
          {writing.korean_text}
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
