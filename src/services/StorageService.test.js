import { StorageService } from "./StorageService";
const { commands, store } = require("../assets/mock/mockData");

describe("command maker service", () => {
  let service;
  let spy;

  const command1 = commands[0];
  const command2 = commands[1];
  const command6 = commands[5];

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

  it("should update the storage when a drink is available", () => {
    spy("updateStorage");

    expect(service.updateStorage(command1, store)).toEqual([
      { type: "T", quantity: 3 },
      { type: "C", quantity: 0 },
      { type: "H", quantity: 4 },
      { type: "O", quantity: 4 },
      { type: "Th", quantity: 3 },
      { type: "Ch", quantity: 0 },
      { type: "Hh", quantity: 4 },
    ]);

    expect(service.updateStorage(command2, store)).toEqual([
      { type: "T", quantity: 4 },
      { type: "C", quantity: 0 },
      { type: "H", quantity: 4 },
      { type: "O", quantity: 4 },
      { type: "Th", quantity: 3 },
      { type: "Ch", quantity: 0 },
      { type: "Hh", quantity: 4 },
    ]);

    expect(service.updateStorage(command6, store)).toEqual([
      { type: "T", quantity: 4 },
      { type: "C", quantity: 0 },
      { type: "H", quantity: 4 },
      { type: "O", quantity: 3 },
      { type: "Th", quantity: 3 },
      { type: "Ch", quantity: 0 },
      { type: "Hh", quantity: 4 },
    ]);

    expect(service.updateStorage).toHaveBeenCalledTimes(3);
  });
});
