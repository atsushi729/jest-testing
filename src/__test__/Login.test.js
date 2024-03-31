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

  test("should be able to submit the form", async () => {
    render(<Login />);

    const submitButton = screen.getByTestId("submit");
    const emailInput = screen.getByPlaceholderText("Please enter email");
    const passwordInput = screen.getByPlaceholderText("Please enter password");

    userEvent.type(emailInput, "test@gmail.com");
    userEvent.type(passwordInput, "testtest");

    userEvent.click(submitButton);
    const userInfo = await screen.findByText("test@gmail.com");
    expect(userInfo).toBeInTheDocument();
  });
});

describe("Login Component", () => {
  let emailInput, passwordInput, submitButton;

  beforeEach(() => {
    render(<Login />);
    emailInput = screen.getByPlaceholderText(/please enter email/i);
    passwordInput = screen.getByPlaceholderText(/please enter password/i);
    submitButton = screen.getByTestId("submit");
  });

  test("renders a button to submit the form", () => {
    expect(submitButton).toBeInTheDocument();
  });

  test("ensures the password field is of type password", () => {
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  describe("Email Validation", () => {
    test("fails if the email is invalid", () => {
      const invalidEmail = "test.com";
      expect(validateEmail(invalidEmail)).toBeFalsy();
    });

    test("succeeds if the email is valid", () => {
      const validEmail = "test@gmail.com";
      expect(validateEmail(validEmail)).toBeTruthy();
    });
  });

  describe("Form Submission", () => {
    test("displays the user email if the submission is successful", async () => {
      userEvent.type(emailInput, "test@gmail.com");
      userEvent.type(passwordInput, "password123");
      userEvent.click(submitButton);

      const userInfo = await screen.findByText("test@gmail.com");
      expect(userInfo).toBeInTheDocument();
    });

    test("displays an error message if the email is invalid", async () => {
      userEvent.type(emailInput, "test");
      userEvent.type(passwordInput, "password123");
      userEvent.click(submitButton);

      const errorAlert = await screen.findByTestId("error");
      expect(errorAlert).toHaveTextContent("Email is not valid");
    });
  });
});
