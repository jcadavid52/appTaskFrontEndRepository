import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TaskContextProvider } from "./Context/TaskContext.tsx";
import { TaskContextProvider2 } from "./Modules/TaskModule/Context/ContextTask.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskContextProvider>
      <TaskContextProvider2>
      <App/>
      </TaskContextProvider2>
    </TaskContextProvider>
  </StrictMode>
);
