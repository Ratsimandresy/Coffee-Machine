import { ReportService } from "./ReportService";

const { commands } = require("../assets/mock/mockData");

describe("Report service", () => {
  const service = new ReportService();
  const spy = (method) => jest.spyOn(service, method);

  it("should return the total number of drinks ordered", () => {
    spy("getTotalDrink");
    expect(service.getTotalDrink(commands)).toEqual(7);
  });
});
