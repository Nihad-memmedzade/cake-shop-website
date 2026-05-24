import i18n, { supportedLngs } from "@/i18n";

export const removeLanguageFromPath = (pathname: string) => {
  const parts = pathname.split("/");
  const pathLang = parts[1];

  if (supportedLngs.includes(pathLang)) {
    parts.splice(1, 1);
  }

  const cleanPath = parts.join("/");

  return cleanPath === "" ? "/" : cleanPath;
};

export const getLocalizedPath = (path: string, lng = i18n.language) => {
  if (/^https?:\/\//.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const cleanPath = removeLanguageFromPath(normalizedPath);

  return cleanPath === "/" ? `/${lng}` : `/${lng}${cleanPath}`;
};