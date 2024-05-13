import { render } from "@testing-library/react";
import CoinPage from "./page";

describe("Coin Page", () => {
  test("renders without crashing", () => {
    render(<CoinPage />);
  });

  test("renders header", () => {
    const { getByText } = render(<CoinPage />);
    const headerElement = getByText("Coin Flipping");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders Coin Component", () => {
    const { getByTestId } = render(<CoinPage />);
    const coinComponent = getByTestId("Coin-Component");
    expect(coinComponent).toBeInTheDocument();
  });
});
