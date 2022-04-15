export class MessageService {
  sendDrinkErrorMessage = (drinkType) => {
    switch (drinkType) {
      case "M":
        return `${drinkType}:This drink doesn't exist yet !`;
      default:
        return null;
    }
  };

  sendDrinkIsPreparedMessage = (isPrepared, type, missingAmount, sugarQty) => {
    if (!isPrepared) {
      return null;
    }
    if (isPrepared && type !== "M" && !missingAmount && sugarQty <= 5) {
      return "M:Your drink is being prepared :-)";
    }
  };

  sendAmountErrorMessage = (missingAmount, drinkType) => {
    if (!missingAmount) {
      return null;
    }
    if (missingAmount && drinkType !== "M") {
      return `M:Not enough money ! Please provide : ${missingAmount}€`;
    }
  };

  sendMaxSugarErrorMessage = (sugarQty, drinkType) =>
    sugarQty > 5 && drinkType !== "M" ? "M:Maximum sugar allowed !" : null;
}
