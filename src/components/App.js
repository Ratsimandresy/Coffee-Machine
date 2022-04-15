import React from "react";
import Main from "./Main/Index.jsx";

const order = {
  drink: "Orange juice",
  sugarQuantity: 3,
  money: 0.7,
  extraHot: false,
};
const App = () => {
  return (
    <div>
      <Main currentOrder={order} />
    </div>
  );
};

export default App;
