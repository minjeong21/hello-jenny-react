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
}

const Main = styled.main`
  min-height: calc(100vh - 45px);
`;
const Detail = ({
  writings,
  getNextWritingId,
  repWritingId,
  fetchWritingsFiltered,
}: {
  getNextWritingId: () => number;
  repWritingId: number;
  writings: IWriting[] | null;
  fetchWritingsFiltered: (levels: string[], themes: string[]) => void;
}) => {
  let { id, theme, level } = useParams<ParamTypes>();

  const [writingManager, setWritingManager] = useState<WritingManager>();
  const pathManager = new PathManager(useHistory());
  const [selectedLevels, setSelectedLevel] = useState<string[]>(["1", "2"]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>(["friend"]);

  useEffect(() => {
    if (id) {
      fetchWriting(Number(id));
    } else if (theme) {
      // fetchThemeWritingList(theme);
    } else if (level) {
      // fetchLevelWritingList(Number(level));
    } else {
      fetchWriting(repWritingId);
    }
  }, [id, theme, level, repWritingId]);

  const fetchWriting = async (id: number) => {
    const writing = await fetchWritingByNumId(id);
    setWritingManager(new WritingManager(writing.data));
  };
  const updateFilter = (e: any) => {
    const { target } = e;
    const { value, name } = target;

    const updateButtonUI = (list: string[], activeBgColor: string) => {
      if (list.includes(value)) {
        const idx = list.indexOf(value);
        if (idx > -1) list.splice(idx, 1);
        target.classList.remove(activeBgColor);
        target.classList.remove("border-brown-300");
        target.classList.add("border-gray-300");
        target.classList.add("text-gray-600");
      } else {
        list.push(value);
        target.classList.add(activeBgColor);
        target.classList.remove("border-gray-300");
        target.classList.add("border-brown-300");
        target.classList.remove("text-gray-600");
      }
    };

    if (name === "level") {
      updateButtonUI(selectedLevels, "bg-brown-300");
      setSelectedLevel(selectedLevels);
    } else if (name === "theme") {
      updateButtonUI(selectedThemes, "bg-brown-300");
      setSelectedThemes(selectedThemes);
    }
    console.log(selectedLevels);
    console.log(selectedThemes);
    fetchWritingsFiltered(selectedLevels, selectedThemes);
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
            moveNextWriting={(e) =>
              pathManager.goNextWriting(e, getNextWritingId())
            }
            updateFilter={updateFilter}
            selectedLevels={selectedLevels}
            selectedThemes={selectedThemes}
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
