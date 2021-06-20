import ITheme from "interface/ITheme";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import ThemeCard from "./ThemeCard";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const Container = styled.div`
  --swiper-theme-color: var(--color-primary-600);
`;

const ThemeCardSwiper = ({ themes }: { themes: ITheme[] }) => {
  return (
    <Container className="flex mb-2 swiper-slide">
      <Swiper
        spaceBetween={6}
        slidesPerView={3.2}
        onSlideChange={() => console.log("slide change")}
        pagination={{
          dynamicBullets: true,
        }}
      >
        {themes.map((theme, index) => (
          <SwiperSlide key={index} className="pb-6">
            <ThemeCard theme={theme} disabled={false} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default ThemeCardSwiper;
