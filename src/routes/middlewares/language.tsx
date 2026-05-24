import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import i18n, { supportedLngs } from "@/i18n";

type Props = {
  children: React.ReactNode;
};

export default function LanguageMiddleware({ children }: Props) {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    const pathLang = pathname.split("/")[1];

    if (!pathLang || !supportedLngs.includes(pathLang)) {
      navigate(`/${i18n.language}${pathname}${search}${hash}`, {
        replace: true,
      });
      return;
    }

    if (pathLang !== i18n.language) {
      i18n.changeLanguage(pathLang);
    }
  }, [pathname, search, hash, navigate]);

  return <>{children}</>;
}