import { useNavigate } from "react-router-dom";

import style from "./cartDrawer.module.scss";

import { useAppDispatch } from "@/store/store";

import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/store/cartSlice";

type CartDrawerProps = {
  isClosing?: boolean;
  shoppingList: any[];
  subtotal: number;
  onClose: () => void;
};


export default function CartDrawer({
  isClosing = false,
  shoppingList,
  subtotal,
  onClose,
}: CartDrawerProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartCount = shoppingList.length;

  return (
    <>
     <div
  className={`${style.backWall} ${isClosing ? style.backWallClosing : ""}`}
  onClick={onClose}
/>

      <aside
  className={`${style.cartDrawer} ${
    isClosing ? style.cartDrawerClosing : ""
  }`}
>
        <div className={style.cartHeader}>
          <div>
            <p className={style.cartKicker}>Your cart</p>
            <h3 className={style.cartTitle}>Shopping Bag</h3>
          </div>

          <button type="button" className={style.cartClose} onClick={onClose}>
            x
          </button>
        </div>

        <div className={style.cartCount}>
          <span>{cartCount} item{cartCount !== 1 ? "s" : ""}</span>
          <span>Fresh cakes, ready to order</span>
        </div>

        <div className={style.cartBody}>
          {cartCount === 0 ? (
            <div className={style.cartEmpty}>
              <p>Your shopping bag is empty.</p>

              <button
                type="button"
                className={style.cartEmptyBtn}
                onClick={() => {
                  onClose();
                  navigate("/products");
                }}
              >
                Continue shopping
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
                  <li key={product.id} className={style.cartItem}>
                    <img
                      className={style.cartImg}
                      src={product.images[0]}
                      alt={product.title}
                    />

                    <div className={style.cartMeta}>
                      <div className={style.cartTopLine}>
                        <div>
                          <p className={style.cartItemTitle}>
                            {product.title}
                          </p>
                          <p className={style.cartItemCategory}>
                            {product.category}
                          </p>
                        </div>

                        <button
                          type="button"
                          className={style.cartRemove}
                          onClick={() => dispatch(removeFromCart(product))}
                        >
                          x
                        </button>
                      </div>

                      <div className={style.cartBottomLine}>
                        <div className={style.cartQty}>
                          <button
                            type="button"
                            className={style.cartQtyBtn}
                            onClick={() => dispatch(decreaseQuantity(product))}
                          >
                            -
                          </button>

                          <span className={style.cartQtyVal}>
                            {product.quantity}
                          </span>

                          <button
                            type="button"
                            className={style.cartQtyBtn}
                            onClick={() => dispatch(increaseQuantity(product))}
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
            <span>Subtotal</span>
            <strong>${subtotal}</strong>
          </div>

          <button
            type="button"
            className={style.cartViewBtn}
            onClick={() => {
              onClose();
              navigate("/cart");
            }}
          >
            View cart
          </button>

          <button
            type="button"
            className={style.checkoutBtn}
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
