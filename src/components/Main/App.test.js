import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

const { orders } = require("../../assets/mock/mockData");

describe("App component", () => {
  const container = document.createElement("div");
  const order1 = orders[0].order1;
  const order2 = orders[1].order2;

  beforeEach(() => {
    document.body.appendChild(container);
  });

  it("should render App component", () => {
    jest.spyOn(React, "useEffect").mockImplementation((f) => f());
    act(() => {
      render(<App currentOrder={order1} />, container);
    });

    expect(container).toBeTruthy();
  });

  test("should render the drink maker protocol code", () => {
    render(<App currentOrder={order1} />);
    expect(screen.getByText("T:1:0"));
  });

  test("should render error message when drink doesn't exist", () => {
    render(<App currentOrder={order2} />);
    expect(screen.getByRole("contentinfo")).toHaveTextContent(
      "M:This drink doesn't exist yet !"
    );
  });
});

//https://reactjs.org/docs/testing-recipes.html#act
//https://blog.logrocket.com/testing-state-changes-in-react-functional-components/
// https://stackoverflow.com/questions/50091438/jest-how-to-mock-one-specific-method-of-a-class
//https://betterprogramming.pub/why-you-should-avoid-testing-react-components-with-test-ids-ee50d20d37d2
