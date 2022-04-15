import { ReportService } from "./ReportService";

const { commands } = require("../assets/mock/mockData");

describe("Report service", () => {
  let service;
  let spy;

  beforeEach(() => {
    service = new ReportService();
    spy = (method) => jest.spyOn(service, method);
  });

  it("should instantiate the service class", () => {
    expect(service).toBeTruthy();
  });

  it("should return the total number of drinks ordered", () => {
    spy("getTotalDrink");
    expect(service.getTotalDrink(commands)).toEqual(7);
    expect(service.getTotalDrink).toHaveBeenCalledTimes(1);
  });

  it("should return the total amount of sold drink", () => {
    spy("getTotalEarned");
    expect(service.getTotalEarned(commands)).toEqual(Number(3.6).toFixed(2));
    expect(service.getTotalEarned).toHaveBeenCalledTimes(1);
  });
});
