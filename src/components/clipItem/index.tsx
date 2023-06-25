import { FC, createRef, useEffect, useState } from "react";
import styles from "./index.module.less";

interface ClipItem {
  title: string;
  isRunning?: boolean;
  speed: number;
  isStop?: () => void;
  column?: number;
  isFinish: boolean;
  isMatchStart: boolean;
}

function generateRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  // 使用 RGB 格式拼接颜色值
  const color = "rgb(" + red + ", " + green + ", " + blue + ")";

  return color;
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
  } = props;
  const itemRef = createRef<HTMLDivElement>();
  const index = Math.floor(Math.random() * 10) % column; // yarn 1-column number
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
    if (itemRef.current) {
      itemRef.current.style.left = (window.innerWidth / column) * index + "px";
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
