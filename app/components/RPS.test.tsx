import { render } from "@testing-library/react";
import RPS from "./RPS";

describe("Rock-Paper-Scissors Component", () => {
  test("renders without crashing", () => {
    render(<RPS />);
  });
});
