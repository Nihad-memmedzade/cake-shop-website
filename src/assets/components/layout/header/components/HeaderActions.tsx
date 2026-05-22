import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";

import LanguageSwitcher from "@/assets/components/languageSwitcher/languageSwitcher";

import {
  SearchIcon,
  ShoppingIcon,
  UserIcon,
  WishlistIcon,
} from "@/assets/images/icons";

import style from "../header.module.scss";

type HeaderActionsProps = {
  cartCount: number;
  wishlistCount: number;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: (e: FormEvent<HTMLFormElement>) => void;
  onOpenLogin: () => void;
  onOpenCart: () => void;
  onWishlist: () => void;
};

export default function HeaderActions({
  cartCount,
  wishlistCount,
  searchValue,
  setSearchValue,
  onSearch,
  onOpenLogin,
  onOpenCart,
  onWishlist,
}: HeaderActionsProps) {
  const { t } = useTranslation();

  return (
    <div className={style.headerRight}>
      <div className={style.searchBox}>
        <form onSubmit={onSearch}>
          <input
            type="text"
            placeholder={t("common.header.search_input")}
            value={searchValue}
            className={style.searchInput}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button type="submit" aria-label={t("common.header.search")}>
            <img src={SearchIcon} alt="" className={style.searchIcon} />
          </button>
        </form>
      </div>

      <button
        type="button"
        className={`${style.iconBtn} ${style.userIconBtn}`}
        onClick={onOpenLogin}
        aria-label={t("common.links.account")}
      >
        <img src={UserIcon} alt="" />
      </button>

      <button
        type="button"
        className={`${style.iconBtn} ${style.wishlistIconBtn}`}
        onClick={onWishlist}
        aria-label={t("common.links.wishlist")}
      >
        <span className={style.wishlistIconWrap}>
          <img src={WishlistIcon} alt="" />

          {wishlistCount > 0 && (
            <span className={style.wishlistBadge}>{wishlistCount}</span>
          )}
        </span>
      </button>

      <button
        type="button"
        className={`${style.iconBtn} ${style.cartIconBtn}`}
        onClick={onOpenCart}
        aria-label={t("common.cart.title")}
      >
        <span className={style.cartIconWrap}>
          <img src={ShoppingIcon} alt="" />

          {cartCount > 0 && <span className={style.cartBadge}>{cartCount}</span>}
        </span>
      </button>

      <div className={style.headerLanguage}>
        <LanguageSwitcher />
      </div>
    </div>
  );
}