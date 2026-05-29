export const getStoredJson = <T>(key: string, fallback: T): T => {
  const savedValue = localStorage.getItem(key);

  if (!savedValue || savedValue === "undefined" || savedValue === "null") {
    localStorage.removeItem(key);
    return fallback;
  }

  try {
    return JSON.parse(savedValue) as T;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
};

export const setStoredJson = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeStoredItem = (key: string) => {
  localStorage.removeItem(key);
};
