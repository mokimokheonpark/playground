"use client";

import { useState } from "react";

export default function Coin() {
  type HeadTail = "Head" | "Tail";

  const [points, setPoints] = useState<number>(10000);
  const [betAmountInput, setBetAmountInput] = useState<number>(100);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [choice, setChoice] = useState<HeadTail>("Head");
  const [coinResult, setCoinResult] = useState<HeadTail>("Head");
  const [playCount, setPlayCount] = useState<number>(0);
  const [winCount, setWinCount] = useState<number>(0);

  const handleChooseHead = (): void => {
    const result: number = Math.floor(Math.random() * 2) + 1;
    setBetAmount(betAmountInput);
    setChoice("Head");
    setPlayCount((prev) => prev + 1);
    if (result === 1) {
      setCoinResult("Head");
      setPoints((prev) => prev + betAmountInput * 0.97);
      setWinCount((prev) => prev + 1);
    } else {
      setCoinResult("Tail");
      setPoints((prev) => prev - betAmountInput);
    }
  };

  const handleChooseTail = (): void => {
    const result: number = Math.floor(Math.random() * 2) + 1;
    setBetAmount(betAmountInput);
    setChoice("Tail");
    setPlayCount((prev) => prev + 1);
    if (result === 2) {
      setCoinResult("Tail");
      setPoints((prev) => prev + betAmountInput * 0.97);
      setWinCount((prev) => prev + 1);
    } else {
      setCoinResult("Head");
      setPoints((prev) => prev - betAmountInput);
    }
  };

  return (
    <div data-testid={"Coin-Component"}>
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

      <div className="coin-button-container">
        <button
          onClick={handleChooseHead}
          disabled={
            betAmountInput === 0 ||
            betAmountInput % 100 !== 0 ||
            betAmountInput > points
          }
        >
          Head
        </button>

        <button
          onClick={handleChooseTail}
          disabled={
            betAmountInput === 0 ||
            betAmountInput % 100 !== 0 ||
            betAmountInput > points
          }
        >
          Tail
        </button>
      </div>

      {betAmount > 0 && (
        <div>
          <hr />

          <p className="mb--10">
            Your Choice:{" "}
            <span
              data-testid={"Choice"}
              className={choice === "Head" ? "red" : "blue"}
            >
              {choice}
            </span>
          </p>

          <p className="mb--10">
            Coin Result:{" "}
            <span
              data-testid={"Coin-Result"}
              className={coinResult === "Head" ? "red" : "blue"}
            >
              {coinResult}
            </span>
          </p>

          {choice === coinResult ? (
            <p>You earned {betAmount * 0.97} points!</p>
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
        </div>
      )}
    </div>
  );
}
