import { LEVEL_MENU, THEME_MENU } from "properties/Menu";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
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
      {/* Desktop View */}
      <div className="w-full pb-3 hidden md:block">
        <div className="inline-block mr-2 mt-2">
          <button className="mr-3 text-brown-700 font-bold">레벨</button>
          {LEVEL_MENU.map((item, index) => (
            <SmallButton
              key={index}
              name="level"
              value={item.value}
              text={item.displayName}
              active={selectedLevels.includes(item.value)}
              onClick={updateFilter}
            />
          ))}
        </div>
        <div className="inline-block mr-2">
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

      {/* Mobile View */}
      <div className="w-full pb-2 md:hidden">
        <Swiper
          spaceBetween={2}
          slidesPerView={"auto"}
          pagination={{ clickable: true }}
        >
          {LEVEL_MENU.map((item, index) => (
            <SwiperSlide key={index}>
              <SmallButton
                name="level"
                value={item.value}
                text={item.displayName}
                active={selectedLevels.includes(item.value)}
                onClick={updateFilter}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          spaceBetween={1}
          slidesPerView={"auto"}
          pagination={{ clickable: true }}
        >
          {THEME_MENU.map((item, index) => (
            <SwiperSlide key={index}>
              <SmallButton
                name="theme"
                value={item.value}
                text={item.text}
                active={selectedThemes.includes(item.value)}
                onClick={updateFilter}
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
    className={`my-1 mr-1 button-level font-semibold md:text-sm text-xs px-2 py-1 rounded-md shadow ${
      active ? `bg-primary-700 text-white` : "bg-white text-gray-600"
    }`}
    onClick={onClick}
  >
    {text}
  </button>
);

export default FilterNavigation;
