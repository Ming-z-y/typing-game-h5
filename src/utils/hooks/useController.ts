import { useState, useEffect } from "react";
import { getRandom } from "../math";

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
  "CapsLock",
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
  | "Backspace"
  | "CapsLock";

interface State {
  period?: number; // time
  isRun?: boolean; // control is running or not
  zimuNum?: number;
  keyFunc?: Partial<Record<keyType, (e: KeyboardEvent) => void>>; // key functions
  initData?: string[];
  column?: number;
}

export interface typingType {
  name: string;
  isFinish: boolean;
  hasMatchStart: boolean;
  positionIndex: number;
}

function findPosition(column: number, isHasDiv: boolean[]) {
  if (!isHasDiv.includes(false)) {
    return -1;
  }
  const random = getRandom(0, column);
  if (!isHasDiv[random]) {
    return random;
  } else {
    return findPosition(column, isHasDiv);
  }
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
  const {
    period = 5000,
    isRun,
    keyFunc,
    zimuNum = 1,
    initData,
    column = 3,
  } = params;
  const [fullTyping, setFullTyping] = useState<typingType[]>([]);
  const [typing, setTyping] = useState<string>("");
  const [score, setScore] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [isHasDiv, setIsHasDiv] = useState<boolean[]>(
    Array(column).fill(false)
  );
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
          // 随机生成字母
          const str = Math.random().toString(36).slice(-zimuNum);
          const position = findPosition(column, isHasDiv);
          if (position != -1) {
            setFullTyping((e) => [
              ...e,
              {
                name: str,
                isFinish: false,
                hasMatchStart: false,
                positionIndex: position,
              },
            ]);
            setIsHasDiv((e) => {
              e[position] = true;
              return e;
            });
          }
        } else {
          // 生成已知的字符串数组
          const index = getRandom(0, initD.length);
          const position = findPosition(column, isHasDiv);
          if (position != -1) {
            setFullTyping((e) => [
              ...e,
              {
                name: initD[index],
                isFinish: false,
                hasMatchStart: false,
                positionIndex: position,
              },
            ]);
            setIsHasDiv((e) => {
              e[position] = true;
              return e;
            });
          }
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
      setIsHasDiv((e) => {
        e[index] = false;
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
