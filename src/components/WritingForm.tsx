const WritingForm = ({
  setTextInWrinting,
  onSubmitChallenge,
  textInWrinting,
  onClickHelpJenny,
}: {
  onClickHelpJenny: any;
  setTextInWrinting: any;
  onSubmitChallenge: any;
  textInWrinting: string;
}) => {
  return (
    <form onSubmit={onSubmitChallenge}>
      <input
        className="border-gray-3 font-medium"
        placeholder="영작하기"
        id="english_input"
        value={textInWrinting}
        onChange={(e) => setTextInWrinting(e.target.value)}
      />

      {/* 버튼 그룹 */}
      <div className="flex">
        <div className="text-right pt-s mr-xs">
          <input
            type="submit"
            className="btn-primary font-body weight-700"
            value="정답 도전!"
          />
        </div>
        <div className="text-right pt-s">
          <input
            type="button"
            className="btn-primary font-body weight-700"
            value="도와줘 제니"
            onClick={onClickHelpJenny}
          />
        </div>
      </div>
    </form>
  );
};

export default WritingForm;
