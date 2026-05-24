import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { Product } from "@/types/product";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import styles from "./productSlider.module.scss";

type ProductSliderProps = {
  product: Product;
};

export default function ProductSlider({ product }: ProductSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const images = product.images?.length ? product.images : [];

  if (!images.length) {
    return <div className={styles.emptyImage}>No image available</div>;
  }

  return (
    <div className={styles.productSlider}>
      <div className={styles.thumbsCol}>
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="horizontal"
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Thumbs]}
          className={`${styles.thumbsSwiper} productThumbsSwiper`}
          breakpoints={{
            0: {
              direction: "horizontal",
              slidesPerView: 4,
              spaceBetween: 8,
            },
            576: {
              direction: "horizontal",
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1025: {
              direction: "vertical",
              slidesPerView: 4,
              spaceBetween: 12,
            },
          }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={`${src}-${index}`} className={styles.thumbSlide}>
              <button type="button" className={styles.thumbBox}>
                <img src={src} alt={`${product.title} thumbnail ${index + 1}`} />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.mainCol}>
        <Swiper
          spaceBetween={12}
          navigation
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Navigation, Thumbs]}
          className={`${styles.mainSwiper} productMainSwiper`}
        >
          {images.map((src, index) => (
            <SwiperSlide key={`${src}-${index}`} className={styles.mainSlide}>
              <img src={src} alt={`${product.title} ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}