import { useState } from "react";
import { getRandomCategory, categoryToApiName } from "../utils/categories";
const NUM_ANSWERS = 4;
const MINIMUM_DELAY = 500;

// Handles question states, and api call for retrieving questions
function useQuestionData() {
  const [question, setQuestion] = useState(null);
  const [questionLoading, setQuestionLoading] = useState(true);

  const api_address = import.meta.env.VITE_API_ADDRESS;

  const isQuestion = (question) => {
    return (
      question.question &&
      question.questionID &&
      question.answers &&
      question.answers.length === NUM_ANSWERS &&
      question.answers.every(
        (answer) => answer !== null && answer !== undefined && answer.length > 0
      )
    );
  };

  const fetchQuestionData = async (category) => {
    const startTime = Date.now();
    const response = await fetch(
      `${api_address}/${categoryToApiName[category]}`
    );
    // waits at least 500 ms before continuing from api call
    const timeTaken = Date.now() - startTime;
    if (timeTaken < MINIMUM_DELAY)
      await new Promise((resolve) => setTimeout(resolve, 500 - timeTaken));
    if (!response.ok) throw new Error("status: " + response.status);
    const questionData = await response.json();
    if (!isQuestion(questionData)) throw new Error("Invalid question data");
    questionData.category = category;
    return questionData;
  };

  // gets a question from a given category by making an api call
  // sets question state to the fetched question
  const fetchQuestion = async (category) => {
    let curCategory = category;
    // if category is random, generates a random category before making req
    if (category === "Random") curCategory = getRandomCategory();
    setQuestionLoading(true);
    try {
      const questionData = await fetchQuestionData(curCategory);
      setQuestion(questionData);
    } catch (error) {
      // null question will display error information to user
      setQuestion(null);
    }
    setQuestionLoading(false);
  };

  return { question, questionLoading, fetchQuestion };
}

export default useQuestionData;
