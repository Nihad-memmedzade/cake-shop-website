import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./limitedEdition.scss";

import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

import ProductCard from "@/assets/components/productCard/productCard";
import { fetchLimitedEditionProducts } from "@/store/productSlice";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";

export default function LimitedEdition() {
  const dispatch = useAppDispatch();

  const { limitedEditionItems, limitedEditionLoading } = useAppSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(fetchLimitedEditionProducts());
  }, [dispatch]);

  if (limitedEditionLoading) {
    return (
      <section className="limitedEdition">
        <div className="limitedEdition__head">
          <h1 className="limited-title">Limited Edition</h1>
          <p className="limited-subtitle">Loading special cakes...</p>
        </div>
      </section>
    );
  }

  if (!limitedEditionItems.length) {
    return null;
  }

  return (
    <section className="limitedEdition">
      <div className="limitedEdition__head">
        <p className="limited-kicker">Small batch</p>
        <h1 className="limited-title">Limited Edition</h1>
        <p className="limited-subtitle">
          Small-batch cakes available for a short time only.
        </p>
      </div>

      <Swiper
        spaceBetween={18}
        loop={limitedEditionItems.length > 4}
        freeMode
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        speed={900}
        modules={[Autoplay, FreeMode, Pagination, Navigation]}
        className="limitedSwiper"
        breakpoints={{
          0: { slidesPerView: 1.2, spaceBetween: 14 },
          480: { slidesPerView: 2.1, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 18 },
          1024: { slidesPerView: 4, spaceBetween: 18 },
        }}
      >
        {limitedEditionItems.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCard card={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
