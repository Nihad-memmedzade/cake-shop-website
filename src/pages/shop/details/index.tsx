import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/assets/components/layout";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import { clearSelectedProduct, fetchProductById } from "@/store/productSlice";
import ProductSlider from "./sections/productSlider";
import ProductDetails from "./sections/productDetails";
import ProductReviews from "./sections/productReviews";
import RelatedProducts from "./sections/relatedProducts";
import style from "./detail.module.scss";

export default function Details() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { selectedProductById, loading, error } = useAppSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  return (
    <Layout>
      <main className={style.detail}>
        {loading && (
          <div className={style.stateBox}>
            <p>Loading product...</p>
          </div>
        )}

        {error && (
          <div className={style.stateBox}>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && !selectedProductById && (
          <div className={style.stateBox}>
            <h1>Product not found</h1>
            <Link to="/products">Back to shop</Link>
          </div>
        )}

        {selectedProductById && (
          <>
            <section className={style.productOverview}>
              <ProductSlider product={selectedProductById} />
              <ProductDetails product={selectedProductById} />
            </section>

            <ProductReviews
              productId={selectedProductById.id}
              productTitle={selectedProductById.title}
            />
            <RelatedProducts currentProductId={selectedProductById.id} />
          </>
        )}
      </main>
    </Layout>
  );
}
