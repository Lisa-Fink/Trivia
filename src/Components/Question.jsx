import React from "react";
import QuestionSubmitButtons from "./QuestionSubmitButtons";
import AnswerChoices from "./AnswerChoices";

// Displays the game screen for the question and answers based on the game state
function Question({ afterSubmitChoices, questionData, answerData }) {
  const { isCorrect, correctAnswer, answerLoading, answer, isAnswering } =
    answerData;

  const { question, questionLoading } = questionData;

  // Displays the text related to answer the question
  // If the player is answering: "Select and answer"
  // If the player selected an answer and it is loading: "Checking answer"
  // If the answer is loaded and is correct: correct answer message
  // Otherwise if correctAnswer is null: error message, otherwise show incorrect answer
  const correctAnswerText = (answer) => (
    <>
      Your answer: <span className="answer-text">{answer}</span> is correct
    </>
  );
  const answerErrorText = (
    <>There was a problem retrieving the answer. Try a new game :-(</>
  );

  const incorrectAnswerText = (answer) => (
    <>
      Your answer: <span className="answer-text">{answer}</span> is incorrect
      <br />
      The correct answer is:{" "}
      <span className="answer-text">{correctAnswer}</span>
    </>
  );
  const answerText = isAnswering
    ? "Select an answer"
    : answerLoading
    ? "Checking answer..."
    : isCorrect
    ? correctAnswerText(answer)
    : correctAnswer
    ? incorrectAnswerText(answer)
    : answerErrorText;

  // Question text for different game states
  const questionLoadingH2 = <h2>Loading Question...</h2>;
  const noQuestionDataH2 = <h2>No question available, try a new game :-(</h2>;

  // Displays the question, the answer test, the answer choices,
  // and the bottom buttons
  // (submit if answering or change game options after answer is checked)
  const questionAndAnswer = question && (
    <>
      <h2>{question.question}</h2>
      <div>
        <h3>{answerText}</h3>
      </div>
      <AnswerChoices answerData={answerData} question={question} />
      <QuestionSubmitButtons
        afterSubmitChoices={afterSubmitChoices}
        answerData={answerData}
        question={question}
      />
    </>
  );

  // Displays text for the question/answer based on game state
  // If the question is load: loading text
  // If there no question available: error/no question text
  // Otherwise shows question and answer choices with submit button
  const questionAnswerDisplay = questionLoading
    ? questionLoadingH2
    : !question
    ? noQuestionDataH2
    : questionAndAnswer;

  return (
    <div className="question center-col" data-testid="question-component">
      {questionAnswerDisplay}
    </div>
  );
}

export default Question;
