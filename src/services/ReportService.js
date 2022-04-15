export class ReportService {
  soldDrink;

  getTotalDrink = (ordersArray = []) => {
    return ordersArray.filter((order) => order.isPrepared).length;
  };

  getTotalEarned = (ordersArray = []) => {
    return ordersArray
      .filter((order) => order.isPrepared)
      .reduce((total, { price }) => {
        return total + price;
      }, 0);
  };
}
