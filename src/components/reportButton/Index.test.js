import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import ReportButton from "./Index.jsx";

const { commands } = require("../../assets/mock/mockData");

describe("Report button component", () => {
  const container = document.createElement("div");
  beforeEach(() => {
    document.body.appendChild(container);
  });

  it("should render App component", () => {
    jest.spyOn(React, "useEffect").mockImplementation((f) => f());
    act(() => {
      render(<ReportButton commands={commands} />, container);
    });

    expect(container).toBeTruthy();
  });

  test("should show information on click", () => {
    render(<ReportButton commands={commands} />);
    const button = screen.getByTestId("report-btn");

    expect(button).toHaveTextContent("Get Report");

    fireEvent.click(button);

    expect(button).toHaveTextContent("hide info");

    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "Open the console to see the report"
    );
  });
});
