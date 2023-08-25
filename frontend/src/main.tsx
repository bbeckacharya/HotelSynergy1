import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>
);
if (document.getElementById("root") === null) {
  document.open();
  document.write("ERR_NO_ROOT: Oops! something went wrong.");
  document.close();
}
