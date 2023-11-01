import React from "react";
import SoundButton from "./SoundButton";

function ConfirmEndModal({ endGame, cancel, setGameState }) {
  function handleConfirm() {
    setGameState(endGame);
    cancel();
  }
  return (
    <div className="modal-container">
      <div className="modal-body center-col">
        <h3>Are You Sure You Want to Leave The Current Game?</h3>
        <SoundButton onClick={handleConfirm}>
          Yes, Leave Current Game
        </SoundButton>
        <SoundButton onClick={cancel}>No, Cancel</SoundButton>
      </div>
    </div>
  );
}

export default ConfirmEndModal;
