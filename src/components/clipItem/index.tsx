import { FC, createRef, useEffect, useState } from "react";
import styles from "./index.module.less";

interface ClipItem {
  title: string;
  isRunning?: boolean;
  speed: number;
  isStop?: () => void;
  column?: number;
  isFinish: boolean;
}

export const ClipItem: FC<ClipItem> = (props: ClipItem) => {
  const { title, isRunning, speed, isStop, column = 3, isFinish } = props;
  const itemRef = createRef<HTMLDivElement>();
  const index = Math.floor(Math.random() * 10) % column; // yarn 1-column number
  const [top, setTop] = useState(0);
  let time: NodeJS.Timer;
  useEffect(() => {
    time = setInterval(() => {
      isRunning && setTop((e) => e + 7);
    }, speed);
    return () => {
      clearInterval(time);
    };
  }, [isRunning, speed]);

  useEffect(() => {
    if (itemRef.current) {
      itemRef.current.style.left = (window.innerWidth / column) * index + "px";
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
        width: window.innerWidth / column,
        top: top,
        // visibility: isFinish ? "hidden" : "visible",
      }}
    >
      {title}
    </div>
  );
};
