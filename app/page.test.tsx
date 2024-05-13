import { render } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
  test("renders without crashing", () => {
    render(<Home />);
  });

  test("renders header", () => {
    const { getByText } = render(<Home />);
    const headerElement = getByText("Welcome to Playground!");
    expect(headerElement).toBeInTheDocument();
  });
});
