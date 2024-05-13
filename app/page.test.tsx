import { render } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  test("renders welcome message", () => {
    const { getByText } = render(<Home />);
    const titleElement = getByText("Welcome to Playground!");
    expect(titleElement).toBeInTheDocument();
  });
});
