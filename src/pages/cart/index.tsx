import { useMemo, useState } from "react";
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("free");

  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.discountedPrice > 0 ? item.discountedPrice : item.price;
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const shipping = shippingPrices[shippingMethod];
  const vat = Math.round(subtotal * 0.02);
  const total = subtotal + shipping + vat;

  return (
    <Layout>
      <main className={styles.cartPage}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Cake House</p>
          <h1>Cart</h1>
          <p className={styles.heroText}>
            Review your selected cakes, update quantities and continue to
            checkout.
          </p>
        </section>

        <CheckoutSteps activeStep={1} />

        {cartItems.length === 0 ? (
          <section className={styles.emptyCart}>
            <p>Your shopping bag is empty.</p>

            <button
              type="button"
              onClick={() => navigate(getLocalizedPath("/products"))}
            >
              Go to shop
            </button>
          </section>
        ) : (
          <section className={styles.cartGrid}>
            <div className={styles.cartTable}>
              <div className={styles.tableHead}>
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
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
                    <article key={item.id} className={styles.cartItem}>
                      <div className={styles.productInfo}>
                        <img src={item.images[0]} alt={item.title} />

                        <div>
                          <h4>{item.title}</h4>
                          <p>Category: {item.category}</p>
                          <p>Flavor: {item.flavor}</p>
                        </div>
                      </div>

                      <p className={styles.price}>${price}</p>

                      <div className={styles.quantity}>
                        <button
                          type="button"
                          onClick={() => dispatch(decreaseQuantity(item))}
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() => dispatch(increaseQuantity(item))}
                        >
                          +
                        </button>
                      </div>

                      <p className={styles.subtotal}>${itemSubtotal}</p>

                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => dispatch(removeFromCart(item))}
                      >
                        x
                      </button>
                    </article>
                  );
                })}
              </div>

         
            </div>

            <aside className={styles.cartTotals}>
              <h3>Cart totals</h3>

              <div className={styles.totalLine}>
                <span>Subtotal</span>
                <strong>${subtotal}</strong>
              </div>

              <div className={styles.shippingBlock}>
                <span>Shipping</span>

                <label>
                  <input
                    type="radio"
                    checked={shippingMethod === "free"}
                    onChange={() => setShippingMethod("free")}
                  />
                  Free shipping
                </label>

                <label>
                  <input
                    type="radio"
                    checked={shippingMethod === "flat"}
                    onChange={() => setShippingMethod("flat")}
                  />
                  Flat rate: $8
                </label>

                <label>
                  <input
                    type="radio"
                    checked={shippingMethod === "pickup"}
                    onChange={() => setShippingMethod("pickup")}
                  />
                  Local pickup
                </label>
              </div>

              <div className={styles.totalLine}>
                <span>VAT</span>
                <strong>${vat}</strong>
              </div>

              <div className={`${styles.totalLine} ${styles.grandTotal}`}>
                <span>Total</span>
                <strong>${total}</strong>
              </div>

              <button
                type="button"
                className={styles.checkoutBtn}
                onClick={() => navigate(getLocalizedPath("/checkout"))}
              >
                Proceed to checkout
              </button>
            </aside>
          </section>
        )}
      </main>
    </Layout>
  );
}