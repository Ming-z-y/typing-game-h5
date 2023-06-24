import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";

export const ModeSelect = () => {
  const navigate = useNavigate();
  const navToGame = (
    time: number,
    zNum: number,
    column: number,
    cate: string
  ) => {
    navigate(`/game/${time}/${zNum}/${column}/${cate}`);
  };
  return (
    <>
      <div className={styles.div_mode}>
        <div className={styles.title_nandu}>难度选择</div>
        <div className={styles.select}>
          <div
            className={styles.nandu}
            onClick={() => navToGame(5000, 1, 3, "简单")}
          >
            简单
          </div>
          <div
            className={styles.nandu}
            onClick={() => navToGame(3000, 2, 3, "中等")}
          >
            中等
          </div>
          <div
            className={styles.nandu}
            onClick={() => navToGame(1000, 3, 4, "困难")}
          >
            困难
          </div>
        </div>
      </div>
    </>
  );
};
