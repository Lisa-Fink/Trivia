import React from "react";
import SoundButton from "./SoundButton";

// Displays the submit buttons
// Shows submit button if the answer is being chosen
// Shows next screen buttons if answer was chosen based on correctness of answer
function QuestionSubmitButtons({ answerData, question, afterSubmitChoices }) {
  const {
    isAnswering,
    answerLoading,
    isCorrect,
    setIsAnswering,
    verifyAnswer,
    answer,
  } = answerData;
  const { goToSelectCategory, setShowConfirm, getNextQuestion } =
    afterSubmitChoices;
  // Submits the answer, by updating isAnswering state, and calling verifyAnswer
  // Only submits, if isAnswering state is true
  function handleSubmit() {
    if (!isAnswering || !answer) return;
    setIsAnswering(false);
    verifyAnswer(question.category, question.questionID, answer);
  }

  const submitButton = (
    <SoundButton
      className="wide-btn"
      disabled={!isAnswering}
      onClick={handleSubmit}
    >
      Submit
    </SoundButton>
  );

  const continueButton = (
    <SoundButton className="wide-btn" onClick={getNextQuestion}>
      Continue
    </SoundButton>
  );

  const endGameButton = (
    <SoundButton
      className="wide-btn"
      onClick={() => {
        setShowConfirm("start");
      }}
    >
      End Game
    </SoundButton>
  );

  // Displays Continue and End Game buttons
  const correctAnswerButtons = (
    <div className="question-button">
      {continueButton}
      {endGameButton}
    </div>
  );

  const retryButton = (
    <SoundButton className="wide-btn" onClick={getNextQuestion}>
      Retry Current Category
    </SoundButton>
  );

  const newCategoryButton = (
    <SoundButton className="wide-btn" onClick={goToSelectCategory}>
      New Category
    </SoundButton>
  );

  // Displays Retry Category and New Category buttons
  const incorrectAnswerButtons = (
    <div className="question-button">
      {retryButton}
      {newCategoryButton}
    </div>
  );

  // Displays bottom button.
  // either the submit button if the player is answering a question
  // or the button choices for a correct or incorrect answer
  const bottomButtons =
    isAnswering || answerLoading
      ? submitButton
      : isCorrect
      ? correctAnswerButtons
      : incorrectAnswerButtons;
  return bottomButtons;
}

export default QuestionSubmitButtons;
