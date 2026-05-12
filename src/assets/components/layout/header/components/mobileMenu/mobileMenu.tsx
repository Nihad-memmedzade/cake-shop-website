import { useNavigate } from "react-router-dom";

import style from "./mobileMenu.module.scss";

import { SearchIcon, ShoppingIcon, UserIcon } from "@/assets/images/icons";

import Logo from "@/assets/images/logo/cake-logo.png";

type MenuItem = {
  label: string;
  path: string;
};

type MobileMenuProps = {
  isClosing?: boolean;
  menu: MenuItem[];
  user: any;
  cartCount: number;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  onOpenCart: () => void;
  onLogout: () => void;
};

export default function MobileMenu({
  isClosing = false,
  menu,
  user,
  cartCount,
  searchValue,
  setSearchValue,
  onSearch,
  onClose,
  onOpenCart,
  onLogout,
}: MobileMenuProps) {
  const navigate = useNavigate();

  const goToPage = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleAccountClick = () => {
    onClose();

    if (user) {
      navigate("/account/details");
      return;
    }

    navigate("/auth/login");
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
          aria-label="Close menu"
        >
          x
        </button>

        <div className={style.mobileLogo} onClick={() => navigate("/")}>
          <img src={Logo} alt="Cake shop logo" />
        </div>

        <button
          type="button"
          className={style.mobileCartBtn}
          onClick={onOpenCart}
          aria-label="Open cart"
        >
          <img src={ShoppingIcon} alt="" />

          {cartCount > 0 && (
            <span className={style.cartBadge}>{cartCount}</span>
          )}
        </button>
      </div>

      <div className={style.mobileMenuBody}>
        <form className={style.mobileSearch} onSubmit={onSearch}>
          <input
            type="text"
            placeholder="Search products"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button type="submit" aria-label="Search">
            <img src={SearchIcon} alt="" />
          </button>
        </form>

        <nav className={style.mobileLinks}>
          {menu.map((item) => (
            <button
              type="button"
              key={item.path}
              onClick={() => goToPage(item.path)}
            >
              <span>{item.label}</span>
              <span>-&gt;</span>
            </button>
          ))}
        </nav>
      </div>

      <div className={style.mobileMenuFooter}>
        <button
          type="button"
          className={style.mobileAccountBtn}
          onClick={handleAccountClick}
        >
          <span className={style.accountIcon}>
            <img src={UserIcon} alt="" />
          </span>

          <span>
            <small>{user ? "Signed in" : "Account"}</small>
            {user ? user.fullName : "MY ACCOUNT"}
          </span>
        </button>

        {user && (
          <button
            type="button"
            className={style.mobileLogoutBtn}
            onClick={onLogout}
          >
            LOG OUT
          </button>
        )}

        <div className={style.mobileOptionGrid}>
          <div className={style.mobileOptionRow}>
            <span>Language</span>
            <strong>English</strong>
          </div>

          <div className={style.mobileOptionRow}>
            <span>Currency</span>
            <strong>$ USD</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
