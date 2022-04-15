import { MessageService } from "./MessageService";

describe("Price service", () => {
  const service = new MessageService();
  const spy = (method) => jest.spyOn(service, method);

  it("should send the drink error message if a drink doesn't exists", () => {
    const type = "M";
    spy("sendDrinkErrorMessage");
    expect(service.sendDrinkErrorMessage(type)).toEqual(
      `${type}:This drink doesn't exist yet !`
    );
    expect(service.sendDrinkErrorMessage("C")).toBeFalsy();
    expect(service.sendDrinkErrorMessage).toHaveBeenCalledTimes(2);
  });

  it("should send the missing amount error message if not enough money", () => {
    spy("sendAmountErrorMessage");
    expect(service.sendAmountErrorMessage(0.1, "C", 3)).toEqual(
      "M:Not enough money ! Please provide : 0.1€"
    );
    expect(service.sendAmountErrorMessage(0, "C", 2)).toBeFalsy();
    expect(service.sendAmountErrorMessage).toHaveBeenCalledTimes(2);
  });

  it("should send the Max sugar qty error message if more than 5 sugar quantity", () => {
    spy("sendMaxSugarErrorMessage");
    expect(service.sendMaxSugarErrorMessage(6, "T")).toEqual(
      "M:Maximum sugar allowed !"
    );
    expect(service.sendMaxSugarErrorMessage(2, "H")).toBeFalsy();
    expect(service.sendMaxSugarErrorMessage).toHaveBeenCalledTimes(2);
  });
});