import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import ProductCard from "@/assets/components/productCard/productCard";
import PageLoader from "@/assets/components/pageLoader/pageLoader";
import { getLocalizedPath } from "@/helpers/languagePath";
import {
  fetchAllProducts,
  fetchBestSellerProducts,
  fetchNewArrivalsProduct,
  fetchTopRatedProducts,
} from "@/store/productSlice";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";

import style from "./trendyProducts.module.scss";

const TABS = [
  { type: "all", labelKey: "pages.home.trendyProducts.tabs.all" },
  {
    type: "new arrivals",
    labelKey: "pages.home.trendyProducts.tabs.newArrivals",
  },
  {
    type: "best seller",
    labelKey: "pages.home.trendyProducts.tabs.bestSeller",
  },
  { type: "top rated", labelKey: "pages.home.trendyProducts.tabs.topRated" },
];

const PRODUCT_LIMIT = 8;

export default function TrendyProducts() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState(0);

  const { items, loading } = useAppSelector(
    (state: RootState) => state.products,
  );

  const visibleProducts = useMemo(() => {
    return items.slice(0, PRODUCT_LIMIT);
  }, [items]);

  useEffect(() => {
    const currentTab = TABS[activeTab].type;

    if (currentTab === "all") dispatch(fetchAllProducts());
    if (currentTab === "new arrivals") dispatch(fetchNewArrivalsProduct());
    if (currentTab === "best seller") dispatch(fetchBestSellerProducts());
    if (currentTab === "top rated") dispatch(fetchTopRatedProducts());
  }, [dispatch, activeTab,i18n.language]);

  return (
    <div className={style.products}>
      <h1 className={style.product_title}>
        {t("pages.home.trendyProducts.title")}{" "}
        <strong>{t("pages.home.trendyProducts.titleStrong")}</strong>
      </h1>

      <div className={style.tabs}>
        <div className={style.tabContainer}>
          {TABS.map((tab, index) => (
            <p
              key={tab.type}
              className={`${style.tabs_title} ${
                index === activeTab ? style.active_tab : ""
              }`}
              onClick={() => setActiveTab(index)}
            >
              {t(tab.labelKey)}
            </p>
          ))}
        </div>

        {loading ? (
          <PageLoader
            title={t("pages.home.trendyProducts.loadingTitle")}
            text={t("pages.home.trendyProducts.loadingText")}
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
          onClick={() => navigate(getLocalizedPath("/products"))}
        >
          <p>{t("pages.home.trendyProducts.discoverMore")}</p>
        </div>
      </div>
    </div>
  );
}
