export class StorageService {
  getStorage = (store = []) => {
    return store;
  };

  checkStorage = (command, store = []) => {
    const drinkStateInStore = store.find(
      (drink) => drink.type === command.type
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

  updateStorage = (command, store = []) => {
    let updatedStore = [...store];
    let updateDrinkState = {};

    const drinkStateInStore = updatedStore.find(
      (drink) => drink.type === command.type
    );

    const { type, quantity } = drinkStateInStore;
    const index = store.indexOf(drinkStateInStore);

    switch (true) {
      case quantity > 0:
        updateDrinkState["type"] = type;
        updateDrinkState["quantity"] = quantity - 1;
        break;
      case quantity === 0:
        updateDrinkState = { ...drinkStateInStore };
        break;
      default:
        break;
    }

    if (~index) {
      updatedStore[index] = updateDrinkState;
    }

    return updatedStore;
  };
}
