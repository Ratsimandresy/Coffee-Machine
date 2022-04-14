import { DrinkMakerProtocolTranslator } from "./DrinkMakerProtocolTranslator";

describe("command maker service", () => {
  const text = "this is the text";
  const translator = new DrinkMakerProtocolTranslator(text);

  it("should return the right drink protocol code", () => {
    jest.spyOn(translator, "drinkProtocolTranslator");
    expect(translator.drinkProtocolTranslator("Thé")).toEqual("T");
    expect(translator.drinkProtocolTranslator("Café")).toEqual("C");
    expect(translator.drinkProtocolTranslator("Coca")).toEqual("M");
    expect(translator.drinkProtocolTranslator).toHaveBeenCalledTimes(3);
  });

  it("should return error message if ordering non-available drink", () => {
    jest.spyOn(translator, "checkDrinkType");

    expect(translator.checkDrinkType("M")).toEqual(
      "M:This drink doesn't exist yet !"
    );
  });

  it("should return the sugar quantity protocol code", () => {
    jest.spyOn(translator, "sugarQuantityProtocolTranslator");
    expect(translator.sugarQuantityProtocolTranslator(1)).toEqual(":1:0");
    expect(translator.sugarQuantityProtocolTranslator).toHaveBeenCalled();
  });
});

// https://stackoverflow.com/questions/50091438/jest-how-to-mock-one-specific-method-of-a-class
