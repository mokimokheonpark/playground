"use client";

import { useState } from "react";

export default function Dice() {
  const [points, setPoints] = useState<number>(10000);
  const [betAmountInput, setBetAmountInput] = useState<number>(100);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [choice, setChoice] = useState<number>(0);
  const [diceResult, setDiceResult] = useState<number>(1);
  const [playCount, setPlayCount] = useState<number>(0);
  const [winCount, setWinCount] = useState<number>(0);
  const [pastDiceResults, setPastDiceResults] = useState<number[]>([]);

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
            {choice === 1 ? (
              <span data-testid={"Choice"} className="red">
                {choice}
              </span>
            ) : choice === 2 ? (
              <span data-testid={"Choice"} className="orange">
                {choice}
              </span>
            ) : choice === 3 ? (
              <span data-testid={"Choice"} className="yello">
                {choice}
              </span>
            ) : choice === 4 ? (
              <span data-testid={"Choice"} className="green">
                {choice}
              </span>
            ) : choice === 5 ? (
              <span data-testid={"Choice"} className="blue">
                {choice}
              </span>
            ) : (
              <span data-testid={"Choice"} className="purple">
                {choice}
              </span>
            )}
          </p>

          <p className="mb--10">
            Dice Result:{" "}
            {diceResult === 1 ? (
              <span data-testid={"Dice-Result"} className="red">
                {diceResult}
              </span>
            ) : diceResult === 2 ? (
              <span data-testid={"Dice-Result"} className="orange">
                {diceResult}
              </span>
            ) : diceResult === 3 ? (
              <span data-testid={"Dice-Result"} className="yello">
                {diceResult}
              </span>
            ) : diceResult === 4 ? (
              <span data-testid={"Dice-Result"} className="green">
                {diceResult}
              </span>
            ) : diceResult === 5 ? (
              <span data-testid={"Dice-Result"} className="blue">
                {diceResult}
              </span>
            ) : (
              <span data-testid={"Dice-Result"} className="purple">
                {diceResult}
              </span>
            )}
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
            {pastDiceResults.map((result, index) =>
              result === 1 ? (
                <span className="red" key={index}>
                  {result}{" "}
                </span>
              ) : result === 2 ? (
                <span className="orange" key={index}>
                  {result}{" "}
                </span>
              ) : result === 3 ? (
                <span className="yellow" key={index}>
                  {result}{" "}
                </span>
              ) : result === 4 ? (
                <span className="green" key={index}>
                  {result}{" "}
                </span>
              ) : result === 5 ? (
                <span className="blue" key={index}>
                  {result}{" "}
                </span>
              ) : (
                <span className="purple" key={index}>
                  {result}{" "}
                </span>
              )
            )}
          </p>

          <p data-testid={"1-Count"} className="mb--10">
            1: {pastDiceResults.filter((result) => result === 1).length} (
            {(
              (pastDiceResults.filter((result) => result === 1).length /
                pastDiceResults.length) *
              100
            ).toFixed(2)}
            %)
          </p>

          <p data-testid={"2-Count"} className="mb--10">
            2: {pastDiceResults.filter((result) => result === 2).length} (
            {(
              (pastDiceResults.filter((result) => result === 2).length /
                pastDiceResults.length) *
              100
            ).toFixed(2)}
            %)
          </p>

          <p data-testid={"3-Count"} className="mb--10">
            3: {pastDiceResults.filter((result) => result === 3).length} (
            {(
              (pastDiceResults.filter((result) => result === 3).length /
                pastDiceResults.length) *
              100
            ).toFixed(2)}
            %)
          </p>

          <p data-testid={"4-Count"} className="mb--10">
            4: {pastDiceResults.filter((result) => result === 4).length} (
            {(
              (pastDiceResults.filter((result) => result === 4).length /
                pastDiceResults.length) *
              100
            ).toFixed(2)}
            %)
          </p>

          <p data-testid={"5-Count"} className="mb--10">
            5: {pastDiceResults.filter((result) => result === 5).length} (
            {(
              (pastDiceResults.filter((result) => result === 5).length /
                pastDiceResults.length) *
              100
            ).toFixed(2)}
            %)
          </p>

          <p data-testid={"6-Count"}>
            6: {pastDiceResults.filter((result) => result === 6).length} (
            {(
              (pastDiceResults.filter((result) => result === 6).length /
                pastDiceResults.length) *
              100
            ).toFixed(2)}
            %)
          </p>
        </div>
      )}
    </div>
  );
}
