import React from "react";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import SoundButton from "./SoundButton";

// Displays in game menu (displays score, category, new game button, reset game button)
// Handles showing/not showing data (score/category) based on game state
// Handles users clicking on new game and reset game buttons
function Menu({
  sound,
  score,
  category,
  toggleSound,
  gameState,
  setShowConfirm,
}) {
  // Triggers the confirm a new game modal if the game state isn't start
  // (if game state is start, nothing would change)
  function handleNewGameClick() {
    if (gameState !== "start") setShowConfirm("start");
  }

  // Triggers the confirm restart game modal, only if the game state isn question
  // (the category would need to have been selected to restart with the category)
  function handleRestartClick() {
    if (gameState === "question") setShowConfirm("restart");
  }

  const newGameButton = (
    <SoundButton
      soundEnabled={sound}
      onClick={handleNewGameClick}
      className="small-btn"
      testID="new-game"
    >
      New Game
    </SoundButton>
  );

  const restartButton = (
    <SoundButton
      soundEnabled={sound}
      onClick={handleRestartClick}
      className="small-btn"
      testID="restart"
    >
      Restart
    </SoundButton>
  );

  const newGameRestartBtns = (
    <>
      {newGameButton}
      {restartButton}
    </>
  );

  const categoryScoreDisplay = (
    <>
      <div data-testid="score">Score: {score}</div>
      <div data-testid="category">Category: {category}</div>
    </>
  );

  const soundOnOffBtn = (
    <button
      className="toggle-sound-btn"
      aria-label={sound ? "Mute Sound" : "Unmute Sound"}
      onClick={toggleSound}
      data-testid="sound"
    >
      {sound ? (
        <FaVolumeHigh className="regular-text" />
      ) : (
        <FaVolumeXmark className="regular-text" />
      )}
    </button>
  );

  return (
    <div className="menu flex-row" data-testid="menu-component">
      <div className="menu-row flex-row">
        {gameState === "question" && categoryScoreDisplay}
      </div>
      <div className="menu-row flex-row">
        {gameState !== "start" && newGameRestartBtns}
        {soundOnOffBtn}
      </div>
    </div>
  );
}

export default Menu;
