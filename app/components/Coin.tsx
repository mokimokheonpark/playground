"use client";

import { useState } from "react";

export default function Coin() {
  const [points, setPoints] = useState<number>(10000);

  const handleChooseHead = (): void => {
    const result: number = Math.floor(Math.random() * 2) + 1;
    if (result === 1) {
      setPoints((prev) => prev + 97);
    } else {
      setPoints((prev) => prev - 100);
    }
  };

  const handleChooseTail = (): void => {
    const result: number = Math.floor(Math.random() * 2) + 1;
    if (result === 2) {
      setPoints((prev) => prev + 97);
    } else {
      setPoints((prev) => prev - 100);
    }
  };

  return (
    <div data-testid={"Coin-Component"}>
      <h4 data-testid={"Points"}>Points: {points}</h4>
      <button onClick={handleChooseHead}>Head</button>
      <button onClick={handleChooseTail}>Tail</button>
    </div>
  );
}
