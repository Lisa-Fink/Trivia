import React from "react";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import SoundButton from "./SoundButton";

function Menu({
  sound,
  score,
  category,
  toggleSound,
  gameState,
  setShowConfirm,
}) {
  function handleNewGameClick() {
    if (gameState !== "start") setShowConfirm("start");
  }

  function handleRestartClick() {
    if (gameState === "question") setShowConfirm("restart");
  }

  return (
    <div className="menu flex-row">
      <div className="menu-row flex-row">
        {gameState === "question" && (
          <>
            <div data-testid="score">Score: {score}</div>
            <div data-testid="category">Category: {category}</div>
          </>
        )}
      </div>
      <div className="menu-row flex-row">
        {gameState !== "start" && (
          <>
            <SoundButton
              soundEnabled={sound}
              onClick={handleNewGameClick}
              className="small-btn"
              testID="new-game"
            >
              New Game
            </SoundButton>
            <SoundButton
              soundEnabled={sound}
              onClick={handleRestartClick}
              className="small-btn"
              testID="restart"
            >
              Restart
            </SoundButton>
          </>
        )}
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
      </div>
    </div>
  );
}

export default Menu;
