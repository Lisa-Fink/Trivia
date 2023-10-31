import React, { useEffect, useState } from "react";
import useQuestionData from "../Hooks/useQuestionData";
import useAnswerVerification from "../Hooks/useAnswerVerification";

function Question({ category, goToSelectCategory, goToStart }) {
  const {
    isCorrect,
    correctAnswer,
    answerLoading,
    verifyAnswer,
    resetAnswerState,
  } = useAnswerVerification();
  const [answer, setAnswer] = useState(null);
  const [isAnswering, setIsAnswering] = useState(true);
  const { question, questionLoading, error, fetchQuestion } = useQuestionData();

  function handleSubmit() {
    if (!isAnswering) return;
    setIsAnswering(false);
    verifyAnswer(question.questionID, answer);
  }

  function getNextQuestion() {
    fetchQuestion(category);
  }

  useEffect(() => {
    resetAnswerState();
    setAnswer(null);
    setIsAnswering(true);
  }, [question]);

  useEffect(() => {
    getNextQuestion();
  }, []);

  const answerButtons =
    question &&
    question.answers &&
    question.answers.map((curAnswer, index) => (
      <button
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
      >
        {curAnswer}
      </button>
    ));

  const submitButton = (
    <button className="wide-btn" disabled={!isAnswering} onClick={handleSubmit}>
      Submit
    </button>
  );
  const correctAnswerButtons = (
    <div className="question-button">
      <button className="wide-btn" onClick={getNextQuestion}>
        Continue
      </button>
      <button className="wide-btn" onClick={goToStart}>
        End Game
      </button>
    </div>
  );
  const incorrectAnswerButtons = (
    <div className="question-button">
      <button className="wide-btn" onClick={getNextQuestion}>
        Retry Current Category
      </button>
      <button className="wide-btn" onClick={goToSelectCategory}>
        New Category
      </button>
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

  if (questionLoading) {
    return <h2>Loading Question...</h2>;
  }

  if (error) {
    return <h2>Error: {error.message}, try again...</h2>;
  }

  if (!question) {
    return <h2>No question available, try again...</h2>;
  }

  return (
    <div className="question center-col">
      <h2>{question.question}</h2>
      <div>
        <h3>{answerText}</h3>
      </div>

      <div className="btn-container">{answerButtons}</div>
      {bottomButtons}
    </div>
  );
}

export default Question;
