import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import PageLoader from "@/assets/components/pageLoader/pageLoader";
import ProductCard from "@/assets/components/productCard/productCard";
import {
  clearRelatedProducts,
  fetchRelatedProducts,
} from "@/store/productSlice";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";

import styles from "./relatedProducts.module.scss";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type RelatedProductsProps = {
  currentProductId: number;
};

export default function RelatedProducts({
  currentProductId,
}: RelatedProductsProps) {
const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const { relatedProducts, relatedProductsLoading, relatedProductsError } =
    useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchRelatedProducts({ productId: currentProductId, limit: 8 }));

    return () => {
      dispatch(clearRelatedProducts());
    };
  }, [dispatch, currentProductId,i18n.language]);

  if (relatedProductsLoading) {
    return (
      <PageLoader
        title={t("pages.shop.detail.related.loadingTitle")}
        text={t("pages.shop.detail.related.loadingText")}
      />
    );
  }

  if (relatedProductsError) {
    return (
      <section className={styles.relatedProducts}>
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>
            {t("pages.shop.detail.related.kicker")}
          </p>
          <h2 className={styles.title}>
            {t("pages.shop.detail.related.title")}
          </h2>
          <p className={styles.subtitle}>{relatedProductsError}</p>
        </div>
      </section>
    );
  }

  if (!relatedProducts.length) return null;

  return (
    <section className={styles.relatedProducts}>
      <div className={styles.sectionHead}>
        <p className={styles.kicker}>
          {t("pages.shop.detail.related.kicker")}
        </p>
        <h2 className={styles.title}>
          {t("pages.shop.detail.related.title")}
        </h2>
        <p className={styles.subtitle}>
          {t("pages.shop.detail.related.subtitle")}
        </p>
      </div>

      <div className={styles.relatedSliderShell}>
        <button
          type="button"
          className={`${styles.relatedNav} ${styles.relatedNavPrev} relatedProductsPrev`}
          aria-label={t("pages.shop.detail.related.previous")}
        />

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          className={`${styles.relatedSwiper} relatedProductsSwiper`}
          slidesPerView="auto"
          spaceBetween={14}
          loop={relatedProducts.length > 4}
          watchOverflow
          navigation={{
            prevEl: ".relatedProductsPrev",
            nextEl: ".relatedProductsNext",
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
          {relatedProducts.map((item) => (
            <SwiperSlide key={item.id} className={styles.slide}>
              <ProductCard card={item} variant="compact" />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          className={`${styles.relatedNav} ${styles.relatedNavNext} relatedProductsNext`}
          aria-label={t("pages.shop.detail.related.next")}
        />
      </div>
    </section>
  );
}