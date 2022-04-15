export class ReportService {
  getTotalDrink = (ordersArray = []) => {
    return ordersArray.filter((order) => order.isPrepared).length;
  };

  getTotalEarned = (ordersArray = []) => {
    const total = ordersArray
      .filter((order) => order.isPrepared)
      .reduce((total, { price }) => {
        return total + price;
      }, 0);
    return Number(total).toFixed(2);
  };
}
