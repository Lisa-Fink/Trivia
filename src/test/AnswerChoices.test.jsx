import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import wrapSoundContext from "../test-utils/wrapSoundContext";
import AnswerChoices from "../Components/AnswerChoices";

describe("Answer buttons text test", () => {
  let mockAnswerData = { isAnswering: true, answerLoading: false };
  let mockQuestion = {
    question: "question",
    answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
  };
  beforeEach(() => {
    mockAnswerData = { isAnswering: true, answerLoading: false };
    mockQuestion = {
      question: "question",
      answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
    };
    render(
      wrapSoundContext(
        <AnswerChoices answerData={mockAnswerData} question={mockQuestion} />
      )
    );
  });
  test("Should render 4 buttons", () => {
    const answerButtons = screen.getAllByRole("button");
    expect(answerButtons).toHaveLength(4);
  });
  test("Each button text corresponds to index in answers", () => {
    const answerButtons = screen.getAllByRole("button");
    for (let i = 0; i < 4; i++) {
      expect(answerButtons[i].textContent).toEqual(mockQuestion.answers[i]);
    }
  });
});

describe("Answer buttons selected", () => {
  let mockAnswerData = {
    isAnswering: true,
    answerLoading: false,
    setAnswer: vi.fn(),
    answer: "answer 3",
  };
  let mockQuestion = {
    question: "question",
    answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
  };
  beforeEach(() => {
    mockAnswerData = {
      isAnswering: true,
      answerLoading: false,
      setAnswer: vi.fn(),
      answer: "answer 3",
    };
    mockQuestion = {
      question: "question",
      answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
    };
    render(
      wrapSoundContext(
        <AnswerChoices answerData={mockAnswerData} question={mockQuestion} />
      )
    );
  });
  test("Should call setAnswer with correct answer when corresponding button is clicked", () => {
    const answerButtons = screen.getAllByRole("button");
    for (let i = 0; i < mockQuestion.answers.length; i++) {
      const answer = answerButtons[i];
      fireEvent.click(answer);
      expect(mockAnswerData.setAnswer).toHaveBeenCalledTimes(i + 1);
      expect(mockAnswerData.setAnswer).toHaveBeenCalledWith(
        mockQuestion.answers[i]
      );
    }
  });
  test("Should highlight selected answer button (set the correct class)", () => {
    const answerButtons = screen.getAllByRole("button");
    // answer 3 is the answer, check the class
    const answer3 = answerButtons[2];
    const classList = Array.from(answer3.classList);
    expect(classList).toContain("selected-btn");
  });
  test("Should not highlight unselected answer buttons (set the correct class)", () => {
    const answerButtons = screen.getAllByRole("button");
    // answer 3 is the answer, check the other classes
    for (let i = 0; i < answerButtons.length && i !== 2; i++) {
      const answer = answerButtons[i];
      const classList = Array.from(answer.classList);
      expect(classList).not.toContain("selected-btn");
    }
  });
});

describe("Answer buttons correct/incorrect class", () => {
  let mockAnswerData = {
    isAnswering: false,
    answerLoading: false,
    setAnswer: vi.fn(),
    answer: "answer 3",
  };
  let mockQuestion = {
    question: "question",
    answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
  };
  test("Should set correct class if correct answer is selected", () => {
    mockAnswerData.correctAnswer = "answer 3";
    mockAnswerData.isCorrect = true;
    render(
      wrapSoundContext(
        <AnswerChoices answerData={mockAnswerData} question={mockQuestion} />
      )
    );

    const answerButtons = screen.getAllByRole("button");
    // answer 3 is the correct answer, check the class
    const answer3 = answerButtons[2];
    const classList = Array.from(answer3.classList);
    expect(classList).toContain("correct");

    // other buttons should not have correct/incorrect
    for (let i = 0; i < answerButtons.length && i !== 2; i++) {
      const answer = answerButtons[i];
      const classList = Array.from(answer.classList);
      expect(classList).not.toContain("correct");
      expect(classList).not.toContain("incorrect");
    }
  });
  test("Should set correct class on correct/incorrect if incorrect selected", () => {
    mockAnswerData.correctAnswer = "answer 2";
    mockAnswerData.isCorrect = true;
    render(
      wrapSoundContext(
        <AnswerChoices answerData={mockAnswerData} question={mockQuestion} />
      )
    );

    const answerButtons = screen.getAllByRole("button");
    // answer 2 is the correct answer, check the class
    const answer2 = answerButtons[1];
    const classList2 = Array.from(answer2.classList);
    expect(classList2).toContain("correct");

    // answer 3 is the incorrect selected button, check the class
    const answer3 = answerButtons[2];
    const classList3 = Array.from(answer3.classList);
    expect(classList3).toContain("incorrect");

    // other buttons should not have correct/incorrect
    for (let i = 0; i < answerButtons.length && i !== 2 && i !== 1; i++) {
      const answer = answerButtons[i];
      const classList = Array.from(answer.classList);
      expect(classList).not.toContain("correct");
      expect(classList).not.toContain("incorrect");
    }
  });
});

describe("Answer buttons long text ", () => {
  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }
  const mockAnswerData = {
    isAnswering: true,
    answerLoading: false,
    setAnswer: vi.fn(),
    answer: "answer 3",
  };
  const mockQuestion = {
    question: "question",
    answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
  };
  test("Container class should have long class if text is long", () => {
    mockQuestion.answers[3] = generateRandomString(100);
    render(
      wrapSoundContext(
        <AnswerChoices answerData={mockAnswerData} question={mockQuestion} />
      )
    );
    const container = screen.queryByTestId("container");
    const classList = Array.from(container.classList);
    expect(classList).toContain("extra-text-container");
  });
  test("Container class should not have long class if text is all short", () => {
    mockQuestion.answers[3] = generateRandomString(2);
    render(
      wrapSoundContext(
        <AnswerChoices answerData={mockAnswerData} question={mockQuestion} />
      )
    );
    const container = screen.queryByTestId("container");
    const classList = Array.from(container.classList);
    expect(classList).not.toContain("extra-text-container");
  });
});
