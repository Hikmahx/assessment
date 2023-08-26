import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="App font-karla w-full min-h-screen relative overflow-hidden">
        <MyRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;