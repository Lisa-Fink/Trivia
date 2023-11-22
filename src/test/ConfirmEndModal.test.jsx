import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ConfirmEndModal from "../Components/ConfirmEndModal";
import wrapSoundContext from "../test-utils/wrapSoundContext";

describe("Confirm End Modal test", () => {
  test("Should render modal with submit/cancel buttons", () => {
    render(wrapSoundContext(<ConfirmEndModal setShowConfirm={vi.fn()} />));
    const confirmBtn = screen.queryByTestId("confirm");
    const cancelBtn = screen.queryByTestId("cancel");
    expect(confirmBtn).not.toBeNull();
    expect(cancelBtn).not.toBeNull();
  });
  test("Should trigger confirm on button click by calling setGameState with \
        endGame as arg", () => {
    // endGame, cancel, setGameState, soundEnabled
    const endGameMock = vi.fn();
    const setGameStateMock = vi.fn();
    const cancelMock = vi.fn();
    render(
      wrapSoundContext(
        <ConfirmEndModal
          endGame={endGameMock}
          setGameState={setGameStateMock}
          setShowConfirm={cancelMock}
        />
      )
    );
    const confirmBtn = screen.queryByTestId("confirm");
    fireEvent.click(confirmBtn);
    // check that setGameState gets called with endGame as arg
    expect(setGameStateMock).toHaveBeenCalledWith(endGameMock);
    // then check if cancel is called, which closes the modal
    expect(cancelMock).toHaveBeenCalledOnce();
  });
  test("Should call cancel on cancel btn click", () => {
    const cancelMock = vi.fn();
    render(wrapSoundContext(<ConfirmEndModal setShowConfirm={cancelMock} />));
    const cancelBtn = screen.queryByTestId("cancel");
    fireEvent.click(cancelBtn);
    expect(cancelMock).toHaveBeenCalledOnce();
  });
});
