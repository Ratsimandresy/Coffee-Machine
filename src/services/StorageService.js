export class StorageService {
  getStorage = (store = []) => {
    return store;
  };

  checkStorage = (command, store = []) => {
    const drinkStateInStore = store.find(
      (status) => status.type === command.type
    );
    const { quantity } = drinkStateInStore;
    switch (true) {
      case quantity > 0:
        return true;
      case quantity === 0:
        return false;
      default:
        break;
    }
  };

  getIndexToBeRemoved = (command, store) => {
    const drinkStatus = store.find((status) => status.type === command.type);
    const index = store.indexOf(drinkStatus);
    return index;
  };

  updatedDrinkStatus = (order) => {
    const { type, quantity } = order;
    return quantity > 0 ? { type, quantity: quantity - 1 } : order;
  };
}
