import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WritingManager from "utils/WritingManager";
import WritingBox from "components/WritingBox";
import styled from "styled-components";
import { fetchWritingByNumId } from "apis/WritingApi";

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
  const [writingManager, setWritingManager] = useState<WritingManager>();

  // TODO: Wraning 처리 (React Hook useEffect has missing dependencies)
  useEffect(() => {
    if (id) {
      fetchWriting(Number(id));
    } else if (theme) {
      // fetchThemeWritingList(theme);
    } else if (level) {
      // fetchLevelWritingList(Number(level));
    } else {
      setWritingManager(manager);
    }
    console.log(writingManager);
  }, [id, theme, level, manager]);

  const fetchWriting = async (id: number) => {
    const writing = await fetchWritingByNumId(id);
    setWritingManager(new WritingManager(writing.data));
  };

  const moveNextWriting = () => {};

  return (
    <Main className=" pt-20">
      {writingManager ? (
        <section className="py-20 ">
          <div className="flex justify-end">
            <div className="flex bg-green-100 fit-h self-center p-2 rounded  font-quite">
              할 수 있따~ 포기하지 말아요~
            </div>
            <img
              src="/assets/small-quokka-left.png"
              width="50px"
              alt="quokka"
            />
          </div>
          <WritingBox
            writingManager={writingManager}
            moveNextWriting={moveNextWriting}
          />
        </section>
      ) : (
        <div>
          <div>
            <div className="pt-24 flex flex-col items-center">
              <div>잠시만요!</div>
              <img src="/assets/small-quokka.png" width="100px" alt="quokka" />
            </div>
          </div>
        </div>
      )}
    </Main>
  );
};

export default Detail;
