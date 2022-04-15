export class DrinkMakerProtocolService {
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

  getDrink = (type) => {
    switch (type) {
      case "T":
        return "Thé";
      case "Th":
        return "Thé extra hot";
      case "C":
        return "Café";
      case "Ch":
        return "Café extra hot";
      case "H":
        return "Chocolat";
      case "Hh":
        return "Chocolat extra hot";
      case "O":
        return "Orange juice";
      default:
        break;
    }
  };

  sugarQuantityProtocolTranslator = (quantity = 0) => {
    return quantity > 0 ? `:${quantity}:0` : "::";
  };
}
