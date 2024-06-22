import { render } from "@testing-library/react";
import RPSPage from "./page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/pages/api/auth/[...nextauth]", () => ({
  authOptions: jest.fn(),
}));

describe("Rock-Paper-Scissors Page", () => {
  test("renders without crashing", async () => {
    render(await RPSPage());
  });

  test("renders header", async () => {
    const { getByText } = render(await RPSPage());
    const headerElement = getByText("Rock Paper Scissors");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders RPS Component", async () => {
    const { getByTestId } = render(await RPSPage());
    const diceComponent = getByTestId("RPS-Component");
    expect(diceComponent).toBeInTheDocument();
  });
});
