export class DrinkMakerProtocolTranslator {
  constructor() {}

  drinkProtocolTranslator = (drinkType) => {
    switch (drinkType) {
      case "Thé":
        return "T";
      case "Café":
        return "C";
      case "Chocolat":
        return "H";
      default:
        return "M";
    }
  };

  checkDrinkType = (drinkType) => {
    switch (drinkType) {
      case "M":
        return `${drinkType}:This drink doesn't exist yet !`;
      default:
        return null;
    }
  };

  sugarQuantityProtocolTranslator = (quantity = 0) => {
    if (quantity > 5) {
      return "M:Maximum sugar allowed !";
    }
    return quantity > 0 ? `:${quantity}:0` : "::";
  };
}
