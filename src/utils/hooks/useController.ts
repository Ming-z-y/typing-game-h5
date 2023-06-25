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
  initData?: string[];
}

export interface typingType {
  name: string;
  isFinish: boolean;
  hasMatchStart: boolean;
}

export function useController(
  params: State
): [
  string,
  typingType[],
  React.Dispatch<React.SetStateAction<typingType[]>>,
  number,
  React.Dispatch<React.SetStateAction<number>>
] {
  const { period = 5000, isRun, keyFunc, zimuNum = 1, initData } = params;
  const [fullTyping, setFullTyping] = useState<typingType[]>([]);
  const [typing, setTyping] = useState<string>("");
  const [score, setScore] = useState(0);
  const [newT, setNewT] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [initD, setInitD] = useState<string[]>([]);
  let time: NodeJS.Timer;

  const hasMatch = (): [boolean, number, boolean, number] => {
    if (typing === "") {
      return [false, -1, false, -1];
    }
    for (let i = 0; i < fullTyping.length; i++) {
      if (fullTyping[i].name === typing && !fullTyping[i].isFinish) {
        setTyping("");
        setScore((e) => e + 10);
        return [true, i, false, i];
      } else if (fullTyping[i].name.startsWith(typing)) {
        setStartIndex(i);
        return [false, -1, true, i];
      }
    }
    return [false, -1, false, -1];
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
    initData && setInitD(initData);
  }, [initData]);

  useEffect(() => {
    time = setInterval(() => {
      if (isRun) {
        if (!initD || initD.length === 0) {
          const str = Math.random().toString(36).slice(-zimuNum);
          setNewT(str);
          setFullTyping((e) => [
            ...e,
            { name: str, isFinish: false, hasMatchStart: false },
          ]);
        } else {
          const index = Math.floor(Math.random() * initD.length);
          setNewT(initD[index]);
          setFullTyping((e) => [
            ...e,
            { name: initD[index], isFinish: false, hasMatchStart: false },
          ]);
        }
      }
    }, period);
    return () => {
      clearInterval(time);
    };
  }, [isRun, period, initD, initData]);

  useEffect(() => {
    const [isMatch, index, hasMatchStart, i] = hasMatch();
    if (isMatch) {
      setFullTyping((e) => {
        e[index].isFinish = true;
        // return e.filter((item) => !item.isFinish);
        return e;
      });
    } else if (hasMatchStart) {
      setFullTyping((e) => {
        e[i].hasMatchStart = true;
        return e;
      });
    } else if (!hasMatchStart) {
      if (fullTyping.length !== 0) {
        setFullTyping((e) => {
          e[startIndex].hasMatchStart = false;
          return e;
        });
      }
    }
  }, [typing]);

  return [typing, fullTyping, setFullTyping, score, setScore];
}
