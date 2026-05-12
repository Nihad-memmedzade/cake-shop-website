import { useLocation, useNavigate } from "react-router-dom";

import { isActivePath } from "@/helpers/activePath";
import type { MenuItem } from "@/types/navigation";

import style from "../header.module.scss";

type DesktopNavProps = {
  menu: MenuItem[];
};

export default function DesktopNav({ menu }: DesktopNavProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className={style.desktopNav}>
      <ul className={style.pageList}>
        {menu.slice(0, 3).map((item) => {
          const active = isActivePath(pathname, item.path);

          return (
            <li
              key={item.path}
              className={`${style.navItem} ${active ? style.active : ""}`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
