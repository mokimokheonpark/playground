import { fireEvent, render } from "@testing-library/react";
import { signIn } from "next-auth/react";
import RootLayout from "./layout";

jest.mock("@/auth", () => ({
  auth: jest.fn().mockResolvedValue(null),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

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

  test("does not render Sign In button when session is null", async () => {
    jest.spyOn(require("@/auth"), "auth").mockResolvedValueOnce("dummySession");
    const children = <div></div>;
    const { queryByText } = render(await RootLayout({ children }));
    expect(queryByText("Sign In")).toBeNull();
  });

  test("calls signIn function when Sign In button is clicked", async () => {
    const children = <div></div>;
    const { getByText } = render(await RootLayout({ children }));
    const signInButton = getByText("Sign In");
    fireEvent.click(signInButton);
    expect(signIn).toHaveBeenCalledTimes(1);
  });
});
