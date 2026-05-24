import { Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  getLocalizedPath,
  removeLanguageFromPath,
} from "@/helpers/languagePath";

import { addToCart } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import type { Product } from "@/types/product";

import style from "./productCard.module.scss";

type ProductProps = {
  card: Product;
  variant?: "default" | "compact";
};

export default function ProductCard({
  card,
  variant = "default",
}: ProductProps) {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const { t } = useTranslation();

  const cleanPath = removeLanguageFromPath(location.pathname);
  const sourcePath = `${cleanPath}${location.search}`;

  const getSourceLabel = () => {
    if (cleanPath === "/") return t("common.links.home");
    if (cleanPath.startsWith("/account/wishlist"))
      return t("common.links.wishlist");
    if (cleanPath.startsWith("/cart")) return t("common.footer.bottom.cart");
    if (cleanPath.startsWith("/products")) return t("pages.shop.toolbar.shop");

    return t("pages.shop.toolbar.shop");
  };

  const wishlistItems = useAppSelector(
    (state: RootState) => state.wishlist.items,
  );

  if (!card) return null;

  const isInWishlist = wishlistItems.some(
    (item: Product) => item.id === card.id,
  );

  const discountPercent =
    card.discountedPrice > 0
      ? Math.round(((card.price - card.discountedPrice) / card.price) * 100)
      : 0;

  const handleWishlist = () => {
    dispatch(toggleWishlist(card));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(card));
  };

  return (
    <div
      className={`${style.productCard} ${
        variant === "compact" ? style.compactCard : ""
      }`}
    >
      <div className={style.productImg}>
        <Link
          to={getLocalizedPath(`/products/${card.id}`)}
          state={{
            from: sourcePath,
            fromLabel: getSourceLabel(),
          }}
        >
          <img src={card.images?.[0]} alt={card.title} />
        </Link>
        {discountPercent > 0 && (
          <span className={style.discountBadge}>-{discountPercent}%</span>
        )}

        <button
          type="button"
          className={style.addToCart}
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>

      <div className={style.productCategory_cnt}>
        <p className={style.categoryName}>{card.category}</p>

        <button
          type="button"
          className={`${style.wishlistBtn} ${
            isInWishlist ? style.wishlistBtnActive : ""
          }`}
          onClick={handleWishlist}
          aria-label="Add to wishlist"
        >
          <Heart
            size={18}
            strokeWidth={2.2}
            fill={isInWishlist ? "#b94867" : "none"}
            stroke={isInWishlist ? "#b94867" : "currentColor"}
          />
        </button>
      </div>

      <p className={style.product_name}>{card.title}</p>

      {card.discountedPrice > 0 ? (
        <p className={style.discountedPrice}>
          <span className={style.oldPrice}>${card.price}</span>
          <span className={style.newPrice}>${card.discountedPrice}</span>
        </p>
      ) : (
        <p className={style.price}>${card.price}</p>
      )}
    </div>
  );
}
