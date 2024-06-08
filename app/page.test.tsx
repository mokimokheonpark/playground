import { render } from "@testing-library/react";
import Home from "./page";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/pages/api/auth/[...nextauth]", () => ({
  authOptions: jest.fn(),
}));

describe("Home Page", () => {
  test("renders without crashing", async () => {
    render(await Home());
  });

  test("renders header", async () => {
    const { getByText } = render(await Home());
    const headerElement = getByText("Welcome to Playground!");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders a message when session is null", async () => {
    jest
      .spyOn(require("next-auth"), "getServerSession")
      .mockResolvedValueOnce(null);
    const { getByText } = render(await Home());
    const messageElement = getByText("No user logged in...");
    expect(messageElement).toBeInTheDocument();
  });

  test("renders user information when session is not null", async () => {
    const mockSession = {
      user: {
        email: "test@example.com",
        username: "testuser",
      },
    };
    jest
      .spyOn(require("next-auth"), "getServerSession")
      .mockResolvedValueOnce(mockSession);
    const { getByText } = render(await Home());
    expect(getByText("You are logged in!")).toBeInTheDocument();
    expect(getByText("Email: test@example.com")).toBeInTheDocument();
    expect(getByText("Username: testuser")).toBeInTheDocument();
  });
});
