import { fireEvent, render } from "@testing-library/react";
import { signOut } from "next-auth/react";
import { SignOut } from "./SignOut";

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}));

describe("SignOut Component", () => {
  test("renders without crashing", () => {
    render(<SignOut />);
  });

  test("calls signOut function when Sign Out button is clicked", () => {
    const { getByText } = render(<SignOut />);
    const signOutButton = getByText("Sign Out");
    fireEvent.click(signOutButton);
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
