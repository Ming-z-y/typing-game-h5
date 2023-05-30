import { useState, useEffect } from "react";

export function useController() {
  const [fullTyping, setFullTyping] = useState<string[]>([]);
  const [typing, setTyping] = useState<string>("");
  const [score, setScore] = useState(0);
  const hasMatch = () => {
    if (typing === "") {
      return [false, -1];
    }
    for (let i = 0; i < fullTyping.length; i++) {
      if (fullTyping[i] === typing) {
        setTyping("");
        setScore((e) => e + 10);
        return [true, i];
      }
    }
    return [false, -1];
  };

  useEffect(() => {
    setInterval(() => {
      const str = Math.random().toString(36).slice(-4);
      setFullTyping((e) => [...e, str]);
    }, 5000);
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

  return [typing, fullTyping, score];
}
