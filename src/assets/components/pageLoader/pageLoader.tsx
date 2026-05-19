import style from "./pageLoader.module.scss";

type PageLoaderProps = {
  title?: string;
  text?: string;
  fullPage?: boolean;
};

export default function PageLoader({
  title = "Loading sweet things",
  text = "Please wait while we prepare everything for you.",
  fullPage = false,
}: PageLoaderProps) {
  return (
    <section
      className={`${style.loaderWrap} ${fullPage ? style.fullPage : ""}`}
    >
      <div className={style.loaderCard}>
        <div className={style.cakeLoader}>
          <span />
          <span />
          <span />
        </div>

        <h2>{title}</h2>
        <p>{text}</p>

        <div className={style.dots}>
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}
