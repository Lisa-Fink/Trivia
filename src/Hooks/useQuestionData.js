import React, { useState, useEffect } from "react";

function useQuestionData() {
  const [question, setQuestion] = useState(null);
  const [questionLoading, setQuestionLoading] = useState(true);
  const [error, setError] = useState(null);

  const hardcodedQuestion =
    "In which US state is the active Mount Rainier volcano located?";
  const hardcodedAnswers = ["Ohio", "New York", "Washington", "Michigan"];
  const hardcodedQuestionObj = {
    questionID: 1,
    question: hardcodedQuestion,
    answers: hardcodedAnswers,
    category: "Geography",
  };

  const fetchQuestion = async () => {
    // Hardcoded for now. Will add fetch
    setQuestionLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setQuestionLoading(false);
    setQuestion(hardcodedQuestionObj);
  };

  return { question, questionLoading, error, fetchQuestion };
}

export default useQuestionData;
