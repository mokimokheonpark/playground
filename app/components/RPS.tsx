"use client";

import { useState } from "react";

export default function RPS() {
  type RockPaperScissors = "Rock" | "Paper" | "Scissors";
  type RPS = "R" | "P" | "S";
  type RPSArray = RPS[];

  const [points, setPoints] = useState<number>(10000);
  const [betAmountInput, setBetAmountInput] = useState<number>(100);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [choice, setChoice] = useState<RockPaperScissors>("Rock");
  const [enemyResult, setEnemyResult] = useState<RockPaperScissors>("Rock");
  const [playCount, setPlayCount] = useState<number>(0);
  const [winCount, setWinCount] = useState<number>(0);
  const [drawCount, setDrawCount] = useState<number>(0);
  const [pastEnemyResults, setPastEnemyResults] = useState<RPSArray>([]);

  const handleChooseRock = (): void => {
    setBetAmount(betAmountInput);
    setChoice("Rock");
    setPlayCount((prev) => prev + 1);
    const result: number = Math.floor(Math.random() * 3) + 1;
    if (result === 3) {
      setPoints((prev) => prev + betAmountInput * 1.95);
      setWinCount((prev) => prev + 1);
      setEnemyResult("Scissors");
      setPastEnemyResults((prev) => [...prev, "S"]);
    } else {
      setPoints((prev) => prev - betAmountInput);
      if (result === 1) {
        setDrawCount((prev) => prev + 1);
        setEnemyResult("Rock");
        setPastEnemyResults((prev) => [...prev, "R"]);
      } else {
        setEnemyResult("Paper");
        setPastEnemyResults((prev) => [...prev, "P"]);
      }
    }
  };

  const handleChoosePaper = (): void => {
    setBetAmount(betAmountInput);
    setChoice("Paper");
    setPlayCount((prev) => prev + 1);
    const result: number = Math.floor(Math.random() * 3) + 1;
    if (result === 1) {
      setPoints((prev) => prev + betAmountInput * 1.95);
      setWinCount((prev) => prev + 1);
      setEnemyResult("Rock");
      setPastEnemyResults((prev) => [...prev, "R"]);
    } else {
      setPoints((prev) => prev - betAmountInput);
      if (result === 2) {
        setDrawCount((prev) => prev + 1);
        setEnemyResult("Paper");
        setPastEnemyResults((prev) => [...prev, "P"]);
      } else {
        setEnemyResult("Scissors");
        setPastEnemyResults((prev) => [...prev, "S"]);
      }
    }
  };

  const handleChooseScissors = (): void => {
    setBetAmount(betAmountInput);
    setChoice("Scissors");
    setPlayCount((prev) => prev + 1);
    const result: number = Math.floor(Math.random() * 3) + 1;
    if (result === 2) {
      setPoints((prev) => prev + betAmountInput * 1.95);
      setWinCount((prev) => prev + 1);
      setEnemyResult("Paper");
      setPastEnemyResults((prev) => [...prev, "P"]);
    } else {
      setPoints((prev) => prev - betAmountInput);
      if (result === 1) {
        setEnemyResult("Rock");
        setPastEnemyResults((prev) => [...prev, "R"]);
      } else {
        setDrawCount((prev) => prev + 1);
        setEnemyResult("Scissors");
        setPastEnemyResults((prev) => [...prev, "S"]);
      }
    }
  };

  return (
    <div data-testid={"RPS-Component"}>
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

      <div className="rps-button-container">
        <button
          onClick={handleChooseRock}
          disabled={
            betAmountInput === 0 ||
            betAmountInput % 100 !== 0 ||
            betAmountInput > points
          }
        >
          Rock
        </button>
        <button
          onClick={handleChoosePaper}
          disabled={
            betAmountInput === 0 ||
            betAmountInput % 100 !== 0 ||
            betAmountInput > points
          }
        >
          Paper
        </button>
        <button
          onClick={handleChooseScissors}
          disabled={
            betAmountInput === 0 ||
            betAmountInput % 100 !== 0 ||
            betAmountInput > points
          }
        >
          Scissors
        </button>
      </div>

      {betAmount > 0 && (
        <div>
          <hr />

          <p className="mb--10">
            Your Choice:{" "}
            {choice === "Rock" ? (
              <span data-testid={"Choice"} className="red">
                {choice}
              </span>
            ) : choice === "Paper" ? (
              <span data-testid={"Choice"} className="blue">
                {choice}
              </span>
            ) : (
              <span data-testid={"Choice"} className="green">
                {choice}
              </span>
            )}
          </p>

          <p className="mb--10">
            Enemy Result:{" "}
            {enemyResult === "Rock" ? (
              <span data-testid={"Enemy-Result"} className="red">
                {enemyResult}
              </span>
            ) : enemyResult === "Paper" ? (
              <span data-testid={"Enemy-Result"} className="blue">
                {enemyResult}
              </span>
            ) : (
              <span data-testid={"Enemy-Result"} className="green">
                {enemyResult}
              </span>
            )}
          </p>

          {(choice === "Rock" && enemyResult === "Scissors") ||
          (choice === "Paper" && enemyResult === "Rock") ||
          (choice === "Scissors" && enemyResult === "Paper") ? (
            <p>Win! You earned {betAmount * 1.95} points!</p>
          ) : choice === enemyResult ? (
            <p>Draw! You lost {betAmount} points...</p>
          ) : (
            <p>Lose! You lost {betAmount} points...</p>
          )}

          <hr />

          <p data-testid={"Play-Count"} className="mb--10">
            Plays: {playCount}
          </p>

          <p data-testid={"Win-Count"} className="mb--10">
            Wins: {winCount} ({((winCount / playCount) * 100).toFixed(2)}%)
          </p>

          <p data-testid={"Draw-Count"} className="mb--10">
            Draws: {drawCount} ({((drawCount / playCount) * 100).toFixed(2)}%)
          </p>

          <p data-testid={"Loss-Count"}>
            Losses: {playCount - winCount - drawCount} (
            {(((playCount - winCount - drawCount) / playCount) * 100).toFixed(
              2
            )}
            %)
          </p>

          <hr />

          <p data-testid={"Past-Enemy-Results"}>
            Past Enemy Results:{" "}
            {pastEnemyResults.map((result, index) =>
              result === "R" ? (
                <span className="red" key={index}>
                  {result}{" "}
                </span>
              ) : result === "P" ? (
                <span className="blue" key={index}>
                  {result}{" "}
                </span>
              ) : (
                <span className="green" key={index}>
                  {result}{" "}
                </span>
              )
            )}
          </p>

          <p data-testid={"Rock-Count"} className="mb--10">
            Rock: {pastEnemyResults.filter((result) => result === "R").length} (
            {(
              (pastEnemyResults.filter((result) => result === "R").length /
                pastEnemyResults.length) *
              100
            ).toFixed(2)}
            %)
          </p>

          <p data-testid={"Paper-Count"} className="mb--10">
            Paper: {pastEnemyResults.filter((result) => result === "P").length}{" "}
            (
            {(
              (pastEnemyResults.filter((result) => result === "P").length /
                pastEnemyResults.length) *
              100
            ).toFixed(2)}
            %)
          </p>

          <p data-testid={"Scissors-Count"}>
            Scissors:{" "}
            {pastEnemyResults.filter((result) => result === "S").length} (
            {(
              (pastEnemyResults.filter((result) => result === "S").length /
                pastEnemyResults.length) *
              100
            ).toFixed(2)}
            %)
          </p>
        </div>
      )}
    </div>
  );
}
