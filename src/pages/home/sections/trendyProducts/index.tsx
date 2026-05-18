import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "@/assets/components/productCard/productCard";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import {
  fetchAllProducts,
  fetchBestSellerProducts,
  fetchNewArrivalsProduct,
  fetchTopRatedProducts,
} from "@/store/productSlice";
import style from "./trendyProducts.module.scss";
import PageLoader from "@/assets/components/pageLoader/pageLoader";

const TABS = ["all", "new arrivals", "best seller", "top rated"];
const PRODUCT_LIMIT = 8;

export default function TrendyProducts() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState<number>(0);

  const { items, loading } = useAppSelector(
    (state: RootState) => state.products,
  );
  const visibleProducts = useMemo(() => {
    return items.slice(0, PRODUCT_LIMIT);
  }, [items]);

  useEffect(() => {
    const currentTab = TABS[activeTab];

    if (currentTab === "all") {
      dispatch(fetchAllProducts());
    }

    if (currentTab === "new arrivals") {
      dispatch(fetchNewArrivalsProduct());
    }

    if (currentTab === "best seller") {
      dispatch(fetchBestSellerProducts());
    }

    if (currentTab === "top rated") {
      dispatch(fetchTopRatedProducts());
    }
  }, [dispatch, activeTab]);

  return (
    <div className={style.products}>
      <h1 className={style.product_title}>
        our trendy <strong>products</strong>
      </h1>

      <div className={style.tabs}>
        <div className={style.tabContainer}>
          {TABS.map((tab, index) => (
            <p
              key={tab}
              className={`${style.tabs_title} ${
                index === activeTab ? style.active_tab : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </p>
          ))}
        </div>
        {loading ? (
          <PageLoader
            title="Loading trendy cakes"
            text="Fresh products are coming soon."
          />
        ) : (
          <div
            key={activeTab}
            className={`${style.all_products_container} ${style.animate}`}
          >
            {visibleProducts.map((item) => (
              <ProductCard key={item.id} card={item} />
            ))}
          </div>
        )}

        <div
          className={style.discoverMore}
          onClick={() => navigate("/products")}
        >
          <p>discover more</p>
        </div>
      </div>
    </div>
  );
}
