import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Layout from "@/assets/components/layout";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import { clearSelectedProduct, fetchProductById } from "@/store/productSlice";
import ProductSlider from "./sections/productSlider";
import ProductDetails from "./sections/productDetails";
import ProductReviews from "./sections/productReviews";
import RelatedProducts from "./sections/relatedProducts";
import style from "./detail.module.scss";
import PageLoader from "@/assets/components/pageLoader/pageLoader";
import ErrorPage from "@/pages/error";

export default function Details() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const productId = Number(id);
  const hasValidProductId = Number.isInteger(productId) && productId > 0;

  const { selectedProductById, loading, error } = useAppSelector(
    (state: RootState) => state.products,
  );

  const currentLanguage =
    i18n.resolvedLanguage?.split("-")[0] ||
    i18n.language?.split("-")[0] ||
    "en";

  useEffect(() => {
    if (hasValidProductId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, hasValidProductId, productId, currentLanguage]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch]);

  if (!hasValidProductId) {
    return <ErrorPage variant="productNotFound" />;
  }

  if (loading) {
    return (
      <PageLoader
        fullPage
        title={t("pages.shop.detail.loader.title")}
        text={t("pages.shop.detail.loader.text")}
      />
    );
  }

  if (error) {
    const normalizedError = error.toLowerCase();
    const isNotFoundError =
      normalizedError.includes("404") || normalizedError.includes("not found");

    return (
      <ErrorPage variant={isNotFoundError ? "productNotFound" : "server"} />
    );
  }

  if (!selectedProductById) {
    return <ErrorPage variant="productNotFound" />;
  }

  return (
    <Layout>
      <main className={style.detail}>
        <section className={style.productOverview}>
          <ProductSlider product={selectedProductById} />
          <ProductDetails product={selectedProductById} />
        </section>

        <ProductReviews
          productId={selectedProductById.id}
          productTitle={selectedProductById.title}
        />
        <RelatedProducts currentProductId={selectedProductById.id} />
      </main>
    </Layout>
  );
}
