import { DrinkMakerProtocolService } from "./DrinkMakerProtocolService";

describe("command maker service", () => {
  let service;
  let spy;

  beforeEach(() => {
    service = new DrinkMakerProtocolService();
    spy = (method) => jest.spyOn(service, method);
  });

  it("should instantiate the service class", () => {
    expect(service).toBeTruthy();
  });

  it("should instantiate the service class", () => {
    expect(service).toBeTruthy();
  });

  it("should return the right drink protocol code including extra hot option", () => {
    spy("drinkProtocolTranslator");
    expect(service.drinkProtocolTranslator("Thé", false)).toEqual("T");
    expect(service.drinkProtocolTranslator("Café", true)).toEqual("Ch");
    expect(service.drinkProtocolTranslator("Coca")).toEqual("M");
    expect(service.drinkProtocolTranslator("Orange juice")).toEqual("O");
    expect(service.drinkProtocolTranslator).toHaveBeenCalledTimes(4);
  });

  it("should return the sugar quantity protocol code", () => {
    spy("sugarQuantityProtocolTranslator");
    expect(service.sugarQuantityProtocolTranslator(1)).toEqual(":1:0");
    expect(service.sugarQuantityProtocolTranslator).toHaveBeenCalled();
  });

  it("should return the drink depending of the type received", () => {
    spy("getDrink");
    expect(service.getDrink("Th")).toEqual("Thé extra hot");
    expect(service.getDrink("O")).toEqual("Orange juice");
    expect(service.getDrink).toHaveBeenCalledTimes(2);
  });
});

// https://stackoverflow.com/questions/50091438/jest-how-to-mock-one-specific-method-of-a-class
