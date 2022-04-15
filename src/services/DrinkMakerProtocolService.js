export class DrinkMakerProtocolService {
  constructor() {}

  drinkProtocolTranslator = (drink, extra) => {
    switch (drink) {
      case "Thé":
        return extra ? "Th" : "T";
      case "Café":
        return extra ? "Ch" : "C";
      case "Chocolat":
        return extra ? "Hh" : "H";
      case "Orange juice":
        return "O";
      default:
        return "M";
    }
  };

  sugarQuantityProtocolTranslator = (quantity = 0) => {
    return quantity > 0 ? `:${quantity}:0` : "::";
  };
}
