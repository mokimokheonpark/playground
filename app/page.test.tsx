import { render } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  test("renders welcome message", () => {
    const { getByText } = render(<Home />);
    const welcomeMessage = getByText("Welcome to Playground!");
    expect(welcomeMessage).toBeInTheDocument();
  });
});
