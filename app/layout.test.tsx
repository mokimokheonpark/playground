import { render } from "@testing-library/react";
import RootLayout from "./layout";

describe("RootLayout", () => {
  test("renders without crashing", () => {
    render(<RootLayout>{}</RootLayout>);
  });

  test("renders children", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Child Component</div>
      </RootLayout>
    );
    expect(getByText("Child Component")).toBeInTheDocument();
  });

  test("renders Home link", () => {
    const { getByText } = render(<RootLayout>{}</RootLayout>);
    expect(getByText("Home")).toHaveAttribute("href", "/");
  });
});
