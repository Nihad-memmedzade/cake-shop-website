import { NavLink, useLocation } from "react-router-dom";
import Layout from "@/assets/components/layout";
import styles from "./accountLayout.module.scss";

interface Props {
  children: React.ReactNode;
  title: string;
}

const AccountLayout = ({ title, children }: Props) => {
  const { pathname } = useLocation();
  console.log("current pathname:", pathname);
  return (
    <Layout>
      <section className={styles.myAccount}>
        <div className="container">
          <h1 className={styles.pageTitle}>{title}</h1>

          <div className={styles.accountWrapper}>
            <aside className={styles.accountSidebar}>
              <ul className={styles.accountNav}>
                <li>
                  <NavLink
                    to="/account/details"
                    className={`${styles.menuLink} ${
                      pathname.endsWith("/account/details")
                        ? styles.menuLinkActive
                        : ""
                    }`}
                  >
                    Account Details
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/account/orders"
                    className={`${styles.menuLink} ${
                      pathname.endsWith("/account/orders")
                        ? styles.menuLinkActive
                        : ""
                    }`}
                  >
                    Orders
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/account/wishlist"
                    className={`${styles.menuLink} ${
                      pathname.endsWith("/account/wishlist")
                        ? styles.menuLinkActive
                        : ""
                    }`}
                  >
                    Wishlist
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/account/logout"
                    className={`${styles.menuLink} ${
                      pathname.endsWith("/account/logout")
                        ? styles.menuLinkActive
                        : ""
                    }`}
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </aside>

            <div className={styles.accountContent}>{children}</div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AccountLayout;
