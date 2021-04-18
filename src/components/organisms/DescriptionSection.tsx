import { Box, Text, Grid } from "grommet";
import IWriting from "../../interface/IWriting";
interface IProps {
  isCorrect: boolean;
  visibleAnswer: boolean;
  writing: IWriting;
}
const DescriptionSection = ({ isCorrect, visibleAnswer, writing }: IProps) => {
  return (
    <Box tag="section" id="section-2">
      <Grid columns={["1/2", "1/2"]}>
        <Box tag="article" width="large" background="#F1EAE5" pad="medium">
          {isCorrect || visibleAnswer ? (
            <>
              <Box tag="section" className="flex">
                {isCorrect ? (
                  <Box pad={{ bottom: "medium" }}>
                    {/* 또 다른 표현 */}
                    {writing.alter_sentences.length > 0 ? (
                      <Box>
                        <Box pad={{ bottom: "small" }}>
                          <Text weight="bold">
                            ⭐️&nbsp;&nbsp;또 다르게 표현할 수 있어요
                          </Text>
                        </Box>
                        {writing.alter_sentences.map((item, index) => {
                          return (
                            <Box
                              pad={{ left: "7px", bottom: "7px" }}
                              key={index}
                            >
                              <Text>{item}</Text>
                            </Box>
                          );
                        })}
                      </Box>
                    ) : null}
                  </Box>
                ) : (
                  <Box pad={{ bottom: "medium" }}>
                    {/* 또 다른 표현 */}
                    <Box>
                      <Box pad={{ bottom: "small" }}>
                        <Text weight="bold">
                          ⭐️&nbsp;&nbsp;정답! 이렇게 표현할 수 있어요.
                        </Text>
                      </Box>
                      <Box pad={{ left: "7px", bottom: "7px" }}>
                        <Text>{writing.en_sentence}</Text>
                      </Box>
                      );
                      {writing.alter_sentences.length > 0 && (
                        <>
                          {writing.alter_sentences.map((item, index) => (
                            <Box
                              pad={{ left: "7px", bottom: "7px" }}
                              key={index}
                            >
                              <Text>{item}</Text>
                            </Box>
                          ))}
                        </>
                      )}
                    </Box>
                  </Box>
                )}

                {/* 문제 해설 */}
                {/* <Box>
                  {writing.hin ? (
                    <div>
                      {writing.related_descriptions.map((item) => (
                        <Box>
                          <Box pad={{ bottom: "small" }}>
                            <Text weight="bold">
                              📗&nbsp;&nbsp;{item.title}
                            </Text>
                          </Box>
                          <Box pad={{ left: "7px", bottom: "7px" }}>
                            <Text style={{ whiteSpace: "pre-line" }}>
                              {item.description}
                            </Text>
                          </Box>
                        </Box>
                      ))}
                    </div>
                  ) : null}
                </Box> */}
              </Box>
            </>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
};

export default DescriptionSection;
