import { render } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
  test("renders header", () => {
    const { getByText } = render(<Home />);
    const headerElement = getByText("Welcome to Playground!");
    expect(headerElement).toBeInTheDocument();
  });
});
