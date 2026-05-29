import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import LanguageSwitcher from "@/assets/components/languageSwitcher/languageSwitcher";
import {
  ShoppingIcon,
  UserIcon,
  WishlistIcon,
} from "@/assets/images/icons";
import Logo from "@/assets/images/logo/cake-logo.png";
import { getLocalizedPath } from "@/helpers/languagePath";
import type { User } from "@/types/user";

import style from "./mobileMenu.module.scss";

type MenuItem = {
  label: string;
  path: string;
};

type MobileMenuProps = {
  isClosing?: boolean;
  menu: MenuItem[];
  user: User | null;
  cartCount: number;
  wishlistCount: number;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  onOpenCart: () => void;
  onOpenLogin: () => void;
  onWishlist: () => void;
  onLogout: () => void;
};

export default function MobileMenu({
  isClosing = false,
  menu,
  user,
  cartCount,
  wishlistCount,
  onClose,
  onOpenCart,
  onOpenLogin,
  onWishlist,
  onLogout,
}: MobileMenuProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToPage = (path: string) => {
    onClose();
    navigate(getLocalizedPath(path));
  };

  const handleUserClick = () => {
    onClose();

    if (user) {
      navigate(getLocalizedPath("/account/details"));
      return;
    }

    onOpenLogin();
  };

  const handleWishlistClick = () => {
    onClose();
    onWishlist();
  };

  const handleCartClick = () => {
    onClose();
    onOpenCart();
  };

  return (
    <div
      className={`${style.mobileMenu} ${
        isClosing ? style.mobileMenuClosing : ""
      }`}
    >
      <div className={style.mobileMenuHeader}>
        <button
          type="button"
          className={style.mobileCloseBtn}
          onClick={onClose}
          aria-label={t("common.header.close_menu")}
        >
          <span />
          <span />
        </button>

        <div
          className={style.mobileLogo}
          onClick={() => navigate(getLocalizedPath("/"))}
        >
          <img src={Logo} alt="Cake House" />
        </div>

        <div className={style.mobileHeaderActions}>
          <button
            type="button"
            className={style.mobileActionBtn}
            onClick={handleUserClick}
            aria-label={t("common.links.account")}
          >
            <img src={UserIcon} alt="" />
          </button>

          <button
            type="button"
            className={style.mobileActionBtn}
            onClick={handleWishlistClick}
            aria-label={t("common.links.wishlist")}
          >
            <span className={style.mobileIconWrap}>
              <img src={WishlistIcon} alt="" />

              {wishlistCount > 0 && (
                <span className={style.wishlistBadge}>{wishlistCount}</span>
              )}
            </span>
          </button>

          <button
            type="button"
            className={style.mobileActionBtn}
            onClick={handleCartClick}
            aria-label={t("common.cart.title")}
          >
            <span className={style.mobileIconWrap}>
              <img src={ShoppingIcon} alt="" />

              {cartCount > 0 && (
                <span className={style.cartBadge}>{cartCount}</span>
              )}
            </span>
          </button>
        </div>
      </div>

      <div className={style.mobileMenuBody}>
        <nav className={style.mobileLinks}>
          {menu.map((item) => (
            <button
              type="button"
              key={item.path}
              onClick={() => goToPage(item.path)}
            >
              <span>{t(item.label)}</span>
              <span>&gt;</span>
            </button>
          ))}
        </nav>
      </div>

      <div className={style.mobileMenuFooter}>
        <button
          type="button"
          className={style.mobileAccountBtn}
          onClick={handleUserClick}
        >
          <span className={style.accountIcon}>
            <img src={UserIcon} alt="" />
          </span>

          <span>
            <small>
              {user ? t("common.header.signed_in") : t("common.links.account")}
            </small>
            {user ? user.fullName : t("common.header.my_account")}
          </span>
        </button>

        {user && (
          <button
            type="button"
            className={style.mobileLogoutBtn}
            onClick={onLogout}
          >
            {t("common.header.logout")}
          </button>
        )}

        <div className={style.mobileOptionGrid}>
          <div className={style.mobileOptionRow}>
            <span>{t("common.header.change_language")}</span>
            <LanguageSwitcher placement="top" />
          </div>

        
        </div>
      </div>
    </div>
  );
}
