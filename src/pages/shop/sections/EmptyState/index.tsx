import style from "./emptyState.module.scss";

export default function EmptyState() {
  return (
    <div className={style.emptyState}>
      <h3>No cakes found</h3>
      <p>Try another flavor or reset selected filters.</p>
    </div>
  );
}
