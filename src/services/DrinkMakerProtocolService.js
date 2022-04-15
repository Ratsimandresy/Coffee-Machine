export class DrinkMakerProtocolService {
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

  sugarQuantityProtocolTranslator = (quantity = 0) => {
    return quantity > 0 ? `:${quantity}:0` : "::";
  };
}
