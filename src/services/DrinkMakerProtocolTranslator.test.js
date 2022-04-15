import { DrinkMakerProtocolService } from "./DrinkMakerProtocolService";

describe("command maker service", () => {
  const text = "this is the text";
  const service = new DrinkMakerProtocolService(text);
  const spy = (method) => jest.spyOn(service, method);

  it("should return the right drink protocol code", () => {
    spy("drinkProtocolTranslator");
    expect(service.drinkProtocolTranslator("Thé")).toEqual("T");
    expect(service.drinkProtocolTranslator("Café")).toEqual("C");
    expect(service.drinkProtocolTranslator("Coca")).toEqual("M");
    expect(service.drinkProtocolTranslator).toHaveBeenCalledTimes(3);
  });

  it("should return the sugar quantity protocol code", () => {
    spy("sugarQuantityProtocolTranslator");
    expect(service.sugarQuantityProtocolTranslator(1)).toEqual(":1:0");
    expect(service.sugarQuantityProtocolTranslator).toHaveBeenCalled();
  });
});

// https://stackoverflow.com/questions/50091438/jest-how-to-mock-one-specific-method-of-a-class
