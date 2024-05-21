import { render } from "@testing-library/react";
import RootLayout from "./layout";

describe("RootLayout", () => {
  test("renders without crashing", async () => {
    const children = <div></div>;
    render(await RootLayout({ children }));
  });

  test("renders children", async () => {
    const children = <div>Children</div>;
    const { getByText } = render(await RootLayout({ children }));
    expect(getByText("Children")).toBeInTheDocument();
  });

  test("renders navbar links", async () => {
    const children = <div></div>;
    const { getByText } = render(await RootLayout({ children }));
    expect(getByText("Home")).toHaveAttribute("href", "/");
    expect(getByText("Coin")).toHaveAttribute("href", "/coin");
    expect(getByText("Dice")).toHaveAttribute("href", "/dice");
    expect(getByText("RPS")).toHaveAttribute("href", "/rps");
  });
});
