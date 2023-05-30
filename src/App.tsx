import { useController } from "./utils/hooks";
import { ClipItem } from "./components/clipItem";

function App() {
  const [typing, fullTyping, score] = useController();
  return (
    <div className="App">
      <div>得分：{score}</div>
      <div>敲击键盘：{typing}</div>
      <div>
        {(fullTyping as string[]).map((item, index) => {
          return <ClipItem key={`item-${index}`} title={item} />;
        })}
      </div>
    </div>
  );
}

export default App;
