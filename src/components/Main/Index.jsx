import React, { useEffect, useState } from "react";
import "./style.css";
import { DrinkMakerProtocolService } from "../../services/DrinkMakerProtocolService";
import { MessageService } from "../../services/MessageService";
import { PriceService } from "../../services/PriceService";
import ReportButton from "../reportButton/Index.jsx";
import { StorageService } from "../../services/StorageService";

const data = require("../../assets/mock/mockData");

const Index = ({ currentOrder: { drink, sugarQuantity, money, extraHot } }) => {
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
  const storageService = new StorageService();

  // extracting services'methods
  const { getPrice, getMissingAmount } = priceService;
  const { getStorage, checkStorage, updateStorage } = storageService;
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
  const [commands, setCommands] = useState([]);
  const [message, setMessage] = useState(null);
  const [price, setPrice] = useState(null);
  const [isPrepared, setIsPrepared] = useState(false);
  const [missingAmount, setMissingAmount] = useState(0);
  const [store, setStore] = useState({});

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
  const saveStorage = (command, store = []) => {
    let updatedStore = [...store];
    let updateDrinkState = {};

    const drinkStateInStore = updatedStore.find(
      (drink) => drink.type === command.type
    );

    const { type, quantity } = drinkStateInStore;
    const index = store.indexOf(drinkStateInStore);

    switch (true) {
      case quantity > 0:
        updateDrinkState["type"] = type;
        updateDrinkState["quantity"] = quantity - 1;
        break;
      case quantity === 0:
        updateDrinkState = { ...drinkStateInStore };
        break;
      default:
        break;
    }

    if (~index) {
      updatedStore[index] = updateDrinkState;
    }

    return updatedStore;
  };

  const handleAddCommand = (command, store) => {
    setCommands((prevCommands) => [...prevCommands, command]);
    setStore(saveStorage(command, store));
    console.table(store);
  };

  // updating states
  useEffect(() => {
    setStore(getStorage(data.store));
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
    store,
  ]);

  return (
    <div>
      {isPrepared && (
        <>
          <strong>
            {command.type}
            {command.sugarQtyCode}
          </strong>
          <br></br>

          <small className="success">{message}</small>
          <br></br>

          <ReportButton commands={commands} />
        </>
      )}
      {!isPrepared && (
        <p role="contentinfo" className="error">
          {message}
        </p>
      )}
      {isPrepared && (
        <button
          data-testid="send-btn"
          onClick={() => handleAddCommand(command, store)}
        >
          Send command
        </button>
      )}
    </div>
  );
};

export default Index;
