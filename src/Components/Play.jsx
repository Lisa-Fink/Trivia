import React, { useEffect, useState } from "react";
import Start from "./Start";
import Category from "./Category";
import Question from "./Question";
import Menu from "./Menu";
import ConfirmEndModal from "./ConfirmEndModal";

const CORRECT_ANSWER_POINTS = 100;

function Play() {
  const [gameState, setGameState] = useState("start");
  const [sound, toggleSound] = useSound();

  // game play states
  const [category, setCategory] = useState(null);
  const [score, resetScore, increaseScore] = useScore();
  const [showConfirm, setShowConfirm] = useState(null);

  useEffect(() => {
    if (gameState === "question") resetScore();
    if (gameState === "restart") setGameState("question");
  }, [gameState]);

  const main =
    gameState === "category" ? (
      <Category
        category={category}
        setCategory={setCategory}
        submitCategory={() => {
          setGameState("question");
        }}
      />
    ) : gameState === "question" ? (
      <Question
        goToSelectCategory={() => setGameState("category")}
        goToStart={() => setGameState("start")}
        resetScore={resetScore}
        increaseScore={increaseScore}
        setShowConfirm={setShowConfirm}
        gameState={gameState}
      />
    ) : (
      <Start
        startGame={() => {
          setGameState("category");
        }}
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
        />
      )}
    </>
  );
}

function useSound() {
  const [sound, setSound] = useState(true);
  return [sound, () => setSound(!sound)];
}

function useScore() {
  const [score, setScore] = useState(0);
  const resetScore = () => setScore(0);
  const increaseScore = () => setScore(score + CORRECT_ANSWER_POINTS);
  return [score, resetScore, increaseScore];
}

export default Play;
