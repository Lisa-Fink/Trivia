import React, { useState } from "react";
import Start from "./Start";
import Category from "./Category";
import Question from "./Question";

function Play() {
  const [gameState, setGameState] = useState("start");

  // game play states
  const [category, setCategory] = useState(null);
  const [score, setScore] = useState(0);

  return gameState == "category" ? (
    <Category
      category={category}
      setCategory={setCategory}
      submitCategory={() => {
        setGameState("question");
      }}
    />
  ) : gameState == "question" ? (
    <Question
      goToSelectCategory={() => setGameState("category")}
      goToStart={() => setGameState("start")}
    />
  ) : (
    <Start
      startGame={() => {
        setGameState("category");
      }}
    />
  );
}

export default Play;
