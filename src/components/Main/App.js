import React, { useEffect, useState } from "react";
import "./App.css";
import { DrinkMakerProtocolTranslator } from "../../services/DrinkMakerProtocolTranslator";

const App = ({ currentOrder: { drink, sugarQuantity } }) => {
  const initialState = { type: "", sugarQtyCode: "", message: "" };

  const [order, setOrder] = useState(initialState);
  const [message, setMessage] = useState("");

  const translator = new DrinkMakerProtocolTranslator();

  const {
    drinkProtocolTranslator,
    sugarQuantityProtocolTranslator,
    checkDrinkType,
  } = translator;

  const generateDrinkMakerCommands = () => {
    return setOrder({
      type: `${drinkProtocolTranslator(drink)}`,
      sugarQtyCode: `${sugarQuantityProtocolTranslator(sugarQuantity)}`,
      message,
    });
  };

  const generateErrorMessage = () => {
    // setOrder(initialState);
    return setMessage(checkDrinkType(order.type));
  };

  const generateMaxSugarQty = () => {
    // setOrder(initialState);
    return sugarQuantity > 5
      ? setMessage(`${sugarQuantityProtocolTranslator(sugarQuantity)}`)
      : null;
  };

  useEffect(() => {
    generateErrorMessage();
    generateDrinkMakerCommands();
    if (order.type !== "M") {
      generateMaxSugarQty();
    }
    console.log("useEffect call");
  }, [message]);

  return (
    <div className="App">
      {!message && (
        <p>
          {order.type}
          {order.sugarQtyCode}
        </p>
      )}
      {message && <p role="contentinfo">{message}</p>}
    </div>
  );
};

export default App;
