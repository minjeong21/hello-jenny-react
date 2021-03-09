import React, { useState, useEffect } from "react";
import practiceBundle from "../sample/practiceBundle.json";
import queryString from "query-string";
import {
  compareAnswer,
  convertPlainText,
  getMatchedWordPercent,
} from "../ManagerSentence";
import { IPractice } from "../interface/IPractice";
import {
  Anchor,
  Box,
  Text,
  Footer,
  Grommet,
  Image,
  Paragraph,
  Heading,
  Button,
  TextInput,
  Main,
  Keyboard,
  Grid,
} from "grommet";
import { Play } from "grommet-icons";
import styled from "styled-components";
import Navigation from "../components/Navigation";
import { defaultTheme } from "../theme";

const StyledAnchor = styled(Anchor)`
  font-weight: 200;
`;

function App() {
  const [textInWrinting, setTextInWrinting] = useState("");
  const [tryText, setTryText] = useState("");
  const [visibletryText, setVisibletryText] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [visibleAnswer, setVisibleAnswer] = useState(false);
  const [visibleIsCorrect, setVisibleIsCorrect] = useState(false);
  const [hintNumber, setHintNumber] = useState(0);
  const [targetPractice, setTargetPractice] = useState<IPractice>();
  const [nextIndex, setNextIndex] = useState(0);
  const [matchedPercent, setMatchedPercent] = useState(0);

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    let targetIndex = Number(parsed.index);
    if (
      typeof targetIndex !== "number" ||
      targetIndex >= practiceBundle.length
    ) {
      targetIndex = 0;
    }
    const targetPractice = practiceBundle[targetIndex];

    setTargetPractice(targetPractice);
    const nextIndex = (targetIndex + 1) % practiceBundle.length;
    setNextIndex(nextIndex);
  }, []);

  /** 도전하기 버튼 클릭 Event*/
  const clickChallengeButton = (
    targetPractice: IPractice,
    textInWrinting: string
  ) => {
    const result = compareAnswer(targetPractice.english_texts, textInWrinting);

    setIsCorrect(result.isCorrect);
    const element: any = document.getElementById("english_input");
    if (result.isCorrect) {
      // 맞았을 때
      element.setAttribute("readonly", true);
      element.setAttribute("style", "background-color: #e6ddd7; color:#141937");
    } else {
      // 정답 틀렸을 때
      element.value = "";
      const percent = getMatchedWordPercent(
        result.bestMatchedText,
        textInWrinting
      );
      setMatchedPercent(percent);
    }

    setTryText(textInWrinting);
    setVisibletryText(true);
    setVisibleIsCorrect(true);
    // setTextInWrinting("");
  };

  const increaseHintNumber = () => {
    if (hintNumber < 3) {
      setHintNumber(hintNumber + 1);
    }
  };

  // 유저가 '정답보기' 버튼을 누른 경우
  const showAnswer = (targetPractice: IPractice) => {
    setVisibleIsCorrect(false);
    setVisibleAnswer(true);
    setTryText(targetPractice.english_texts[0]);
  };

  if (targetPractice) {
    return (
      <Grommet theme={defaultTheme}>
        <Navigation />
        <Main
          pad="large"
          align="center"
          margin="0 auto"
          height={{ min: "calc( 100vh - 144px)" }}
        >
          <Box tag="section" id="section-1">
            <Grid columns={["1/2", "1/2"]}>
              {/* 사진 섹션 */}
              <Box>
                {targetPractice.related_images ? (
                  <Box
                    background={{
                      color: "lightgray",
                      dark: true,
                      image: `url(${targetPractice.related_images[0].link})`,
                      repeat: "no-repeat",
                      size: "cover",
                      position: "center",
                    }}
                    width="large"
                    height="100%"
                  />
                ) : null}
              </Box>

              {/* 문제 풀이 섹션 */}
              <Box
                pad="medium"
                background="#F1EAE5"
                width="large"
                flex
                justify="center"
              >
                {targetPractice.situation ? (
                  <Paragraph
                    alignSelf="center"
                    size="small"
                    color={"#333333"}
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {targetPractice.situation}
                  </Paragraph>
                ) : null}

                <Heading alignSelf="center" size="h3" color="#3849a8">
                  {targetPractice.korean_text}
                </Heading>

                <Keyboard
                  onEnter={() =>
                    clickChallengeButton(targetPractice, textInWrinting)
                  }
                >
                  <TextInput
                    reverse
                    placeholder="입력하기 ..."
                    id="english_input"
                    icon={
                      <Play
                        onClick={() =>
                          clickChallengeButton(targetPractice, textInWrinting)
                        }
                      />
                    }
                    onChange={(e) => setTextInWrinting(e.target.value)}
                  />
                </Keyboard>
                {/* {visibletryText ? <div>{tryText}</div> : null} */}

                <CorrectBox
                  visibleIsCorrect={visibleIsCorrect}
                  isCorrect={isCorrect}
                  tryText={tryText}
                />
                {!isCorrect ? (
                  <HintBox
                    hintNumber={hintNumber}
                    matchedPercent={matchedPercent}
                  />
                ) : null}

                <Box margin={{ top: "14px", bottom: "small" }}>
                  {/* 다음 문장 버튼 */}
                  {isCorrect || visibleAnswer ? (
                    <Button
                      primary
                      label="다음 문제"
                      onClick={() =>
                        (window.location.href = `?index=${nextIndex}`)
                      }
                    />
                  ) : (
                    <>
                      {/* 유저가 도전 버튼을 눌렀으면? */}
                      {tryText ? (
                        <Box
                          align="center"
                          pad="small"
                          flex
                          direction="row"
                          justify="around"
                        >
                          <Button
                            primary
                            label={"다시 도전!"}
                            onClick={() =>
                              clickChallengeButton(
                                targetPractice,
                                textInWrinting
                              )
                            }
                          />
                          <Button
                            primary
                            label={"힌트보기"}
                            onClick={() => increaseHintNumber()}
                          />
                          <Button
                            primary
                            label="정답보기"
                            onClick={() => showAnswer(targetPractice)}
                          />
                        </Box>
                      ) : (
                        <Box align="center" pad="medium" flex direction="row">
                          <Button
                            margin="0 auto"
                            primary
                            label={"정답 도전!"}
                            onClick={() =>
                              clickChallengeButton(
                                targetPractice,
                                textInWrinting
                              )
                            }
                          />
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          </Box>
          <Box margin="medium" />
          {visibleAnswer || isCorrect ? (
            <Box tag="section" id="section-2">
              <Grid columns={["1/2", "1/2"]}>
                <Box
                  tag="article"
                  width="large"
                  background="#F1EAE5"
                  pad="medium"
                >
                  {isCorrect || visibleAnswer ? (
                    <>
                      <Box tag="section" className="flex">
                        {isCorrect ? (
                          <Box pad={{ bottom: "medium" }}>
                            {/* 또 다른 표현 */}
                            {targetPractice.english_texts.length > 1 ? (
                              <Box>
                                <Box pad={{ bottom: "small" }}>
                                  <Text weight="bold">
                                    ⭐️&nbsp;&nbsp;또 다르게 표현할 수 있어요
                                  </Text>
                                </Box>
                                {targetPractice.english_texts.map(
                                  (item, index) => {
                                    return (
                                      <Box
                                        pad={{ left: "7px", bottom: "7px" }}
                                        key={index}
                                      >
                                        <Text>{item}</Text>
                                      </Box>
                                    );
                                  }
                                )}
                              </Box>
                            ) : null}
                          </Box>
                        ) : (
                          <Box pad={{ bottom: "medium" }}>
                            {/* 또 다른 표현 */}
                            {targetPractice.english_texts.length > 0 ? (
                              <Box>
                                <Box pad={{ bottom: "small" }}>
                                  <Text weight="bold">
                                    ⭐️&nbsp;&nbsp;정답! 이렇게 표현할 수
                                    있어요.
                                  </Text>
                                </Box>
                                {targetPractice.english_texts.map(
                                  (item, index) => {
                                    return (
                                      <Box
                                        pad={{ left: "7px", bottom: "7px" }}
                                        key={index}
                                      >
                                        <Text>{item}</Text>
                                      </Box>
                                    );
                                  }
                                )}
                              </Box>
                            ) : null}
                          </Box>
                        )}

                        <Box>
                          {/* 문제 해설 */}
                          {targetPractice.related_descriptions ? (
                            <div>
                              {targetPractice.related_descriptions.map(
                                (item) => (
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
                                )
                              )}
                            </div>
                          ) : null}
                        </Box>
                      </Box>
                    </>
                  ) : null}
                </Box>
                <Box
                  tag="article"
                  width="large"
                  background="linear-gradient(to bottom,#BFD0E6,#e8f2ff)"
                  pad="small"
                >
                  {isCorrect || visibleAnswer ? (
                    <Box tag="section">
                      {/* 영상 해설*/}
                      <Box>
                        {targetPractice.related_videos ? (
                          <div>
                            {targetPractice.related_videos.map((item) => (
                              <Box pad="small">
                                <Box pad={{ bottom: "small" }}>
                                  <Text weight="bold">
                                    🎥&nbsp;&nbsp;{item.title}
                                  </Text>
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
                  ) : null}
                </Box>
              </Grid>
            </Box>
          ) : null}
        </Main>
        {/* footer: 사이트맵 */}

        <Footer
          background="dark-2"
          pad={{ horizontal: "large", vertical: "small" }}
        >
          <Box direction="row" gap="small">
            <Text alignSelf="center">영작연습소</Text>
          </Box>
          <Text textAlign="center" size="small">
            © 2021 Copyright
          </Text>
        </Footer>
      </Grommet>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">문장 불러오는 중...</header>
      </div>
    );
  }
}

export default App;

const FooterAnchor = ({ ...rest }) => (
  <StyledAnchor href="/" size="small" color="white" {...rest} />
);

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
