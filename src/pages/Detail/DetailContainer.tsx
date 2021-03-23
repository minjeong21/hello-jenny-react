import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  Anchor,
  Box,
  Grommet,
  Heading,
  Button,
  Main,
  ResponsiveContext,
} from "grommet";
import Footer from "../../components/organisms/Footer";
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
} from "../../utils/ManagerSentence";
import {
  generateLevelPath,
  generateRandomPath,
  generateThemePath,
  getNextRandomNum,
} from "../../properties/Path";
import { defaultTheme } from "../../theme";
import DetailPresenter from "./DetailPresenter";
import {
  fetchAndSetPractice,
  fetchAndSetPracticeList,
} from "../../utils/ManagerPractice";
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
  }, [level, theme, numid]);

  /**
   * numid가 있는 경우, 해당 문제 가져오기
   * */
  const fetchPractice = async () => {
    fetchAndSetPractice(numid, setPractice, setFetcedPractice);
  };

  const fetchPracticeBundle = async () => {
    fetchAndSetPracticeList(theme, level, numid, setPracticeList, setPractice);
  };

  /**
   * 메뉴 클릭 이벤트. 랜덤 문제로 이동
   * */
  const moveRandomPractice = () => {
    if (practiceList) {
      const randomNumber = getNextRandomNum(practiceList);
      history.push(generateRandomPath(randomNumber));
      const atPractice = convertPracticeATtoPractice(
        practiceList[randomNumber]
      );
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
      if (hintNumber === 0) {
        increaseHintNumber();
      }
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
      <DetailPresenter
        moveRandomPractice={moveRandomPractice}
        moveLevelPractice={moveLevelPractice}
        moveThemePractice={moveThemePractice}
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
        fetcedPractice={fetcedPractice}
      />
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
