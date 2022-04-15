import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

describe("Report button component", () => {
  const container = document.createElement("div");
  beforeEach(() => {
    document.body.appendChild(container);
  });

  it("should render App component", () => {
    jest.spyOn(React, "useEffect").mockImplementation((f) => f());
    act(() => {
      render(<App />, container);
    });
    expect(container).toBeTruthy();
  });

  test("should show information on click", () => {
    render(<App />);
    const button = screen.getByTestId("new-btn");
    expect(button).toHaveTextContent("Make new command");
  });
});
