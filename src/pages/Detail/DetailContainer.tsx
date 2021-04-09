import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, Grommet, Heading, Image } from "grommet";
import Footer from "../../components/organisms/Footer";
import TopBar from "../../components/organisms/TopBar";
import { IWriting } from "../../interface/IWriting";
import { IWritingAT } from "../../interface/IWritingAT";
import { convertWritingATtoWriting } from "../../utils/ManagerSentence";
import {
  generateLevelPath,
  generateRandomPath,
  generateThemePath,
  getNextRandomNum,
} from "../../properties/Path";
import { defaultTheme } from "../../theme";
import DetailPresenter from "./DetailPresenter";
import {
  fetchAndSetWriting,
  fetchAndSetWritingList,
} from "../../utils/ManagerWriting";

interface ParamTypes {
  numid?: string;
  theme?: string;
  level?: string;
}
function DetailContainer() {
  let { numid, theme, level } = useParams<ParamTypes>();
  const history = useHistory();
  const [writingList, setWritingList] = useState<IWritingAT[]>();
  const [fetcedWriting, setFetcedWriting] = useState(false);
  const [writing, setWriting] = useState<IWriting>();

  // TODO: Wraning 처리 (React Hook useEffect has missing dependencies)
  useEffect(() => {
    if (numid) {
      fetchWriting();
    }
    fetchWritingBundle();
  }, [level, theme]);

  /**
   * numid가 있는 경우, 해당 문제 가져오기
   * */
  const fetchWriting = async () => {
    fetchAndSetWriting(numid, setWriting, setFetcedWriting);
  };

  const fetchWritingBundle = async () => {
    fetchAndSetWritingList(setWritingList, setWriting, theme, level, numid);
  };

  /**
   * 메뉴 클릭 이벤트. 랜덤 문제로 이동
   * */
  const moveRandomWriting = () => {
    if (writingList) {
      const randomNumber = getNextRandomNum(writingList);
      history.push(generateRandomPath(randomNumber));
      const atWriting = convertWritingATtoWriting(writingList[randomNumber]);
      setWriting(atWriting);
    } else {
      alert("새로고침 후 다시 시도해주세요.");
    }
  };

  /**
   * 메뉴 클릭 이벤트. 래벨 문제로 이동
   * */
  const moveLevelWriting = (level: string) => {
    history.push(generateLevelPath(level));
    window.location.reload();
  };

  /**
   * 메뉴 클릭 이벤트. 테마 문제로 이동
   * */
  const moveThemeWriting = (theme: string) => {
    history.push(generateThemePath(theme));
    window.location.reload();
  };

  const moveNextWriting = () => {
    // 리스트에서 지금 연습 문제가 몇 번째 index인지 찾고, 그 이후 순번으로 넘어가기.
    let path = null;
    if (writingList && writing) {
      let index = writingList.findIndex(
        (item) => item.fields.numid === writing.numid
      );
      if (index === writingList.length - 1) {
        alert("마지막 문제입니다.");
        index = -1;
      }

      const NextNumId = writingList[index + 1].fields.numid;

      if (theme) {
        path = generateThemePath(theme, NextNumId);
      } else if (level) {
        path = generateLevelPath(level, NextNumId);
      } else {
        path = generateRandomPath(NextNumId);
      }
      history.push(path);
      pageReloadEffect(writingList[index + 1]);
    } else {
      alert("새로고침 후 다시 시도해주세요.");
    }
  };

  const pageReloadEffect = (writingAT: IWritingAT) => {
    const atWriting = convertWritingATtoWriting(writingAT);
    setFetcedWriting(false);
    setWriting(atWriting);
  };

  if (writingList && writingList.length > 0) {
    return (
      <DetailPresenter
        moveRandomWriting={moveRandomWriting}
        moveLevelWriting={moveLevelWriting}
        moveThemeWriting={moveThemeWriting}
        moveNextWriting={moveNextWriting}
        writing={writing}
        fetcedWriting={fetcedWriting}
      />
    );
  } else if (writingList) {
    return (
      <Grommet theme={defaultTheme}>
        <TopBar
          moveRandomWriting={moveRandomWriting}
          moveLevelWriting={moveLevelWriting}
          moveThemeWriting={moveThemeWriting}
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
          moveRandomWriting={moveRandomWriting}
          moveLevelWriting={moveLevelWriting}
          moveThemeWriting={moveThemeWriting}
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
