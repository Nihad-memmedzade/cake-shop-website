import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import AccountLayout from "@/assets/components/accountLayout";
import ProductCard from "@/assets/components/productCard/productCard";
import { getLocalizedPath } from "@/helpers/languagePath";
import { useAppSelector } from "@/store/store";

import style from "./wishlist.module.scss";

export default function Wishlist() {
  const { t } = useTranslation();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  return (
    <AccountLayout title={t("pages.account.wishlist.pageTitle")}>
      <div className={style.wishlistHead}>
        <div>
          <p className={style.kicker}>{t("pages.account.wishlist.kicker")}</p>
          <h2>{t("pages.account.wishlist.heading")}</h2>
        </div>

        <span className={style.count}>
          {t("pages.account.wishlist.count", { count: wishlistItems.length })}
        </span>
      </div>

      {wishlistItems.length > 0 ? (
        <div className={style.grid3}>
          {wishlistItems.map((card) => (
            <ProductCard key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className={style.emptyState}>
          <h3>{t("pages.account.wishlist.empty.title")}</h3>
          <p>{t("pages.account.wishlist.empty.text")}</p>

          <Link to={getLocalizedPath("/products")}>
            {t("pages.account.wishlist.empty.button")}
          </Link>
        </div>
      )}
    </AccountLayout>
  );
}