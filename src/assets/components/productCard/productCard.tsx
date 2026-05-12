// import { HeartActiveIcon, HeartIcon } from "@/assets/images/icons";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import style from "./productCard.module.scss";
import { toggleWishlist } from "@/store/wishlistSlice";
import { addToCart } from "@/store/cartSlice";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  quantity: number;
  category: string;
  flavor: string;
  price: number;
  discountedPrice: number;
  rating: number;
  images: string[];
  brand: string;
  sizes: { id: number; label: string }[];
  description: string;
}

interface ProductProps {
  card: Product;
}

export default function ProductCard({ card }: ProductProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(
    (state: RootState) => state.wishlist.items,
  );

  if (!card) return null;

  const isInWishlist = wishlistItems.some(
    (item: Product) => item.id === card.id,
  );

  const handleWishlist = () => {
    dispatch(toggleWishlist(card));
  };

  const addCart = () => {
    dispatch(addToCart(card));
  };

  return (
    <div className={style.productCard}>
      <div className={style.productImg}>
        <Link to={`/products/${card.id}`}>
          <img src={card.images?.[0]} alt="Product Image" />
        </Link>

        <button className={style.addToCart} onClick={addCart}>
          add to cart
        </button>
      </div>

      <div className={style.productCategory_cnt}>
        <p className={style.categoryName}>{card.category}</p>

        <Heart
          size={20}
          fill={isInWishlist ? "#e11d48" : "none"}
          stroke={isInWishlist ? "#e11d48" : "#111"}
          cursor={"pointer"}
          onClick={handleWishlist}
          className={style.wishlistIcon}
        />
      </div>

      <p className={style.product_name}>{card.title}</p>

      {card.discountedPrice > 0 ? (
        <div className={style.discountedPrice}>
          <span className={style.oldPrice}>${card.price}</span>
          <span className={style.newPrice}>${card.discountedPrice}</span>
        </div>
      ) : (
        <span className={style.price}>${card.price}</span>
      )}
    </div>
  );
}
