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
  const [popupOpen, setPopupOpen] = useState(false);
  const { writingStore } = useStores();

  useEffect(() => {
    writingStore.currentWriting = null;
    writingStore.fetchWriting(Number(id));

    // Params
    const params = new URLSearchParams(window.location.search);
    if (params.has("theme")) {
      const theme: any = params.get("theme") ? params.get("theme") : "";
      writingStore.setSelectedThemes([theme]);
    }
  }, [id]);

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
          open={popupOpen}
          closePopup={() => setPopupOpen(false)}
          pathManager={pathManager}
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
