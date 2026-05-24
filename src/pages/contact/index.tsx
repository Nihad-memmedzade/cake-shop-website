import { useTranslation } from "react-i18next";

import Layout from "@/assets/components/layout";

import FormContact from "./sections/formContact/formContact";
import Map from "./sections/map/map";
import StoreCard from "./sections/storeCard/storeCard.tsx";

import style from "./contact.module.scss";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <Layout>
      <main className={style.contact}>
        <section className={style.hero}>
          <p className={style.kicker}>{t("pages.contact.hero.kicker")}</p>
          <h1>{t("pages.contact.hero.title")}</h1>
          <p className={style.heroText}>{t("pages.contact.hero.text")}</p>
        </section>

        <Map />

        <div className={style.contactGrid}>
          <StoreCard
            title={t("pages.contact.store.title")}
            addressLine1={t("pages.contact.store.addressLine1")}
            addressLine2={t("pages.contact.store.addressLine2")}
            email={t("pages.contact.store.email")}
            phone={t("pages.contact.store.phone")}
          />

          <FormContact />
        </div>
      </main>
    </Layout>
  );
}

