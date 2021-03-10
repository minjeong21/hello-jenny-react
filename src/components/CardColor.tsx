import { Card, Box, Text } from "grommet";
import { cardBgColors } from "../theme";
import { IPracticeAT } from "../interface/IPracticeAT";
import { IPractice } from "../interface/IPractice";
import { convertPracticeATtoPractice } from "../ManagerSentence";

interface IProps {
  practiceAT: IPracticeAT;
  index: number;
  numid: number;
}

export const CardColor = ({ practiceAT, index, numid }: IProps) => {
  const practice: IPractice = convertPracticeATtoPractice(practiceAT);

  return (
    <Card
      onClick={() => (window.location.href = `/practice?numid=${numid}`)}
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
            {practice.publish_date}
          </Text>
        </Box>
        {practice.source_type ? (
          <Text size="small" weight="normal" color="#333333">
            {practice.source_type}
          </Text>
        ) : null}
      </Box>

      {practice.image_url ? (
        <Box pad="small" align="center">
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
            width="90%"
            height="300px"
          />
        </Box>
      ) : null}

      <Box height="small" pad="18px" align="center">
        <Text size="16px" weight="bold">
          {practice.korean_text}
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
