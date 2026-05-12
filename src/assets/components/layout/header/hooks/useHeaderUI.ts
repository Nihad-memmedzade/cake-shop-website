import { useCallback, useState } from "react";
import { CLOSE_ANIMATION_TIME } from "../constants";

export function useHeaderUI() {
  const [showModal, setShowModal] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [closingModal, setClosingModal] = useState(false);
  const [closingCart, setClosingCart] = useState(false);
  const [closingMenu, setClosingMenu] = useState(false);

  const closeUserModal = useCallback(() => {
    setClosingModal(true);

    window.setTimeout(() => {
      setShowModal(false);
      setClosingModal(false);
    }, CLOSE_ANIMATION_TIME);
  }, []);

  const closeCartDrawer = useCallback(() => {
    setClosingCart(true);

    window.setTimeout(() => {
      setCartOpen(false);
      setClosingCart(false);
    }, CLOSE_ANIMATION_TIME);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setClosingMenu(true);

    window.setTimeout(() => {
      setMenuOpen(false);
      setClosingMenu(false);
    }, CLOSE_ANIMATION_TIME);
  }, []);

  const openMenu = useCallback(() => {
    setClosingMenu(false);
    setMenuOpen(true);
    setShowModal(false);
    setCartOpen(false);
  }, []);

  const openLoginModal = useCallback(() => {
    setClosingModal(false);
    setShowModal(true);
    setCartOpen(false);
    setMenuOpen(false);
  }, []);

  const openCart = useCallback(() => {
    setClosingCart(false);
    setCartOpen(true);
    setShowModal(false);
    setMenuOpen(false);
  }, []);

  const closeAll = useCallback(() => {
    if (showModal) closeUserModal();
    if (cartOpen) closeCartDrawer();
    if (menuOpen) closeMobileMenu();
  }, [
    showModal,
    cartOpen,
    menuOpen,
    closeUserModal,
    closeCartDrawer,
    closeMobileMenu,
  ]);

  return {
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
  };
}
