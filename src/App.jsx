import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Play from "./Components/Play";
import Instructions from "./Components/Instructions";

import useQuestionData from "./Hooks/useQuestionData";
import useAnswerVerification from "./Hooks/useAnswerVerification";

const CORRECT_ANSWER_POINTS = 100;

function App() {
  const [gameState, setGameState] = useState("start");
  const [sound, toggleSound] = useSoundSetting();

  // game play states
  const [category, setCategory] = useState(null);
  const [score, resetScore, increaseScore] = useScore();
  const [showConfirm, setShowConfirm] = useState(null);
  const isNewGame = useRef(true);

  // question states
  const {
    isCorrect,
    correctAnswer,
    answerLoading,
    verifyAnswer,
    resetAnswerState,
  } = useAnswerVerification();
  const [answer, setAnswer] = useState(null);
  const [isAnswering, setIsAnswering] = useState(true);
  const { question, questionLoading, error, fetchQuestion } = useQuestionData();

  useEffect(() => {
    if (gameState === "question") {
      isNewGame.current = true;
      resetScore();
    }
    if (gameState === "restart") setGameState("question");
    if (gameState === "start") setCategory(null);
  }, [gameState]);

  useEffect(() => {
    resetAnswerState();
    setAnswer(null);
    setIsAnswering(true);
  }, [question]);

  const questionProps = {
    isCorrect,
    correctAnswer,
    answerLoading,
    verifyAnswer,
    answer,
    setAnswer,
    isAnswering,
    setIsAnswering,
    question,
    questionLoading,
    error,
    fetchQuestion,
  };

  const playProps = {
    gameState,
    setGameState,
    sound,
    toggleSound,
    category,
    setCategory,
    score,
    resetScore,
    increaseScore,
    showConfirm,
    setShowConfirm,
    isNewGame,
    questionProps,
  };

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Play {...playProps} />} />
          <Route path="/play" element={<Play {...playProps} />} />
          <Route path="/instructions" element={<Instructions />} />
        </Routes>
      </main>
    </Router>
  );
}

function useSoundSetting() {
  const [sound, setSound] = useState(true);
  return [sound, () => setSound(!sound)];
}

function useScore() {
  const [score, setScore] = useState(0);
  const resetScore = () => setScore(0);
  const increaseScore = () => setScore(score + CORRECT_ANSWER_POINTS);
  return [score, resetScore, increaseScore];
}

export default App;
