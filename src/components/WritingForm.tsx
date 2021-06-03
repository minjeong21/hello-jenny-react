import RightArrowIcon from "./icons/RightArrowIcon";

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
      <div className="flex bg-basic-100  border-1 rounded border-gray-400 rounded  border-gray-400 my-2 p-1 sm:p-2 ">
        <input
          className="sm:text-lg text-base  border-0 p-0"
          placeholder="영작하기"
          height="500"
          id="english_input"
          autoComplete="off"
          required
          value={textInWrinting}
          onChange={onChange}
        />

        <SubmitButton text="도전" />
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
    className="bg-gray-700 hover:bg-primary-700 text-white font-bold sm:px-4 px-3 py-2 rounded sm:text-base text-sm"
    onClick={onClick}
  >
    {children}
  </button>
);
const SubmitButton = ({ text }: { text: string }) => (
  <button
    type="submit"
    className="bg-primary-700 text-white font-bold p-1 rounded sm:text-sm text-xs h-8 w-10"
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
