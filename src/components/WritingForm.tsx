const WritingForm = ({
  onChange,
  onSubmitChallenge,
  textInWrinting,
  onClickHelpJenny,
  moveNextWriting,
}: {
  onClickHelpJenny: (e: any) => void;
  onChange: (e: any) => void;
  onSubmitChallenge: (e: any) => void;
  moveNextWriting: (e: any) => void;
  textInWrinting: string;
}) => {
  return (
    <form className="rounded" onSubmit={onSubmitChallenge} id="writing-form">
      <input
        className="bg-basic-100 border-gray-400 rounded my-2 p-1 md:p-2 md:text-lg text-sm"
        placeholder="영작하기"
        height="500"
        id="english_input"
        autoComplete="off"
        required
        value={textInWrinting}
        onChange={onChange}
      />

      {/* 버튼 그룹 */}
      <div className="flex justify-end pt-2">
        <div className="pr-2">
          <SubmitButton text="정답 도전!" />
        </div>

        <div className="pr-2 relative">
          <Ping />
          <TextButton children={"HELP 🔑"} onClick={onClickHelpJenny} />
        </div>
        <div className="pr-2 relative">
          <TextButton
            children={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            }
            onClick={moveNextWriting}
          />
        </div>
      </div>
    </form>
  );
};

const TextButton = ({
  children,
  onClick,
}: {
  children: any;
  onClick: (e: any) => void;
}) => (
  <button
    className="bg-gray-700 hover:bg-primary-700 text-white font-bold md:px-4 px-3 py-2 rounded md:text-base text-sm"
    onClick={onClick}
  >
    {children}
  </button>
);
const SubmitButton = ({ text }: { text: string }) => (
  <button
    type="submit"
    className="bg-gray-700 hover:bg-primary-700 text-white font-bold md:px-4 px-3 py-2 rounded md:text-base text-sm"
  >
    {text}
  </button>
);
const Ping = () => (
  <span className="flex h-3 w-3 absolute right-1">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
  </span>
);

export default WritingForm;
