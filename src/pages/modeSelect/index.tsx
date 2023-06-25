import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";

export const ModeSelect = () => {
  const navigate = useNavigate();
  const navToGame = (cate: string) => {
    navigate(`/game/${cate}`);
  };
  return (
    <>
      <div className={styles.div_mode}>
        <div className={styles.title_nandu}>模式选择</div>
        <div className={styles.select}>
          <div className={styles.nandu} onClick={() => navToGame("easy")}>
            简单模式
          </div>
          <div className={styles.nandu} onClick={() => navToGame("middle")}>
            中等模式
          </div>
          <div className={styles.nandu} onClick={() => navToGame("hard")}>
            困难模式
          </div>
          <div className={styles.nandu} onClick={() => navToGame("c6")}>
            英语六级模式
          </div>
        </div>
      </div>
    </>
  );
};
