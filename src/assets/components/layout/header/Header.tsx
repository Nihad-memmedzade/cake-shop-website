import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Logo from "@/assets/images/logo/cake-logo.png";
import { loginThunk, logout } from "@/store/authSlice";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";

import CartDrawer from "./components/cartDrawer/cartDrawer";
import DesktopNav from "./components/DesktopNav";
import HeaderActions from "./components/HeaderActions";
import MobileMenu from "./components/mobileMenu/mobileMenu";
import UserModal from "./components/userModal/userModal";

import { HEADER_MENU } from "./constants";
import { useCartSummary } from "./hooks/useCartSummary";
import { useHeaderUI } from "./hooks/useHeaderUI";

import style from "./header.module.scss";

export default function Header() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const shoppingList = useAppSelector((state: RootState) => state.cart.items);
  const { user, error, loading } = useAppSelector(
    (state: RootState) => state.auth,
  );

  const { cartCount, subtotal } = useCartSummary(shoppingList);

  const {
    showModal,
    cartOpen,
    menuOpen,
    closingModal,
    closingCart,
    closingMenu,
    openMenu,
    openLoginModal,
    openCart,
    closeUserModal,
    closeCartDrawer,
    closeMobileMenu,
    closeAll,
  } = useHeaderUI();

  const [searchValue, setSearchValue] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [modalPassword, setModalPassword] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedValue = searchValue.trim();

    if (!trimmedValue) return;

    navigate(`/${i18n.language}/products?q=${trimmedValue}`);
    setSearchValue("");
    closeMobileMenu();
  };

  const handleLogout = () => {
    dispatch(logout());
    closeAll();
    navigate("/");
  };

  const handleModalLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(
      loginThunk({
        email: modalEmail,
        password: modalPassword,
      }),
    );

    if (!loginThunk.fulfilled.match(result)) return;

    setModalEmail("");
    setModalPassword("");
    closeUserModal();
    navigate("/");
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAll();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeAll]);

  return (
    <>
      <header className={style.headerWrap}>
        <div className={style.header_main}>
          <div className={style.headerLeft}>
            <button type="button" className={style.burger} onClick={openMenu}>
              <span />
              <span />
              <span />
            </button>

            <div className={style.headerLogo} onClick={() => navigate("/")}>
              <img src={Logo} alt="Logo" />
            </div>

            <DesktopNav menu={HEADER_MENU} />
          </div>

          <HeaderActions
            cartCount={cartCount}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onSearch={handleSearch}
            onOpenLogin={openLoginModal}
            onOpenCart={openCart}
            onWishlist={() => navigate("/account/wishlist")}
          />
        </div>
      </header>

      {showModal && (
        <UserModal
          isClosing={closingModal}
          user={user}
          error={error}
          loading={loading}
          modalEmail={modalEmail}
          modalPassword={modalPassword}
          setModalEmail={setModalEmail}
          setModalPassword={setModalPassword}
          onClose={closeUserModal}
          onLogin={handleModalLogin}
          onLogout={handleLogout}
        />
      )}

      {cartOpen && (
        <CartDrawer
          isClosing={closingCart}
          shoppingList={shoppingList}
          subtotal={subtotal}
          onClose={closeCartDrawer}
        />
      )}

      {menuOpen && (
        <MobileMenu
          isClosing={closingMenu}
          menu={HEADER_MENU}
          user={user}
          cartCount={cartCount}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearch={handleSearch}
          onClose={closeMobileMenu}
          onOpenCart={openCart}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
