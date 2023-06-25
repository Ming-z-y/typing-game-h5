import { SetStateAction, useEffect, useState } from "react";

export function useStorage<K>(
  key: string,
  initialValue?: K
): [K, React.Dispatch<React.SetStateAction<K>>, () => void] {
  const val = JSON.parse(localStorage.getItem(key) as string);
  const [value, setValue] = useState<K>(val);

  const clearItem = () => {
    setValue(null as SetStateAction<K>);
    return localStorage.removeItem(key);
  };

  useEffect(() => {
    const val = JSON.parse(localStorage.getItem(key) as string);
    setValue(val);
  }, []);

  useEffect(() => {
    // 如果没有值就把初始值设置给它
    if (initialValue && !localStorage.getItem(key)) {
      console.log("xxx");
      setValue(initialValue);
      localStorage.setItem(key, JSON.stringify(initialValue));
    }
  }, [key]);

  useEffect(() => {
    if (value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);
  return [value, setValue, clearItem];
}
