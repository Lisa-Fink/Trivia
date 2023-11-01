import React from "react";

function ConfirmEndModal({ endGame, cancel, setGameState }) {
  function handleConfirm() {
    setGameState(endGame);
    cancel();
  }
  return (
    <div className="modal-container">
      <div className="modal-body center-col">
        <h3>Are You Sure You Want to Leave The Current Game?</h3>
        <button onClick={handleConfirm}>Yes, Leave Current Game</button>
        <button onClick={cancel}>No, Cancel</button>
      </div>
    </div>
  );
}

export default ConfirmEndModal;
