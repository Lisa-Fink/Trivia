import { useState, useEffect } from "react";
import useAnswerVerification from "../Hooks/useAnswerVerification";

const useAnswerData = (question) => {
  const {
    isCorrect,
    correctAnswer,
    answerLoading,
    verifyAnswer,
    resetAnswerState,
  } = useAnswerVerification();
  const [answer, setAnswer] = useState(null);
  const [isAnswering, setIsAnswering] = useState(true);

  // resets answer states when the question is updated
  useEffect(() => {
    resetAnswerState();
    setAnswer(null);
    setIsAnswering(true);
  }, [question]);

  return {
    isCorrect,
    correctAnswer,
    answerLoading,
    verifyAnswer,
    resetAnswerState,
    answer,
    setAnswer,
    isAnswering,
    setIsAnswering,
  };
};

export default useAnswerData;
