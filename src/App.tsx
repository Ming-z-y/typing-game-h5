import { useEffect } from "react";
import { Controller } from "./utils";
import { useController } from "./utils/hooks";

function App() {
  useEffect(() => {
    // Controller.init();
  }, []);
  const arrs = ["wode", "hooks", "dsajk", "djk", "dsa"];
  const [tying, fullTyping] = useController(arrs);
  return <div className="App">{Controller.getStrs()}</div>;
}

export default App;
