import { render } from "@testing-library/react";
import SignUpPage from "./page";

describe("SignUp Page", () => {
  test("renders without crashing", () => {
    render(<SignUpPage />);
  });

  test("renders header", () => {
    const { getByText } = render(<SignUpPage />);
    const headerElement = getByText("Sign Up");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders signup form", () => {
    const { getByPlaceholderText, getByText } = render(<SignUpPage />);
    const emailInputField = getByPlaceholderText("Email");
    const passwordInputField = getByPlaceholderText("Password");
    const passwordCheckInputField = getByPlaceholderText("Password-Check");
    const usernameInputField = getByPlaceholderText("Username");
    const submitButton = getByText("Submit");
    expect(emailInputField).toBeInTheDocument();
    expect(passwordInputField).toBeInTheDocument();
    expect(passwordCheckInputField).toBeInTheDocument();
    expect(usernameInputField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
