import { IWriting } from "interface/IWriting";
import { useState } from "react";
const HelpJennySection = ({
  writing,
  callHelp,
  moveNextWriting,
}: {
  writing: IWriting;
  callHelp: boolean;
  moveNextWriting: () => void;
}) => {
  const [visibleAnswer, setVisibleAnswer] = useState(false);
  const [textShowHint, setTextShowHint] = useState("힌트줄래?");
  const [visibleFirstHint, setVisibleFirstHint] = useState(false);
  const [visibleSecondHint, setVisibleSecondHint] = useState(false);
  const [visibleThirdHint, setVisibleThirdHint] = useState(false);

  const onShowHint = () => {
    if (!visibleFirstHint) {
      setVisibleFirstHint(true);
    } else if (!visibleSecondHint) {
      setTextShowHint("힌트 더 줘!");
      setVisibleSecondHint(true);
    } else {
      setVisibleThirdHint(true);
    }
  };

  return (
    <section id="explain-section">
      <div>
        {callHelp && (
          <>
            <DialogBox>
              <div className="">
                <div>나 왔어~ 뭐 필요해? </div>
                {!visibleAnswer &&
                  !visibleFirstHint &&
                  !visibleSecondHint &&
                  !visibleThirdHint && (
                    <div className="flex">
                      <button onClick={onShowHint}>{textShowHint}</button>
                      <button onClick={() => setVisibleAnswer(true)}>
                        정답을 알려줘!
                      </button>
                      <button onClick={moveNextWriting}>다음 문제 줄래?</button>
                    </div>
                  )}
              </div>
            </DialogBox>
          </>
        )}
        {visibleFirstHint && (
          <DialogBox>
            <div className="">
              <div>응! 첫번째 힌트야! </div>
              <div className="flex">
                <div className="flex pb-l">
                  <div className="font-small font-gray-2 pr-l">
                    {writing.hint1.hint}
                  </div>
                </div>
              </div>
              {!visibleAnswer && !visibleSecondHint && !visibleThirdHint && (
                <div className="flex">
                  <button onClick={onShowHint}>{textShowHint}</button>
                  <button onClick={() => setVisibleAnswer(true)}>
                    정답을 알려줘!
                  </button>
                  <button onClick={moveNextWriting}>다음 문제 줄래?</button>
                </div>
              )}
            </div>
          </DialogBox>
        )}

        {visibleSecondHint && (
          <DialogBox>
            <div className="">
              <div>짜란 두번째 힌트야!</div>
              <div className="flex">
                <div className="flex pb-l">
                  <div className="font-small font-gray-2 pr-l">
                    {writing.hint2.hint}
                  </div>
                </div>
              </div>
              {!visibleAnswer && !visibleThirdHint && (
                <div className="flex">
                  <button onClick={onShowHint}>{textShowHint}</button>
                  <button onClick={() => setVisibleAnswer(true)}>
                    정답을 알려줘!
                  </button>
                  <button onClick={moveNextWriting}>다음 문제 줄래?</button>
                </div>
              )}
            </div>
          </DialogBox>
        )}

        {visibleThirdHint && (
          <DialogBox>
            <div className="">
              <div>이게 마지막 힌트야!! 힘을 내!! </div>
              <div className="flex">
                <div className="flex pb-l">
                  <div className="font-small font-gray-2 pr-l">
                    {writing.hint3.hint}
                  </div>
                </div>
              </div>
              {!visibleAnswer && (
                <div className="flex">
                  <button onClick={() => setVisibleAnswer(true)}>
                    정답을 알려줘!
                  </button>
                  <button onClick={moveNextWriting}>다음 문제 줄래?</button>
                </div>
              )}
            </div>
          </DialogBox>
        )}

        {visibleAnswer && (
          <DialogBox>
            <div className="">
              <div>정답 문장은 이거야!!</div>
              <div className="flex">
                <div className="flex pb-l">
                  <div className="font-small font-gray-2 pr-l">
                    {writing.main_en_text}
                  </div>
                </div>
              </div>
              <div className="flex">
                <button onClick={() => window.location.reload()}>
                  다시 풀래!
                </button>
                <button onClick={moveNextWriting}>다음 문제 줄래?</button>
              </div>
            </div>
          </DialogBox>
        )}
      </div>
    </section>
  );
};

export default HelpJennySection;

const DialogBox = ({ children }: { children: any }) => {
  return (
    <div className="flex">
      <div>
        <img src="/assets/header-rabit.png" width="50" />
      </div>

      {children}
    </div>
  );
};

const HintBox = ({ visible, hint }: { visible: boolean; hint: string }) => {
  return (
    <div className="flex pb-l">
      <div className="font-small font-gray-2 pr-l">hint1</div>

      {visible ? <div className="font-small font-gray-1">{hint}</div> : null}
    </div>
  );
};
