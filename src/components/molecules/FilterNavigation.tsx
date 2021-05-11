import { LEVEL_MENU, THEME_MENU } from "properties/Menu";
import styled from "styled-components";
const Navgation = styled.ul`
  a {
    width: 100px;
    cursor: pointer;
  }
  button:focus {
    outline: 0px !important;
  }
`;
interface IProps {
  updateFilter: (e: any) => void;
  selectedLevels: string[];
  selectedThemes: string[];
}

const FilterNavigation = ({
  updateFilter,
  selectedLevels,
  selectedThemes,
}: IProps) => {
  return (
    <Navgation className="flex mb-2">
      <div className="w-full pb-3">
        <div className="inline-block mr-2 mt-2">
          <button className="mr-3 text-brown-700 font-bold">레벨</button>
          {LEVEL_MENU.map((item, index) => (
            <SmallButton
              key={index}
              name="level"
              value={item.value}
              text={item.text}
              active={selectedLevels.includes(item.value)}
              onClick={updateFilter}
            />
          ))}
        </div>
        <br />
        <div className="inline-block mr-2 mt-2">
          <button className="mr-3 text-brown-700 font-bold">테마</button>
          {THEME_MENU.map((item, index) => (
            <SmallButton
              key={index}
              name="theme"
              value={item.value}
              text={item.text}
              active={selectedThemes.includes(item.value)}
              onClick={updateFilter}
            />
          ))}
        </div>
      </div>
    </Navgation>
  );
};
const SmallButton = ({
  name,
  value,
  text,
  active,
  onClick,
}: {
  name: string;
  value: string;
  text: string;
  active?: boolean;

  onClick: (e: any) => void;
}) => (
  <button
    name={name}
    value={value}
    className={`font-semibold text-sm text-gray-600 px-2 py-1 mr-2 border border-gray-300 rounded-md hover:bg-brown-300 ${
      active ? `bg-brown-300` : ""
    }`}
    onClick={onClick}
  >
    {text}
  </button>
);

export default FilterNavigation;
