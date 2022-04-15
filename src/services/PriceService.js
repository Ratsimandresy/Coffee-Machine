export class PriceService {
  getPrice = (drinkType) => {
    switch (drinkType) {
      case ("T", "Th"):
        return 0.4;
      case ("C", "Ch"):
        return 0.6;
      case ("H", "Hh"):
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
