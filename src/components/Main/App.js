import React, { useEffect, useState } from "react";
import "./App.css";
import { DrinkMakerProtocolService } from "../../services/DrinkMakerProtocolService";
import { MessageService } from "../../services/MessageService";
import { PriceService } from "../../services/PriceService";

const App = ({ currentOrder: { drink, sugarQuantity, money, extraHot } }) => {
  // initializing and declaring some variables
  const initialState = {
    type: "",
    sugarQtyCode: "",
    message: "",
  };

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
  const [price, setPrice] = useState(0);
  const [missingAmount, setMissingAmount] = useState(0);

  // declaring some functions to handle component logic and render
  const generateDrinkMakerCommands = () => {
    setOrder((previousOrder) => ({
      ...previousOrder,
      type: `${drinkProtocolTranslator(drink, extraHot)}`,
      sugarQtyCode: `${sugarQuantityProtocolTranslator(sugarQuantity)}`,
      message,
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

  // updating states
  useEffect(() => {
    generateDrinkMakerCommands();
    setPrice(getPrice(order.type));
    setMissingAmount(getMissingAmount(money, price));
    generateErrorMessage();
  }, [message, order.type, price, missingAmount, money]);

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
