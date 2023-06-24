import { useStorage } from "@/utils/hooks";
import styles from "./index.module.less";
import { History } from "../../../types";

export const Rank = () => {
  const [rank, setRank] = useStorage<History[]>("history");
  return (
    <div className={styles.back}>
      <div className={styles.top}>
        <div className={styles.title}>历史记录</div>
        <div
          className={styles.clearAll}
          onClick={() => {
            setRank([]);
          }}
        >
          清空历史记录
        </div>
      </div>
      {rank.length !== 0 ? (
        <div className={styles.contentBack}>
          {rank.map((item, index) => {
            return (
              <div key={`history-${index}`} className={styles.historyCard}>
                <div>时间：{item.time}</div>
                <div>难度：{item.category}</div>
                <div>得分：{item.score}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className={styles.contentBack}
          style={{ marginTop: 20, letterSpacing: 2 }}
        >
          暂无历史记录
        </div>
      )}
    </div>
  );
};
