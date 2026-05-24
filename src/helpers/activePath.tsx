export const isActivePath = (currentPath: string, itemPath: string) => {
  // query və hash-i at
  const cleanPath = currentPath.split("?")[0].split("#")[0];

  // HOME üçün
  if (itemPath === "/") {
    return (
      cleanPath === "/" ||
      cleanPath === "" ||
      /^\/(az|en|ru)\/?$/.test(cleanPath)
    );
  }

  // Digər səhifələr üçün
  return cleanPath.includes(itemPath);
};