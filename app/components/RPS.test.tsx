import { fireEvent, render } from "@testing-library/react";
import RPS from "./RPS";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}));

describe("Rock-Paper-Scissors Component", () => {
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
    render(<RPS {...mockProps} />);
  });

  test("displays the initial points correctly", () => {
    const { getByText } = render(<RPS {...mockProps} />);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("updates points correctly when choosing Rock", () => {
    const { getByRole, getByTestId } = render(<RPS {...mockProps} />);
    const points = getByTestId("Points");
    const rockButton = getByRole("button", { name: "Rock" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "100" } });
    fireEvent.click(rockButton);
    let updatedPoints;
    if (points.textContent) {
      updatedPoints = parseInt(points.textContent.split(" ")[1]);
    }
    expect([9900, 10195]).toContainEqual(updatedPoints);
  });

  test("updates points correctly when choosing Paper", () => {
    const { getByRole, getByTestId } = render(<RPS {...mockProps} />);
    const points = getByTestId("Points");
    const paperButton = getByRole("button", { name: "Paper" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "200" } });
    fireEvent.click(paperButton);
    let updatedPoints;
    if (points.textContent) {
      updatedPoints = parseInt(points.textContent.split(" ")[1]);
    }
    expect([9800, 10390]).toContainEqual(updatedPoints);
  });

  test("updates points correctly when choosing Scissors", () => {
    const { getByRole, getByTestId } = render(<RPS {...mockProps} />);
    const points = getByTestId("Points");
    const scissorsButton = getByRole("button", { name: "Scissors" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "500" } });
    fireEvent.click(scissorsButton);
    let updatedPoints;
    if (points.textContent) {
      updatedPoints = parseInt(points.textContent.split(" ")[1]);
    }
    expect([9500, 10975]).toContainEqual(updatedPoints);
  });

  test("does not update points if bet amount is 0", () => {
    const { getByRole, getByTestId, getByText } = render(
      <RPS {...mockProps} />
    );
    const rockButton = getByRole("button", { name: "Rock" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "0" } });
    fireEvent.click(rockButton);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("does not update points if bet amount is not a multiple of 100", () => {
    const { getByRole, getByTestId, getByText } = render(
      <RPS {...mockProps} />
    );
    const paperButton = getByRole("button", { name: "Paper" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "90" } });
    fireEvent.click(paperButton);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("does not update points if bet amount is greater than current points", () => {
    const { getByRole, getByTestId, getByText } = render(
      <RPS {...mockProps} />
    );
    const scissorsButton = getByRole("button", { name: "Scissors" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "50000" } });
    fireEvent.click(scissorsButton);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("displays correct player-choice when choosing Rock", () => {
    const { getByRole, getByTestId } = render(<RPS {...mockProps} />);
    const rockButton = getByRole("button", { name: "Rock" });
    fireEvent.click(rockButton);
    const choice = getByTestId("Choice");
    expect(choice).toHaveTextContent("Rock");
  });

  test("displays correct player-choice when choosing Paper", () => {
    const { getByRole, getByTestId } = render(<RPS {...mockProps} />);
    const paperButton = getByRole("button", { name: "Paper" });
    fireEvent.click(paperButton);
    const choice = getByTestId("Choice");
    expect(choice).toHaveTextContent("Paper");
  });

  test("displays correct player-choice when choosing Scissors", () => {
    const { getByRole, getByTestId } = render(<RPS {...mockProps} />);
    const scissorsButton = getByRole("button", { name: "Scissors" });
    fireEvent.click(scissorsButton);
    const choice = getByTestId("Choice");
    expect(choice).toHaveTextContent("Scissors");
  });

  test("displays correct game-result-message when player wins/draws/loses with Rock", () => {
    const { getByRole, getByTestId, getByText } = render(
      <RPS {...mockProps} />
    );
    const rockButton = getByRole("button", { name: "Rock" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "1000" } });
    fireEvent.click(rockButton);
    const enemyResult = getByTestId("Enemy-Result");
    if (enemyResult.textContent === "Scissors") {
      expect(getByText("Win! You earned 1950 points!")).toBeInTheDocument();
    } else if (enemyResult.textContent === "Rock") {
      expect(getByText("Draw! You lost 1000 points...")).toBeInTheDocument();
    } else {
      expect(getByText("Lose! You lost 1000 points...")).toBeInTheDocument();
    }
  });

  test("displays correct game-result-message when player wins/draws/loses with Paper", () => {
    const { getByRole, getByTestId, getByText } = render(
      <RPS {...mockProps} />
    );
    const paperButton = getByRole("button", { name: "Paper" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "1700" } });
    fireEvent.click(paperButton);
    const enemyResult = getByTestId("Enemy-Result");
    if (enemyResult.textContent === "Rock") {
      expect(getByText("Win! You earned 3315 points!")).toBeInTheDocument();
    } else if (enemyResult.textContent === "Paper") {
      expect(getByText("Draw! You lost 1700 points...")).toBeInTheDocument();
    } else {
      expect(getByText("Lose! You lost 1700 points...")).toBeInTheDocument();
    }
  });

  test("displays correct game-result-message when player wins/draws/loses with Scissors", () => {
    const { getByRole, getByTestId, getByText } = render(
      <RPS {...mockProps} />
    );
    const scissorsButton = getByRole("button", { name: "Scissors" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "600" } });
    fireEvent.click(scissorsButton);
    const enemyResult = getByTestId("Enemy-Result");
    if (enemyResult.textContent === "Paper") {
      expect(getByText("Win! You earned 1170 points!")).toBeInTheDocument();
    } else if (enemyResult.textContent === "Scissors") {
      expect(getByText("Draw! You lost 600 points...")).toBeInTheDocument();
    } else {
      expect(getByText("Lose! You lost 600 points...")).toBeInTheDocument();
    }
  });

  test("displays the number of total played games correctly", () => {
    const { getByRole, getByTestId } = render(<RPS {...mockProps} />);
    const rockButton = getByRole("button", { name: "Rock" });
    const paperButton = getByRole("button", { name: "Paper" });
    const scissorsButton = getByRole("button", { name: "Scissors" });
    for (let i = 0; i < 8; i++) {
      fireEvent.click(scissorsButton);
      fireEvent.click(rockButton);
      fireEvent.click(paperButton);
    }
    const playCount = getByTestId("Play-Count");
    let playCountNumber;
    if (playCount.textContent) {
      playCountNumber = parseInt(playCount.textContent.split(" ")[1]);
    }
    expect(playCountNumber).toEqual(24);
  });

  test("displays the number of total won/drawn/lost games correctly", () => {
    const { getByRole, getByTestId } = render(<RPS {...mockProps} />);
    const paperButton = getByRole("button", { name: "Paper" });
    fireEvent.click(paperButton);
    const winCount = getByTestId("Win-Count");
    let winCountNumber;
    if (winCount.textContent) {
      winCountNumber = parseInt(winCount.textContent.split(" ")[1]);
    }
    const drawCount = getByTestId("Draw-Count");
    let drawCountNumber;
    if (drawCount.textContent) {
      drawCountNumber = parseInt(drawCount.textContent.split(" ")[1]);
    }
    const lossCount = getByTestId("Loss-Count");
    let lossCountNumber;
    if (lossCount.textContent) {
      lossCountNumber = parseInt(lossCount.textContent.split(" ")[1]);
    }
    const enemyResult = getByTestId("Enemy-Result");
    if (enemyResult.textContent === "Rock") {
      expect(winCountNumber).toEqual(1);
      expect(drawCountNumber).toEqual(0);
      expect(lossCountNumber).toEqual(0);
    } else if (enemyResult.textContent === "Paper") {
      expect(winCountNumber).toEqual(0);
      expect(drawCountNumber).toEqual(1);
      expect(lossCountNumber).toEqual(0);
    } else {
      expect(winCountNumber).toEqual(0);
      expect(drawCountNumber).toEqual(0);
      expect(lossCountNumber).toEqual(1);
    }
  });

  test("displays the number of total Rock/Paper/Scissors correctly", () => {
    const { getByRole, getByTestId } = render(<RPS {...mockProps} />);
    const scissorsButton = getByRole("button", { name: "Scissors" });
    fireEvent.click(scissorsButton);
    const rockCount = getByTestId("Rock-Count");
    let rockCountNumber;
    if (rockCount.textContent) {
      rockCountNumber = parseInt(rockCount.textContent.split(" ")[1]);
    }
    const paperCount = getByTestId("Paper-Count");
    let paperCountNumber;
    if (paperCount.textContent) {
      paperCountNumber = parseInt(paperCount.textContent.split(" ")[1]);
    }
    const scissorsCount = getByTestId("Scissors-Count");
    let scissorsCountNumber;
    if (scissorsCount.textContent) {
      scissorsCountNumber = parseInt(scissorsCount.textContent.split(" ")[1]);
    }
    const enemyResult = getByTestId("Enemy-Result");
    if (enemyResult.textContent === "Rock") {
      expect(rockCountNumber).toEqual(1);
      expect(paperCountNumber).toEqual(0);
      expect(scissorsCountNumber).toEqual(0);
    } else {
      expect(rockCountNumber).toEqual(0);
    }
  });

  test("displays past-enemy-results correctly", () => {
    const { getByRole, getByTestId } = render(<RPS {...mockProps} />);
    const rockButton = getByRole("button", { name: "Rock" });
    const paperButton = getByRole("button", { name: "Paper" });
    const scissorsButton = getByRole("button", { name: "Scissors" });
    fireEvent.click(rockButton);
    fireEvent.click(paperButton);
    fireEvent.click(scissorsButton);
    const pastEnemyResultsContainer = getByTestId("Past-Enemy-Results");
    const pastEnemyResults =
      pastEnemyResultsContainer.textContent?.split(": ")[1];
    const possibleResults = [];
    const rps = ["R", "P", "S"];
    for (let i = 0; i < rps.length; i++) {
      for (let j = 0; j < rps.length; j++) {
        for (let k = 0; k < rps.length; k++) {
          possibleResults.push(rps[i] + " " + rps[j] + " " + rps[k] + " ");
        }
      }
    }
    expect(possibleResults).toContain(pastEnemyResults);
  });
});
