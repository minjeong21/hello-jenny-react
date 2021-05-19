import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import WritingBox from "components/WritingBox";
import styled from "styled-components";
import PathManager from "utils/PathManager";
import { useStores } from "states/Context";
import { observer } from "mobx-react";

interface ParamTypes {
  id?: string;
  theme?: string;
  level?: string;
}

const Main = styled.main`
  min-height: calc(100vh - 45px);
`;
const Detail = observer(() => {
  const pathManager = new PathManager(useHistory());
  let { id, theme, level } = useParams<ParamTypes>();
  const [selectedLevels, setSelectedLevel] = useState<string[]>(["1", "2"]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>(["friend"]);
  const { writingStore } = useStores();

  useEffect(() => {
    writingStore.fetchWriting(Number(id));
  }, [id]);
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
    writingStore.updateWritings(selectedLevels, selectedThemes);
  };

  return (
    <Main className="md:pt-20 pt-12">
      {writingStore.currentWriting && writingStore.currentWriting.writing ? (
        <section>
          <div className="flex justify-end py-5 px-3">
            <div className="flex bg-primary-200 fit-h self-center px-3 py-2 md:py-4 md:px-5 mr-1 rounded-3xl shadow-lg">
              힌트를 사용해서 문제를 풀어보아요!
            </div>
            <img
              className="md:w-14 w-10"
              src="/assets/small-quokka-left.png"
              alt="quokka"
            />
          </div>
          <WritingBox
            writingId={writingStore.currentWriting.writing.id}
            writing={writingStore.currentWriting}
            moveNextWriting={(e) =>
              pathManager.goNextWriting(e, writingStore.getNextWritingId())
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
      <div className="md:min-h-50v" />
    </Main>
  );
});

export default Detail;
