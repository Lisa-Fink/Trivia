import React from "react";
import useSound from "use-sound";
import biteSfx from "../assets/bite.mp3";
import popSfx from "../assets/pop.mp3";

function SoundButton({ children, onClick, className, disabled, soundEnabled }) {
  const [play] = useSound(biteSfx, { soundEnabled });
  const [playClick] = useSound(popSfx, { soundEnabled });

  const buttonProps = {
    onMouseEnter: play,
    onFocus: play,
  };

  buttonProps.onClick = () => {
    playClick();
    if (onClick) onClick();
  };
  if (className) buttonProps.className = className;
  if (disabled) buttonProps.disabled = disabled;

  return <button {...buttonProps}>{children}</button>;
}
export default SoundButton;
