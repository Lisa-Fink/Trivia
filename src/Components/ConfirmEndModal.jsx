import React from "react";
import SoundButton from "./SoundButton";

// Displays the confirm end game modal
// Handles users clicking to confirm or cancel
function ConfirmEndModal({ endGame, cancel, setGameState, soundEnabled }) {
  function handleConfirm() {
    setGameState(endGame);
    cancel();
  }

  const confirmBtn = (
    <SoundButton
      soundEnabled={soundEnabled}
      onClick={handleConfirm}
      testID="confirm"
    >
      Yes, Leave Current Game
    </SoundButton>
  );

  const cancelBtn = (
    <SoundButton soundEnabled={soundEnabled} onClick={cancel} testID="cancel">
      No, Cancel
    </SoundButton>
  );

  return (
    <div className="modal-container" data-testid="modal-component">
      <div className="modal-body center-col">
        <h3>Are You Sure You Want to Leave The Current Game?</h3>
        {confirmBtn}
        {cancelBtn}
      </div>
    </div>
  );
}

export default ConfirmEndModal;
