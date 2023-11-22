import { describe, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Play from "../Components/Play";
import wrapSoundContext from "../test-utils/wrapSoundContext";

const mockGameData = { gameState: "category", showConfirm: false };
const mockAnswerData = {
  answer: true,
  isCorrect: true,
  correctAnswer: true,
  answerLoading: true,
  isAnswering: true,
};
const mockQuestionData = { question: true, questionLoading: false };

const playComponent = wrapSoundContext(
  <Play
    gameData={mockGameData}
    answerData={mockAnswerData}
    questionData={mockQuestionData}
  />
);

describe("Play component", () => {
  test('Renders the Category component when gameState is "category"', () => {
    mockGameData.gameState = "category";
    render(playComponent);
    expect(screen.queryByTestId("category-component")).not.toBeNull();
  });

  test('Renders the Question component when gameState is "question"', () => {
    mockGameData.gameState = "question";
    render(playComponent);
    expect(screen.queryByTestId("question-component")).not.toBeNull();
  });

  test("Renders the Start component when gameState is start", () => {
    mockGameData.gameState = "start";
    render(playComponent);
    expect(screen.queryByTestId("start-component")).not.toBeNull();
  });

  test("Renders the Modal component when showConfirm is true", () => {
    mockGameData.showConfirm = true;
    render(playComponent);
    expect(screen.queryByTestId("modal-component")).not.toBeNull();
  });

  test("Doesn't render the Modal component when showConfirm is false", () => {
    mockGameData.showConfirm = false;
    render(playComponent);
    expect(screen.queryByTestId("modal-component")).toBeNull();
  });

  test("Always renders Menu component with any game state", () => {
    const testCategories = ["category", "question", "start", "any"];
    for (const category of testCategories) {
      mockGameData.gameState = category;
      render(playComponent);
      expect(screen.queryByTestId("menu-component")).not.toBeNull();
      cleanup();
    }
  });
});
