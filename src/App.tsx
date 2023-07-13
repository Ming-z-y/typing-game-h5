import { useRoutes } from "react-router-dom";
import router from "./router";

function App() {
  console.log("xxx");
  const element = useRoutes(router);
  return <div className="background">{element}</div>;
}

export default App;
