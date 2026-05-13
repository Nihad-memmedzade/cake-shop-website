import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./mainSlider.scss";

import { Autoplay, Pagination } from "swiper/modules";

import mainImageSlider from "@/assets/images/sliders/mainSlider/cake1.jpg";
import mainImageSlider1 from "@/assets/images/sliders/mainSlider/cake2.jpg";

interface FakeData {
  id: number;
  p: string;
  title: string;
  title2: string;
  img: string;
}

const fakeSliderData: FakeData[] = [
  {
    id: 1,
    p: "New trend",
    title: "Chocolate dream cakes",
    title2: "Birthdays / Weddings / Special Days",
    img: mainImageSlider,
  },
  {
    id: 2,
    p: "Summer 2026",
    title: "Cakes for every celebration",
    title2: "Fresh layers, soft cream, made to order",
    img: mainImageSlider1,
  },
];

export default function MainSlider() {
  const navigate = useNavigate();

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      loop={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 4500,
        disableOnInteraction: false,
      }}
      speed={500}
      modules={[Autoplay, Pagination]}
      className="mySwiper swipper-main"
    >
      {fakeSliderData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="mainSlider-cnt">
            <p className="mainSlider-p">{slide.p}</p>
            <h1 className="mainSlider-h1">{slide.title}</h1>
            <p className="mainSlider-h2">{slide.title2}</p>

            <button
              className="mainSlider-p2"
              type="button"
              onClick={() => navigate("/products")}
            >
              Discover now
            </button>
          </div>

          <img src={slide.img} alt={slide.title} className="mainSlide-img" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
