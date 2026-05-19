import { Link } from "react-router-dom";
import AccountLayout from "@/assets/components/accountLayout";
import ProductCard from "@/assets/components/productCard/productCard";
import { useAppSelector } from "@/store/store";
import style from "./wishlist.module.scss";

export default function Wishlist() {
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  return (
    <AccountLayout title="Wishlist">
      <div className={style.wishlistHead}>
        <div>
          <p className={style.kicker}>Saved cakes</p>
          <h2>Your wishlist</h2>
        </div>

        <span className={style.count}>{wishlistItems.length} items</span>
      </div>

      {wishlistItems.length > 0 ? (
        <div className={style.grid3}>
          {wishlistItems.map((card) => (
            <ProductCard key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className={style.emptyState}>
          <h3>Your wishlist is empty</h3>
          <p>Save your favorite cakes and come back to them anytime.</p>
          <Link to="/products">Go to shop</Link>
        </div>
      )}
    </AccountLayout>
  );
}
