import { useEffect, useState } from "react";
import ProductCard from "@/assets/components/productCard/productCard";
import style from "./trendyProducts.module.scss";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import {
  fetchAllProducts,
  fetchBestSellerProducts,
  fetchNewArrivalsProduct,
  fetchTopRatedProducts,
} from "@/store/productSlice";
import { useNavigate } from "react-router-dom";

const TABS = ["all", "new arrivals", "best seller", "top rated"];

export default function TrendyProducts() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<number>(0);

  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(
    (state: RootState) => state.products,
  );

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

        <div
          key={activeTab}
          className={`${style.all_products_container} ${style.animate}`}
        >
          {items?.map((item) => (
            <ProductCard key={item.id} card={item} />
          ))}
        </div>

        <div className={style.discoverMore} onClick={() => navigate("/products")}>
          <p>discover more</p>
        </div>
      </div>
    </div>
  );
}
