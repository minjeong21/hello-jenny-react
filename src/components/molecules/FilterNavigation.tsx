import { LEVEL_MENU, THEME_MENU } from "properties/Filter";
import styled from "styled-components";
import "swiper/swiper.scss";

const Navgation = styled.ul`
  a {
    width: 100px;
    cursor: pointer;
  }
  button:focus {
    outline: 0px !important;
  }
  .swiper-slide {
    width: fit-content;
  }

  .filter-button {
    color: var(--color-gray-600);
    background-color: white;
  }
  .filter-button.active {
    background-color: var(--color-primary-700);
    color: white;
  }
`;
interface IProps {
  onClickFilter: (element: any) => void;
  selectedLevels: string[];
  selectedThemes: string[];
}

const FilterNavigation = ({
  onClickFilter,
  selectedLevels,
  selectedThemes,
}: IProps) => {
  return (
    <Navgation className="flex mb-2">
      {/* Desktop View */}
      <div className="w-full pb-3 ">
        <div>
          <button className="mr-3 text-lg font-bold">레벨</button>
          <div className="inline-block mr-2 mt-2">
            {LEVEL_MENU.map((item, index) => (
              <SmallButton
                key={index}
                name="level"
                value={item.value}
                text={item.displayName}
                active={selectedLevels.includes(item.value)}
                onClick={onClickFilter}
              />
            ))}
          </div>
        </div>
        <div className="pt-6">
          <button className="mr-3 text-lg font-bold">테마</button>
          <div className="inline-block mr-2">
            {THEME_MENU.map((item, index) => (
              <SmallButton
                key={index}
                name="theme"
                value={item.value}
                text={item.text}
                active={selectedThemes.includes(item.value)}
                onClick={onClickFilter}
              />
            ))}
          </div>
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
    className={`my-1 mr-2 button-level font-semibold px-2 py-1 md:text-medium text-sm rounded-md shadow filter-button ${
      active ? "active" : ""
    }`}
    onClick={onClick}
  >
    {text}
  </button>
);

export default FilterNavigation;
