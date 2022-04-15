import { StorageService } from "./StorageService";
const { commands, store } = require("../assets/mock/mockData");

describe("command maker service", () => {
  let service;
  let spy;

  const command1 = commands[0];
  const command2 = commands[1];

  beforeEach(() => {
    service = new StorageService();
    spy = (method) => jest.spyOn(service, method);
  });

  it("should instantiate the service class", () => {
    expect(service).toBeTruthy();
  });

  it("should get the actual store", () => {
    spy("getStorage");
    expect(service.getStorage(store)).toEqual([
      { type: "T", quantity: 4 },
      { type: "C", quantity: 0 },
      { type: "H", quantity: 4 },
      { type: "O", quantity: 4 },
      { type: "Th", quantity: 3 },
      { type: "Ch", quantity: 0 },
      { type: "Hh", quantity: 4 },
    ]);
    expect(service.getStorage).toHaveBeenCalledTimes(1);
  });

  it("should check drink availability", () => {
    spy("checkStorage");

    expect(service.checkStorage(command1, store)).toEqual(true);
    expect(service.checkStorage(command2, store)).toEqual(false);
    expect(service.checkStorage).toHaveBeenCalledTimes(2);
  });

  it("should return the index of the option to be removed", () => {
    spy("getIndexToBeRemoved");
    expect(service.getIndexToBeRemoved(command1, store)).toEqual(0);
    expect(service.getIndexToBeRemoved(command2, store)).toEqual(1);
    expect(service.getIndexToBeRemoved).toHaveBeenCalledTimes(2);
  });

  it("should update drink status", () => {
    spy("updatedDrinkStatus");

    expect(service.updatedDrinkStatus({ type: "T", quantity: 4 })).toEqual({
      type: "T",
      quantity: 3,
    });
    expect(service.updatedDrinkStatus({ type: "Ch", quantity: 0 })).toEqual({
      type: "Ch",
      quantity: 0,
    });
    expect(service.updatedDrinkStatus).toHaveBeenCalledTimes(2);
  });
});
