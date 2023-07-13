import { FC, createRef, useEffect, useState } from "react";
import styles from "./index.module.less";
import { generateRandomColor } from "@/utils";

interface ClipItem {
  title: string;
  isRunning?: boolean;
  speed: number;
  isStop?: () => void;
  column?: number;
  isFinish: boolean;
  isMatchStart: boolean;
  position: number;
}

export const ClipItem: FC<ClipItem> = (props: ClipItem) => {
  const {
    title,
    isRunning,
    speed,
    isStop,
    column = 3,
    isFinish,
    isMatchStart = false,
    position,
  } = props;
  const itemRef = createRef<HTMLDivElement>();
  const [top, setTop] = useState(0);
  let time: NodeJS.Timer;
  useEffect(() => {
    time = setInterval(() => {
      isRunning && setTop((e) => e + 1);
    }, speed);
    return () => {
      clearInterval(time);
    };
  }, [isRunning, speed]);

  useEffect(() => {
    if (itemRef.current && !isFinish) {
      itemRef.current.style.left =
        (window.innerWidth / column) * position + "px";
      itemRef.current.style.backgroundColor = generateRandomColor();
    }
  }, []);

  useEffect(() => {
    if (!isFinish && top >= window.outerHeight) {
      isStop && isStop();
    }
  }, [top]);

  return (
    <div
      className={styles.clipItem}
      ref={itemRef}
      style={{
        width: window.innerWidth / column - 2,
        top: top,
        // visibility: isFinish ? "hidden" : "visible",
        border: isMatchStart ? "1px solid black" : "1px solid white",
      }}
    >
      {title}
    </div>
  );
};
