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
  let updatedStore, index, drinkStatus;

  // instantiating services
  const translatorService = new DrinkMakerProtocolService();
  const messageService = new MessageService();
  const priceService = new PriceService();
  const storageService = new StorageService();

  // extracting services'methods
  const { getPrice, getMissingAmount } = priceService;
  const { getStorage, checkStorage, updatedDrinkStatus, getIndexToBeRemoved } =
    storageService;
  const {
    sendDrinkErrorMessage,
    sendAmountErrorMessage,
    sendMaxSugarErrorMessage,
    sendDrinkIsPreparedMessage,
    sendEmailNotification,
  } = messageService;
  const { drinkProtocolTranslator, sugarQuantityProtocolTranslator, getDrink } =
    translatorService;

  // declaring states;
  const [command, setCommand] = useState(initialState);
  const [commands, setCommands] = useState([]);
  const [message, setMessage] = useState(null);
  const [price, setPrice] = useState(null);
  const [isPrepared, setIsPrepared] = useState(false);
  const [missingAmount, setMissingAmount] = useState(0);
  const [store, setStore] = useState([]);
  const [notification, setNotification] = useState({ content: null });

  // declaring some functions to handle component logic and render
  const generateDrinkMakerCommands = () => {
    setStore([...getStorage(data.store)]);
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

  const BeverageQuantityChecker = (command, store) => {
    index = getIndexToBeRemoved(command, store);
    drinkStatus = store[index];

    //updating the store
    setStore((prevStore) => [
      ...prevStore.slice(0, index),
      ...prevStore.slice(index + 1),
    ]);
    setStore((prevStore) => [...prevStore, updatedDrinkStatus(drinkStatus)]);

    //send the report
    if (checkStorage(command, store)) {
      setCommands((prevCommands) => [...prevCommands, command]);
    }

    if (!checkStorage(command, store)) {
      setNotification({
        content: sendEmailNotification(command, store, getDrink(command.type)),
      });
      setTimeout(() => {
        setNotification({ content: null });
      }, 4000);
    }

    // uncomment to see the update of the store when sending a command
    // console.table(store);
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
          onClick={() => BeverageQuantityChecker(command, store)}
        >
          Send command
        </button>
      )}
      {notification && (
        <div className="notification">{notification.content}</div>
      )}
    </div>
  );
};

export default Index;
