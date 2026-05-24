import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./mainSlider.scss";

import { Autoplay, Pagination } from "swiper/modules";

import mainImageSlider from "@/assets/images/sliders/mainSlider/cake1.jpg";
import mainImageSlider1 from "@/assets/images/sliders/mainSlider/cake2.jpg";
import { getLocalizedPath } from "@/helpers/languagePath";

type SliderTranslation = {
  kicker: string;
  title: string;
  subtitle: string;
};

const sliderImages = [mainImageSlider, mainImageSlider1];

export default function MainSlider() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const slides = t("pages.home.mainSlider.slides", {
    returnObjects: true,
  }) as SliderTranslation[];

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      loop
      pagination={{ clickable: true }}
      autoplay={{
        delay: 4500,
        disableOnInteraction: false,
      }}
      speed={500}
      modules={[Autoplay, Pagination]}
      className="mySwiper swipper-main"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.title}>
          <div className="mainSlider-cnt">
            <p className="mainSlider-p">{slide.kicker}</p>
            <h1 className="mainSlider-h1">{slide.title}</h1>
            <p className="mainSlider-h2">{slide.subtitle}</p>

            <button
              className="mainSlider-p2"
              type="button"
              onClick={() => navigate(getLocalizedPath("/products"))}
            >
              {t("pages.home.mainSlider.cta")}
            </button>
          </div>

          <img
            src={sliderImages[index]}
            alt={slide.title}
            className="mainSlide-img"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}