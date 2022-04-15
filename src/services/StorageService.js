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

    updatedStore = store.map((d) => {
      const { type, quantity } = d;
      if (d.type === command.type) {
        switch (true) {
          case quantity > 0:
            return (d = { type, quantity: d.quantity - 1 });
          case quantity === 0:
            return d;
          default:
            break;
        }
      } else {
        return d;
      }
    });

    return updatedStore;
  };
}
