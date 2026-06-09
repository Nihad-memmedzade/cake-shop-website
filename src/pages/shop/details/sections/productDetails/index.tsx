import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Heart, Star } from "lucide-react";

import {
  getLocalizedPath,
  removeLanguageFromPath,
} from "@/helpers/languagePath";

import type { Product } from "@/types/product";
import { addGuestToCart, addToCart, syncAddCart } from "@/store/cartSlice";
import {
  syncAddWishlist,
  syncRemoveWishlist,
  toggleGuestWishlist,
  toggleWishlist,
} from "@/store/wishlistSlice";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";

import styles from "./productDetails.module.scss";

type ProductDetailProps = {
  product: Product;
};

type BreadcrumbState = {
  from?: string;
  fromLabel?: string;
};

export default function ProductDetails({ product }: ProductDetailProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken,
  );

  const wishlistItems = useAppSelector(
    (state: RootState) => state.wishlist.items,
  );

  const breadcrumbState = location.state as BreadcrumbState | null;
  const fromPath = breadcrumbState?.from || "/products";
  const cleanFromPath = removeLanguageFromPath(fromPath.split("?")[0]);
  const showSourcePage = cleanFromPath !== "/";

  const firstSize = product.sizes?.[0]?.label ?? null;

  const [selectedSize, setSelectedSize] = useState<string | null>(firstSize);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    setSelectedSize(firstSize);
    setSelectedQuantity(1);
  }, [product.id, firstSize]);

  const sourceLabel = useMemo(() => {
    if (cleanFromPath.startsWith("/account/wishlist")) {
      return t("common.links.wishlist");
    }

    if (cleanFromPath.startsWith("/cart")) {
      return t("common.cart.title");
    }

    if (cleanFromPath.startsWith("/products")) {
      return t("pages.shop.detail.details.shop");
    }

    return (
      breadcrumbState?.fromLabel || t("pages.shop.detail.details.shop")
    );
  }, [breadcrumbState?.fromLabel, cleanFromPath, t]);

  const isInWishlist = wishlistItems.some(
    (item: Product) => item.id === product.id,
  );

  const hasDiscount = product.discountedPrice > 0;

  const finalPrice = hasDiscount
    ? product.discountedPrice
    : product.price;

  const ratingStars = useMemo(
    () =>
      Array.from(
        { length: 5 },
        (_, index) => index < Math.round(product.rating),
      ),
    [product.rating],
  );

  const increaseQuantity = () => {
    setSelectedQuantity((previousQuantity) => previousQuantity + 1);
  };

  const decreaseQuantity = () => {
    setSelectedQuantity((previousQuantity) =>
      Math.max(1, previousQuantity - 1),
    );
  };

  const handleAddCart = () => {
    const cartProduct = {
      ...product,
      quantity: selectedQuantity,
      selectedSize,
    };

    if (!accessToken) {
      dispatch(addGuestToCart(cartProduct));
      return;
    }

    dispatch(addToCart(cartProduct));

    dispatch(
      syncAddCart({
        productId: product.id,
        quantity: selectedQuantity,
        size: selectedSize,
      }),
    );
  };

  const handleWishlist = () => {
    if (!accessToken) {
      dispatch(toggleGuestWishlist(product));
      return;
    }

    dispatch(toggleWishlist(product));

    if (isInWishlist) {
      dispatch(syncRemoveWishlist(product.id));
    } else {
      dispatch(syncAddWishlist(product.id));
    }
  };

  return (
    <section className={styles.productDetails}>
      <div className={styles.breadcrumb}>
        <Link
          className={styles.breadcrumbLink}
          to={getLocalizedPath("/")}
        >
          {t("pages.shop.detail.details.home")}
        </Link>

        {showSourcePage && (
          <>
            <span>/</span>

            <Link
              className={styles.breadcrumbLink}
              to={getLocalizedPath(fromPath)}
            >
              {sourceLabel}
            </Link>
          </>
        )}

        <span>/</span>

        <span className={styles.breadcrumbCurrent}>
          {product.title}
        </span>
      </div>

      <p className={styles.category}>{product.category}</p>

      <h1 className={styles.title}>{product.title}</h1>

      <div className={styles.ratingRow}>
        <div className={styles.stars}>
          {ratingStars.map((filled, index) => (
            <Star
              key={index}
              size={16}
              fill={filled ? "#c59b5f" : "none"}
              stroke="#c59b5f"
            />
          ))}
        </div>

        <span>
          {t("pages.shop.detail.details.rating", {
            rating: product.rating,
          })}
        </span>
      </div>

      <div className={styles.prices}>
        {hasDiscount && (
          <span className={styles.oldPrice}>
            ${product.price}
          </span>
        )}

        <span className={styles.price}>
          ${finalPrice}
        </span>
      </div>

      <p className={styles.description}>
        {product.description}
      </p>

      {product.sizes.length > 0 && (
        <div className={styles.optionRow}>
          <p className={styles.optionLabel}>
            {t("pages.shop.detail.details.size")}
          </p>

          <div className={styles.sizes}>
            {product.sizes.map((size) => (
              <button
                key={size.id}
                type="button"
                className={`${styles.sizeBtn} ${
                  selectedSize === size.label
                    ? styles.activeSize
                    : ""
                }`}
                onClick={() => setSelectedSize(size.label)}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.cartRow}>
        <div className={styles.quantityBox}>
          <button
            type="button"
            onClick={decreaseQuantity}
            aria-label={t(
              "pages.shop.detail.details.decreaseQuantity",
            )}
          >
            -
          </button>

          <span>{selectedQuantity}</span>

          <button
            type="button"
            onClick={increaseQuantity}
            aria-label={t(
              "pages.shop.detail.details.increaseQuantity",
            )}
          >
            +
          </button>
        </div>

        <button
          type="button"
          className={styles.addToCart}
          onClick={handleAddCart}
        >
          {t("pages.shop.detail.details.addToCart")}
        </button>
      </div>

      <button
        type="button"
        className={styles.wishlistBtn}
        onClick={handleWishlist}
      >
        <Heart
          size={17}
          fill={isInWishlist ? "#b94867" : "none"}
          stroke={isInWishlist ? "#b94867" : "currentColor"}
        />

        {isInWishlist
          ? t("pages.shop.detail.details.removeFromWishlist")
          : t("pages.shop.detail.details.addToWishlist")}
      </button>

      <div className={styles.meta}>
        <p>
          <span>{t("pages.shop.detail.details.brand")}</span>{" "}
          {product.brand}
        </p>

        <p>
          <span>{t("pages.shop.detail.details.flavor")}</span>{" "}
          {product.flavor}
        </p>

        <p>
          <span>
            {t("pages.shop.detail.details.selectedSize")}
          </span>{" "}
          {selectedSize || "-"}
        </p>
      </div>
    </section>
  );
}