import { useTranslation } from "react-i18next";

import style from "./shopPagination.module.scss";

type ShopPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function ShopPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ShopPaginationProps) {
  const { t } = useTranslation();
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={style.pagination} aria-label={t("pages.shop.pagination.aria")}>
      <button
        type="button"
        className={style.navBtn}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {t("pages.shop.pagination.previous")}
      </button>

      <div className={style.pageNumbers}>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={`${style.pageBtn} ${
              currentPage === page ? style.activePage : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={style.navBtn}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {t("pages.shop.pagination.next")}
      </button>
    </nav>
  );
}