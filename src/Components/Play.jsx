import React, { useEffect, useState } from "react";
import Start from "./Start";
import Category from "./Category";
import Question from "./Question";
import Menu from "./Menu";
import ConfirmEndModal from "./ConfirmEndModal";

function Play({
  gameState,
  setGameState,
  sound,
  toggleSound,
  category,
  setCategory,
  score,
  resetScore,
  increaseScore,
  showConfirm,
  setShowConfirm,
  isNewGame,
  questionProps,
}) {
  const main =
    gameState === "category" ? (
      <Category
        category={category}
        setCategory={setCategory}
        submitCategory={() => {
          setGameState("question");
        }}
        soundEnabled={sound}
      />
    ) : gameState === "question" ? (
      <Question
        goToSelectCategory={() => {
          setGameState("category");
          setCategory(null);
        }}
        goToStart={() => setGameState("start")}
        resetScore={resetScore}
        increaseScore={increaseScore}
        setShowConfirm={setShowConfirm}
        gameState={gameState}
        soundEnabled={sound}
        isNewGame={isNewGame}
        {...questionProps}
      />
    ) : (
      <Start
        startGame={() => {
          setGameState("category");
        }}
        soundEnabled={sound}
      />
    );

  return (
    <>
      <Menu
        score={score}
        category={category}
        sound={sound}
        toggleSound={toggleSound}
        gameState={gameState}
        setShowConfirm={setShowConfirm}
      />
      {main}
      {showConfirm && (
        <ConfirmEndModal
          cancel={() => setShowConfirm(null)}
          endGame={showConfirm}
          setGameState={setGameState}
          soundEnabled={sound}
        />
      )}
    </>
  );
}

export default Play;
