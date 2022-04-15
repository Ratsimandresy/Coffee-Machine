import React, { useState } from "react";
import Main from "./Main/Index.jsx";
import "./Main/style.css";
import { selectRandomItem } from "../Utils/utils";

const { orders } = require("../assets/mock/mockData");

const initialOrder = {
  drink: "Orange juice",
  sugarQuantity: 3,
  money: 0.7,
  extraHot: false,
};

const App = () => {
  const [order, setOrder] = useState(initialOrder);

  const selectOrder = () => {
    setOrder(selectRandomItem(orders));
  };

  return (
    <div className="App">
      <Main currentOrder={order} />
      <button
        className="new-btn"
        data-testid="new-btn"
        onClick={() => selectOrder()}
      >
        Make new command
      </button>
    </div>
  );
};

export default App;
