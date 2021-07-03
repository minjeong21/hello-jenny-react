import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import styled from "styled-components";
import PathManager from "utils/PathManager";
import WritingBox from "components/WritingBox";
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

    // TODO: 테마가 없는 경우
    const params = new URLSearchParams(window.location.search);
  }, [id, writingStore]);

  const goNextWriting = async () => {
    const nextId = await writingStore.getOrFetchNextWritingId();
    if (nextId > 0) {
      pathManager.goWritingDetail(nextId);
    } else {
      // TODO: 마지막 문제 처리
      alert("이 테마의 마지막 문장입니다.");
    }
  };
  const goPreviosWriting = () => {
    alert("이전 문제");
  };
  return (
    <Main className="sm:pt-20 pt-12 sm:px-3 bg-gray-100">
      <section>
        <div className="hidden sm:flex justify-end pt-5 px-3 ">
          <div className="flex bg-gradient-200 fit-h self-center px-3 py-2 sm:py-3 sm:px-5 mr-1 rounded-xl shadow-sm sm:text-sm text-xs">
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
            <div>문제를 찾을 수 없습니다.</div>
            <button onClick={(e) => alert("다른 문제 가기")}>다른 문제</button>
          </div>
        ) : (
          <>
            {writingStore.currentWriting &&
            writingStore.currentWriting.writing ? (
              <div className="pt-5 px-1">
                <WritingBox
                  openPopup={() => setPopupOpen(true)}
                  writingId={writingStore.currentWriting.writing.id}
                  writing={writingStore.currentWriting}
                  goNextWriting={goNextWriting}
                  goPreviosWriting={goPreviosWriting}
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
