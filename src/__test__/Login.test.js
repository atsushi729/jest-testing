import { render, screen } from "@testing-library/react";
import Login from "../Login";

describe("test Login componetn", () => {
  test("should first", async () => {
    render(<Login />);

    const button = await screen.findAllByRole("button");
    expect(button).toHaveLength(1);
  });
});
