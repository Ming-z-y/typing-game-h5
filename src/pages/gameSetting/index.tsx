import { useState } from "react";
import { useStorage } from "@/utils/hooks";
import styles from "./index.module.less";
import { Setting, mapData } from "./setting";
import { getLast } from "@/utils";

export const GameSetting = () => {
  const [category, setCategory] = useState("easy");
  const [categoryVal, setCategoryVal] = useStorage<Setting>(
    category,
    mapData[category]
  );
  return (
    <div className={styles.bac}>
      <div className={styles.title}>游戏模式设置</div>
      <select
        className={styles.select}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="easy">简单模式</option>
        <option value="middle">中等模式</option>
        <option value="hard">困难模式</option>
      </select>
      <div className={styles.itemTitle}>列数：</div>
      <input
        value={categoryVal?.column}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (!Number.isNaN(value)) {
            const val = getLast(value);
            if (val !== 0) {
              setCategoryVal((e) => {
                return { column: val, time: e.time, zimuNum: e.zimuNum };
              });
            }
          }
        }}
      />
      <div className={styles.itemTitle}>每个块中的字母数：</div>
      <input
        value={categoryVal?.zimuNum}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (!Number.isNaN(value)) {
            const val = getLast(value);
            if (val !== 0) {
              setCategoryVal((e) => {
                return { column: e.column, time: e.time, zimuNum: val };
              });
            }
          }
        }}
      />
      <div className={styles.itemTitle}>产生的字母时间间隔(ms)：</div>
      <input
        value={categoryVal?.time}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (!Number.isNaN(value)) {
            const val = getLast(value) * 1000;
            if (val !== 0) {
              setCategoryVal((e) => {
                return { column: e.column, time: val, zimuNum: e.zimuNum };
              });
            }
          }
        }}
      />
      <div className={styles.title}>快捷键设置</div>
    </div>
  );
};
