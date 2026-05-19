import style from "./formContact.module.scss";

function FormContact() {
  return (
    <section className={style.formSection}>
      <p className={style.kicker}>Send a message</p>
      <h2 className={style.formTitle}>Get in touch</h2>

      <form
        className={style.form}
        onSubmit={(event) => event.preventDefault()}
      >
        <input
          className={style.input}
          type="text"
          placeholder="Name *"
          required
          name="name"
        />

        <input
          className={style.input}
          type="email"
          placeholder="Email address *"
          required
          name="email"
        />

        <textarea
          className={style.textarea}
          placeholder="Your message"
          name="message"
          rows={8}
          required
        />

        <button type="submit" className={style.submitBtn}>
          Submit
        </button>
      </form>
    </section>
  );
}

export default FormContact;
