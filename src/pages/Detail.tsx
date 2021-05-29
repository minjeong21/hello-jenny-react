import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import WritingBox from "components/WritingBox";
import styled from "styled-components";
import FilterNavigation from "components/molecules/FilterNavigation";
import PathManager from "utils/PathManager";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import FilterPopup from "components/FilterPopup";

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
  let { id } = useParams<ParamTypes>();
  const [popup, setPopupOpen] = useState(false);
  const { writingStore } = useStores();
  const openPopup = () => {
    setPopupOpen(true);
  };

  const saveFilter = () => {
    alert("저장한다");
  };

  useEffect(() => {
    writingStore.currentWriting = null;
    console.log("레벨", writingStore.selectedLevels.join(", "));
    console.log("테마", writingStore.selectedThemes.join(","));
    writingStore.fetchWriting(Number(id));

    // Params
    const params = new URLSearchParams(window.location.search);
    if (params.has("theme")) {
      const theme: any = params.get("theme") ? params.get("theme") : "";
      writingStore.setSelectedThemes([theme]);
    }
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
      updateButtonUI(writingStore.selectedLevels, "bg-brown-300");
      writingStore.setSelectedLevel(writingStore.selectedLevels);
    } else if (name === "theme") {
      updateButtonUI(writingStore.selectedThemes, "bg-brown-300");
      writingStore.setSelectedThemes(writingStore.selectedThemes);
    }
  };

  const SaveFilter = () => {
    writingStore.fetchFilteredWritingAndUpdate(
      writingStore.selectedLevels.join(","),
      writingStore.selectedThemes.join(",")
    );
  };
  return (
    <Main className="md:pt-20 pt-12 px-3">
      <section>
        <div className="flex justify-end py-5 px-3">
          <div className="flex bg-gray-200 fit-h self-center px-3 py-2 md:py-3 md:px-5 mr-1 rounded-xl shadow-sm">
            힌트를 사용해서 문제를 풀어보아요!
          </div>
          <img
            className="w-12 h-14"
            src="/assets/small-quokka-left.png"
            alt="quokka"
          />
        </div>
        <FilterPopup
          open={popup}
          closePopup={() => setPopupOpen(false)}
          updateFilter={updateFilter}
          selectedLevels={writingStore.selectedLevels}
          selectedThemes={writingStore.selectedThemes}
        />
        {/* {updateFilter ? (
          <FilterNavigation
            updateFilter={updateFilter}
            selectedLevels={writingStore.selectedLevels}
            selectedThemes={writingStore.selectedThemes}
          />
        ) : null} */}

        {writingStore.currentWriting && writingStore.currentWriting.writing ? (
          <WritingBox
            openPopup={() => setPopupOpen(true)}
            writingId={writingStore.currentWriting.writing.id}
            writing={writingStore.currentWriting}
            moveNextWriting={(e) =>
              pathManager.goNextWriting(e, writingStore.getNextWritingId())
            }
            updateFilter={updateFilter}
            selectedLevels={writingStore.selectedLevels}
            selectedThemes={writingStore.selectedThemes}
          />
        ) : (
          <div>
            <div>
              <div className="pt-24 flex flex-col items-center">
                <div>이 조합에는 문제를 준비중입니다!</div>
                <img
                  src="/assets/small-quokka.png"
                  width="100px"
                  alt="quokka"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      <div className="md:min-h-50v" />
    </Main>
  );
});

export default Detail;
