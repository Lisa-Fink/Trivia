import React, { useState, useEffect } from "react";
import SoundButton from "./SoundButton";
const LONG_TEXT_LENGTH = 65;

function AnswerChoices({ answerData, question }) {
  const { correctAnswer, answerLoading, answer, setAnswer, isAnswering } =
    answerData;

  // isLongText boolean for if any answer choice exceeds LONG_TEXT_LENGTH
  // resets every time a new question is loaded
  const { isLongText, setIsLongText } = useLongText(question);

  // Adds selected class is current answer is the selected answer (answer == curAnswer)
  const selectedClass = (curAnswer) =>
    answer == curAnswer ? "selected-btn" : "";
  // Adds correct/incorrect class
  // if the current answer is correct add correct class
  // if the current answer is selected and is incorrect, add incorrect class
  const correctnessClass = (curAnswer) =>
    !isAnswering && !answerLoading
      ? curAnswer === correctAnswer
        ? " correct"
        : curAnswer === answer
        ? " incorrect"
        : ""
      : "";

  // Selects the class/classes for the answer choice button
  const answerBtnClass = (curAnswer) =>
    selectedClass(curAnswer) + correctnessClass(curAnswer);

  // adds extra-text-container class.
  // makes buttons wider if any answer choice has a long text
  const containerClass = isLongText
    ? "btn-container extra-text-container"
    : "btn-container";

  // Buttons for each answer choice
  const answerChoiceButtons =
    question &&
    question.answers &&
    question.answers.map((curAnswer, index) => {
      if (!isLongText && curAnswer.length > LONG_TEXT_LENGTH)
        setIsLongText(true);
      return (
        <SoundButton
          disabled={!isAnswering}
          className={answerBtnClass(curAnswer)}
          key={index}
          onClick={() => setAnswer(curAnswer)}
        >
          {curAnswer}
        </SoundButton>
      );
    });
  return (
    <div data-testid="container" className={containerClass}>
      {answerChoiceButtons}
    </div>
  );
}

export default AnswerChoices;

function useLongText(question) {
  const [isLongText, setIsLongText] = useState(false);
  // resets isLongText every time a new question is loaded
  useEffect(() => {
    setIsLongText(false);
  }, [question]);

  return { isLongText, setIsLongText };
}
