import React from "react";
import SoundButton from "./SoundButton";

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
  function handleSubmit() {
    if (!isAnswering) return;
    setIsAnswering(false);
    verifyAnswer(question.questionID, answer);
  }

  const answerButtons =
    question &&
    question.answers &&
    question.answers.map((curAnswer, index) => (
      <SoundButton
        disabled={!isAnswering}
        className={
          (answer == curAnswer ? "selected-btn" : "") +
          (!isAnswering && !answerLoading
            ? curAnswer === correctAnswer
              ? " correct"
              : curAnswer === answer
              ? " incorrect"
              : ""
            : "")
        }
        key={index}
        onClick={() => setAnswer(curAnswer)}
        soundEnabled={soundEnabled}
      >
        {curAnswer}
      </SoundButton>
    ));

  const submitButton = (
    <SoundButton
      className="wide-btn"
      disabled={!isAnswering}
      onClick={handleSubmit}
      soundEnabled={soundEnabled}
    >
      Submit
    </SoundButton>
  );
  const correctAnswerButtons = (
    <div className="question-button">
      <SoundButton
        className="wide-btn"
        onClick={getNextQuestion}
        soundEnabled={soundEnabled}
      >
        Continue
      </SoundButton>
      <SoundButton
        soundEnabled={soundEnabled}
        className="wide-btn"
        onClick={() => {
          setShowConfirm("start");
        }}
      >
        End Game
      </SoundButton>
    </div>
  );
  const incorrectAnswerButtons = (
    <div className="question-button">
      <SoundButton
        soundEnabled={soundEnabled}
        className="wide-btn"
        onClick={getNextQuestion}
      >
        Retry Current Category
      </SoundButton>
      <SoundButton
        soundEnabled={soundEnabled}
        className="wide-btn"
        onClick={goToSelectCategory}
      >
        New Category
      </SoundButton>
    </div>
  );

  const bottomButtons =
    isAnswering || answerLoading
      ? submitButton
      : isCorrect
      ? correctAnswerButtons
      : incorrectAnswerButtons;

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

  const mainArea = questionLoading ? (
    <h2>Loading Question...</h2>
  ) : error ? (
    <h2>Error: {error.message}, try again...</h2>
  ) : !question ? (
    <h2>No question available, try again...</h2>
  ) : (
    <>
      <h2>{question.question}</h2>
      <div>
        <h3>{answerText}</h3>
      </div>

      <div className="btn-container">{answerButtons}</div>
      {bottomButtons}
    </>
  );

  return (
    <div className="question center-col" data-testid="question-component">
      {mainArea}
    </div>
  );
}

export default Question;
