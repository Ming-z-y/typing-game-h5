import { useState, useEffect } from "react";

const functionKey = [
  "Enter",
  "Alt",
  "Control",
  "Tab",
  "Shift",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Backspace",
];
type keyType =
  | "Enter"
  | "Alt"
  | "Control"
  | "Tab"
  | "Shift"
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "Backspace";

interface State {
  period?: number; // time
  isRun?: boolean; // control is running or not
  zimuNum?: number;
  keyFunc?: Partial<Record<keyType, (e: KeyboardEvent) => void>>; // key functions
}

export interface typingType {
  name: string;
  isFinish: boolean;
}

export function useController(
  params: State
): [string, typingType[], number, string] {
  const { period = 5000, isRun, keyFunc, zimuNum = 1 } = params;
  const [fullTyping, setFullTyping] = useState<typingType[]>([]);
  const [typing, setTyping] = useState<string>("");
  const [score, setScore] = useState(0);
  const [newT, setNewT] = useState("");
  let time: NodeJS.Timer;
  const hasMatch = () => {
    if (typing === "") {
      return [false, -1];
    }
    for (let i = 0; i < fullTyping.length; i++) {
      if (fullTyping[i].name === typing && !fullTyping[i].isFinish) {
        setTyping("");
        setScore((e) => e + 10);
        return [true, i];
      }
    }
    return [false, -1];
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      const { key } = e;
      if (key === "Backspace") setTyping((e) => e.slice(0, -1));
      if (key === "ArrowDown") e.preventDefault();
      if (!functionKey.includes(key)) setTyping((pre) => pre + e.key);
      for (let k in keyFunc) {
        if (key === k) {
          keyFunc[key as keyType]!(e);
        }
      }
    });
  }, []);

  useEffect(() => {
    time = setInterval(() => {
      if (isRun) {
        const str = Math.random().toString(36).slice(-zimuNum);
        setNewT(str);
        setFullTyping((e) => [...e, { name: str, isFinish: false }]);
      }
    }, period);
    return () => {
      clearInterval(time);
    };
  }, [isRun, period]);

  useEffect(() => {
    const [isMatch, index] = hasMatch();
    isMatch &&
      setFullTyping((e) => {
        e[index as number].isFinish = true;
        // return e.filter((item) => !item.isFinish);
        return e;
      });
  }, [typing]);

  return [typing, fullTyping, score, newT];
}
