import React, { useState } from "react";
import Start from "./Start";
import Category from "./Category";
import Question from "./Question";

function Play() {
  const [gameState, setGameState] = useState("start");
  const [category, setCategory] = useState(null);

  return gameState == "category" ? (
    <Category
      category={category}
      setCategory={setCategory}
      submitCategory={() => {
        setGameState("question");
      }}
    />
  ) : gameState == "question" ? (
    <Question />
  ) : (
    <Start
      startGame={() => {
        setGameState("category");
      }}
    />
  );
}

export default Play;
