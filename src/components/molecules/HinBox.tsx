import { Box, Text } from "grommet";

const HintBox = ({
  hintNumber,
  matchedPercent,
}: {
  hintNumber: number;
  matchedPercent: number;
}) => {
  return (
    <>
      {hintNumber > 0 ? (
        <Box pad={{ bottom: "medium" }} direction="row">
          <Text weight="bold">단어를 {matchedPercent}% 맞췄습니다.</Text>
        </Box>
      ) : null}

      {hintNumber > 1 ? (
        <Box pad={{ bottom: "medium" }} direction="row">
          <Text weight="bold"> 2 색깔을 칠한다</Text>
        </Box>
      ) : null}

      {hintNumber > 2 ? (
        <Box pad={{ bottom: "medium" }} direction="row">
          <Text weight="bold"> 3 웹에서 힌트를 가져</Text>
        </Box>
      ) : null}
    </>
  );
};

export default HintBox;
