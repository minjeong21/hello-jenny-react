import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import IWriting from "../interface/IWriting";
import WritingManager from "utils/WritingManager";
import WritingBox from "components/WritingBox";
import styled from "styled-components";
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

const Main = styled.main`
  min-height: calc(100vh - 45px);
`;
const Detail = ({ manager }: { manager?: WritingManager }) => {
  let { id, theme, level } = useParams<ParamTypes>();
  console.log(id, theme, level);
  const [writings, setWritings] = useState<IWriting[]>();
  const [writingManager, setWritingManager] = useState<WritingManager>();

  // TODO: Wraning 처리 (React Hook useEffect has missing dependencies)
  useEffect(() => {
    if (id) {
      fetchWriting(Number(id));
    } else if (theme) {
      fetchThemeWritingList(theme);
    } else if (level) {
      fetchLevelWritingList(Number(level));
    } else {
      setWritingManager(manager);
    }
    console.log(writingManager);
  }, [id, theme, level]);

  console.log();
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

  const moveNextWriting = () => {};

  return (
    <Main className=" pt-20">
      {writingManager ? (
        <section id="section-1" className="pt-20">
          <WritingBox
            writingManager={writingManager}
            moveNextWriting={moveNextWriting}
          />
        </section>
      ) : (
        <div>
          <div>
            <div className="flex justify-center pad-xl">
              <div>문제 불러오는 중!</div>
              <img src="/assets/small-quokka.png" width="200px" />
            </div>
          </div>
        </div>
      )}
    </Main>
  );
};

export default Detail;
