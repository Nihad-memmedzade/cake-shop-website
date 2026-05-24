import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Layout from "@/assets/components/layout";
import { getLocalizedPath } from "@/helpers/languagePath";
import { logout } from "@/store/authSlice";
import { useAppDispatch } from "@/store/store";

import styles from "./accountLayout.module.scss";

type AccountLayoutProps = {
  children: ReactNode;
  title: string;
};

const accountLinks = [
  {
    labelKey: "pages.account.layout.sidebar.accountDetails",
    path: "/account/details",
  },
  {
    labelKey: "pages.account.layout.sidebar.orders",
    path: "/account/orders",
  },
  {
    labelKey: "pages.account.layout.sidebar.wishlist",
    path: "/account/wishlist",
  },
];

export default function AccountLayout({ title, children }: AccountLayoutProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActiveLink = (path: string) => {
    return pathname === path || pathname.endsWith(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(getLocalizedPath("/auth/login"));
  };

  return (
    <Layout>
      <main className={styles.myAccount}>
        <section className={styles.hero}>
          <p className={styles.kicker}>{t("pages.account.layout.kicker")}</p>
          <h1>{title}</h1>
          <p className={styles.heroText}>
            {t("pages.account.layout.heroText")}
          </p>
        </section>

        <div className={styles.accountWrapper}>
          <aside className={styles.accountSidebar}>
            <ul className={styles.accountNav}>
              {accountLinks.map((item) => {
                const isActive = isActiveLink(item.path);

                return (
                  <li key={item.path}>
                    <Link
                      to={getLocalizedPath(item.path)}
                      className={`${styles.menuLink} ${
                        isActive ? styles.menuLinkActive : ""
                      }`}
                    >
                      {t(item.labelKey)}
                    </Link>
                  </li>
                );
              })}

              <li>
                <button
                  type="button"
                  className={`${styles.menuLink} ${styles.logoutBtn}`}
                  onClick={handleLogout}
                >
                  {t("pages.account.layout.sidebar.logout")}
                </button>
              </li>
            </ul>
          </aside>

          <section className={styles.accountContent}>{children}</section>
        </div>
      </main>
    </Layout>
  );
}