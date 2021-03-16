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
          <Text weight="bold"> {matchedPercent}% 맞췄습니다.</Text>
        </Box>
      ) : null}

      {hintNumber > 1 ? (
        <Box pad={{ bottom: "medium" }} direction="row">
          <Text weight="bold"> hint 2번</Text>
        </Box>
      ) : null}

      {hintNumber > 2 ? (
        <Box pad={{ bottom: "medium" }} direction="row">
          <Text weight="bold"> hint 3번</Text>
        </Box>
      ) : null}
    </>
  );
};

export default HintBox;
