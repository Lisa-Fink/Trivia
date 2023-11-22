import { useState } from "react";
import { getRandomCategory, categoryToApiName } from "../utils/categories";

function useQuestionData() {
  const [question, setQuestion] = useState(null);
  const [questionLoading, setQuestionLoading] = useState(true);
  const [error, setError] = useState(null);

  const api_address = import.meta.env.VITE_API_ADDRESS;

  // gets a question from a given category by making an api call
  // sets question state to the fetched question
  const fetchQuestion = async (category) => {
    let curCategory = category;
    // if category is random, generates a random category before making req
    if (category === "Random") curCategory = getRandomCategory();
    setQuestionLoading(true);
    try {
      const startTime = Date.now();
      const response = await fetch(
        `${api_address}/${categoryToApiName[curCategory]}`
      );
      // waits at least 500 ms before continuing from api call
      const timeTaken = Date.now() - startTime;
      if (timeTaken < 500)
        await new Promise((resolve) => setTimeout(resolve, 500 - timeTaken));

      setQuestionLoading(false);
      if (!response.ok) throw new Error("status: " + response.status);
      const questionData = await response.json();
      questionData.category = curCategory;
      setQuestion(questionData);
    } catch (error) {
      console.error("handle fetch error", error);
      // TODO: update state for error
    }
  };

  return { question, questionLoading, error, fetchQuestion };
}

export default useQuestionData;
