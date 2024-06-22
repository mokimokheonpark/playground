"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Coin({
  userEmail,
  userPoints,
}: {
  userEmail: string;
  userPoints: number;
}) {
  type HeadTail = "Head" | "Tail";
  type HT = "H" | "T";
  type HTArray = HT[];

  const [points, setPoints] = useState<number>(userPoints);
  const [betAmountInput, setBetAmountInput] = useState<number>(100);
  const [betAmount, setBetAmount] = useState<number>(0);
  const [choice, setChoice] = useState<HeadTail>("Head");
  const [coinResult, setCoinResult] = useState<HeadTail>("Head");
  const [playCount, setPlayCount] = useState<number>(0);
  const [winCount, setWinCount] = useState<number>(0);
  const [pastCoinResults, setPastCoinResults] = useState<HTArray>([]);

  const router = useRouter();

  const getLongestConsecutive = (results: HTArray, target: HT): number => {
    let longestConsecutive = 0;
    let currentConsecutive = 0;
    results.forEach((result) => {
      if (result === target) {
        currentConsecutive += 1;
      } else {
        longestConsecutive = Math.max(longestConsecutive, currentConsecutive);
        currentConsecutive = 0;
      }
    });
    longestConsecutive = Math.max(longestConsecutive, currentConsecutive);
    return longestConsecutive;
  };

  const handleChooseHead = async () => {
    const result: number = Math.floor(Math.random() * 2) + 1;
    let updatedUserPoints: number;
    setBetAmount(betAmountInput);
    setChoice("Head");
    setPlayCount((prev) => prev + 1);
    if (result === 1) {
      updatedUserPoints = points + betAmountInput * 0.97;
      setWinCount((prev) => prev + 1);
      setCoinResult("Head");
      setPastCoinResults((prev) => [...prev, "H"]);
    } else {
      updatedUserPoints = points - betAmountInput;
      setCoinResult("Tail");
      setPastCoinResults((prev) => [...prev, "T"]);
    }
    setPoints(updatedUserPoints);
    await fetch("/api/points/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: userEmail,
        updatedUserPoints: updatedUserPoints,
      }),
    });
    router.refresh();
  };

  const handleChooseTail = async () => {
    const result: number = Math.floor(Math.random() * 2) + 1;
    let updatedUserPoints: number;
    setBetAmount(betAmountInput);
    setChoice("Tail");
    setPlayCount((prev) => prev + 1);
    if (result === 2) {
      updatedUserPoints = points + betAmountInput * 0.97;
      setWinCount((prev) => prev + 1);
      setCoinResult("Tail");
      setPastCoinResults((prev) => [...prev, "T"]);
    } else {
      updatedUserPoints = points - betAmountInput;
      setCoinResult("Head");
      setPastCoinResults((prev) => [...prev, "H"]);
    }
    setPoints(updatedUserPoints);
    await fetch("/api/points/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: userEmail,
        updatedUserPoints: updatedUserPoints,
      }),
    });
    router.refresh();
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

          <hr />

          <p data-testid="Past-Coin-Results">
            Past Results:{" "}
            {pastCoinResults.map((result, index) => (
              <span className={result === "H" ? "red" : "blue"} key={index}>
                {result}{" "}
              </span>
            ))}
          </p>

          <p data-testid={"Head-Count"} className="mb--10">
            Heads: {pastCoinResults.filter((result) => result === "H").length} (
            {(
              (pastCoinResults.filter((result) => result === "H").length /
                pastCoinResults.length) *
              100
            ).toFixed(2)}
            %)
          </p>

          <p data-testid={"Tail-Count"} className="mb--10">
            Tails: {pastCoinResults.filter((result) => result === "T").length} (
            {(
              (pastCoinResults.filter((result) => result === "T").length /
                pastCoinResults.length) *
              100
            ).toFixed(2)}
            %)
          </p>

          <p data-testid={"Longest-Consecutive-Heads"} className="mb--10">
            Longest Consecutive Heads:{" "}
            {getLongestConsecutive(pastCoinResults, "H")}
          </p>

          <p data-testid={"Longest-Consecutive-Tails"}>
            Longest Consecutive Tails:{" "}
            {getLongestConsecutive(pastCoinResults, "T")}
          </p>
        </div>
      )}
    </div>
  );
}
