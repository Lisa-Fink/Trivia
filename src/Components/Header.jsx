import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex-row light-text">
      <div className="large-text lower">Trivia App</div>
      <nav className="regular-text flex-row">
        <Link to="./play">Play</Link>
        <Link to="./instructions">Instructions</Link>
      </nav>
    </header>
  );
}

export default Header;
