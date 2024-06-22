import { render } from "@testing-library/react";
import DicePage from "./page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/pages/api/auth/[...nextauth]", () => ({
  authOptions: jest.fn(),
}));

describe("Dice Page", () => {
  test("renders without crashing", async () => {
    render(await DicePage());
  });

  test("renders header", async () => {
    const { getByText } = render(await DicePage());
    const headerElement = getByText("Dice Rolling");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders Dice Component", async () => {
    const { getByTestId } = render(await DicePage());
    const diceComponent = getByTestId("Dice-Component");
    expect(diceComponent).toBeInTheDocument();
  });
});
