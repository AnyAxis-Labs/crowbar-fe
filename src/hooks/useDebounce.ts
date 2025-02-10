import { useEffect, useState } from "react";

export const useDebounceState = <T>(nextValue: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(nextValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(nextValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [nextValue, delay]);

  return debouncedValue;
};
