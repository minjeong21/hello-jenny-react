import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Box, Grommet, Heading, Image } from "grommet";
import Footer from "../../components/organisms/Footer";
import TopBar from "../../components/organisms/TopBar";
import IWriting from "../../interface/IWriting";
import {
  generateLevelPath,
  generateRandomPath,
  generateThemePath,
} from "../../utils/Path";
import { defaultTheme } from "../../theme";
import DetailPresenter from "./DetailPresenter";
import {
  fetchMainWritingList,
  fetchWritingListByLevel,
  fetchWritingByNumId,
  fetchWritingListByTheme,
} from "apis/WritingApi";

interface ParamTypes {
  id?: string;
  theme?: string;
  level?: string;
}

function DetailContainer() {
  let { id, theme, level } = useParams<ParamTypes>();
  const history = useHistory();
  const [writingList, setWritingList] = useState<IWriting[]>();
  const [fetcedWriting, setFetcedWriting] = useState(false);
  const [writing, setWriting] = useState<IWriting>();

  // TODO: Wraning 처리 (React Hook useEffect has missing dependencies)
  useEffect(() => {
    if (id) {
      fetchWriting(Number(id));
    } else if (theme) {
      fetchThemeWritingList(theme);
    } else if (level) {
      fetchLevelWritingList(Number(level));
    } else {
      fetchWritingList();
    }
  }, [id, theme, level]);

  const fetchWriting = async (id: number) => {
    const fetchedWriting = await fetchWritingByNumId(id);
    setWriting(fetchedWriting);
  };

  const fetchThemeWritingList = async (theme: string) => {
    const list = await fetchWritingListByTheme(theme);
    setWritingList(list);
  };

  const fetchLevelWritingList = async (level: number) => {
    const list = await fetchWritingListByLevel(level);
    setWritingList(list);
  };

  const fetchWritingList = async () => {
    const fetchedList = await fetchMainWritingList();
    setWritingList(fetchedList);
  };

  const moveNextWriting = () => {
    // 리스트에서 지금 연습 문제가 몇 번째 index인지 찾고, 그 이후 순번으로 넘어가기.
    let path = null;
    if (writingList && writing) {
      let index = writingList.findIndex((item) => item.id === writing.id);
      if (index === writingList.length - 1) {
        alert("마지막 문제입니다.");
        index = -1;
      }

      const NextNumId = writingList[index + 1].id;

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

  const pageReloadEffect = (writing: IWriting) => {
    setFetcedWriting(false);
    setWriting(writing);
  };

  if (writing) {
    return (
      <DetailPresenter
        moveNextWriting={moveNextWriting}
        writing={writing}
        fetcedWriting={fetcedWriting}
      />
    );
  } else if (writingList && writingList.length === 0) {
    return (
      <Grommet theme={defaultTheme}>
        <TopBar />
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
        <TopBar />
        <div className="flex justify-center pad-xl">
          <div>문제 불러오는 중!</div>
          <Image src="/assets/header-rabit.png" width="200px" />
        </div>
      </Grommet>
    );
  }
}

export default DetailContainer;
