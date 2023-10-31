import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Play from "./Components/Play";
import Instructions from "./Components/Instructions";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Play />} />
          <Route path="/play" element={<Play />} />
          <Route path="/instructions" element={<Instructions />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
