import React, { useState, useEffect } from "react";
import "./App.css";
import practiceBundle from "./sample/practiceBundle.json";
import queryString from "query-string";
import { convertPlainText } from "./ManagerSentence";
import { IPracticeBundle } from "./interface/IPracticeBundle";
import {
  Anchor,
  Box,
  Text,
  Footer,
  Grommet,
  Header,
  Menu,
  Nav,
  ResponsiveContext,
  Paragraph,
  Heading,
} from "grommet";
import { Download, SettingsOption } from "grommet-icons";

const theme = {
  global: {
    colors: {
      brand: "#228BE6",
    },
    font: {
      family: "Noto Sans KR",
      size: "18px",
      height: "20px",
    },
    panel: {
      border: {
        side: "horizontal",
        size: "medium",
        color: "#DADADA",
        style: "dotted",
      },
    },
  },
};

function App() {
  const [textInWrinting, setTextInWrinting] = useState("");
  const [tryText, setTryText] = useState("");
  const [visibletryText, setVisibletryText] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [visibleAnswer, setVisibleAnswer] = useState(false);
  const [visibleIsCorrect, setVisibleIsCorrect] = useState(false);
  const [targetPractice, setTargetPractice] = useState<IPracticeBundle>();
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

  const compareAnswer = (
    targetPractice: IPracticeBundle,
    textInWrinting: string
  ) => {
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
  };

  // 유저가 '정답보기' 버튼을 누른 경우
  const showAnswer = (targetPractice: IPracticeBundle) => {
    setVisibleIsCorrect(false);
    setVisibleAnswer(true);
    setTryText(targetPractice.enTexts[0]);
  };

  if (targetPractice) {
    return (
      <Grommet theme={theme}>
        <Header background="light-4" pad="medium" height="xsmall">
          <Anchor href="https://tools.grommet.io/" label="영작연습소" />
          <ResponsiveContext.Consumer>
            {(size) =>
              size === "small" ? (
                <Box justify="end">
                  <Menu
                    a11yTitle="Navigation Menu"
                    dropProps={{ align: { top: "bottom", right: "right" } }}
                    icon={<SettingsOption color="brand" />}
                    items={[
                      {
                        label: <Box pad="small">메뉴1</Box>,
                        href: "#",
                      },
                      {
                        label: <Box pad="small">메뉴2</Box>,
                        href: "#",
                      },
                    ]}
                  />
                </Box>
              ) : (
                <Box justify="end" direction="row" gap="medium">
                  <Anchor href="#" label="메뉴1" />
                  <Anchor href="#" label="매뉴2" />
                </Box>
              )
            }
          </ResponsiveContext.Consumer>
        </Header>

        <Box
          tag="header"
          background="light-4"
          pad="medium"
          flex
          direction="row"
        >
          <Box>
            {/* 이미지  */}
            {targetPractice.related_images ? (
              <div>
                <img src={targetPractice.related_images[0].link} />
              </div>
            ) : null}
          </Box>
          <Box pad="small">
            {/* 상황 설명 */}
            <Paragraph>
              {targetPractice.situation ? (
                <Box
                  style={{
                    color: "gray",
                    fontSize: "14px",
                    whiteSpace: "pre",
                    padding: "10px",
                  }}
                >
                  {targetPractice.situation}
                </Box>
              ) : null}
            </Paragraph>
            <Heading>{targetPractice.korText}</Heading>

            <Box>
              <input
                width="500"
                name="english_sentence"
                id="english_input"
                onChange={(e) => setTextInWrinting(e.target.value)}
              />
            </Box>
            <Box>
              {isCorrect || visibleAnswer ? (
                <button
                  onClick={() => (window.location.href = `?index=${nextIndex}`)}
                >
                  다음 문제
                </button>
              ) : (
                <>
                  <button
                    className="btn-white"
                    onClick={() =>
                      compareAnswer(targetPractice, textInWrinting)
                    }
                  >
                    {tryText ? "다시 도전!" : "정답 도전!"}
                  </button>
                  {tryText ? (
                    <button
                      className="btn-white"
                      onClick={() => showAnswer(targetPractice)}
                    >
                      정답보기
                    </button>
                  ) : null}
                </>
              )}
            </Box>
            {visibletryText ? <div>{tryText}</div> : null}
            {visibleIsCorrect ? (
              <>
                <div>
                  {isCorrect ? <>맞았습니다!! 👏</> : <div>틀렸어요 😹</div>}
                </div>
                <div></div>
              </>
            ) : null}
          </Box>
        </Box>
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
              {targetPractice.helpVideos ? (
                <div>
                  {targetPractice.helpVideos.map((item) => (
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
        <Footer background="brand" pad="medium">
          <Text>Copyright</Text>
          <Anchor label="About" />
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
