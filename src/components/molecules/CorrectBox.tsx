import { Box, Text } from "grommet";
import React from "react";
import HintBox from "./HinBox";

const CorrectBox = ({
  visibleIsCorrect,
  isCorrect,
  tryText,
  hintNumber,
  matchedPercent,
}: {
  visibleIsCorrect: boolean;
  isCorrect: boolean;
  tryText: string;
  hintNumber: number;
  matchedPercent: number;
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

                <HintBox
                  hintNumber={hintNumber}
                  matchedPercent={matchedPercent}
                />
              </Box>
            )}
          </Box>
        </>
      ) : null}
    </>
  );
};
export default CorrectBox;
