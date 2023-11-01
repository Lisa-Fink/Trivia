import React from "react";
import SoundButton from "./SoundButton";

function Start({ startGame, soundEnabled }) {
  return (
    <div className="large-text center-col">
      <div>Test your knowledge of different subjects</div>

      <div>Press START to begin!</div>

      <SoundButton
        soundEnabled={soundEnabled}
        onClick={startGame}
        className="light-text medium-text"
      >
        START
      </SoundButton>

      <div>Then you will choose a category</div>
    </div>
  );
}

export default Start;
