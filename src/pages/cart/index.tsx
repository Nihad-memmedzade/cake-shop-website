import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import CheckoutSteps from "@/assets/components/checkoutSteps/checkoutSteps";
import Layout from "@/assets/components/layout";
import { getLocalizedPath } from "@/helpers/languagePath";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/store/cartSlice";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";

import styles from "./cart.module.scss";

type ShippingMethod = "free" | "flat" | "pickup";

const shippingPrices: Record<ShippingMethod, number> = {
  free: 0,
  flat: 8,
  pickup: 0,
};

export default function Cart() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("free");

  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price =
        item.discountedPrice > 0 ? item.discountedPrice : item.price;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const shipping = shippingPrices[shippingMethod];
  const vat = Math.round(subtotal * 0.02);
  const total = subtotal + shipping + vat;

  const handleOpenProduct = (productId: number) => {
    navigate(getLocalizedPath(`/products/${productId}`));
  };

  return (
    <Layout>
      <main className={styles.cartPage}>
        <section className={styles.hero}>
          <p className={styles.kicker}>{t("pages.cart.kicker")}</p>
          <h1>{t("pages.cart.title")}</h1>
          <p className={styles.heroText}>{t("pages.cart.text")}</p>
        </section>

        <CheckoutSteps activeStep={1} />

        {cartItems.length === 0 ? (
          <section className={styles.emptyCart}>
            <p>{t("pages.cart.empty")}</p>

            <button
              type="button"
              onClick={() => navigate(getLocalizedPath("/products"))}
            >
              {t("pages.cart.goShop")}
            </button>
          </section>
        ) : (
          <section className={styles.cartGrid}>
            <div className={styles.cartTable}>
              <div className={styles.tableHead}>
                <span>{t("pages.cart.product")}</span>
                <span>{t("pages.cart.price")}</span>
                <span>{t("pages.cart.quantity")}</span>
                <span>{t("pages.cart.subtotal")}</span>
                <span />
              </div>

              <div className={styles.cartList}>
                {cartItems.map((item) => {
                  const price =
                    item.discountedPrice > 0
                      ? item.discountedPrice
                      : item.price;

                  const itemSubtotal = price * item.quantity;

                  return (
                    <article
                      key={item.id}
                      className={styles.cartItem}
                      onClick={() => handleOpenProduct(item.id)}
                    >
                      <div className={styles.productInfo}>
                        <img src={item.images[0]} alt={item.title} />

                        <div>
                          <h4>{item.title}</h4>
                          <p>
                            {t("pages.cart.category")}: {item.category}
                          </p>
                          <p>
                            {t("pages.cart.flavor")}: {item.flavor}
                          </p>
                        </div>
                      </div>

                      <p className={styles.price}>${price}</p>

                      <div className={styles.quantity}>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            dispatch(decreaseQuantity(item));
                          }}
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            dispatch(increaseQuantity(item));
                          }}
                        >
                          +
                        </button>
                      </div>

                      <p className={styles.subtotal}>${itemSubtotal}</p>

                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={(event) => {
                          event.stopPropagation();
                          dispatch(removeFromCart(item));
                        }}
                      >
                        x
                      </button>
                    </article>
                  );
                })}
              </div>
            </div>

            <aside className={styles.cartTotals}>
              <h3>{t("pages.cart.totals")}</h3>

              <div className={styles.totalLine}>
                <span>{t("pages.cart.subtotal")}</span>
                <strong>${subtotal}</strong>
              </div>

              <div className={styles.shippingBlock}>
                <span>{t("pages.cart.shipping.title")}</span>

                <label>
                  <input
                    type="radio"
                    checked={shippingMethod === "free"}
                    onChange={() => setShippingMethod("free")}
                  />
                  {t("pages.cart.shipping.free")}
                </label>

                <label>
                  <input
                    type="radio"
                    checked={shippingMethod === "flat"}
                    onChange={() => setShippingMethod("flat")}
                  />
                  {t("pages.cart.shipping.flat")}
                </label>

                <label>
                  <input
                    type="radio"
                    checked={shippingMethod === "pickup"}
                    onChange={() => setShippingMethod("pickup")}
                  />
                  {t("pages.cart.shipping.pickup")}
                </label>
              </div>

              <div className={styles.totalLine}>
                <span>{t("pages.cart.vat")}</span>
                <strong>${vat}</strong>
              </div>

              <div className={`${styles.totalLine} ${styles.grandTotal}`}>
                <span>{t("pages.cart.total")}</span>
                <strong>${total}</strong>
              </div>

              <button
                type="button"
                className={styles.checkoutBtn}
                onClick={() => navigate(getLocalizedPath("/checkout"))}
              >
                {t("pages.cart.checkout")}
              </button>
            </aside>
          </section>
        )}
      </main>
    </Layout>
  );
}
