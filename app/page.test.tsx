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
});
