"use client";

import { useState } from "react";

export default function Coin() {
  const [points, setPoints] = useState<number>(10000);
  const [betAmountInput, setBetAmountInput] = useState<number>(100);

  const handleChooseHead = (): void => {
    const result: number = Math.floor(Math.random() * 2) + 1;
    if (result === 1) {
      setPoints((prev) => prev + betAmountInput * 0.97);
    } else {
      setPoints((prev) => prev - betAmountInput);
    }
  };

  const handleChooseTail = (): void => {
    const result: number = Math.floor(Math.random() * 2) + 1;
    if (result === 2) {
      setPoints((prev) => prev + betAmountInput * 0.97);
    } else {
      setPoints((prev) => prev - betAmountInput);
    }
  };

  return (
    <div data-testid={"Coin-Component"}>
      <h4 data-testid={"Points"}>Points: {points}</h4>
      <input
        data-testid={"Bet-Amount"}
        className="mb-20"
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
  );
}
