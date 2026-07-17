import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue instanceof Function ? initialValue() : initialValue;
    }

    const saved = window.localStorage.getItem(key);
    if (saved !== null) {
      try {
        return JSON.parse(saved) as T;
      } catch {
        return saved as T;
      }
    }

    return initialValue instanceof Function ? initialValue() : initialValue;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const valueToStore =
      typeof value === "object" ? JSON.stringify(value) : String(value);
    window.localStorage.setItem(key, valueToStore);
  }, [key, value]);

  return [value, setValue];
}
