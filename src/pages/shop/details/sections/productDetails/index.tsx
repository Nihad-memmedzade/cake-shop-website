import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLocalizedPath } from "@/helpers/languagePath";
import { useMemo, useState } from "react";
import { Heart, Star } from "lucide-react";
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

export default function ProductDetails({ product }: ProductDetailProps) {
  const { t } = useTranslation();

  const firstSize = product.sizes?.[0]?.label || "S";
  const [selectedSize, setSelectedSize] = useState(firstSize);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken,
  );

  const location = useLocation();

  const breadcrumbState = location.state as {
    from?: string;
    fromLabel?: string;
  } | null;

  const fromPath = breadcrumbState?.from || "/products";
  const fromLabel =
    breadcrumbState?.fromLabel || t("pages.shop.detail.details.shop");
  const showSourcePage = fromPath !== "/";

  const wishlistItems = useAppSelector(
    (state: RootState) => state.wishlist.items,
  );
  const isInWishlist = wishlistItems.some(
    (item: Product) => item.id === product.id,
  );

  const finalPrice =
    product.discountedPrice > 0 ? product.discountedPrice : product.price;

  const hasDiscount = product.discountedPrice > 0;

  const ratingStars = useMemo(() => {
    return Array.from(
      { length: 5 },
      (_, index) => index < Math.round(product.rating),
    );
  }, [product.rating]);

  const increaseQty = () => setSelectedQuantity((prev) => prev + 1);

  const decreaseQty = () => {
    setSelectedQuantity((prev) => Math.max(1, prev - 1));
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
        <Link className={styles.breadcrumbLink} to={getLocalizedPath("/")}>
          {t("pages.shop.detail.details.home")}
        </Link>

        {showSourcePage && (
          <>
            <span>/</span>
            <Link
              className={styles.breadcrumbLink}
              to={getLocalizedPath(fromPath)}
            >
              {fromLabel}
            </Link>
          </>
        )}

        <span>/</span>
        <span className={styles.breadcrumbCurrent}>{product.title}</span>
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
          <span className={styles.oldPrice}>${product.price}</span>
        )}
        <span className={styles.price}>${finalPrice}</span>
      </div>

      <p className={styles.description}>{product.description}</p>

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
                selectedSize === size.label ? styles.activeSize : ""
              }`}
              onClick={() => setSelectedSize(size.label)}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.cartRow}>
        <div className={styles.quantityBox}>
          <button
            type="button"
            onClick={decreaseQty}
            aria-label={t("pages.shop.detail.details.decreaseQuantity")}
          >
            -
          </button>
          <span>{selectedQuantity}</span>
          <button
            type="button"
            onClick={increaseQty}
            aria-label={t("pages.shop.detail.details.increaseQuantity")}
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
          <span>{t("pages.shop.detail.details.brand")}</span> {product.brand}
        </p>
        <p>
          <span>{t("pages.shop.detail.details.flavor")}</span> {product.flavor}
        </p>
        <p>
          <span>{t("pages.shop.detail.details.selectedSize")}</span>{" "}
          {selectedSize}
        </p>
      </div>
    </section>
  );
}