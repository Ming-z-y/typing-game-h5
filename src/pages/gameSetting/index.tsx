import { useStorage } from "@/utils/hooks";
import styles from "./index.module.less";
import { useState } from "react";

export const GameSetting = () => {
  // const;
  return (
    <div className={styles.bac}>
      <div className={styles.title}>游戏模式设置</div>
      <select
        className={styles.select}
        onChange={(e) => {
          console.log(e);
        }}
      >
        <option>简单模式</option>
        <option>中等模式</option>
        <option>困难模式</option>
      </select>
      <div className={styles.itemTitle}>列数：</div>
      <input />
      <div className={styles.itemTitle}>每个块中的字母数：</div>
      <input />
      <div className={styles.itemTitle}>产生的字母时间间隔(s)：</div>
      <input />
      <div className={styles.title}>快捷键设置</div>
    </div>
  );
};
