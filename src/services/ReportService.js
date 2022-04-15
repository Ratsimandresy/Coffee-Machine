export class ReportService {
  getTotalDrink = (ordersArray = []) => {
    return ordersArray.filter((order) => order.message === null).length;
  };

  getTotalEarned = (ordersArray = []) => {
    return ordersArray.reduce((acc, cur) => {
      acc.price + cur.price;
    }, 0);
  };
}
