import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./limitedEdition.scss";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

import PageLoader from "@/assets/components/pageLoader/pageLoader";
import ProductCard from "@/assets/components/productCard/productCard";
import { fetchLimitedEditionProducts } from "@/store/productSlice";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";

export default function LimitedEdition() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const { limitedEditionItems, limitedEditionLoading } = useAppSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(fetchLimitedEditionProducts());
  }, [dispatch, i18n.language]);

  if (limitedEditionLoading) {
    return (
      <PageLoader
        title={t("pages.home.limitedEdition.loadingTitle")}
        text={t("pages.home.limitedEdition.loadingText")}
      />
    );
  }

  if (!limitedEditionItems.length) {
    return null;
  }

  return (
    <section className="limitedEdition">
      <div className="limitedEdition__head">
        <p className="limited-kicker">
          {t("pages.home.limitedEdition.kicker")}
        </p>

        <h1 className="limited-title">
          {t("pages.home.limitedEdition.title")}
        </h1>

        <p className="limited-subtitle">
          {t("pages.home.limitedEdition.subtitle")}
        </p>
      </div>

      <div className="limitedSliderShell">
        <button
          type="button"
          className="limitedNav limitedNavPrev"
          aria-label="Previous products"
        />

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          className="limitedSwiper"
          slidesPerView="auto"
          spaceBetween={14}
          loop={limitedEditionItems.length > 4}
          watchOverflow
          navigation={{
            prevEl: ".limitedNavPrev",
            nextEl: ".limitedNavNext",
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={800}
          breakpoints={{
            0: {
              spaceBetween: 10,
            },
            576: {
              spaceBetween: 12,
            },
            992: {
              spaceBetween: 14,
            },
          }}
        >
          {limitedEditionItems.map((item) => (
            <SwiperSlide key={item.id}>
              <ProductCard card={item} variant="compact" />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          className="limitedNav limitedNavNext"
          aria-label="Next products"
        />
      </div>
    </section>
  );
}
