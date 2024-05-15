import { render } from "@testing-library/react";
import DicePage from "./page";

describe("Dice Page", () => {
  test("renders without crashing", () => {
    render(<DicePage />);
  });

  test("renders header", () => {
    const { getByText } = render(<DicePage />);
    const headerElement = getByText("Dice Rolling");
    expect(headerElement).toBeInTheDocument();
  });
});
