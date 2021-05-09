import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import WritingManager from "utils/WritingManager";
import WritingBox from "components/WritingBox";
import styled from "styled-components";
import { fetchWritingByNumId } from "apis/WritingApi";
import IWriting from "interface/IWriting";
import PathManager from "utils/PathManager";

interface ParamTypes {
  id?: string;
  theme?: string;
  level?: string;
  moveNextWriting: string;
}

interface IProps {}
const Main = styled.main`
  min-height: calc(100vh - 45px);
`;
const Detail = ({
  manager,
  writings,
}: {
  manager?: WritingManager;
  writings: IWriting[] | null;
}) => {
  let { id, theme, level } = useParams<ParamTypes>();
  const [writingManager, setWritingManager] = useState<WritingManager>();
  const pathManager = new PathManager(useHistory());

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

  return (
    <Main className=" pt-20">
      {writingManager && writings ? (
        <section className="py-20 ">
          <div className="flex justify-end">
            <div className="flex bg-primary-200 fit-h self-center p-2 rounded  font-cute">
              할 수 있따~ 포기하지 말아요~
            </div>
            <img
              src="/assets/small-quokka-left.png"
              width="50px"
              alt="quokka"
            />
          </div>
          <WritingBox
            writingId={writingManager.getId()}
            writingManager={writingManager}
            moveNextWriting={() => pathManager.goRandomPath(writings)}
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
