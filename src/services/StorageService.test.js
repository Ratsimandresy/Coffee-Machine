import { StorageService } from "./StorageService";
const { commands } = require("../assets/mock/mockData");

describe("command maker service", () => {
  let service;
  let spy;
  const store = [
    { type: "T", quantity: 4 },
    { type: "H", quantity: 3 },
    { type: "C", quantity: 0 },
    { type: "O", quantity: 1 },
  ];
  const command1 = commands[0];
  const command2 = commands[1];
  const command10 = commands[9];

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
      { type: "H", quantity: 3 },
      { type: "C", quantity: 0 },
      { type: "O", quantity: 1 },
    ]);
    expect(service.getStorage).toHaveBeenCalledTimes(1);
  });

  it("should check drink availability", () => {
    spy("checkStorage");

    expect(service.checkStorage(command1, store)).toEqual(true);
    expect(service.checkStorage(command2, store)).toEqual(false);
    expect(service.checkStorage).toHaveBeenCalledTimes(2);
  });

  it("should update the storage when a drink is available", () => {
    spy("updateStorage");
    expect(service.updateStorage(command1, store)).toEqual([
      { type: "T", quantity: 3 },
      { type: "H", quantity: 3 },
      { type: "C", quantity: 0 },
      { type: "O", quantity: 1 },
    ]);

    expect(service.updateStorage(command2, store)).toEqual([
      { type: "T", quantity: 4 },
      { type: "H", quantity: 3 },
      { type: "C", quantity: 0 },
      { type: "O", quantity: 1 },
    ]);

    expect(service.updateStorage).toHaveBeenCalledTimes(2);
  });
});
