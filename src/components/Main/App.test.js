import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";

describe("App component", () => {
  const container = document.createElement("div");
  const order = { drink: "Thé", sugarQuantity: 1 };
  beforeEach(() => {
    document.body.appendChild(container);
  });

  it("should render App component", () => {
    act(() => {
      render(<App currentOrder={order} />, container);
      console.log(container);
    });

    expect(container).toBeTruthy();
  });

  test("should render th drink maker protocol code", () => {
    render(<App currentOrder={order} />);
    expect(screen.getByText("T:1:0"));
  });
});

//https://reactjs.org/docs/testing-recipes.html#act
//https://blog.logrocket.com/testing-state-changes-in-react-functional-components/
// https://stackoverflow.com/questions/50091438/jest-how-to-mock-one-specific-method-of-a-class
