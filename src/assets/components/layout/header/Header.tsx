import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "@/assets/images/logo/cake-logo.png";
import {
  getLocalizedPath,
  removeLanguageFromPath,
} from "@/helpers/languagePath";
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
  const location = useLocation();
  const dispatch = useAppDispatch();

  const shoppingList = useAppSelector((state: RootState) => state.cart.items);
  const wishlistItems = useAppSelector(
    (state: RootState) => state.wishlist.items,
  );

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

  useEffect(() => {
    const cleanPath = removeLanguageFromPath(location.pathname);
    const query = new URLSearchParams(location.search).get("q") || "";

    if (cleanPath === "/products") {
      setSearchValue(query);
    }
  }, [location.pathname, location.search]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedValue = searchValue.trim();
    if (!trimmedValue) return;

    const params = new URLSearchParams();
    params.set("q", trimmedValue);

    navigate(`${getLocalizedPath("/products")}?${params.toString()}`);
    closeMobileMenu();
  };

  const handleLogout = () => {
    dispatch(logout());
    closeAll();
    navigate(getLocalizedPath("/"));
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
    navigate(getLocalizedPath("/"));
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
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

            <div
              className={style.headerLogo}
              onClick={() => navigate(getLocalizedPath("/"))}
            >
              <img src={Logo} alt="Cake House" />
            </div>

            <DesktopNav menu={HEADER_MENU} />
          </div>

          <HeaderActions
            user={user}
            cartCount={cartCount}
            wishlistCount={wishlistItems.length}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onSearch={handleSearch}
            onOpenLogin={openLoginModal}
            onOpenCart={openCart}
            onWishlist={() => navigate(getLocalizedPath("/account/wishlist"))}
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
          wishlistCount={wishlistItems.length}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearch={handleSearch}
          onClose={closeMobileMenu}
          onOpenCart={openCart}
          onOpenLogin={openLoginModal}
          onWishlist={() => navigate(getLocalizedPath("/account/wishlist"))}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
