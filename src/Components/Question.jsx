import React from "react";
import SoundButton from "./SoundButton";
import QuestionSubmitButtons from "./QuestionSubmitButtons";

// Displays the game screen for the question and answers based on the game state
// Handles selecting different answer choices
// Renders QuestionSubmitButtons which handles submitting the answer, and the choice of
// how to proceed after answering a question
function Question({
  goToSelectCategory,
  setShowConfirm,
  soundEnabled,
  isCorrect,
  correctAnswer,
  answerLoading,
  verifyAnswer,
  answer,
  setAnswer,
  isAnswering,
  setIsAnswering,
  question,
  questionLoading,
  error,
  getNextQuestion,
}) {
  // Submits the answer, by updating isAnswering state, and calling verifyAnswer
  // Only submits, if isAnswering state is true
  function handleSubmit() {
    if (!isAnswering) return;
    setIsAnswering(false);
    verifyAnswer(question.questionID, answer);
  }

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

  // Buttons for each answer choice
  const answerChoiceButtons =
    question &&
    question.answers &&
    question.answers.map((curAnswer, index) => (
      <SoundButton
        disabled={!isAnswering}
        className={answerBtnClass(curAnswer)}
        key={index}
        onClick={() => setAnswer(curAnswer)}
        soundEnabled={soundEnabled}
      >
        {curAnswer}
      </SoundButton>
    ));

  // Displays the text related to answer the question
  // If the player is answering: "Select and answer"
  // If the player selected an answer and it is loading: "Checking answer"
  // If the answer is loaded and is correct: correct answer message
  // Otherwise it was incorrect: incorrect answer message
  const answerText = isAnswering ? (
    "Select an answer"
  ) : answerLoading ? (
    "Checking answer..."
  ) : isCorrect ? (
    <>
      Your answer: <span className="answer-text">{answer}</span> is correct
    </>
  ) : (
    <>
      Your answer: <span className="answer-text">{answer}</span> is incorrect
      <br />
      The correct answer is:{" "}
      <span className="answer-text">{correctAnswer}</span>
    </>
  );

  // Question text for different game states
  const questionLoadingH2 = <h2>Loading Question...</h2>;
  const questionLoadErrorH2 = error && (
    <h2>Error: {error.message}, try again...</h2>
  );
  const noQuestionDataH2 = <h2>No question available, try again...</h2>;

  const submitButtonProps = {
    isAnswering,
    soundEnabled,
    getNextQuestion,
    setShowConfirm,
    goToSelectCategory,
    answerLoading,
    isCorrect,
    handleSubmit,
  };

  // Displays the question, the answer test, the answer choices,
  // and the bottom buttons
  // (submit if answering or change game options after answer is checked)
  const questionAndAnswer = question && (
    <>
      <h2>{question.question}</h2>
      <div>
        <h3>{answerText}</h3>
      </div>

      <div className="btn-container">{answerChoiceButtons}</div>
      <QuestionSubmitButtons {...submitButtonProps} />
    </>
  );

  // Displays text for the question/answer based on game state
  // If the question is load: loading text
  // If there was an error or no question available: error/no question text
  // Otherwise shows question and answer choices with submit button
  const questionAnswerDisplay = questionLoading
    ? questionLoadingH2
    : error
    ? questionLoadErrorH2
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
