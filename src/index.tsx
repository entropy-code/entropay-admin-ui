import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//Set token to localStorage
const url = new URL(window.location.href);
const token = url.searchParams.get("token");
const expiresAt = url.searchParams.get("expiresAt");
if (token !== null) {
  localStorage.setItem("token", token);
  localStorage.setItem("expiresAt", expiresAt || "");
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals((_arg: any) => {});
