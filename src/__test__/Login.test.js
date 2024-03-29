import { render, screen } from "@testing-library/react";
import Login, { validateEmail } from "../Login";
import userEvent from "@testing-library/user-event";

describe("test Login componetn", () => {
  // Check button element in Login component
  test("should first", async () => {
    render(<Login />);
    const button = await screen.findAllByRole("button"); // return as promise object
    expect(button).toHaveLength(1);
  });

  // Check password type
  test("password type should be password", () => {
    render(<Login />);
    const password = screen.getByPlaceholderText("Please enter password");
    expect(password).toHaveAttribute("type", "password");
  });

  // Check email validation to fail if invalid email is inputed
  test("should be faild in email validation", () => {
    const testEmail = "test.com";
    expect(validateEmail(testEmail)).not.toBe(true);
  });

  // Check email validation to success if valid email is inputed
  test("should be successed in email validation", () => {
    const testEmail = "test@gmail.com";
    expect(validateEmail(testEmail)).toBe(true);
  });

  test("should be able to submit the form", () => {
    render(<Login />);
    const submitButton = screen.getAllByTestId("submit");
    const email = screen.getAllByPlaceholderText("Please enter email");
    const password = screen.getAllByPlaceholderText("Please enter password");

    userEvent.type(email, "test@gmail.com");
    userEvent.type(password, "testtest");

    userEvent.click(submitButton);
  });
});
