import { useState, useEffect } from "react";

export function useController(needTying: string[]) {
  const [fullTyping, setFullTyping] = useState<string[]>(needTying || []);
  const [typing, setTyping] = useState<string>("");
  const hasMatch = () => {
    if (typing === "") {
      return [false, -1];
    }
    for (let i = 0; i < fullTyping.length; i++) {
      if (fullTyping[i] === typing) {
        setTyping("");
        return [true, i];
      }
    }
    return [false, -1];
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        setTyping((pre) => pre.substring(0, pre.length - 1));
      } else {
        setTyping((pre) => pre + e.key);
      }
    });
  }, []);

  useEffect(() => {
    const [isMatch, index] = hasMatch();
    isMatch &&
      setFullTyping((e) => e.filter((item) => item !== e[index as number]));
  }, [typing]);

  return [typing, fullTyping];
}
