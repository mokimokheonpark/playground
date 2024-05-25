import { render } from "@testing-library/react";
import { SignIn } from "./SignIn";

jest.mock("next-auth/react", () => ({}));

describe("SignIn Component", () => {
  test("renders without crashing", () => {
    render(<SignIn />);
  });
});
