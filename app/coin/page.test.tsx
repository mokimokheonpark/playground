import { render } from "@testing-library/react";
import Coin from "./page";

describe("Home", () => {
  test("renders welcome message", () => {
    const { getByText } = render(<Coin />);
    const titleElement = getByText("Coin Flipping");
    expect(titleElement).toBeInTheDocument();
  });
});
