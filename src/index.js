import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./components/Main/App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const order = { drink: "Chocolat", sugarQuantity: 1, money: 2 };

root.render(
  <React.StrictMode>
    <App currentOrder={order} />
  </React.StrictMode>
);
