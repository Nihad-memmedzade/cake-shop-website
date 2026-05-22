import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { isActivePath } from "@/helpers/activePath";
import { getLocalizedPath, removeLanguageFromPath } from "@/helpers/languagePath";
import type { MenuItem } from "@/types/navigation";

import style from "../header.module.scss";

type DesktopNavProps = {
  menu: MenuItem[];
};

export default function DesktopNav({ menu }: DesktopNavProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const cleanPathname = removeLanguageFromPath(pathname);

  return (
    <nav className={style.desktopNav}>
      <ul className={style.pageList}>
        {menu.map((item) => {
          const active = isActivePath(cleanPathname, item.path);

          return (
            <li
              key={item.path}
              className={`${style.navItem} ${active ? style.active : ""}`}
              onClick={() => navigate(getLocalizedPath(item.path))}
            >
              {t(item.label)}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}