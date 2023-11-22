import React from "react";
import Start from "./Start";
import Category from "./Category";
import Question from "./Question";
import Menu from "./Menu";
import ConfirmEndModal from "./ConfirmEndModal";

// Displays the Trivia Game based on the game state
// Handles changing the screen from start, category, and question
function Play({ gameData, questionData, answerData }) {
  const { gameState, setGameState, showConfirm, setShowConfirm } = gameData;

  const startGame = () => setGameState("category");
  const afterSubmitChoices = {
    goToSelectCategory: startGame,
    setShowConfirm: setShowConfirm,
    getNextQuestion: () => questionData.fetchQuestion(gameData.category),
  };

  // Renders the component based on the gameState (category, question, or start)
  const displayGameState =
    gameState === "category" ? (
      <Category
        category={gameData.category}
        setCategory={gameData.setCategory}
        setGameState={setGameState}
      />
    ) : gameState === "question" ? (
      <Question
        afterSubmitChoices={afterSubmitChoices}
        questionData={questionData}
        answerData={answerData}
      />
    ) : (
      <Start startGame={startGame} />
    );

  return (
    <>
      <Menu gameData={gameData} />
      {displayGameState}
      {showConfirm && (
        <ConfirmEndModal
          endGame={showConfirm}
          setShowConfirm={setShowConfirm}
          setGameState={setGameState}
        />
      )}
    </>
  );
}

export default Play;
