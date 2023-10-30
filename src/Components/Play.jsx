import React, { useState } from "react";
import Start from "./Start";

function Play() {
  const [gameState, setGameState] = useState("start");

  return (
    gameState == "start" && (
      <Start
        startGame={() => {
          setGameState("category");
        }}
      />
    )
  );
}

export default Play;
