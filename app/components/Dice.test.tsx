import { fireEvent, render } from "@testing-library/react";
import Dice from "./Dice";

describe("Dice Component", () => {
  test("renders without crashing", () => {
    render(<Dice />);
  });

  test("displays the initial points correctly", () => {
    const { getByText } = render(<Dice />);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("updates points correctly when choosing number 1", () => {
    const { getByRole, getByTestId } = render(<Dice />);
    const points = getByTestId("Points");
    const button1 = getByRole("button", { name: "1" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "100" } });
    fireEvent.click(button1);
    let updatedPoints;
    if (points.textContent) {
      updatedPoints = parseInt(points.textContent.split(" ")[1]);
    }
    expect([9900, 10490]).toContainEqual(updatedPoints);
  });

  test("updates points correctly when choosing number 2", () => {
    const { getByRole, getByTestId } = render(<Dice />);
    const points = getByTestId("Points");
    const button2 = getByRole("button", { name: "2" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "500" } });
    fireEvent.click(button2);
    let updatedPoints;
    if (points.textContent) {
      updatedPoints = parseInt(points.textContent.split(" ")[1]);
    }
    expect([9500, 12450]).toContainEqual(updatedPoints);
  });

  test("updates points correctly when choosing number 3", () => {
    const { getByRole, getByTestId } = render(<Dice />);
    const points = getByTestId("Points");
    const button3 = getByRole("button", { name: "3" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "1000" } });
    fireEvent.click(button3);
    let updatedPoints;
    if (points.textContent) {
      updatedPoints = parseInt(points.textContent.split(" ")[1]);
    }
    expect([9000, 14900]).toContainEqual(updatedPoints);
  });

  test("updates points correctly when choosing number 4", () => {
    const { getByRole, getByTestId } = render(<Dice />);
    const points = getByTestId("Points");
    const button4 = getByRole("button", { name: "4" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "1300" } });
    fireEvent.click(button4);
    let updatedPoints;
    if (points.textContent) {
      updatedPoints = parseInt(points.textContent.split(" ")[1]);
    }
    expect([8700, 16370]).toContainEqual(updatedPoints);
  });

  test("updates points correctly when choosing number 5", () => {
    const { getByRole, getByTestId } = render(<Dice />);
    const points = getByTestId("Points");
    const button5 = getByRole("button", { name: "5" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "2000" } });
    fireEvent.click(button5);
    let updatedPoints;
    if (points.textContent) {
      updatedPoints = parseInt(points.textContent.split(" ")[1]);
    }
    expect([8000, 19800]).toContainEqual(updatedPoints);
  });

  test("updates points correctly when choosing number 6", () => {
    const { getByRole, getByTestId } = render(<Dice />);
    const points = getByTestId("Points");
    const button6 = getByRole("button", { name: "6" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "5000" } });
    fireEvent.click(button6);
    let updatedPoints;
    if (points.textContent) {
      updatedPoints = parseInt(points.textContent.split(" ")[1]);
    }
    expect([5000, 34500]).toContainEqual(updatedPoints);
  });

  test("does not update points if bet amount is 0", () => {
    const { getByRole, getByTestId, getByText } = render(<Dice />);
    const button1 = getByRole("button", { name: "1" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "0" } });
    fireEvent.click(button1);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("does not update points if bet amount is not a multiple of 100", () => {
    const { getByRole, getByTestId, getByText } = render(<Dice />);
    const button4 = getByRole("button", { name: "4" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "299" } });
    fireEvent.click(button4);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("does not update points if bet amount is greater than current points", () => {
    const { getByRole, getByTestId, getByText } = render(<Dice />);
    const button6 = getByRole("button", { name: "6" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "10100" } });
    fireEvent.click(button6);
    expect(getByText("Points: 10000")).toBeInTheDocument();
  });

  test("displays correct player-choice when choosing number 1", () => {
    const { getByRole, getByTestId } = render(<Dice />);
    const button1 = getByRole("button", { name: "1" });
    fireEvent.click(button1);
    const choice = getByTestId("Choice");
    expect(choice).toHaveTextContent("1");
  });

  test("displays correct player-choice when choosing number 2", () => {
    const { getByRole, getByTestId } = render(<Dice />);
    const button2 = getByRole("button", { name: "2" });
    fireEvent.click(button2);
    const choice = getByTestId("Choice");
    expect(choice).toHaveTextContent("2");
  });

  test("displays correct player-choice when choosing number 3", () => {
    const { getByRole, getByTestId } = render(<Dice />);
    const button3 = getByRole("button", { name: "3" });
    fireEvent.click(button3);
    const choice = getByTestId("Choice");
    expect(choice).toHaveTextContent("3");
  });

  test("displays correct player-choice when choosing number 4", () => {
    const { getByRole, getByTestId } = render(<Dice />);
    const button4 = getByRole("button", { name: "4" });
    fireEvent.click(button4);
    const choice = getByTestId("Choice");
    expect(choice).toHaveTextContent("4");
  });

  test("displays correct player-choice when choosing number 5", () => {
    const { getByRole, getByTestId } = render(<Dice />);
    const button5 = getByRole("button", { name: "5" });
    fireEvent.click(button5);
    const choice = getByTestId("Choice");
    expect(choice).toHaveTextContent("5");
  });

  test("displays correct player-choice when choosing number 6", () => {
    const { getByRole, getByTestId } = render(<Dice />);
    const button6 = getByRole("button", { name: "6" });
    fireEvent.click(button6);
    const choice = getByTestId("Choice");
    expect(choice).toHaveTextContent("6");
  });

  test("displays correct game-result-message when player wins/loses with number 1", () => {
    const { getByRole, getByTestId, getByText } = render(<Dice />);
    const button1 = getByRole("button", { name: "1" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "1500" } });
    fireEvent.click(button1);
    const diceResult = getByTestId("Dice-Result");
    if (diceResult.textContent === "1") {
      expect(getByText("You earned 7350 points!")).toBeInTheDocument();
    } else {
      expect(getByText("You lost 1500 points...")).toBeInTheDocument();
    }
  });

  test("displays correct game-result-message when player wins/loses with number 2", () => {
    const { getByRole, getByTestId, getByText } = render(<Dice />);
    const button2 = getByRole("button", { name: "2" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "200" } });
    fireEvent.click(button2);
    const diceResult = getByTestId("Dice-Result");
    if (diceResult.textContent === "2") {
      expect(getByText("You earned 980 points!")).toBeInTheDocument();
    } else {
      expect(getByText("You lost 200 points...")).toBeInTheDocument();
    }
  });

  test("displays correct game-result-message when player wins/loses with number 3", () => {
    const { getByRole, getByTestId, getByText } = render(<Dice />);
    const button3 = getByRole("button", { name: "3" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "800" } });
    fireEvent.click(button3);
    const diceResult = getByTestId("Dice-Result");
    if (diceResult.textContent === "3") {
      expect(getByText("You earned 3920 points!")).toBeInTheDocument();
    } else {
      expect(getByText("You lost 800 points...")).toBeInTheDocument();
    }
  });

  test("displays correct game-result-message when player wins/loses with number 4", () => {
    const { getByRole, getByTestId, getByText } = render(<Dice />);
    const button4 = getByRole("button", { name: "4" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "1100" } });
    fireEvent.click(button4);
    const diceResult = getByTestId("Dice-Result");
    if (diceResult.textContent === "4") {
      expect(getByText("You earned 5390 points!")).toBeInTheDocument();
    } else {
      expect(getByText("You lost 1100 points...")).toBeInTheDocument();
    }
  });

  test("displays correct game-result-message when player wins/loses with number 5", () => {
    const { getByRole, getByTestId, getByText } = render(<Dice />);
    const button5 = getByRole("button", { name: "5" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "1900" } });
    fireEvent.click(button5);
    const diceResult = getByTestId("Dice-Result");
    if (diceResult.textContent === "5") {
      expect(getByText("You earned 9310 points!")).toBeInTheDocument();
    } else {
      expect(getByText("You lost 1900 points...")).toBeInTheDocument();
    }
  });

  test("displays correct game-result-message when player wins/loses with number 6", () => {
    const { getByRole, getByTestId, getByText } = render(<Dice />);
    const button6 = getByRole("button", { name: "6" });
    fireEvent.change(getByTestId("Bet-Amount"), { target: { value: "4000" } });
    fireEvent.click(button6);
    const diceResult = getByTestId("Dice-Result");
    if (diceResult.textContent === "6") {
      expect(getByText("You earned 19600 points!")).toBeInTheDocument();
    } else {
      expect(getByText("You lost 4000 points...")).toBeInTheDocument();
    }
  });

  test("displays the number of total played games correctly", () => {
    const { getByRole, getByTestId } = render(<Dice />);
    const button1 = getByRole("button", { name: "1" });
    const button2 = getByRole("button", { name: "2" });
    const button3 = getByRole("button", { name: "3" });
    const button4 = getByRole("button", { name: "4" });
    const button5 = getByRole("button", { name: "5" });
    const button6 = getByRole("button", { name: "6" });
    for (let i = 0; i < 5; i++) {
      fireEvent.click(button1);
      fireEvent.click(button3);
      fireEvent.click(button5);
      fireEvent.click(button6);
      fireEvent.click(button4);
      fireEvent.click(button2);
    }
    const playCount = getByTestId("Play-Count");
    let playCountNumber;
    if (playCount.textContent) {
      playCountNumber = parseInt(playCount.textContent.split(" ")[1]);
    }
    expect(playCountNumber).toEqual(30);
  });

  test("displays the number of total won/lost games correctly", () => {
    const { getByRole, getByTestId } = render(<Dice />);
    const button2 = getByRole("button", { name: "2" });
    fireEvent.click(button2);
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
    const diceResult = getByTestId("Dice-Result");
    if (diceResult.textContent === "2") {
      expect(winCountNumber).toEqual(1);
      expect(lossCountNumber).toEqual(0);
    } else {
      expect(winCountNumber).toEqual(0);
      expect(lossCountNumber).toEqual(1);
    }
  });

  test("displays the number of total 1/2/3/4/5/6 correctly", () => {
    const { getByRole, getByTestId } = render(<Dice />);
    const button5 = getByRole("button", { name: "5" });
    fireEvent.click(button5);
    const count1 = getByTestId("1-Count");
    let count1Number;
    if (count1.textContent) {
      count1Number = parseInt(count1.textContent.split(" ")[1]);
    }
    const count2 = getByTestId("2-Count");
    let count2Number;
    if (count2.textContent) {
      count2Number = parseInt(count2.textContent.split(" ")[1]);
    }
    const count3 = getByTestId("3-Count");
    let count3Number;
    if (count3.textContent) {
      count3Number = parseInt(count3.textContent.split(" ")[1]);
    }
    const count4 = getByTestId("4-Count");
    let count4Number;
    if (count4.textContent) {
      count4Number = parseInt(count4.textContent.split(" ")[1]);
    }
    const count5 = getByTestId("5-Count");
    let count5Number;
    if (count5.textContent) {
      count5Number = parseInt(count5.textContent.split(" ")[1]);
    }
    const count6 = getByTestId("6-Count");
    let count6Number;
    if (count6.textContent) {
      count6Number = parseInt(count6.textContent.split(" ")[1]);
    }
    const diceResult = getByTestId("Dice-Result");
    if (diceResult.textContent === "3") {
      expect(count1Number).toEqual(0);
      expect(count2Number).toEqual(0);
      expect(count3Number).toEqual(1);
      expect(count4Number).toEqual(0);
      expect(count5Number).toEqual(0);
      expect(count6Number).toEqual(0);
    } else {
      expect(count3Number).toEqual(0);
    }
  });

  test("displays past-dice-results correctly", () => {
    const { getByRole, getByTestId } = render(<Dice />);
    const button6 = getByRole("button", { name: "6" });
    const button1 = getByRole("button", { name: "1" });
    const button3 = getByRole("button", { name: "3" });
    fireEvent.click(button6);
    fireEvent.click(button1);
    fireEvent.click(button3);
    const pastDiceResultsContainer = getByTestId("Past-Dice-Results");
    const pastDiceResults =
      pastDiceResultsContainer.textContent?.split(": ")[1];
    const possibleResults = [];
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 6; j++) {
        for (let k = 1; k <= 6; k++) {
          possibleResults.push(`${i} ${j} ${k} `);
        }
      }
    }
    expect(possibleResults).toContain(pastDiceResults);
  });
});
