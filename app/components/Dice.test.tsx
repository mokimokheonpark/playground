import { render } from "@testing-library/react";
import Dice from "./Dice";

describe("Dice Component", () => {
  test("renders without crashing", () => {
    render(<Dice />);
  });
});
