import { useState, useEffect } from "react";
import useSound from "use-sound";
import correctSfx from "../assets/fanfare.mp3";
import incorrectSfx from "../assets/dun-dun-dun.mp3";
const CORRECT_ANSWER_POINTS = 100;

function useScore(isCorrect, isAnswering, sound) {
  const [score, setScore] = useState(0);
  const resetScore = () => setScore(0);
  const increaseScore = () => setScore(score + CORRECT_ANSWER_POINTS);

  const [playCorrect] = useSound(correctSfx, { soundEnabled: sound });
  const [playIncorrect] = useSound(incorrectSfx, { soundEnabled: sound });

  // update score and plays correct/incorrect sound
  // when answer verification completes (isCorrect updates and not isAnswering)
  useEffect(() => {
    if (!isAnswering) {
      if (isCorrect) {
        increaseScore();
        playCorrect();
      } else {
        resetScore();
        playIncorrect();
      }
    }
  }, [isCorrect]);

  return [score, resetScore, increaseScore];
}
export default useScore;
