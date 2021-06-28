import ITheme from "interface/ITheme";
import RightArrowIcon from "./icons/RightArrowIcon";

const ThemeCard = ({
  theme,
  disabled,
  active,
  onClick,
}: {
  theme: ITheme;
  disabled: boolean;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`sm:p-4 p-2 my-4 rounded-lg shadow-custom cursor-pointer relative ${
        disabled ? "bg-gray-100 text-gray-400" : "bg-white"
      } ${active && "bg-gradient-200 border-2 border-primary-600"} `}
    >
      <div
        className={`h-24 bg-gray-100 ${disabled ? "opacity-50" : ""}`}
        style={{
          backgroundImage: `url(
          ${theme.image_url}
        )`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="flex justify-between pb-4 items-center flex-wrap pt-2">
        <h4 className="text-lg font-bold">{theme.display_name}</h4>
        <div className="text-xs bg-gray-100 rounded px-1 py-1">
          {theme.count}문제
        </div>
      </div>
      <p className="text-gray-600 text-sm pb-3">{theme.description}</p>
    </div>
  );
};

export default ThemeCard;
