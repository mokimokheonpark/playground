import { render } from "@testing-library/react";
import CoinPage from "./page";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/pages/api/auth/[...nextauth]", () => ({
  authOptions: jest.fn(),
}));

describe("Coin Page", () => {
  test("renders without crashing", async () => {
    render(await CoinPage());
  });

  test("renders header", async () => {
    const { getByText } = render(await CoinPage());
    const headerElement = getByText("Coin Flipping");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders Coin Component", async () => {
    const { getByTestId } = render(await CoinPage());
    const coinComponent = getByTestId("Coin-Component");
    expect(coinComponent).toBeInTheDocument();
  });
});
