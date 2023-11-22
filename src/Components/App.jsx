import "../styles/App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Play from "./Play";
import Instructions from "./Instructions";
import { SoundContext } from "../Context/SoundContext";
import useQuestionData from "../Hooks/useQuestionData";
import useAnswerData from "../Hooks/useAnswerData";
import useGameData from "../Hooks/useGameData";

function App() {
  const [sound, toggleSound] = useSoundSetting();
  const questionData = useQuestionData();
  const answerData = useAnswerData(questionData.question);
  const gameData = useGameData(
    answerData.isCorrect,
    answerData.isAnswering,
    sound,
    questionData.fetchQuestion
  );
  return (
    <Router basename="/Trivia">
      <Header />
      <main>
        <SoundContext.Provider value={{ sound, toggleSound }}>
          <Routes>
            {/* renders Play Component for "/" and "/play" paths */}
            {renderMultiPaths(
              ["/", "/play"],
              <Play
                gameData={gameData}
                questionData={questionData}
                answerData={answerData}
              />
            )}
            <Route path="/instructions" element={<Instructions />} />
          </Routes>
        </SoundContext.Provider>
      </main>
    </Router>
  );
}

export default App;

function useSoundSetting() {
  const [sound, setSound] = useState(true);
  return [sound, () => setSound(!sound)];
}

// passes multiples paths. Allows element to be defined 1 time, but have 2+ paths
const renderMultiPaths = (paths, Element) =>
  paths.map((path) => <Route key={path} path={path} element={Element} />);
