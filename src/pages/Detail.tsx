import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useStores } from "states/Context";
import { observer } from "mobx-react";
import styled from "styled-components";
import PathManager from "utils/PathManager";
import WritingBox from "components/WritingBox";
import SkeletonWritingBox from "components/SkeletonWritingBox";
import ModalWriting from "components/ModalWriting";
import { Dialog } from "@headlessui/react";

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
  const [themeFinishModalOpen, setThemeFinishModalOpen] = useState(false);
  const { writingStore } = useStores();

  useEffect(() => {
    writingStore.currentWriting = null;
    writingStore.changeOrfetchWriting(Number(id));
  }, [id, writingStore]);

  const goNextWriting = async () => {
    const nextId = await writingStore.getOrFetchNextWritingId();
    if (nextId > 0) {
      pathManager.goWritingDetail(nextId);
    } else {
      setThemeFinishModalOpen(true);
    }
  };
  const goPreviosWriting = () => {
    const previousId = writingStore.getPreviousWritingId();
    if (previousId > 0) {
      pathManager.goWritingDetail(previousId);
    } else {
      alert("이 테마의 첫번째 문장입니다.");
    }
  };

  const goFirstWritingInTheme = () => {
    const firstWritingId = writingStore.getFirstWritingIdInTheme();
    if (firstWritingId > 0) {
      pathManager.goWritingDetail(firstWritingId);
      setThemeFinishModalOpen(false);
    } else {
      alert("잠시 후 다시 시도해주세요.");
    }
  };
  return (
    <Main className="sm:pt-20 pt-12 sm:px-3 bg-gray-100">
      <ModalWriting
        open={themeFinishModalOpen}
        closePopup={() => setThemeFinishModalOpen(false)}
      >
        <div className="text-center">
          <div className="flex justify-center items-center pb-2">
            <div className="rounded-full bg-yellow-200 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <div className="pb-2 gap-1 font-semibold flex-wrap">
            <Dialog.Title
              as="h3"
              className="text-lg leading-6 font-medium text-gray-900"
            >
              All Writings are Done
            </Dialog.Title>
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-bold">
              {writingStore.getCurrentThemeDisplayName()}
            </span>
            테마의 모든 문장을 완료했어요! <br /> 다른 테마의 문장을 만나러
            가볼까요?
          </p>
          <div className="flex justify-center gap-2 pt-4 flew-wrap text-sm sm:text-medium">
            <button
              className={`sm:flex-1 px-2 py-2 rounded shadow-lg text-right flex justify-center items-center border-1 border-gray-300`}
              onClick={() => setThemeFinishModalOpen(false)}
            >
              <div className="flex items-center">
                <span>취소</span>
              </div>
            </button>
            <button
              className={`sm:flex-1 px-2 py-2 rounded shadow-lg text-right font-bold flex justify-center items-center bg-primary-700 text-white`}
              onClick={goFirstWritingInTheme}
            >
              <div className="flex items-center">
                <span>다시 풀기</span>
              </div>
            </button>
            <button
              className={`sm:flex-1 px-2 py-2 rounded shadow-lg text-right font-bold flex justify-center items-center bg-primary-700 text-white`}
              onClick={pathManager.goWritingBase}
            >
              <div className="flex items-center">
                <span>테마 선택하러 가기</span>
              </div>
            </button>
          </div>
        </div>
      </ModalWriting>
      <section className="w-fit-860">
        <div className="hidden sm:flex justify-end pt-5 px-3 ">
          <div className="flex bg-gradient-200 fit-h self-center px-3 py-2 sm:py-3 sm:px-5 mr-1 rounded-xl shadow-sm sm:text-sm text-xs">
            힌트를 사용해서 문제를 풀어보아요!
          </div>
          <img
            className="w-14 h-14"
            src="/assets/avatar-3.png"
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
