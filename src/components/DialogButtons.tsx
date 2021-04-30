interface IProps {
  type: string;
  isLastHint: boolean;
  onShowHint: () => void;
  showAnswer: () => void;
  moveNextWriting: () => void;
  onShowSubjective: () => void;
}

const DialogButtons = ({
  type,
  isLastHint,
  onShowSubjective,
  onShowHint,
  showAnswer,
  moveNextWriting,
}: IProps) => {
  console.log(isLastHint);
  switch (type) {
    case "help":
      return (
        <div className="flex justify-end">
          <button className="btn-white mr-s" onClick={onShowSubjective}>
            첫단어 힌트
          </button>
          <button className="btn-white mr-s" onClick={onShowHint}>
            힌트 보여줘
          </button>
          <button className="btn-white mr-s" onClick={showAnswer}>
            정답을 알려줘!
          </button>
          <button className="btn-white mr-s" onClick={moveNextWriting}>
            다음 문제 줄래?
          </button>
        </div>
      );
    case "hint":
      return (
        <>
          {isLastHint ? (
            <div className="flex justify-end">
              <button className="btn-white mr-s" onClick={showAnswer}>
                정답을 알려줘!
              </button>
              <button className="btn-white mr-s" onClick={moveNextWriting}>
                다음 문제 줄래?
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <button className="btn-white mr-s" onClick={onShowHint}>
                힌트 more..
              </button>
              <button className="btn-white mr-s" onClick={showAnswer}>
                정답을 알려줘!
              </button>
              <button className="btn-white mr-s" onClick={moveNextWriting}>
                다음 문제 줄래?
              </button>
            </div>
          )}
        </>
      );
    case "answer":
      return (
        <div className="flex justify-end">
          {!isLastHint && (
            <button
              className="btn-white mr-s"
              onClick={() => alert("준비중인 기능이야")}
            >
              문장 설명해줘
            </button>
          )}

          <button
            className="btn-white mr-s"
            onClick={() => window.location.reload()}
          >
            다시 풀래!
          </button>
          <button className="btn-white mr-s" onClick={moveNextWriting}>
            다음 문제 줄래?
          </button>
        </div>
      );
    case "wrong":
      return (
        <div className="flex justify-end">
          {!isLastHint && (
            <button className="btn-white mr-s" onClick={onShowHint}>
              힌트 보여줘
            </button>
          )}
          <button className="btn-white mr-s" onClick={moveNextWriting}>
            다음 문제 풀래
          </button>
        </div>
      );
    case "correct":
      return (
        <div className="flex justify-end">
          {!isLastHint && (
            <button
              className="btn-white mr-s"
              onClick={() => alert("준비중인 기능이야")}
            >
              문장 설명해줘
            </button>
          )}
          <button className="btn-white mr-s" onClick={moveNextWriting}>
            다음 문제 풀래
          </button>
        </div>
      );
    default:
      return <></>;
  }
};

export default DialogButtons;
