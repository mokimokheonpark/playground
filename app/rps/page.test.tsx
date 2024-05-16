import { render } from "@testing-library/react";
import RPSPage from "./page";

describe("Rock-Paper-Scissors Page", () => {
  test("renders without crashing", () => {
    render(<RPSPage />);
  });

  test("renders header", () => {
    const { getByText } = render(<RPSPage />);
    const headerElement = getByText("Rock Paper Scissors");
    expect(headerElement).toBeInTheDocument();
  });
});
