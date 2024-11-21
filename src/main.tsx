import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TaskContextProvider2 } from "./Modules/TaskModule/Context/ContextTask.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    
      <TaskContextProvider2>
      <App/>
      </TaskContextProvider2>
  
  </StrictMode>
);
