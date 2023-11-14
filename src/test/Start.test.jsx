import { describe, test, expect, vi } from "vitest";
import Start from "../Components/Start";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";

describe("Start test", () => {
  test("Should have start button", () => {
    render(<Start />);
    const startButton = screen.queryByTestId("start-button");
    expect(startButton).to.exist;
  });
  test("Should trigger startGame function on start button click", () => {
    const startGameMock = vi.fn();

    render(<Start startGame={startGameMock} />);
    fireEvent.click(screen.getByTestId("start-button"));

    // Verify that the startGame function was called
    expect(startGameMock).toHaveBeenCalledTimes(1);
  });
});
