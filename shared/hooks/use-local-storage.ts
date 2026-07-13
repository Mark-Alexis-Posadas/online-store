import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      // Handle boolean strings for theme toggling
      if (saved === "true") return true;
      if (saved === "false") return false;
      try {
        return JSON.parse(saved);
      } catch {
        return saved;
      }
    }
    return initialValue;
  });

  useEffect(() => {
    const valueToStore =
      typeof value === "object" ? JSON.stringify(value) : value;
    localStorage.setItem(key, valueToStore);
  }, [key, value]);

  return [value, setValue];
}
