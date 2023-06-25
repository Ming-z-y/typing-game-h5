import { useEffect, useState } from "react";
import { useController, useStorage } from "@/utils/hooks";
import { ClipItem } from "@/components/clipItem";
import styles from "./index.module.less";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Setting, mapData } from "../gameSetting/setting";
import axios from "@/utils/request/request";

export function Game() {
  const params = useParams();
  const navigate = useNavigate();
  const category = params.category || "easy";
  const [isRunning, setIsRunning] = useState(true);
  const [runningSpeed] = useState(50);
  const [_, setHisRank] = useStorage<Record<string, unknown>[]>("history", []);
  const [settingVal] = useStorage<Setting>(category, mapData[category]);
  const time = settingVal?.time || 2000;
  const zimuNum = settingVal?.zimuNum || 4;
  const column = settingVal?.column || 4;
  const [isVisibility, setIsVisibility] = useState(false);
  const [cet, setCet] = useState<string[]>([]);
  const [typing, fullTyping, setFullTyping, score, setScore] = useController({
    period: Number(time) || 3000,
    zimuNum: Number(zimuNum) || 1,
    isRun: isRunning,
    keyFunc: {
      Enter: (e) => {
        setIsRunning((e) => !e);
      },
    },
    initData: cet,
  });

  const againGame = () => {
    setIsVisibility(false);
    setScore(0);
    setFullTyping([]);
    setIsRunning(true);
  };

  const isStop = () => {
    setIsRunning(false);
    const time = moment().format("yyyy-MM-D HH:mm:ss");
    setHisRank((e) => [{ time, score, category }, ...e]);
    setIsVisibility(true);
  };

  const popLastHistory = () => {
    navigate(-1);
  };

  useEffect(() => {
    category === "c6" &&
      axios.get("/C6").then((e) => {
        setCet(e.data);
      });
  }, []);

  return (
    <>
      <div className={styles.backg}>
        <div className={styles.top}>
          <div>敲击字母：{typing}</div>
          <div>得分：{score}</div>
        </div>
        <div className={styles.top}>
          <div>{isRunning ? "" : "已暂停"}</div>
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
                  column={Number(column) || 3}
                  isFinish={item.isFinish}
                  isMatchStart={item.hasMatchStart}
                />
              );
            }
          })}
        </div>
      </div>
      <div
        className={styles.cover}
        style={{ visibility: isVisibility ? "visible" : "hidden" }}
      >
        <div className={styles.popResult}>
          <div>游戏结束，您的得分：{score}</div>
          <div className={styles.operate}>
            <div className={styles.opeItem} onClick={againGame}>
              重新开始
            </div>
            <div className={styles.opeItem} onClick={popLastHistory}>
              返回上一级
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
