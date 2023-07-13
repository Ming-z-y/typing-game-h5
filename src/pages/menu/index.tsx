import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";

export function Menu() {
  const navigate = useNavigate();
  const beginGame = () => {
    navigate("/modeSelect");
  };
  const gameSetting = () => {
    navigate("/gameSetting");
  };
  const naviToRank = () => {
    navigate("/rank");
  };
  return (
    <>
      <div className={styles.title}>
        <h2>打字游戏</h2>
      </div>
      <div className={styles.menu}>
        <div className={styles.menuItem} onClick={beginGame}>
          开始游戏
        </div>
        <div className={styles.menuItem} onClick={gameSetting}>
          游戏设置
        </div>
        <div className={styles.menuItem} onClick={naviToRank}>
          历史记录
        </div>
      </div>
    </>
  );
}
