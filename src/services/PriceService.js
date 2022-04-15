export class PriceService {
  constructor() {}

  test = (text) => text;

  getPrice = (drinkType) => {
    switch (drinkType) {
      case "T":
        return 0.4;
      case "C":
        return 0.6;
      case "H":
        return 0.5;
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
