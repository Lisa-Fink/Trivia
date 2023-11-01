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
            <div>Score: {score}</div>
            <div>Category: {category}</div>
          </>
        )}
      </div>
      <div className="menu-row flex-row">
        {gameState !== "start" && (
          <>
            <SoundButton onClick={handleNewGameClick} className="small-btn">
              New Game
            </SoundButton>
            <SoundButton onClick={handleRestartClick} className="small-btn">
              Restart
            </SoundButton>
          </>
        )}
        <button
          className="toggle-sound-btn"
          aria-label={sound ? "Mute Sound" : "Unmute Sound"}
          onClick={toggleSound}
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
