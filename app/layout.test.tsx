import { fireEvent, render } from "@testing-library/react";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import RootLayout from "./layout";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("@/pages/api/auth/[...nextauth]", () => ({
  authOptions: jest.fn(),
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

  test("renders Sign Up link when session is null", async () => {
    const children = <div></div>;
    const { getByText } = render(await RootLayout({ children }));
    expect(getByText("Sign-Up")).toHaveAttribute("href", "/signup");
  });

  test("renders Sign In button when session is null", async () => {
    const children = <div></div>;
    const { getByText } = render(await RootLayout({ children }));
    expect(getByText("Sign In")).toBeInTheDocument();
  });

  test("renders Sign Out button when session is not null", async () => {
    jest
      .spyOn(require("next-auth"), "getServerSession")
      .mockResolvedValueOnce("dummySession");
    const children = <div></div>;
    const { getByText } = render(await RootLayout({ children }));
    expect(getByText("Sign Out")).toBeInTheDocument();
  });

  test("calls signIn function when Sign In button is clicked", async () => {
    const children = <div></div>;
    const { getByText } = render(await RootLayout({ children }));
    const signInButton = getByText("Sign In");
    fireEvent.click(signInButton);
    expect(signIn).toHaveBeenCalledTimes(1);
  });

  test("calls signOut function when Sign Out button is clicked", async () => {
    jest
      .spyOn(require("next-auth"), "getServerSession")
      .mockResolvedValueOnce("dummySession");
    const children = <div></div>;
    const { getByText } = render(await RootLayout({ children }));
    const signOutButton = getByText("Sign Out");
    fireEvent.click(signOutButton);
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
