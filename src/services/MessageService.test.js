import { MessageService } from "./MessageService";
const { commands, store } = require("../assets/mock/mockData");

describe("Price service", () => {
  let service;
  let spy;

  const command2 = commands[1];

  beforeEach(() => {
    service = new MessageService();
    spy = (method) => jest.spyOn(service, method);
  });

  it("should instantiate the service class", () => {
    expect(service).toBeTruthy();
  });

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

  it("should send a success message when drink is ready bo te brewed", () => {
    spy("sendDrinkIsPreparedMessage");
    expect(service.sendDrinkIsPreparedMessage(true, "C", 0, 3)).toEqual(
      "M:Your drink is being prepared :-)"
    );
    expect(service.sendDrinkIsPreparedMessage(false, "C", 0.3, 3)).toEqual(
      null
    );
    expect(service.sendDrinkIsPreparedMessage).toHaveBeenCalledTimes(2);
  });

  it("should send the Max sugar qty error message if more than 5 sugar quantity", () => {
    spy("sendMaxSugarErrorMessage");
    expect(service.sendMaxSugarErrorMessage(6, "T")).toEqual(
      "M:Maximum sugar allowed !"
    );
    expect(service.sendMaxSugarErrorMessage(2, "H")).toBeFalsy();
    expect(service.sendMaxSugarErrorMessage).toHaveBeenCalledTimes(2);
  });

  it("should indicate the shortage and that a notification has been sent", () => {
    spy("sendEmailNotification");
    expect(service.sendEmailNotification(command2, store, "Café")).toEqual(
      "Sorry, we are running out of : Café. A notification has been sent to your email address :)"
    );
    expect(service.sendEmailNotification).toHaveBeenCalledTimes(1);
  });
});
