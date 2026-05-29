import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { getLocalizedPath } from "@/helpers/languagePath";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import type { CartItem } from "@/types/cart";

import {
  decreaseGuestQuantity,
  decreaseQuantity,
  increaseGuestQuantity,
  increaseQuantity,
  removeGuestFromCart,
  removeFromCart,
  syncRemoveCart,
  syncUpdateCart,
} from "@/store/cartSlice";

import style from "./cartDrawer.module.scss";

type CartDrawerProps = {
  isClosing?: boolean;
  shoppingList: CartItem[];
  subtotal: number;
  onClose: () => void;
};

export default function CartDrawer({
  isClosing = false,
  shoppingList,
  subtotal,
  onClose,
}: CartDrawerProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken,
  );

  const cartCount = shoppingList.length;
  const itemText =
    cartCount === 1 ? t("common.cart.item") : t("common.cart.items");

  const handleRemove = (product: CartItem) => {
    if (!accessToken) {
      dispatch(removeGuestFromCart(product));
      return;
    }

    dispatch(removeFromCart(product));
    dispatch(
      syncRemoveCart({
        productId: product.id,
        size: product.selectedSize || null,
      }),
    );
  };

  const handleDecrease = (product: CartItem) => {
    if (!accessToken) {
      dispatch(decreaseGuestQuantity(product));
      return;
    }

    const nextQuantity = Math.max(1, product.quantity - 1);
    dispatch(decreaseQuantity(product));
    dispatch(
      syncUpdateCart({
        productId: product.id,
        quantity: nextQuantity,
        size: product.selectedSize || null,
      }),
    );
  };

  const handleIncrease = (product: CartItem) => {
    if (!accessToken) {
      dispatch(increaseGuestQuantity(product));
      return;
    }

    dispatch(increaseQuantity(product));
    dispatch(
      syncUpdateCart({
        productId: product.id,
        quantity: product.quantity + 1,
        size: product.selectedSize || null,
      }),
    );
  };
  const handleOpenProduct = (productId: number) => {
    onClose();
    navigate(getLocalizedPath(`/products/${productId}`));
  };

  return (
    <>
      <div
        className={`${style.backWall} ${
          isClosing ? style.backWallClosing : ""
        }`}
        onClick={onClose}
      />

      <aside
        className={`${style.cartDrawer} ${
          isClosing ? style.cartDrawerClosing : ""
        }`}
      >
        <div className={style.cartHeader}>
          <div>
            <p className={style.cartKicker}>{t("common.cart.kicker")}</p>
            <h3 className={style.cartTitle}>{t("common.cart.title")}</h3>
          </div>

          <button type="button" className={style.cartClose} onClick={onClose}>
            x
          </button>
        </div>

        <div className={style.cartCount}>
          <span>
            {cartCount} {itemText}
          </span>
          <span>{t("common.cart.fresh_message")}</span>
        </div>

        <div className={style.cartBody}>
          {cartCount === 0 ? (
            <div className={style.cartEmpty}>
              <p>{t("common.cart.empty_message")}</p>

              <button
                type="button"
                className={style.cartEmptyBtn}
                onClick={() => {
                  onClose();
                  navigate(getLocalizedPath("/products"));
                }}
              >
                {t("common.cart.continue_shopping")}
              </button>
            </div>
          ) : (
            <ul className={style.cartList}>
              {shoppingList.map((product) => {
                const itemPrice =
                  product.discountedPrice > 0
                    ? product.discountedPrice
                    : product.price;

                return (
                  <li
                    key={`${product.id}-${product.selectedSize || "default"}`}
                    className={style.cartItem}
                    onClick={() => handleOpenProduct(product.id)}
                  >
                    <img
                      className={style.cartImg}
                      src={product.images[0]}
                      alt={product.title}
                    />

                    <div className={style.cartMeta}>
                      <div className={style.cartTopLine}>
                        <div>
                          <p className={style.cartItemTitle}>{product.title}</p>

                          <p className={style.cartItemCategory}>
                            {product.category}
                          </p>
                        </div>

                        <button
                          type="button"
                          className={style.cartRemove}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleRemove(product);
                          }}
                        >
                          x
                        </button>
                      </div>

                      <div className={style.cartBottomLine}>
                        <div className={style.cartQty}>
                          <button
                            type="button"
                            className={style.cartQtyBtn}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleDecrease(product);
                            }}
                          >
                            -
                          </button>

                          <span className={style.cartQtyVal}>
                            {product.quantity}
                          </span>

                          <button
                            type="button"
                            className={style.cartQtyBtn}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleIncrease(product);
                            }}
                          >
                            +
                          </button>
                        </div>

                        <p className={style.cartPrice}>
                          ${itemPrice * product.quantity}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className={style.cartFooter}>
          <div className={style.cartSubtotal}>
            <span>{t("common.cart.subtotal")}</span>
            <strong>${subtotal}</strong>
          </div>

          <button
            type="button"
            className={style.cartViewBtn}
            onClick={() => {
              onClose();
              navigate(getLocalizedPath("/cart"));
            }}
          >
            {t("common.cart.view_cart")}
          </button>

          <button
            type="button"
            className={style.checkoutBtn}
            onClick={() => {
              onClose();
              navigate(getLocalizedPath("/checkout"));
            }}
          >
            {t("common.cart.checkout")}
          </button>
        </div>
      </aside>
    </>
  );
}
