import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import styled from "styled-components";
import PathManager from "utils/PathManager";
import WritingBox from "components/WritingBox";
import FilterPopup from "components/FilterPopup";
import SkeletonWritingBox from "components/SkeletonWritingBox";

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
    writingStore.changeOrfetchWriting(Number(id));
    // If WritingNone, fetch
    if (!writingStore.writings || writingStore.writings.length === 0) {
      writingStore.fetchWritingsDefault();
    }
    // Params
    const params = new URLSearchParams(window.location.search);
    if (params.has("theme")) {
      const theme: any = params.get("theme") ? params.get("theme") : "";
      writingStore.setSelectedThemes([theme]);
    }

    writingStore.updateFilterFromSession();
  }, [id, writingStore]);

  return (
    <Main className="sm:pt-20 pt-12 sm:px-3 bg-gray-100">
      <section>
        <div className="hidden sm:flex justify-end pt-5 px-3 ">
          <div className="flex bg-gray-200 fit-h self-center px-3 py-2 sm:py-3 sm:px-5 mr-1 rounded-xl shadow-sm sm:text-sm text-xs">
            힌트를 사용해서 문제를 풀어보아요!
          </div>
          <img
            className="w-12 h-14"
            src="/assets/small-quokka-left.png"
            alt="quokka"
          />
        </div>
        {writingStore.isNotFoundWriting ? (
          <div>
            <FilterPopup
              open={popupOpen}
              closePopup={() => setPopupOpen(false)}
              pathManager={pathManager}
            />
            <div>문제를 찾을 수 없습니다.</div>
            <button
              onClick={(e) =>
                pathManager.goNextWriting(e, writingStore.getNextWritingId())
              }
            >
              다른 문제
            </button>
          </div>
        ) : (
          <>
            {writingStore.currentWriting &&
            writingStore.currentWriting.writing ? (
              <div className="pt-5 px-1">
                <FilterPopup
                  open={popupOpen}
                  closePopup={() => setPopupOpen(false)}
                  pathManager={pathManager}
                />

                <WritingBox
                  isDetailPage
                  openPopup={() => setPopupOpen(true)}
                  writingId={writingStore.currentWriting.writing.id}
                  writing={writingStore.currentWriting}
                  moveNextWriting={(e) =>
                    pathManager.goNextWriting(
                      e,
                      writingStore.getNextWritingId()
                    )
                  }
                />
              </div>
            ) : (
              <div>
                <SkeletonWritingBox />
              </div>
            )}
          </>
        )}
      </section>

      <div className="sm:pb-12" />
    </Main>
  );
});

export default Detail;
