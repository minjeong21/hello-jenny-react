import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Footer from "../../components/organisms/Footer";
import TopNavigation from "../../components/organisms/TopNavigation";
import IWriting from "../../interface/IWriting";
import WritingManager from "utils/WritingManager";
import { defaultTheme } from "../../theme";
import DetailPresenter from "./DetailPresenter";
import {
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
  const [writings, setWritings] = useState<IWriting[]>();
  const [fetcedWriting, setFetcedWriting] = useState(false);
  const [writingManager, setWritingManager] = useState<WritingManager>();

  // TODO: Wraning 처리 (React Hook useEffect has missing dependencies)
  useEffect(() => {
    if (id) {
      fetchWriting(Number(id));
    } else if (theme) {
      fetchThemeWritingList(theme);
    } else if (level) {
      fetchLevelWritingList(Number(level));
    }
  }, [id, theme, level]);

  const fetchWriting = async (id: number) => {
    const writing = await fetchWritingByNumId(id);
    setWritingManager(new WritingManager(writing.data));
  };

  const fetchThemeWritingList = async (theme: string) => {
    const list = await fetchWritingListByTheme(theme);
    setWritings(list);
  };

  const fetchLevelWritingList = async (level: number) => {
    const list = await fetchWritingListByLevel(level);
    setWritings(list);
  };

  const moveNextWriting = () => {
    // 리스트에서 지금 연습 문제가 몇 번째 index인지 찾고, 그 이후 순번으로 넘어가기.
    // let path = null;
    // let index = writingList.findIndex((item) => item.id === writing.id);
    // if (index === writingList.length - 1) {
    //   alert("마지막 문제입니다.");
    //   index = -1;
    //   const NextNumId = writingList[index + 1].id;
    //   if (theme) {
    //     path = generateThemePath(theme, NextNumId);
    //   } else if (level) {
    //     path = generateLevelPath(level, NextNumId);
    //   } else {
    //     path = generateRandomPath(NextNumId);
    //   }
    //   history.push(path);
    //   pageReloadEffect(writingList[index + 1]);
    // } else {
    //   alert("새로고침 후 다시 시도해주세요.");
    // }
  };

  if (writingManager && writings) {
    return (
      <DetailPresenter
        moveNextWriting={moveNextWriting}
        writingManager={writingManager}
        writings={writings}
        fetcedWriting={fetcedWriting}
      />
    );
  } else if (writings && writings.length === 0) {
    return (
      <div>
        <div>
          <h3>
            아직 준비된 문제가 없습니다.. <br />
            열심히 준비중이에요🤷🏻‍♀️
          </h3>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex justify-center pad-xl">
          <div>문제 불러오는 중!</div>
          <img src="/assets/header-rabit.png" width="200px" />
        </div>
      </div>
    );
  }
}

export default DetailContainer;
