import { fireEvent, render } from "@testing-library/react";
import Coin from "./Coin";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

describe("Coin Component", () => {
  const mockProps = {
    userEmail: "abc123@example.com",
    userPoints: 10000,
  };

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;
  });

  test("renders without crashing", () => {
    render(<Coin {...mockProps} />);
  });

  test("displays the initial points correctly", () => {
    const { getByText } = render(<Coin {...mockProps} />);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("updates points correctly when choosing Head", async () => {
    const { findByTestId, getByRole, getByTestId } = render(
      <Coin {...mockProps} />
    );
    const points = getByTestId("Points");
    const headButton = getByRole("button", { name: "Head" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "100" } });
    fireEvent.click(headButton);
    await findByTestId("Points");
    let updatedPoints;
    if (points.textContent) {
      updatedPoints = parseInt(points.textContent.split(" ")[1]);
    }
    expect([9900, 10097]).toContainEqual(updatedPoints);
  });

  test("updates points correctly when choosing Tail", async () => {
    const { findByTestId, getByRole, getByTestId } = render(
      <Coin {...mockProps} />
    );
    const points = getByTestId("Points");
    const tailButton = getByRole("button", { name: "Tail" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "1200" } });
    fireEvent.click(tailButton);
    await findByTestId("Points");
    let updatedPoints;
    if (points.textContent) {
      updatedPoints = parseInt(points.textContent.split(" ")[1]);
    }
    expect([8800, 11164]).toContainEqual(updatedPoints);
  });

  test("does not update points if bet amount is 0", () => {
    const { getByRole, getByTestId, getByText } = render(
      <Coin {...mockProps} />
    );
    const headButton = getByRole("button", { name: "Head" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "0" } });
    fireEvent.click(headButton);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("does not update points if bet amount is not a multiple of 100", () => {
    const { getByRole, getByTestId, getByText } = render(
      <Coin {...mockProps} />
    );
    const headButton = getByRole("button", { name: "Head" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "150" } });
    fireEvent.click(headButton);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("does not update points if bet amount is greater than current points", () => {
    const { getByRole, getByTestId, getByText } = render(
      <Coin {...mockProps} />
    );
    const headButton = getByRole("button", { name: "Head" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "11000" } });
    fireEvent.click(headButton);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("displays correct player-choice when choosing Head", async () => {
    const { findByTestId, getByRole, getByTestId } = render(
      <Coin {...mockProps} />
    );
    const headButton = getByRole("button", { name: "Head" });
    fireEvent.click(headButton);
    await findByTestId("Choice");
    const choice = getByTestId("Choice");
    expect(choice).toHaveTextContent("Head");
  });

  test("displays correct player-choice when choosing Tail", async () => {
    const { findByTestId, getByRole, getByTestId } = render(
      <Coin {...mockProps} />
    );
    const tailButton = getByRole("button", { name: "Tail" });
    fireEvent.click(tailButton);
    await findByTestId("Choice");
    const choice = getByTestId("Choice");
    expect(choice).toHaveTextContent("Tail");
  });

  test("displays correct game-result-message when player wins/loses with Head", async () => {
    const { findByTestId, getByRole, getByTestId, getByText } = render(
      <Coin {...mockProps} />
    );
    const headButton = getByRole("button", { name: "Head" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "300" } });
    fireEvent.click(headButton);
    await findByTestId("Coin-Result");
    const coinResult = getByTestId("Coin-Result");
    if (coinResult.textContent === "Head") {
      expect(getByText("You earned 291 points!")).toBeInTheDocument();
    } else {
      expect(getByText("You lost 300 points...")).toBeInTheDocument();
    }
  });

  test("displays correct game-result-message when player wins/loses with Tail", async () => {
    const { findByTestId, getByRole, getByTestId, getByText } = render(
      <Coin {...mockProps} />
    );
    const tailButton = getByRole("button", { name: "Tail" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "500" } });
    fireEvent.click(tailButton);
    await findByTestId("Coin-Result");
    const coinResult = getByTestId("Coin-Result");
    if (coinResult.textContent === "Tail") {
      expect(getByText("You earned 485 points!")).toBeInTheDocument();
    } else {
      expect(getByText("You lost 500 points...")).toBeInTheDocument();
    }
  });

  test("displays the number of total played games correctly", async () => {
    const { findByTestId, getByRole, getByTestId } = render(
      <Coin {...mockProps} />
    );
    const headButton = getByRole("button", { name: "Head" });
    const tailButton = getByRole("button", { name: "Tail" });
    for (let i = 0; i < 10; i++) {
      fireEvent.click(headButton);
      fireEvent.click(tailButton);
    }
    await findByTestId("Play-Count");
    const playCount = getByTestId("Play-Count");
    let playCountNumber;
    if (playCount.textContent) {
      playCountNumber = parseInt(playCount.textContent.split(" ")[1]);
    }
    expect(playCountNumber).toEqual(20);
  });

  test("displays the number of total won/lost games correctly", async () => {
    const { findByTestId, getByRole, getByTestId } = render(
      <Coin {...mockProps} />
    );
    const headButton = getByRole("button", { name: "Head" });
    fireEvent.click(headButton);
    await findByTestId("Win-Count");
    const winCount = getByTestId("Win-Count");
    let winCountNumber;
    if (winCount.textContent) {
      winCountNumber = parseInt(winCount.textContent.split(" ")[1]);
    }
    await findByTestId("Loss-Count");
    const lossCount = getByTestId("Loss-Count");
    let lossCountNumber;
    if (lossCount.textContent) {
      lossCountNumber = parseInt(lossCount.textContent.split(" ")[1]);
    }
    await findByTestId("Coin-Result");
    const coinResult = getByTestId("Coin-Result");
    if (coinResult.textContent === "Head") {
      expect(winCountNumber).toEqual(1);
      expect(lossCountNumber).toEqual(0);
    } else {
      expect(winCountNumber).toEqual(0);
      expect(lossCountNumber).toEqual(1);
    }
  });

  test("displays the number of total Head/Tail correctly", async () => {
    const { findByTestId, getByRole, getByTestId } = render(
      <Coin {...mockProps} />
    );
    const tailButton = getByRole("button", { name: "Tail" });
    fireEvent.click(tailButton);
    await findByTestId("Head-Count");
    const headCount = getByTestId("Head-Count");
    let headCountNumber;
    if (headCount.textContent) {
      headCountNumber = parseInt(headCount.textContent.split(" ")[1]);
    }
    await findByTestId("Tail-Count");
    const tailCount = getByTestId("Tail-Count");
    let tailCountNumber;
    if (tailCount.textContent) {
      tailCountNumber = parseInt(tailCount.textContent.split(" ")[1]);
    }
    await findByTestId("Coin-Result");
    const coinResult = getByTestId("Coin-Result");
    if (coinResult.textContent === "Tail") {
      expect(headCountNumber).toEqual(0);
      expect(tailCountNumber).toEqual(1);
    } else {
      expect(headCountNumber).toEqual(1);
      expect(tailCountNumber).toEqual(0);
    }
  });

  test("displays past-coin-results correctly", async () => {
    const { findByTestId, getByRole, getByTestId } = render(
      <Coin {...mockProps} />
    );
    const headButton = getByRole("button", { name: "Head" });
    const tailButton = getByRole("button", { name: "Tail" });
    fireEvent.click(headButton);
    fireEvent.click(tailButton);
    fireEvent.click(headButton);
    await findByTestId("Past-Coin-Results");
    const pastCoinResultsContainer = getByTestId("Past-Coin-Results");
    const pastCoinResults =
      pastCoinResultsContainer.textContent?.split(": ")[1];
    expect([
      "H H H ",
      "H H T ",
      "H T H ",
      "H T T ",
      "T H H ",
      "T H T ",
      "T T H ",
      "T T T ",
    ]).toContain(pastCoinResults);
  });

  test("displays longest-consecutive-heads/tails correctly", async () => {
    const { findByTestId, getByRole, getByTestId } = render(
      <Coin {...mockProps} />
    );
    const headButton = getByRole("button", { name: "Head" });
    const tailButton = getByRole("button", { name: "Tail" });
    for (let i = 0; i < 100; i++) {
      fireEvent.click(headButton);
      fireEvent.click(tailButton);
    }
    await findByTestId("Longest-Consecutive-Heads");
    const longestConsecutiveHeadsContainer = getByTestId(
      "Longest-Consecutive-Heads"
    );
    let longestConsecutiveHeads;
    if (longestConsecutiveHeadsContainer.textContent) {
      longestConsecutiveHeads = parseInt(
        longestConsecutiveHeadsContainer.textContent.split(" ")[3]
      );
    }
    await findByTestId("Longest-Consecutive-Tails");
    const longestConsecutiveTailsContainer = getByTestId(
      "Longest-Consecutive-Tails"
    );
    let longestConsecutiveTails;
    if (longestConsecutiveTailsContainer.textContent) {
      longestConsecutiveTails = parseInt(
        longestConsecutiveTailsContainer.textContent.split(" ")[3]
      );
    }
    await findByTestId("Past-Coin-Results");
    const pastCoinResultsContainer = getByTestId("Past-Coin-Results");
    const pastCoinResults = pastCoinResultsContainer.textContent
      ?.split(": ")[1]
      .replace(/\s/g, "");
    if (pastCoinResults) {
      let longestConsecutiveHeadsTest = 0;
      let currentConsecutiveHeadsTest = 0;
      let longestConsecutiveTailsTest = 0;
      let currentConsecutiveTailsTest = 0;
      for (let i = 0; i < pastCoinResults.length; i++) {
        if (pastCoinResults[i] === "H") {
          longestConsecutiveTailsTest = Math.max(
            longestConsecutiveTailsTest,
            currentConsecutiveTailsTest
          );
          currentConsecutiveTailsTest = 0;
          currentConsecutiveHeadsTest += 1;
        } else {
          longestConsecutiveHeadsTest = Math.max(
            longestConsecutiveHeadsTest,
            currentConsecutiveHeadsTest
          );
          currentConsecutiveHeadsTest = 0;
          currentConsecutiveTailsTest += 1;
        }
      }
      longestConsecutiveHeadsTest = Math.max(
        longestConsecutiveHeadsTest,
        currentConsecutiveHeadsTest
      );
      longestConsecutiveTailsTest = Math.max(
        longestConsecutiveTailsTest,
        currentConsecutiveTailsTest
      );
      expect(longestConsecutiveHeadsTest).toEqual(longestConsecutiveHeads);
      expect(longestConsecutiveTailsTest).toEqual(longestConsecutiveTails);
    }
  });
});
