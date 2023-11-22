import { useState } from "react";
import { categoryToApiName } from "../utils/categories";

// Handles verifying answers with api call, and
// updating states related to verified answers
function useAnswerVerification() {
  const [isCorrect, setIsCorrect] = useState(null);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const api_address = import.meta.env.VITE_API_ADDRESS;

  const fetchAnswerData = async (category, questionID) => {
    const startTime = Date.now();
    const response = await fetch(
      `${api_address}/${categoryToApiName[category]}/${questionID}/answer`
    );
    // waits at least 500 ms before continuing from api call
    const timeTaken = Date.now() - startTime;
    if (timeTaken < 500)
      await new Promise((resolve) => setTimeout(resolve, 500 - timeTaken));
    if (!response.ok) throw new Error("status: " + response);
    return await response.json();
  };

  // verifies an answer by making an api call using the category and questionID
  // compares the answer to the correct answer, and sets isCorrect accordingly
  const verifyAnswer = async (category, questionID, answer) => {
    setAnswerLoading(true);
    try {
      const data = await fetchAnswerData(category, questionID);
      const correctAnswer = data.answer;

      // set isCorrect based on correctAnswer returned from api call
      if (answer === correctAnswer) setIsCorrect(true);
      else setIsCorrect(false);
      setCorrectAnswer(correctAnswer);
    } catch (error) {
      setCorrectAnswer(null);
    }
    setAnswerLoading(false);
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
