export class MessageService {
  sendDrinkErrorMessage = (drinkType) => {
    switch (drinkType) {
      case "M":
        return `${drinkType}:This drink doesn't exist yet !`;
      default:
        return null;
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
