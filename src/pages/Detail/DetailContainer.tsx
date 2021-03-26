import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Anchor, Box, Grommet, Heading, Image } from "grommet";
import Footer from "../../components/organisms/Footer";
import TopBar from "../../components/organisms/TopBar";
import { IPractice } from "../../interface/IPractice";
import { IPracticeAT } from "../../interface/IPracticeAT";
import { convertPracticeATtoPractice } from "../../utils/ManagerSentence";
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

  useEffect(() => {
    if (numid) {
      fetchPractice();
    }
    fetchPracticeBundle();
  }, [level, theme]);

  /**
   * numid가 있는 경우, 해당 문제 가져오기
   * */
  const fetchPractice = async () => {
    fetchAndSetPractice(numid, setPractice, setFetcedPractice);
  };

  const fetchPracticeBundle = async () => {
    fetchAndSetPracticeList(setPracticeList, setPractice, theme, level, numid);
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
    setFetcedPractice(false);
    setPractice(atPractice);
  };

  if (practiceList && practiceList.length > 0) {
    return (
      <DetailPresenter
        moveRandomPractice={moveRandomPractice}
        moveLevelPractice={moveLevelPractice}
        moveThemePractice={moveThemePractice}
        moveNextPractice={moveNextPractice}
        practice={practice}
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
        <div className="flex justify-center pad-xl">
          <div>문제 불러오는 중!</div>
          <Image src="/assets/header-rabit3.png" width="200px" />
        </div>
      </Grommet>
    );
  }
}

export default DetailContainer;

const FooterAnchor = ({ ...rest }) => (
  <StyledAnchor href="/" size="small" color="white" {...rest} />
);
