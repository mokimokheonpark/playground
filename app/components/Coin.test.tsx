import { render, fireEvent } from "@testing-library/react";
import Coin from "./Coin";

describe("Coin Component", () => {
  test("renders without crashing", () => {
    render(<Coin />);
  });

  test("displays the initial points correctly", () => {
    const { getByText } = render(<Coin />);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("updates points when Head-button is clicked", () => {
    const { getByText, getByTestId } = render(<Coin />);
    const points = getByTestId("Points");
    const headButton = getByText("Head");
    fireEvent.click(headButton);
    let updatedPoints;
    if (points.textContent) {
      updatedPoints = parseInt(points.textContent.split(" ")[1]);
    }
    expect([9900, 10097]).toContainEqual(updatedPoints);
  });

  test("updates points when Tail-button is clicked", () => {
    const { getByText, getByTestId } = render(<Coin />);
    const points = getByTestId("Points");
    const tailButton = getByText("Tail");
    fireEvent.click(tailButton);
    let updatedPoints;
    if (points.textContent) {
      updatedPoints = parseInt(points.textContent.split(" ")[1]);
    }
    expect([9900, 10097]).toContainEqual(updatedPoints);
  });
});
