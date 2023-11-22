import React, { useContext } from "react";
import useSound from "use-sound";
import biteSfx from "../assets/bite.mp3";
import popSfx from "../assets/pop.mp3";
import { SoundContext } from "../Context/SoundContext";

// Returns a button with sounds for mouseEnter/focus and click
function SoundButton({ children, onClick, className, disabled, testID }) {
  const { sound: soundEnabled } = useContext(SoundContext);
  // sets up sounds to variables (soundEnabled handles mute/unmute)
  const [playHover] = useSound(biteSfx, { soundEnabled });
  const [playClick] = useSound(popSfx, { soundEnabled });

  // attach all props to the button
  const buttonProps = {
    onMouseEnter: playHover,
    onFocus: playHover,
  };
  buttonProps.onClick = () => {
    playClick();
    if (onClick) onClick();
  };
  if (className) buttonProps.className = className;
  if (disabled) buttonProps.disabled = disabled;
  if (testID) buttonProps["data-testid"] = testID;

  return <button {...buttonProps}>{children}</button>;
}
export default SoundButton;
