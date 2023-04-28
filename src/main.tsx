import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import store from "./services/store.ts";
import { Provider } from "react-redux";

import "./global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
