import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Play } from "grommet-icons";
import {
  Anchor,
  Box,
  Text,
  Grommet,
  Paragraph,
  Heading,
  Button,
  TextInput,
  Main,
  Keyboard,
  Grid,
  ResponsiveContext,
} from "grommet";
import Footer from "../../components/organisms/Footer";
import { defaultTheme } from "../../theme";
import TopBar from "../../components/organisms/TopBar";
import { IPractice } from "../../interface/IPractice";
import { IPracticeAT } from "../../interface/IPracticeAT";
import {
  fetchPracticeByLevel,
  fetchPracticeByNumId,
  fetchPracticeByTheme,
  fetchPractices,
} from "../../apis/PracticeApi";
import {
  compareAnswer,
  convertPracticeATtoPractice,
  getMatchedWordPercent,
} from "../../ManagerSentence";
import {
  generateLevelPath,
  generateRandomPath,
  generateThemePath,
} from "../../properties/Path";
import PracticeImage from "../../components/atoms/PracticeImage";
import PracticeTryBox from "../../components/organisms/PracticeTryBox";

const StyledAnchor = styled(Anchor)`
  font-weight: 200;
`;

interface ParamTypes {
  numid?: string;
  theme?: string;
  level?: string;
}
function DetailContainer() {
  let { numid, theme, level } = useParams<ParamTypes>();
  const history = useHistory();
  const location = useLocation();
  const [practiceList, setPracticeList] = useState<IPracticeAT[]>();
  const [fetcedPractice, setFetcedPractice] = useState(false);
  const [practice, setPractice] = useState<IPractice>();
  const [textInWrinting, setTextInWrinting] = useState("");
  const [tryText, setTryText] = useState("");
  const [hintNumber, setHintNumber] = useState(0);
  const [matchedPercent, setMatchedPercent] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [visibleAnswer, setVisibleAnswer] = useState(false);
  const [visibleIsCorrect, setVisibleIsCorrect] = useState(false);

  useEffect(() => {
    if (numid) {
      fetchPractice();
    }
    fetchPracticeBundle();
  }, []);

  /**
   * numid가 있는 경우, 해당 문제 가져오기
   * */
  const fetchPractice = async () => {
    const response = await fetchPracticeByNumId(Number(numid));
    if (response && response.length > 0) {
      const atPractice = convertPracticeATtoPractice(response[0]);
      setPractice(atPractice);
    }
    setFetcedPractice(true);
  };

  /**
   * theme 또는 레벨에 맞는 문제 리스트 가져오기 (100개까지)
   * */
  const fetchPracticeBundle = async () => {
    let response = null;
    if (theme) {
      response = await fetchPracticeByTheme(theme);
    } else if (level) {
      response = await fetchPracticeByLevel(level);
    } else {
      response = await fetchPractices();
    }
    setPracticeList(response);

    if (!numid && response && response.length > 0) {
      const atPractice = convertPracticeATtoPractice(response[0]);
      setPractice(atPractice);
    }
    console.log(response);
  };

  /**
   * 메뉴 클릭 이벤트. 랜덤 문제로 이동
   * */
  const moveRandomPractice = () => {
    if (practiceList) {
      const practicesLength = practiceList ? practiceList.length : 0;
      const rNumber = Math.floor(Math.random() * 100) % practicesLength;
      history.push(generateRandomPath(practiceList[rNumber].fields.numid));
      window.location.reload();
      const atPractice = convertPracticeATtoPractice(practiceList[rNumber]);
      setPractice(atPractice);
    } else {
      alert("새로고침 후 다시 시도해주세요.");
    }
  };

  /**
   * 메뉴 클릭 이벤트. 래벨 문제로 이동
   * */
  const moveLevelPractice = (level: string) => {
    history.push(generateLevelPath(level));
    window.location.reload();
  };

  /**
   * 메뉴 클릭 이벤트. 테마 문제로 이동
   * */
  const moveThemePractice = (theme: string) => {
    history.push(generateThemePath(theme));
    window.location.reload();
  };

  const moveNextPractice = () => {
    // 리스트에서 지금 연습 문제가 몇 번째 index인지 찾고, 그 이후 순번으로 넘어가기.
    let path = null;
    if (practiceList && practice) {
      let index = practiceList.findIndex(
        (item) => item.fields.numid === practice.numid
      );
      if (index == practiceList.length - 1) {
        alert("마지막 문제입니다.");
        index = -1;
      }

      const NextNumId = practiceList[index + 1].fields.numid;

      if (theme) {
        path = generateThemePath(theme, NextNumId);
      } else if (level) {
        path = generateLevelPath(level, NextNumId);
      } else {
        path = generateRandomPath(NextNumId);
      }
      history.push(path);
      pageReloadEffect(practiceList[index + 1]);
    } else {
      alert("새로고침 후 다시 시도해주세요.");
    }
  };

  const pageReloadEffect = (practiceAT: IPracticeAT) => {
    const atPractice = convertPracticeATtoPractice(practiceAT);
    setTextInWrinting("");
    setTryText("");
    setHintNumber(0);
    setMatchedPercent(0);
    setIsCorrect(false);
    setVisibleAnswer(false);
    setVisibleIsCorrect(false);
    setFetcedPractice(false);
    setPractice(atPractice);
    try {
      const element: any = document.getElementById("english_input");
      element.element.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 도전하기 버튼 클릭 Event
   * */
  const clickChallengeButton = (
    practice: IPractice,
    textInWrinting: string
  ) => {
    const result = compareAnswer(practice.english_texts, textInWrinting);

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
    setVisibleIsCorrect(true);
    // setTextInWrinting("");
  };

  const increaseHintNumber = () => {
    if (hintNumber < 3) {
      setHintNumber(hintNumber + 1);
    }
  };

  // 유저가 '정답보기' 버튼을 누른 경우
  const showAnswer = (practice: IPractice) => {
    setVisibleIsCorrect(false);
    setVisibleAnswer(true);
    setTryText(practice.english_texts[0]);
  };

  if (practiceList && practiceList.length > 0) {
    return (
      <Grommet theme={defaultTheme}>
        <TopBar
          moveRandomPractice={moveRandomPractice}
          moveLevelPractice={moveLevelPractice}
          moveThemePractice={moveThemePractice}
        />

        {practice ? (
          <Main
            pad="large"
            align="center"
            margin="0 auto"
            height={{ min: "calc( 100vh - 144px)" }}
          >
            <Box tag="section" id="section-1">
              <ResponsiveContext.Consumer>
                {(size) => {
                  console.log(size);
                  if (size === "small") {
                    return (
                      <Box>
                        {practice.image_url ? (
                          <PracticeImage imageUrl={practice.image_url} />
                        ) : null}

                        {/* 문제 풀이 섹션 */}

                        <PracticeTryBox
                          practice={practice}
                          textInWrinting={textInWrinting}
                          visibleIsCorrect={visibleIsCorrect}
                          isCorrect={isCorrect}
                          tryText={tryText}
                          hintNumber={hintNumber}
                          matchedPercent={matchedPercent}
                          visibleAnswer={visibleAnswer}
                          clickChallengeButton={clickChallengeButton}
                          setTextInWrinting={setTextInWrinting}
                          moveNextPractice={moveNextPractice}
                          increaseHintNumber={increaseHintNumber}
                          showAnswer={showAnswer}
                        />
                      </Box>
                    );
                  } else {
                    return (
                      <Grid columns={["1/2", "1/2"]}>
                        {/* 사진 섹션 */}
                        {practice.image_url ? (
                          <PracticeImage imageUrl={practice.image_url} />
                        ) : null}

                        {/* 문제 풀이 섹션 */}
                        <PracticeTryBox
                          practice={practice}
                          textInWrinting={textInWrinting}
                          visibleIsCorrect={visibleIsCorrect}
                          isCorrect={isCorrect}
                          tryText={tryText}
                          hintNumber={hintNumber}
                          matchedPercent={matchedPercent}
                          visibleAnswer={visibleAnswer}
                          clickChallengeButton={clickChallengeButton}
                          setTextInWrinting={setTextInWrinting}
                          moveNextPractice={moveNextPractice}
                          increaseHintNumber={increaseHintNumber}
                          showAnswer={showAnswer}
                        />
                      </Grid>
                    );
                  }
                }}
              </ResponsiveContext.Consumer>
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
                                      ⭐️&nbsp;&nbsp;정답! 이렇게 표현할 수
                                      있어요.
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
                          {practice.related_videos ? (
                            <div>
                              {practice.related_videos.map((item) => (
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
        ) : (
          <>
            {fetcedPractice ? (
              <Box height="80vh" flex justify="center">
                <Heading alignSelf="center">
                  문장이 사라졌어요..
                  <br />
                  (어디갔을까...😭)
                  <Button onClick={moveNextPractice}>다른 문제 풀어보기</Button>
                </Heading>
              </Box>
            ) : (
              <Box height="80vh" flex justify="center">
                <Heading alignSelf="center">문장 불러오는 중...</Heading>
              </Box>
            )}
          </>
        )}
        <Footer />
      </Grommet>
    );
  } else if (practiceList) {
    return (
      <Grommet theme={defaultTheme}>
        <TopBar
          moveRandomPractice={moveRandomPractice}
          moveLevelPractice={moveLevelPractice}
          moveThemePractice={moveThemePractice}
        />
        <Box height="80vh" flex justify="center">
          <Heading alignSelf="center">
            아직 준비된 문제가 없습니다.. <br />
            열심히 준비중이에요🤷🏻‍♀️
          </Heading>
        </Box>
        <Footer />
      </Grommet>
    );
  } else {
    return (
      <Grommet theme={defaultTheme}>
        <TopBar
          moveRandomPractice={moveRandomPractice}
          moveLevelPractice={moveLevelPractice}
          moveThemePractice={moveThemePractice}
        />
        <Box height="80vh" flex justify="center">
          <Heading alignSelf="center">문제 불러오는 중 🏃‍♀️</Heading>
        </Box>
      </Grommet>
    );
  }
}

export default DetailContainer;

const FooterAnchor = ({ ...rest }) => (
  <StyledAnchor href="/" size="small" color="white" {...rest} />
);
