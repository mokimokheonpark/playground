import { render } from "@testing-library/react";
import RootLayout from "./layout";

describe("RootLayout", () => {
  test("renders without crashing", () => {
    render(<RootLayout>{}</RootLayout>);
  });

  test("renders children", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Child Component</div>
      </RootLayout>
    );
    expect(getByText("Child Component")).toBeInTheDocument();
  });

  test("renders navbar links", () => {
    const { getByText } = render(<RootLayout>{}</RootLayout>);
    expect(getByText("Home")).toHaveAttribute("href", "/");
    expect(getByText("Coin")).toHaveAttribute("href", "/coin");
    expect(getByText("Dice")).toHaveAttribute("href", "/dice");
    expect(getByText("RPS")).toHaveAttribute("href", "/rps");
  });
});
