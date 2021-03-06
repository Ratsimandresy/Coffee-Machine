import { PriceService } from "./PriceService";

describe("Price service", () => {
  let service;
  let spy;

  beforeEach(() => {
    service = new PriceService();
    spy = (method) => jest.spyOn(service, method);
  });

  it("should instantiate the service class", () => {
    expect(service).toBeTruthy();
  });

  it("should get the right price when receiving drink type", () => {
    spy("getPrice");
    expect(service.getPrice("T")).toEqual(0.4);
    expect(service.getPrice("C")).toEqual(0.6);
    expect(service.getPrice("Hh")).toEqual(0.5);
    expect(service.getPrice("M")).toBeFalsy();

    expect(service.getPrice).toHaveBeenCalledTimes(4);
  });

  it("should return the missing amount", () => {
    spy("getMissingAmount");
    expect(service.getMissingAmount(0.25, 0.6)).toEqual(0.35);
    expect(service.getMissingAmount(0.3, 0.5)).toEqual(0.2);
    expect(service.getMissingAmount(1, 0.4)).toBeFalsy();

    expect(service.getMissingAmount).toHaveBeenCalledTimes(3);
  });
});
