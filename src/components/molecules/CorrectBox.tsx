import { Box, Text } from "grommet";

const CorrectBox = ({
  visibleIsCorrect,
  isCorrect,
  tryText,
}: {
  visibleIsCorrect: boolean;
  isCorrect: boolean;
  tryText: string;
}) => {
  return (
    <>
      {visibleIsCorrect ? (
        <>
          <Box gap="small" pad={{ top: "medium" }}>
            {isCorrect ? (
              <Box align="center">
                <Text weight="bold" color="#4b2491" size="large">
                  Wow!! 맞았습니다!! 🎉
                </Text>
              </Box>
            ) : (
              <Box height={{ max: "small" }} round="small" justify="center">
                <Box pad={{ bottom: "medium" }} direction="row">
                  <Text>도전 문장 👉🏻 &nbsp;&nbsp;</Text>
                  <Text weight="bold"> {tryText}</Text>
                </Box>

                <Box align="center">
                  <Text weight="bold" color="#4b2491">
                    아쉬워요. 다시 도전해주세요! 💪
                  </Text>
                </Box>
              </Box>
            )}
          </Box>
        </>
      ) : null}
    </>
  );
};
export default CorrectBox;
