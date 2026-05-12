import type { FormEvent } from "react";

import {
  SearchIcon,
  ShoppingIcon,
  UserIcon,
  WishlistIcon,
} from "@/assets/images/icons";

import style from "../header.module.scss";

type HeaderActionsProps = {
  cartCount: number;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: (e: FormEvent<HTMLFormElement>) => void;
  onOpenLogin: () => void;
  onOpenCart: () => void;
  onWishlist: () => void;
};

export default function HeaderActions({
  cartCount,
  searchValue,
  setSearchValue,
  onSearch,
  onOpenLogin,
  onOpenCart,
  onWishlist,
}: HeaderActionsProps) {
  return (
    <div className={style.headerRight}>
      <div className={style.searchBox}>
        <form onSubmit={onSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            className={style.searchInput}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button type="submit">
            <img src={SearchIcon} alt="Search" className={style.searchIcon} />
          </button>
        </form>
      </div>

      <button type="button" className={style.iconBtn} onClick={onOpenLogin}>
        <img src={UserIcon} alt="User" />
      </button>

      <button type="button" className={style.iconBtn} onClick={onWishlist}>
        <img src={WishlistIcon} alt="Wishlist" />
      </button>

      <button
        type="button"
        className={`${style.iconBtn} ${style.cartIconBtn}`}
        onClick={onOpenCart}
      >
        <img src={ShoppingIcon} alt="Cart" />
        <span className={style.cartBadge}>{cartCount}</span>
      </button>
    </div>
  );
}
