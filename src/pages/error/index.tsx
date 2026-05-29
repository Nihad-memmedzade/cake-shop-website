import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Layout from "@/assets/components/layout";
import { getLocalizedPath } from "@/helpers/languagePath";

import styles from "./error.module.scss";

type ErrorPageVariant = "notFound" | "productNotFound" | "server";

type ErrorPageProps = {
  variant?: ErrorPageVariant;
};

const ERROR_CONTENT: Record<
  ErrorPageVariant,
  {
    code: string;
    title: string;
    text: string;
    label: string;
    heading: string;
    description: string;
  }
> = {
  notFound: {
    code: "404",
    title: "pages.error.notFound.title",
    text: "pages.error.notFound.text",
    label: "pages.error.notFound.label",
    heading: "pages.error.notFound.heading",
    description: "pages.error.notFound.description",
  },
  productNotFound: {
    code: "404",
    title: "pages.error.productNotFound.title",
    text: "pages.error.productNotFound.text",
    label: "pages.error.productNotFound.label",
    heading: "pages.error.productNotFound.heading",
    description: "pages.error.productNotFound.description",
  },
  server: {
    code: "500",
    title: "pages.error.server.title",
    text: "pages.error.server.text",
    label: "pages.error.server.label",
    heading: "pages.error.server.heading",
    description: "pages.error.server.description",
  },
};

export default function ErrorPage({ variant = "notFound" }: ErrorPageProps) {
  const { t } = useTranslation();
  const content = ERROR_CONTENT[variant];

  return (
    <Layout>
      <main className={styles.errorPage}>
        <section className={styles.hero}>
          <p className={styles.kicker}>{t("pages.error.kicker")}</p>
          <h1>{t(content.title)}</h1>
          <p className={styles.heroText}>{t(content.text)}</p>
        </section>

        <section className={styles.errorContent}>
          <div className={styles.errorCode}>{content.code}</div>

          <div className={styles.errorInfo}>
            <p className={styles.label}>{t(content.label)}</p>
            <h2>{t(content.heading)}</h2>
            <p>{t(content.description)}</p>

            <div className={styles.actions}>
              <Link className={styles.primaryBtn} to={getLocalizedPath("/")}>
                {t("pages.error.home")}
              </Link>

              <Link
                className={styles.secondaryBtn}
                to={getLocalizedPath("/products")}
              >
                {t("pages.error.shop")}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
