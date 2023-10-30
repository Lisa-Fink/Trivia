import React, { useState } from "react";
import Start from "./Start";
import Category from "./Category";

function Play() {
  const [gameState, setGameState] = useState("start");

  return gameState == "start" ? (
    <Start
      startGame={() => {
        setGameState("category");
      }}
    />
  ) : (
    <Category />
  );
}

export default Play;
