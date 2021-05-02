interface ButtonAction {
  text: string;
  onClick: () => void;
}

interface IProps {
  type: string;
  isLastHint: boolean;
  buttonActions: {
    HELP: ButtonAction[];
    HINT_LAST: ButtonAction[];
    HINT_NOT_LAST: ButtonAction[];
    ANSWER: ButtonAction[];
    WRONG: ButtonAction[];
    CORRECT: ButtonAction[];
  };
}

const DialogButtons = ({ type, isLastHint, buttonActions }: IProps) => {
  let buttons = buttonActions.HELP;

  switch (type) {
    case "help":
      buttons = buttonActions.HELP;
      break;

    case "hint":
      buttons = isLastHint
        ? buttonActions.HINT_LAST
        : buttonActions.HINT_NOT_LAST;
      break;
    case "answer":
      buttons = buttonActions.ANSWER;
      break;
    case "wrong":
      buttons = buttonActions.WRONG;
      break;

    case "correct":
      buttons = buttonActions.CORRECT;
      break;
    default:
      buttons = buttonActions.HELP;
  }

  return (
    <div className="flex justify-end">
      {buttons.map((item) => (
        <SmallButton text={item.text} onClick={item.onClick} />
      ))}
    </div>
  );
};

export default DialogButtons;

const SmallButton = ({
  onClick,
  text,
}: {
  onClick: () => void;
  text: string;
}) => (
  <button
    onClick={onClick}
    className="focus:outline-none text-blue-600 text-sm py-2 px-4 rounded-md border border-blue-600 hover:bg-blue-50"
  >
    {text}
  </button>
);
