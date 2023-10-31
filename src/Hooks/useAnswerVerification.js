import { useState } from "react";

function useAnswerVerification() {
  const [isCorrect, setIsCorrect] = useState(null);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const verifyAnswer = async (questionID, answer) => {
    setAnswerLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setAnswerLoading(false);
    const hardcodedAnswer = "Washington";
    if (answer === hardcodedAnswer) setIsCorrect(true);
    else setIsCorrect(false);
    setCorrectAnswer(hardcodedAnswer);
  };

  // Reset answerState to null
  const resetAnswerState = () => {
    setIsCorrect(null);
    setCorrectAnswer(null);
    setAnswerLoading(false);
  };

  return {
    isCorrect,
    correctAnswer,
    answerLoading,
    verifyAnswer,
    resetAnswerState,
  };
}

export default useAnswerVerification;
