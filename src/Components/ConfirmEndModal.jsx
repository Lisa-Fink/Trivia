import React from "react";
import SoundButton from "./SoundButton";

function ConfirmEndModal({ endGame, cancel, setGameState, soundEnabled }) {
  function handleConfirm() {
    setGameState(endGame);
    cancel();
  }
  return (
    <div className="modal-container" data-testid="modal-component">
      <div className="modal-body center-col">
        <h3>Are You Sure You Want to Leave The Current Game?</h3>
        <SoundButton
          soundEnabled={soundEnabled}
          onClick={handleConfirm}
          testID="confirm"
        >
          Yes, Leave Current Game
        </SoundButton>
        <SoundButton
          soundEnabled={soundEnabled}
          onClick={cancel}
          testID="cancel"
        >
          No, Cancel
        </SoundButton>
      </div>
    </div>
  );
}

export default ConfirmEndModal;
