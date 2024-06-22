"use client";

import { useState } from "react";

export default function Dice({
  userEmail,
  userPoints,
}: {
  userEmail: string;
  userPoints: number;
}) {
  const [points, setPoints] = useState<number>(10000);
  const [betAmountInput, setBetAmountInput] = useState<number>(100);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [choice, setChoice] = useState<number>(0);
  const [diceResult, setDiceResult] = useState<number>(1);
  const [playCount, setPlayCount] = useState<number>(0);
  const [winCount, setWinCount] = useState<number>(0);
  const [pastDiceResults, setPastDiceResults] = useState<number[]>([]);

  const colorClasses: { [key: number]: string } = {
    1: "red",
    2: "orange",
    3: "yellow",
    4: "green",
    5: "blue",
  };

  const handleChooseNumber = (chosenNumber: number): void => {
    setBetAmount(betAmountInput);
    setChoice(chosenNumber);
    setPlayCount((prev) => prev + 1);
    const result: number = Math.floor(Math.random() * 6) + 1;
    if (result === chosenNumber) {
      setPoints((prev) => prev + betAmountInput * 4.9);
      setWinCount((prev) => prev + 1);
    } else {
      setPoints((prev) => prev - betAmountInput);
    }
    setDiceResult(result);
    setPastDiceResults((prev) => [...prev, result]);
  };

  return (
    <div data-testid={"Dice-Component"}>
      <h4 data-testid={"Points"}>Points: {points}</h4>

      <input
        data-testid={"Bet-Amount"}
        type="number"
        min={100}
        step={100}
        required
        value={betAmountInput}
        onChange={(e) => {
          const value: number = parseInt(e.target.value);
          setBetAmountInput(value);
        }}
      />

      <div className="dice-button-container">
        {[1, 2, 3, 4, 5, 6].map((number) => (
          <button
            key={number}
            onClick={() => handleChooseNumber(number)}
            disabled={
              betAmountInput === 0 ||
              betAmountInput % 100 !== 0 ||
              betAmountInput > points
            }
          >
            {number}
          </button>
        ))}
      </div>

      {betAmount > 0 && (
        <div>
          <hr />

          <p className="mb--10">
            Your Choice:{" "}
            <span
              data-testid={"Choice"}
              className={colorClasses[choice] || "purple"}
            >
              {choice}
            </span>
          </p>

          <p className="mb--10">
            Dice Result:{" "}
            <span
              data-testid={"Dice-Result"}
              className={colorClasses[diceResult] || "purple"}
            >
              {diceResult}
            </span>
          </p>

          {choice === diceResult ? (
            <p>You earned {(betAmount * 4.9).toFixed(0)} points!</p>
          ) : (
            <p>You lost {betAmount} points...</p>
          )}

          <hr />

          <p data-testid={"Play-Count"} className="mb--10">
            Plays: {playCount}
          </p>

          <p data-testid={"Win-Count"} className="mb--10">
            Wins: {winCount} ({((winCount / playCount) * 100).toFixed(2)}%)
          </p>

          <p data-testid={"Loss-Count"}>
            Losses: {playCount - winCount} (
            {(((playCount - winCount) / playCount) * 100).toFixed(2)}%)
          </p>

          <hr />

          <p data-testid={"Past-Dice-Results"}>
            Past Results:{" "}
            {pastDiceResults.map((result, index) => (
              <span className={colorClasses[result] || "purple"} key={index}>
                {result}{" "}
              </span>
            ))}
          </p>

          {[1, 2, 3, 4, 5, 6].map((number) => (
            <p data-testid={`${number}-Count`} className="mb--10" key={number}>
              {number}:{" "}
              {pastDiceResults.filter((result) => result === number).length} (
              {(
                (pastDiceResults.filter((result) => result === number).length /
                  pastDiceResults.length) *
                100
              ).toFixed(2)}
              %)
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
