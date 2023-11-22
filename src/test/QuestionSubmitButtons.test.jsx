import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import QuestionSubmitButtons from "../Components/QuestionSubmitButtons";
import wrapSoundContext from "../test-utils/wrapSoundContext";

describe("QuestionSubmitButtons", () => {
  let answerData;
  let question;
  let afterSubmitChoices;

  beforeEach(() => {
    answerData = {
      isAnswering: true,
      answerLoading: false,
      isCorrect: false,
      setIsAnswering: vi.fn(),
      verifyAnswer: vi.fn(),
      answer: "test answer",
    };

    question = {
      category: "test category",
      questionID: "test id",
    };

    afterSubmitChoices = {
      goToSelectCategory: vi.fn(),
      setShowConfirm: vi.fn(),
      getNextQuestion: vi.fn(),
    };
  });

  test("Should render Submit button when answering", () => {
    answerData.isAnswering = true;
    render(
      wrapSoundContext(
        <QuestionSubmitButtons
          answerData={answerData}
          question={question}
          afterSubmitChoices={afterSubmitChoices}
        />
      )
    );

    const submitButton = screen.getByText("Submit");
    expect(submitButton).not.toBeNull();

    // clicking submit should call setIsAnswering(false) and verifyAnswer(category, questionID, answer)
    expect(answerData.setIsAnswering).toBeCalledTimes(0);
    expect(answerData.verifyAnswer).toBeCalledTimes(0);
    fireEvent.click(submitButton);
    expect(answerData.setIsAnswering).toBeCalledTimes(1);
    expect(answerData.setIsAnswering).toBeCalledWith(false);
    expect(answerData.verifyAnswer).toBeCalledTimes(1);
    expect(answerData.verifyAnswer).toBeCalledWith(
      "test category",
      "test id",
      "test answer"
    );
  });
  test("Should do nothing if submit is clicked with nothing selected", () => {
    answerData.isAnswering = true;
    answerData.answer = null;
    render(
      wrapSoundContext(
        <QuestionSubmitButtons
          answerData={answerData}
          question={question}
          afterSubmitChoices={afterSubmitChoices}
        />
      )
    );

    const submitButton = screen.getByText("Submit");
    expect(submitButton).not.toBeNull();

    // clicking submit should call setIsAnswering(false) and verifyAnswer(category, questionID, answer)
    expect(answerData.setIsAnswering).toBeCalledTimes(0);
    expect(answerData.verifyAnswer).toBeCalledTimes(0);
    fireEvent.click(submitButton);
    expect(answerData.setIsAnswering).toBeCalledTimes(0);
    expect(answerData.verifyAnswer).toBeCalledTimes(0);
  });

  test("Should do nothing if submit is clicked when isAnswering is false", () => {
    answerData.isAnswering = false;
    answerData.answerLoading = true;
    answerData.answer = "test answer";
    render(
      wrapSoundContext(
        <QuestionSubmitButtons
          answerData={answerData}
          question={question}
          afterSubmitChoices={afterSubmitChoices}
        />
      )
    );

    const submitButton = screen.getByText("Submit");
    expect(submitButton).not.toBeNull();

    // clicking submit should call setIsAnswering(false) and verifyAnswer(category, questionID, answer)
    expect(answerData.setIsAnswering).toBeCalledTimes(0);
    expect(answerData.verifyAnswer).toBeCalledTimes(0);
    fireEvent.click(submitButton);
    expect(answerData.setIsAnswering).toBeCalledTimes(0);
    expect(answerData.verifyAnswer).toBeCalledTimes(0);
  });

  test("Should render Continue and End Game buttons for correct answer", () => {
    answerData.isCorrect = true;
    answerData.isAnswering = false;
    answerData.answerLoading = false;
    afterSubmitChoices.getNextQuestion = vi.fn();
    render(
      wrapSoundContext(
        <QuestionSubmitButtons
          answerData={answerData}
          question={question}
          afterSubmitChoices={afterSubmitChoices}
        />
      )
    );

    const continueButton = screen.getByText("Continue");
    const endGameButton = screen.getByText("End Game");

    expect(continueButton).not.toBeNull();
    expect(endGameButton).not.toBeNull();

    // clicking continue calls getNextQuestion
    expect(afterSubmitChoices.getNextQuestion).toBeCalledTimes(0);
    fireEvent.click(continueButton);
    expect(afterSubmitChoices.getNextQuestion).toBeCalledTimes(1);

    // clicking endGameButton calls setShowConfirm with "start" argument
    fireEvent.click(endGameButton);
    expect(afterSubmitChoices.setShowConfirm).toBeCalled();
    expect(afterSubmitChoices.setShowConfirm).toBeCalledWith("start");
  });

  test("Should render Retry Category and New Category buttons for incorrect answer", () => {
    answerData.isCorrect = false;
    answerData.isAnswering = false;
    answerData.answerLoading = false;
    afterSubmitChoices.getNextQuestion = vi.fn();
    render(
      wrapSoundContext(
        <QuestionSubmitButtons
          answerData={answerData}
          question={question}
          afterSubmitChoices={afterSubmitChoices}
        />
      )
    );

    const retryButton = screen.getByText("Retry Current Category");
    const newCategoryButton = screen.getByText("New Category");

    expect(retryButton).not.toBeNull();
    expect(newCategoryButton).not.toBeNull();

    // clicking retry button calls getNextQuestion
    expect(afterSubmitChoices.getNextQuestion).toBeCalledTimes(0);
    fireEvent.click(retryButton);
    expect(afterSubmitChoices.getNextQuestion).toBeCalledTimes(1);

    // clicking new category button calls goToSelectCategory
    expect(afterSubmitChoices.goToSelectCategory).toBeCalledTimes(0);
    fireEvent.click(newCategoryButton);
    expect(afterSubmitChoices.goToSelectCategory).toBeCalledTimes(1);
  });
});
