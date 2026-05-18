import { useEffect } from "react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/assets/components/productCard/productCard";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import {
  clearRelatedProducts,
  fetchRelatedProducts,
} from "@/store/productSlice";
import styles from "./relatedProducts.module.scss";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import PageLoader from "@/assets/components/pageLoader/pageLoader";

type RelatedProductsProps = {
  currentProductId: number;
};

export default function RelatedProducts({
  currentProductId,
}: RelatedProductsProps) {
  const dispatch = useAppDispatch();

  const {
    relatedProducts,
    relatedProductsLoading,
    relatedProductsError,
  } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchRelatedProducts({ productId: currentProductId, limit: 8 }));

    return () => {
      dispatch(clearRelatedProducts());
    };
  }, [dispatch, currentProductId]);

if (relatedProductsLoading) {
  return (
    <PageLoader
      title="Loading related cakes"
      text="Finding similar cakes for you."
    />
  );
}


  if (relatedProductsError) {
    return (
      <section className={styles.relatedProducts}>
        <div className={styles.sectionHead}>
          <p className={styles.kicker}>You may also like</p>
          <h2 className={styles.title}>Related products</h2>
          <p className={styles.subtitle}>{relatedProductsError}</p>
        </div>
      </section>
    );
  }

  if (!relatedProducts.length) return null;

  return (
    <section className={styles.relatedProducts}>
      <div className={styles.sectionHead}>
        <p className={styles.kicker}>You may also like</p>
        <h2 className={styles.title}>Related products</h2>
        <p className={styles.subtitle}>
          Handpicked cakes with similar sweet details and fresh flavors.
        </p>
      </div>

      <Swiper
        spaceBetween={18}
        loop={relatedProducts.length > 4}
        freeMode
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        speed={900}
        modules={[Autoplay, FreeMode, Pagination, Navigation]}
        className={`${styles.relatedSwiper} relatedProductsSwiper`}
        breakpoints={{
          0: { slidesPerView: 1.15, spaceBetween: 14 },
          480: { slidesPerView: 2.05, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 18 },
          1024: { slidesPerView: 4, spaceBetween: 18 },
        }}
      >
        {relatedProducts.map((item) => (
          <SwiperSlide key={item.id} className={styles.slide}>
            <ProductCard card={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
