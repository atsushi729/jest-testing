import Login from "../Login";

describe("test Login componetn", () => {
  test("should first", () => {
    render(<Login />);

    const button = screen.findAllByRole("button");
    expect(button).toHaveLength(1);
  });
});
