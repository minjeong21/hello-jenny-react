import React, { useState, useEffect } from "react";
import practiceBundle from "../sample/practiceBundle.json";
import queryString from "query-string";
import { convertPlainText } from "../ManagerSentence";
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
import { Search, SettingsOption } from "grommet-icons";
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
  const [targetPractice, setTargetPractice] = useState<IPractice>();
  const [nextIndex, setNextIndex] = useState(0);

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

  const compareAnswer = (targetPractice: IPractice, textInWrinting: string) => {
    const correctPlainText = convertPlainText(targetPractice.enTexts[0]);
    const tryPlainText = convertPlainText(textInWrinting);
    if (correctPlainText === tryPlainText) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setTryText(textInWrinting);

    setVisibletryText(true);
    setVisibleIsCorrect(true);
    setTextInWrinting("");
  };

  // 유저가 '정답보기' 버튼을 누른 경우
  const showAnswer = (targetPractice: IPractice) => {
    setVisibleIsCorrect(false);
    setVisibleAnswer(true);
    setTryText(targetPractice.enTexts[0]);
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
          <Box tag="section">
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
                    height="medium"
                  />
                ) : null}
              </Box>

              {/* 문제 풀이 섹션 */}
              <Box
                pad="small"
                background="#F1EAE5"
                width="large"
                height="medium"
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

                <Heading alignSelf="center" size="h3">
                  {targetPractice.korText}
                </Heading>

                <Keyboard
                  onEnter={() => compareAnswer(targetPractice, textInWrinting)}
                >
                  <TextInput
                    reverse
                    placeholder="입력하기 ..."
                    id="english_input"
                    icon={
                      <Search
                        onClick={() =>
                          compareAnswer(targetPractice, textInWrinting)
                        }
                      />
                    }
                    onChange={(e) => setTextInWrinting(e.target.value)}
                  />
                </Keyboard>
                <Box>
                  {isCorrect || visibleAnswer ? (
                    <Button
                      label="다음 문제"
                      onClick={() =>
                        (window.location.href = `?index=${nextIndex}`)
                      }
                    />
                  ) : (
                    <>
                      <Box align="center" pad="medium">
                        <Button
                          primary
                          label={tryText ? "다시 도전!" : "정답 도전!"}
                          onClick={() =>
                            compareAnswer(targetPractice, textInWrinting)
                          }
                        />
                      </Box>

                      {tryText ? (
                        <Button
                          primary
                          label="정답보기"
                          onClick={() => showAnswer(targetPractice)}
                        />
                      ) : null}
                    </>
                  )}
                </Box>
                {visibletryText ? <div>{tryText}</div> : null}
                {visibleIsCorrect ? (
                  <>
                    <Box pad="small" gap="small">
                      {isCorrect ? (
                        <>맞았습니다!! 👏</>
                      ) : (
                        <Box
                          width="small"
                          height={{ max: "small" }}
                          background="linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)"
                          round="small"
                          align="center"
                          justify="center"
                          elevation="large"
                          pad="small"
                        >
                          <Text>틀렸어요 😹</Text>
                        </Box>
                      )}
                    </Box>
                  </>
                ) : null}
              </Box>
            </Grid>
          </Box>
        </Main>
        {isCorrect || visibleAnswer ? (
          <>
            <Box tag="section" className="flex">
              <Box>
                {/* 또 다른 표현 */}
                {targetPractice.enTexts.length > 1 ? (
                  <div>
                    <h3>또 다른 표현</h3>
                    {targetPractice.enTexts.map((item, index) => {
                      if (index > 0) {
                        return <div>{item}</div>;
                      }
                    })}
                  </div>
                ) : null}
              </Box>
              <Box>
                {/* 문제 해설 */}
                {targetPractice.helpGrammars ? (
                  <div>
                    {targetPractice.helpGrammars.map((item) => (
                      <>
                        <h3>{item.title}</h3>
                        <div style={{ whiteSpace: "pre-line" }}>
                          {item.description}
                        </div>
                      </>
                    ))}
                  </div>
                ) : null}
              </Box>
            </Box>
          </>
        ) : null}

        {isCorrect || visibleAnswer ? (
          <Box tag="section">
            {/* 영상 해설*/}
            <Box>
              {targetPractice.related_videos ? (
                <div>
                  {targetPractice.related_videos.map((item) => (
                    <>
                      <h3>{item.title}</h3>
                      <div style={{ whiteSpace: "pre-line" }}>
                        <iframe
                          width="300"
                          height="180"
                          src={item.link}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </>
                  ))}
                </div>
              ) : null}
            </Box>
          </Box>
        ) : null}

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
