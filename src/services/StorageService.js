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
    let updatedStore;
    let updatedDrinkState = {};

    const drinkStateInStore = [...store.filter((d) => d.type === command.type)];
    const { quantity } = drinkStateInStore[0];
    updatedDrinkState = { ...drinkStateInStore[0] };

    if (quantity > 0) {
      updatedDrinkState["quantity"] = quantity - 1;
    }

    updatedStore = [
      ...store.map((d) => {
        return d === drinkStateInStore[0] ? updatedDrinkState : d;
      }),
    ];

    // updatedStore = store.map((d) =>
    //   d.type === command.type ? (d["quantity"] -= 1) : d["quantity"]
    // );

    return updatedStore;
  };
}
