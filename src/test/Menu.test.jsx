import { describe, expect, test } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import Menu from "../Components/Menu";

// game state == start: only show sound icon
// game state == category: shows new game and restart btns. restart does nothing
// game state == question: shows new game and restart btns, shows category and score
// always show sound icon

describe("Menu with start game state", () => {
  beforeEach(() => {
    render(<Menu gameState="start" />);
  });
  test("Should show sound icon", () => {
    const sound = screen.queryByTestId("sound");
    expect(sound).not.toBeNull();
  });
  test("Should not show other buttons", () => {
    const buttons = screen.queryAllByRole("button");
    // check if there is only 1 button
    expect(buttons).toHaveLength(1);
  });
});

const testAllButtonsShow = (gameState) => {
  describe(`Buttons in Menu with ${gameState} game state`, () => {
    beforeEach(() => {
      render(<Menu gameState={gameState} />);
    });

    test("Should show sound icon and new game/reset game buttons", () => {
      const sound = screen.queryByTestId("sound");
      expect(sound).not.toBeNull();
      const restart = screen.queryByTestId("restart");
      const newGame = screen.queryByTestId("new-game");
      expect(restart).not.toBeNull();
      expect(newGame).not.toBeNull();
    });

    test("Should not show other buttons", () => {
      const buttons = screen.queryAllByRole("button");
      // check if there are 3 buttons
      expect(buttons).toHaveLength(3);
    });
  });
};

testAllButtonsShow("category");
testAllButtonsShow("question");

describe("Menu with question game state", () => {
  test("Should show score", () => {
    const mockScore = 500;
    render(<Menu gameState="question" score={mockScore} />);
    const scoreElement = screen.queryByTestId("score");
    expect(scoreElement).not.toBeNull();
    expect(screen.getByText(`Score: ${mockScore}`)).toBeDefined();
  });
  test("Should show current category", () => {
    const testCategory = (mockCategory) => {
      render(<Menu gameState="question" category={mockCategory} />);
      const categoryElement = screen.queryByTestId("category");
      expect(categoryElement).not.toBeNull();
      expect(screen.getByText(`Category: ${mockCategory}`)).toBeDefined();
      cleanup();
    };
    const categories = [
      "Geography",
      "Movies",
      "Music",
      "History",
      "Science/Tech",
      "Random",
    ];
    for (const category of categories) {
      testCategory(category);
    }
  });
});

describe("Menu sound button", () => {
  test("Should change on click", () => {
    const mockToggleSound = vi.fn();
    render(<Menu toggleSound={mockToggleSound} />);
    const sound = screen.queryByTestId("sound");
    fireEvent.click(sound);
    expect(mockToggleSound).toHaveBeenCalledOnce();
    fireEvent.click(sound);
    expect(mockToggleSound).toHaveBeenCalledTimes(2);
  });
});
