import React, { useEffect, useState } from "react";
import "./App.css";
import { DrinkMakerProtocolService } from "../../services/DrinkMakerProtocolService";
import { MessageService } from "../../services/MessageService";
import { PriceService } from "../../services/PriceService";

const App = ({ currentOrder: { drink, sugarQuantity, money } }) => {
  // initializing variables
  const initialState = {
    type: "",
    sugarQtyCode: "",
    message: "",
    hasEnough: true,
  };
  let price, missingAmount;

  // instantiating services
  const translatorService = new DrinkMakerProtocolService();
  const messageService = new MessageService();
  const priceService = new PriceService();

  // extracting services'methods
  const { getPrice, getMissingAmount } = priceService;
  const {
    sendDrinkErrorMessage,
    sendAmountErrorMessage,
    sendMaxSugarErrorMessage,
  } = messageService;
  const { drinkProtocolTranslator, sugarQuantityProtocolTranslator } =
    translatorService;

  // declaring states;
  const [order, setOrder] = useState(initialState);
  const [message, setMessage] = useState("");
  const [hasEnough, setHasEnough] = useState(true);

  // declaring some functions to handle component logic and render
  const generateDrinkMakerCommands = () => {
    setOrder((previousOrder) => ({
      ...previousOrder,
      type: `${drinkProtocolTranslator(drink)}`,
      sugarQtyCode: `${sugarQuantityProtocolTranslator(sugarQuantity)}`,
      message,
      hasEnough,
    }));
  };

  const generateErrorMessage = () => {
    if (missingAmount) {
      return setMessage(sendAmountErrorMessage(missingAmount, order.type));
    }
    if (order.type !== "M" && !missingAmount) {
      return setMessage(sendMaxSugarErrorMessage(sugarQuantity));
    }
    return setMessage(sendDrinkErrorMessage(order.type));
  };

  const generateAmountErrorMsg = () => {
    return setMessage(sendAmountErrorMessage(missingAmount));
  };

  // updating states
  useEffect(() => {
    generateDrinkMakerCommands();
    price = getPrice(order.type);
    missingAmount = getMissingAmount(money, price);
    generateErrorMessage();
  }, [message, order.type]);

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
