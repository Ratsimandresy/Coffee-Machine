import React, { useEffect, useState } from "react";
import "./App.css";
import { DrinkMakerProtocolService } from "../../services/DrinkMakerProtocolService";
import { MessageService } from "../../services/MessageService";
import { PriceService } from "../../services/PriceService";
import ReportButton from "../reportButton/Index.jsx";

// const { commands } = require("../../assets/mock/mockData");

const App = ({ currentOrder: { drink, sugarQuantity, money, extraHot } }) => {
  // initializing and declaring some variables
  const initialState = {
    type: "",
    sugarQtyCode: "",
    message: null,
    price: null,
    isPrepared: false,
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
    sendDrinkIsPreparedMessage,
  } = messageService;
  const { drinkProtocolTranslator, sugarQuantityProtocolTranslator } =
    translatorService;

  // declaring states;
  const [command, setCommand] = useState(initialState);
  const [message, setMessage] = useState(null);
  const [price, setPrice] = useState(null);
  const [isPrepared, setIsPrepared] = useState(false);
  const [missingAmount, setMissingAmount] = useState(0);

  // declaring some functions to handle component logic and render
  const generateDrinkMakerCommands = () => {
    setCommand((previousCommand) => ({
      ...previousCommand,
      type: `${drinkProtocolTranslator(drink, extraHot)}`,
      sugarQtyCode: `${sugarQuantityProtocolTranslator(sugarQuantity)}`,
      message,
      isPrepared,
      price: price,
    }));
  };

  const generateMessage = () => {
    if (missingAmount) {
      setIsPrepared(false);
      return setMessage(sendAmountErrorMessage(missingAmount, command.type));
    }
    if (command.type !== "M" && !missingAmount && sugarQuantity > 5) {
      setIsPrepared(false);
      return setMessage(sendMaxSugarErrorMessage(sugarQuantity));
    }
    if (command.type === "M") {
      setIsPrepared(false);
      return setMessage(sendDrinkErrorMessage(command.type));
    }

    setIsPrepared(true);
    return setMessage(
      sendDrinkIsPreparedMessage(
        command.isPrepared,
        command.type,
        missingAmount,
        sugarQuantity
      )
    );
  };

  // updating states
  useEffect(() => {
    generateDrinkMakerCommands();
    setPrice(getPrice(command.type));
    setMissingAmount(getMissingAmount(money, price));
    generateMessage();
  }, [
    message,
    command.type,
    command.message,
    price,
    command.price,
    missingAmount,
    money,
  ]);

  return (
    <div className="App">
      {isPrepared && (
        <>
          <strong>
            {command.type}
            {command.sugarQtyCode}
          </strong>
          <br></br>
          <br></br>
          <small className="success">{message}</small>
          <br></br>
          <br></br>
          <ReportButton />
        </>
      )}
      {!isPrepared && (
        <p role="contentinfo" className="error">
          {message}
        </p>
      )}
    </div>
  );
};

export default App;
