import { useEffect } from "react";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import CheckoutSteps from "@/assets/components/checkoutSteps/checkoutSteps";
import Layout from "@/assets/components/layout";
import { getLocalizedPath } from "@/helpers/languagePath";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import { fetchOrderById } from "@/store/orderSlice";
import OrderDetails from "./sections/orderDetails";

import styles from "./confirmation.module.scss";

export default function Confirmation() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const order = useAppSelector((state: RootState) => state.orders.lastOrder);

  useEffect(() => {
    if (order?.id) {
      dispatch(fetchOrderById(order.id));
    }
  }, [dispatch, order?.id, i18n.language]);
  
  if (!order) {
    return (
      <Layout>
        <main className={styles.confirmationPage}>
          <section className={styles.hero}>
            <p className={styles.kicker}>{t("pages.confirmation.kicker")}</p>
            <h1>{t("pages.confirmation.title")}</h1>
            <p className={styles.heroText}>
              {t("pages.confirmation.emptyText")}
            </p>
          </section>

          <CheckoutSteps activeStep={3} />

          <section className={styles.emptyOrder}>
            <h2>{t("pages.confirmation.emptyTitle")}</h2>
            <p>{t("pages.confirmation.emptyDescription")}</p>

            <button
              type="button"
              onClick={() => navigate(getLocalizedPath("/cart"))}
            >
              {t("pages.confirmation.backCart")}
            </button>
          </section>
        </main>
      </Layout>
    );
  }

  const paymentLabel =
    order.paymentMethod === "cash"
      ? t("pages.confirmation.cash")
      : t("pages.confirmation.bank");

  const date = new Intl.DateTimeFormat(i18n.language).format(
    new Date(order.createdAt),
  );

  return (
    <Layout>
      <main className={styles.confirmationPage}>
        <section className={styles.hero}>
          <p className={styles.kicker}>{t("pages.confirmation.kicker")}</p>
          <h1>{t("pages.confirmation.title")}</h1>
          <p className={styles.heroText}>{t("pages.confirmation.text")}</p>
        </section>

        <CheckoutSteps activeStep={3} />

        <section className={styles.successBlock}>
          <div className={styles.checkIcon}>
            <Check size={34} strokeWidth={3} />
          </div>

          <h2>{t("pages.confirmation.successTitle")}</h2>
          <p>{t("pages.confirmation.successText")}</p>
        </section>

        <section className={styles.orderMeta}>
          <div>
            <span>{t("pages.confirmation.orderNumber")}</span>
            <strong>{order.orderNumber}</strong>
          </div>

          <div>
            <span>{t("pages.confirmation.date")}</span>
            <strong>{date}</strong>
          </div>

          <div>
            <span>{t("common.orderSummary.total")}</span>
            <strong>${order.total}</strong>
          </div>

          <div>
            <span>{t("pages.confirmation.paymentMethod")}</span>
            <strong>{paymentLabel}</strong>
          </div>
        </section>

        <OrderDetails
          items={order.items}
          subtotal={order.subtotal}
          shipping={order.shipping}
          vat={order.vat}
          total={order.total}
        />
      </main>
    </Layout>
  );
}
