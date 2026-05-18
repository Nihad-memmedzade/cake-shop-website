import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Layout from "@/assets/components/layout";
import { logout } from "@/store/authSlice";
import { useAppDispatch } from "@/store/store";

import styles from "./accountLayout.module.scss";

type AccountLayoutProps = {
  children: ReactNode;
  title: string;
};

const accountLinks = [
  { label: "Account Details", path: "/account/details" },
  { label: "Orders", path: "/account/orders" },
  { label: "Wishlist", path: "/account/wishlist" },
];

export default function AccountLayout({ title, children }: AccountLayoutProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActiveLink = (path: string) => {
    return pathname === path || pathname.endsWith(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <Layout>
      <main className={styles.myAccount}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Cake House</p>
          <h1>{title}</h1>
          <p className={styles.heroText}>
            Manage your profile, orders and saved cakes in one sweet place.
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
                      to={item.path}
                      className={`${styles.menuLink} ${
                        isActive ? styles.menuLinkActive : ""
                      }`}
                    >
                      {item.label}
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
                  Logout
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
