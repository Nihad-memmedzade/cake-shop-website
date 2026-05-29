import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import AccountLayout from "@/assets/components/accountLayout";
import { getLocalizedPath } from "@/helpers/languagePath";
import { fetchOrders, selectOrder } from "@/store/orderSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

import styles from "./orders.module.scss";

export default function Orders() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { orders, loading, error } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleViewOrder = (orderId: number) => {
    dispatch(selectOrder(orderId));
    navigate(getLocalizedPath("/confirmation"));
  };

  return (
    <AccountLayout title={t("pages.account.orders.pageTitle")}>
      <div className={styles.ordersHead}>
        <div>
          <p className={styles.kicker}>{t("pages.account.orders.kicker")}</p>
          <h2>{t("pages.account.orders.heading")}</h2>
        </div>

        <span className={styles.count}>
          {t("pages.account.orders.count", { count: orders.length })}
        </span>
      </div>

      {loading && <p>Loading orders...</p>}
      {error && <p>{error}</p>}

      {!loading && orders.length > 0 ? (
        <div className={styles.ordersTable}>
          <div className={styles.tableHead}>
            <span>{t("pages.account.orders.table.order")}</span>
            <span>{t("pages.account.orders.table.date")}</span>
            <span>{t("pages.account.orders.table.status")}</span>
            <span>{t("pages.account.orders.table.total")}</span>
            <span>{t("pages.account.orders.table.actions")}</span>
          </div>

          <div className={styles.tableBody}>
            {orders.map((order) => {
              const itemCount = order.items.reduce(
                (sum, item) => sum + item.quantity,
                0,
              );

              const itemLabel =
                itemCount === 1
                  ? t("pages.account.orders.item")
                  : t("pages.account.orders.items");

              const statusKey = `pages.account.orders.status.${order.status}`;

              const date = new Intl.DateTimeFormat(i18n.language, {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date(order.createdAt));

              return (
                <article key={order.id} className={styles.orderRow}>
                  <button
                    type="button"
                    className={styles.orderNumber}
                    onClick={() => handleViewOrder(order.id)}
                  >
                    #{order.orderNumber}
                  </button>

                  <span>{date}</span>

                  <span className={styles.status}>{t(statusKey)}</span>

                  <span>
                    {t("pages.account.orders.totalText", {
                      total: order.total,
                      count: itemCount,
                      itemLabel,
                    })}
                  </span>

                  <button
                    type="button"
                    className={styles.viewBtn}
                    onClick={() => handleViewOrder(order.id)}
                  >
                    {t("pages.account.orders.view")}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        !loading && (
          <div className={styles.emptyState}>
            <h3>{t("pages.account.orders.empty.title")}</h3>
            <p>{t("pages.account.orders.empty.text")}</p>

            <button
              type="button"
              onClick={() => navigate(getLocalizedPath("/products"))}
            >
              {t("pages.account.orders.empty.button")}
            </button>
          </div>
        )
      )}
    </AccountLayout>
  );
}