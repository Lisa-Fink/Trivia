import React from "react";

function Start({ startGame }) {
  return (
    <div className="large-text center-col">
      <div>Test your knowledge of different subjects</div>

      <div>Press START to begin!</div>

      <button onClick={startGame} className="light-text medium-text">
        START
      </button>

      <div>Then you will choose a category</div>
    </div>
  );
}

export default Start;
