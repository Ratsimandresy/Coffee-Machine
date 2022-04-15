export class PriceService {
  getPrice = (drinkType) => {
    switch (drinkType) {
      case "T":
      case "Th":
        return 0.4;
      case "C":
      case "Ch":
        return 0.6;
      case "H":
      case "Hh":
        return 0.5;
      case "O":
        return 0.6;
      default:
        return null;
    }
  };

  getMissingAmount = (money = 0, price) => {
    if (money > price) {
      return null;
    }
    return Number((price - money).toFixed(2));
  };
}
