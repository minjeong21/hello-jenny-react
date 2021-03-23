import { Box, Text, Grid } from "grommet";
import { IPractice } from "../../interface/IPractice";
interface IProps {
  isCorrect: boolean;
  visibleAnswer: boolean;
  practice: IPractice;
}
const DescriptionSection = ({ isCorrect, visibleAnswer, practice }: IProps) => {
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
                    {practice.english_texts.length > 1 ? (
                      <Box>
                        <Box pad={{ bottom: "small" }}>
                          <Text weight="bold">
                            ⭐️&nbsp;&nbsp;또 다르게 표현할 수 있어요
                          </Text>
                        </Box>
                        {practice.english_texts.map((item, index) => {
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
                    {practice.english_texts.length > 0 ? (
                      <Box>
                        <Box pad={{ bottom: "small" }}>
                          <Text weight="bold">
                            ⭐️&nbsp;&nbsp;정답! 이렇게 표현할 수 있어요.
                          </Text>
                        </Box>
                        {practice.english_texts.map((item, index) => {
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
                )}

                <Box>
                  {/* 문제 해설 */}
                  {practice.related_descriptions ? (
                    <div>
                      {practice.related_descriptions.map((item) => (
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
                </Box>
              </Box>
            </>
          ) : null}
        </Box>
        {practice.related_videos ? (
          <VideoDescription practice={practice} />
        ) : null}
      </Grid>
    </Box>
  );
};

const VideoDescription = ({ practice }: { practice: IPractice }) => {
  return (
    <Box
      tag="article"
      width="large"
      background="linear-gradient(to bottom,#BFD0E6,#e8f2ff)"
      pad="small"
    >
      <Box tag="section">
        {/* 영상 해설*/}
        <Box>
          {practice.related_videos ? (
            <div>
              {practice.related_videos.map((item) => (
                <Box pad="small">
                  <Box pad={{ bottom: "small" }}>
                    <Text weight="bold">🎥&nbsp;&nbsp;{item.title}</Text>
                  </Box>
                  <Box pad="medium">
                    <div className="video-container">
                      <iframe
                        width="560"
                        height="315"
                        src={item.link}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </Box>
                </Box>
              ))}
            </div>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};
export default DescriptionSection;
