import { render } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
  test("renders without crashing", async () => {
    render(await Home());
  });

  test("renders header", async () => {
    const { getByText } = render(await Home());
    const headerElement = getByText("Welcome to Playground!");
    expect(headerElement).toBeInTheDocument();
  });
});
