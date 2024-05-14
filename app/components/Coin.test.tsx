import { fireEvent, render } from "@testing-library/react";
import Coin from "./Coin";

describe("Coin Component", () => {
  test("renders without crashing", () => {
    render(<Coin />);
  });

  test("displays the initial points correctly", () => {
    const { getByText } = render(<Coin />);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("updates points correctly when choosing Head", () => {
    const { getByRole, getByTestId } = render(<Coin />);
    const points = getByTestId("Points");
    const headButton = getByRole("button", { name: "Head" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "100" } });
    fireEvent.click(headButton);
    let updatedPoints;
    if (points.textContent) {
      updatedPoints = parseInt(points.textContent.split(" ")[1]);
    }
    expect([9900, 10097]).toContainEqual(updatedPoints);
  });

  test("updates points correctly when choosing Tail", () => {
    const { getByRole, getByTestId } = render(<Coin />);
    const points = getByTestId("Points");
    const tailButton = getByRole("button", { name: "Tail" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "1200" } });
    fireEvent.click(tailButton);
    let updatedPoints;
    if (points.textContent) {
      updatedPoints = parseInt(points.textContent.split(" ")[1]);
    }
    expect([8800, 11164]).toContainEqual(updatedPoints);
  });

  test("does not update points if bet amount is 0", () => {
    const { getByRole, getByTestId, getByText } = render(<Coin />);
    const headButton = getByRole("button", { name: "Head" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "0" } });
    fireEvent.click(headButton);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("does not update points if bet amount is not a multiple of 100", () => {
    const { getByRole, getByTestId, getByText } = render(<Coin />);
    const headButton = getByRole("button", { name: "Head" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "150" } });
    fireEvent.click(headButton);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("does not update points if bet amount is greater than current points", () => {
    const { getByRole, getByTestId, getByText } = render(<Coin />);
    const headButton = getByRole("button", { name: "Head" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "11000" } });
    fireEvent.click(headButton);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("displays correct player-choice when choosing Head", () => {
    const { getByRole, getByTestId } = render(<Coin />);
    const headButton = getByRole("button", { name: "Head" });
    fireEvent.click(headButton);
    const choice = getByTestId("Choice");
    expect(choice).toHaveTextContent("Head");
  });

  test("displays correct player-choice when choosing Tail", () => {
    const { getByRole, getByTestId } = render(<Coin />);
    const tailButton = getByRole("button", { name: "Tail" });
    fireEvent.click(tailButton);
    const choice = getByTestId("Choice");
    expect(choice).toHaveTextContent("Tail");
  });

  test("displays correct game-result-message when player wins/loses with Head", () => {
    const { getByRole, getByTestId, getByText } = render(<Coin />);
    const headButton = getByRole("button", { name: "Head" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "300" } });
    fireEvent.click(headButton);
    const coinResult = getByTestId("Coin-Result");
    if (coinResult.textContent === "Head") {
      expect(getByText("You earned 291 points!")).toBeInTheDocument();
    } else {
      expect(getByText("You lost 300 points...")).toBeInTheDocument();
    }
  });

  test("displays correct game-result-message when player wins/loses with Tail", () => {
    const { getByRole, getByTestId, getByText } = render(<Coin />);
    const tailButton = getByRole("button", { name: "Tail" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "500" } });
    fireEvent.click(tailButton);
    const coinResult = getByTestId("Coin-Result");
    if (coinResult.textContent === "Tail") {
      expect(getByText("You earned 485 points!")).toBeInTheDocument();
    } else {
      expect(getByText("You lost 500 points...")).toBeInTheDocument();
    }
  });

  test("displays the number of total played games correctly", () => {
    const { getByRole, getByTestId } = render(<Coin />);
    const headButton = getByRole("button", { name: "Head" });
    const tailButton = getByRole("button", { name: "Tail" });
    for (let i = 0; i < 10; i++) {
      fireEvent.click(headButton);
      fireEvent.click(tailButton);
    }
    const playCount = getByTestId("Play-Count");
    let playCountNumber;
    if (playCount.textContent) {
      playCountNumber = parseInt(playCount.textContent.split(" ")[1]);
    }
    expect(playCountNumber).toEqual(20);
  });

  test("displays the number of total won/lost games correctly", () => {
    const { getByRole, getByTestId } = render(<Coin />);
    const headButton = getByRole("button", { name: "Head" });
    fireEvent.click(headButton);
    const winCount = getByTestId("Win-Count");
    let winCountNumber;
    if (winCount.textContent) {
      winCountNumber = parseInt(winCount.textContent.split(" ")[1]);
    }
    const lossCount = getByTestId("Loss-Count");
    let lossCountNumber;
    if (lossCount.textContent) {
      lossCountNumber = parseInt(lossCount.textContent.split(" ")[1]);
    }
    const coinResult = getByTestId("Coin-Result");
    if (coinResult.textContent === "Head") {
      expect(winCountNumber).toEqual(1);
      expect(lossCountNumber).toEqual(0);
    } else {
      expect(winCountNumber).toEqual(0);
      expect(lossCountNumber).toEqual(1);
    }
  });
});
