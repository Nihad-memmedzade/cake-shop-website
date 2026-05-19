import Layout from "@/assets/components/layout";
import FormContact from "./sections/formContact/formContact";
import Map from "./sections/map/map";
import StoreCard from "./sections/storeCard/storeCard.tsx";
import style from "./contact.module.scss";

function Contact() {
  return (
    <Layout>
      <main className={style.contact}>
        <section className={style.hero}>
          <p className={style.kicker}>Cake House</p>
          <h1>Contact</h1>
          <p className={style.heroText}>
            Visit our cake house, send us a message or contact us for custom
            orders and sweet celebrations.
          </p>
        </section>

        <Map />

        <div className={style.contactGrid}>
          <StoreCard
            title="Store in Warsaw"
            addressLine1="Rynek Starego Miasta 1"
            addressLine2="00-272 Warszawa, Poland"
            email="hello@cakehouse.com"
            phone="+1 246-345-0695"
          />

          <FormContact />
        </div>
      </main>
    </Layout>
  );
}

export default Contact;
