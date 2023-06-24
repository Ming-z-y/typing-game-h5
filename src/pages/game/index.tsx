import { useEffect, useState } from "react";
import { useController, useStorage } from "@/utils/hooks";
import { ClipItem } from "@/components/clipItem";
import styles from "./index.module.less";
import { useParams } from "react-router-dom";
import moment from "moment";

export function Game() {
  const [isRunning, setIsRunning] = useState(true);
  const [runningSpeed, setRunningSpeed] = useState(50);
  const [_, setHisRank] = useStorage<Record<string, unknown>[]>("history", []);
  const params = useParams();
  const [typing, fullTyping, score] = useController({
    period: Number(params.time) || 3000,
    zimuNum: Number(params.num) || 1,
    isRun: isRunning,
    keyFunc: {
      Enter: (e) => {
        setIsRunning((e) => !e);
      },
    },
  });
  useEffect(() => {
    if (score / 10 > 0) {
      setRunningSpeed((e) => (e -= 5));
    }
  }, [score]);
  const isStop = () => {
    setIsRunning(false);
    const time = moment().format("yyyy-MM-D HH:mm:ss");
    const category = params.category;
    setHisRank((e) => [{ time, score, category }, ...e]);
    window.alert(`game over! your score is ${score}`);
  };
  return (
    <div className={styles.backg}>
      <div className={styles.top}>
        <div>敲击字母：{typing}</div>
        <div>得分：{score}</div>
      </div>
      <div className={styles.gameBoard}>
        {fullTyping.map((item, index) => {
          if (!item.isFinish) {
            return (
              <ClipItem
                key={index}
                title={item.name}
                isRunning={isRunning}
                speed={runningSpeed}
                isStop={isStop}
                column={Number(params.column) || 3}
                isFinish={item.isFinish}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
