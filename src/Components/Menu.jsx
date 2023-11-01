import React from "react";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";

function Menu({ sound, score, category, toggleSound, gameState }) {
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
        <button className="small-btn">New Game</button>
        <button className="small-btn">Restart</button>
        {sound ? (
          <FaVolumeHigh className="regular-text" onClick={toggleSound} />
        ) : (
          <FaVolumeXmark className="regular-text" onClick={toggleSound} />
        )}
      </div>
    </div>
  );
}

export default Menu;
