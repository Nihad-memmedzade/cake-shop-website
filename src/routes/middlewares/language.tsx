import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import i18n, { supportedLngs } from "@/i18n";

interface Props {
  children: React.ReactNode;
}

const LanguageMiddleware = ({ children }: Props) => {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    const pathLang = pathname.split("/")[1];

    if (!pathLang || supportedLngs.indexOf(pathLang) === -1) {
      navigate(`/${i18n.language}${pathname}${search}${hash}`, {
        replace: true,
      });
      return;
    }

    if (pathLang !== i18n.language) {
      i18n.changeLanguage(pathLang);
      localStorage.setItem("LANG", pathLang);
    }
  }, [pathname, search, hash, navigate]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default LanguageMiddleware;
