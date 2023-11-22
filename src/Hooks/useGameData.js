import { useState, useEffect } from "react";
import useScore from "./useScore";

const useGameData = (isCorrect, isAnswering, sound, fetchQuestion) => {
  const [gameState, setGameState] = useState("start");

  // game play states
  const [category, setCategory] = useState(null);
  const [score, resetScore, increaseScore] = useScore(
    isCorrect,
    isAnswering,
    sound
  );
  const [showConfirm, setShowConfirm] = useState(null);

  // effects for gameState changes
  useEffect(() => {
    // if gameState changes to question, reset the score and get a new question
    if (gameState === "question") {
      resetScore();
      fetchQuestion(category);
    }
    // if gameState changes to restart, sets gameState to question
    // used when gameState is already question but needs to be reset
    if (gameState === "restart") {
      setGameState("question");
    }
    // resets category if gameState changes to start or category
    if (gameState === "start" || gameState === "category") setCategory(null);
  }, [gameState]);

  return {
    gameState,
    setGameState,
    category,
    setCategory,
    score,
    resetScore,
    increaseScore,
    showConfirm,
    setShowConfirm,
  };
};

export default useGameData;
