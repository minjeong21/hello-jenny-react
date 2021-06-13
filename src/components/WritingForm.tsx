const WritingForm = ({
  onChange,
  onSubmitChallenge,
  textInWrinting,
}: {
  onChange: (e: any) => void;
  onSubmitChallenge: (e: any) => void;
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
const SubmitButton = ({ text }: { text: string }) => (
  <button
    type="submit"
    className="bg-primary-700 text-white font-bold p-1 rounded sm:text-sm text-xs h-8 w-10"
  >
    {text}
  </button>
);

export default WritingForm;
