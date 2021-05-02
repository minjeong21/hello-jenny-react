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
    <form className="rounded" onSubmit={onSubmitChallenge}>
      <input
        className="border-gray-400 font-medium rounded my-2 p-2  text-pink-600"
        placeholder="영작하기"
        height="500"
        id="english_input"
        required
        value={textInWrinting}
        onChange={(e) => setTextInWrinting(e.target.value)}
      />

      {/* 버튼 그룹 */}
      <div className="flex justify-end">
        <div className="p-2">
          <input
            type="submit"
            className="bg-pink-400 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded"
            value="정답 도전!"
          />
        </div>
        <div className="p-2 relative">
          <span className="flex h-3 w-3 absolute right-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
          <input
            type="button"
            className="bg-yellow-400 hover:bg-pink-300 text-white font-bold py-2 px-4 rounded"
            value="도와줘 제니"
            onClick={onClickHelpJenny}
          />
        </div>
      </div>
    </form>
  );
};

export default WritingForm;
