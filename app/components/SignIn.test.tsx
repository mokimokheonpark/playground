import { fireEvent, render } from "@testing-library/react";
import { signIn } from "next-auth/react";
import SignIn from "./SignIn";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("SignIn Component", () => {
  test("renders without crashing", () => {
    render(<SignIn />);
  });

  test("calls signIn function when Sign In button is clicked", () => {
    const { getByText } = render(<SignIn />);
    const signInButton = getByText("Sign-In");
    fireEvent.click(signInButton);
    expect(signIn).toHaveBeenCalledTimes(1);
  });
});
