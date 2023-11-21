import React from "react";
import SoundButton from "./SoundButton";

// Displays the start screen
// Handles users clicking a start game button
function Start({ startGame, soundEnabled }) {
  const startButton = (
    <SoundButton
      testID="start-button"
      soundEnabled={soundEnabled}
      onClick={startGame}
      className="light-text medium-text"
    >
      START
    </SoundButton>
  );
  return (
    <div className="large-text center-col" data-testid="start-component">
      <div>Test your knowledge of different subjects</div>
      <div>Press START to begin!</div>
      {startButton}
      <div>Then you will choose a category</div>
    </div>
  );
}

export default Start;
