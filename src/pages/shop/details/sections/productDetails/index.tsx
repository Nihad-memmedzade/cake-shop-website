import { Link, useLocation } from "react-router-dom";
import { getLocalizedPath } from "@/helpers/languagePath";
import { useMemo, useState } from "react";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/types/product";
import { addToCart } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import styles from "./productDetails.module.scss";

type ProductDetailProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailProps) {
  const firstSize = product.sizes?.[0]?.label || "S";
  const [selectedSize, setSelectedSize] = useState(firstSize);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const dispatch = useAppDispatch();

  const location = useLocation();

  const breadcrumbState = location.state as {
    from?: string;
    fromLabel?: string;
  } | null;

  const fromPath = breadcrumbState?.from || "/products";
  const fromLabel = breadcrumbState?.fromLabel || "Shop";
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
    dispatch(
      addToCart({
        ...product,
        quantity: selectedQuantity,
      }),
    );
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <section className={styles.productDetails}>
      <div className={styles.breadcrumb}>
        <Link className={styles.breadcrumbLink} to={getLocalizedPath("/")}>
          Home
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
        <span>{product.rating} rating</span>
      </div>

      <div className={styles.prices}>
        {hasDiscount && (
          <span className={styles.oldPrice}>${product.price}</span>
        )}
        <span className={styles.price}>${finalPrice}</span>
      </div>

      <p className={styles.description}>{product.description}</p>

      <div className={styles.optionRow}>
        <p className={styles.optionLabel}>Size</p>

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
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span>{selectedQuantity}</span>
          <button
            type="button"
            onClick={increaseQty}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          className={styles.addToCart}
          onClick={handleAddCart}
        >
          Add to cart
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
        {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      </button>

      <div className={styles.meta}>
        <p>
          <span>Brand:</span> {product.brand}
        </p>
        <p>
          <span>Flavor:</span> {product.flavor}
        </p>
        <p>
          <span>Selected size:</span> {selectedSize}
        </p>
      </div>
    </section>
  );
}
