import React from "react";
import Start from "./Start";
import Category from "./Category";
import Question from "./Question";
import Menu from "./Menu";
import ConfirmEndModal from "./ConfirmEndModal";

// Displays the Trivia Game based on the game state
// Handles changing the screen from start, category, and question
function Play({
  gameState,
  setGameState,
  sound,
  toggleSound,
  category,
  setCategory,
  score,
  showConfirm,
  setShowConfirm,
  questionProps,
}) {
  function submitCategory() {
    setGameState("question");
  }

  function goToSelectCategory() {
    setGameState("category");
    setCategory(null);
  }

  function startGame() {
    setGameState("category");
  }

  function cancelModal() {
    setShowConfirm(null);
  }

  // Renders the component based on the gameState (category, question, or start)
  const displayGameState =
    gameState === "category" ? (
      <Category
        category={category}
        setCategory={setCategory}
        submitCategory={submitCategory}
        soundEnabled={sound}
      />
    ) : gameState === "question" ? (
      <Question
        goToSelectCategory={goToSelectCategory}
        setShowConfirm={setShowConfirm}
        soundEnabled={sound}
        {...questionProps}
      />
    ) : (
      <Start startGame={startGame} soundEnabled={sound} />
    );

  const menuProps = {
    score,
    category,
    sound,
    toggleSound,
    gameState,
    setShowConfirm,
  };

  return (
    <>
      <Menu {...menuProps} />
      {displayGameState}
      {showConfirm && (
        <ConfirmEndModal
          cancel={cancelModal}
          endGame={showConfirm}
          setGameState={setGameState}
          soundEnabled={sound}
        />
      )}
    </>
  );
}

export default Play;
