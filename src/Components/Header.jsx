import React from "react";

function Header() {
  return (
    <header className="flex-row light-text">
      <div className="large-text lower">Trivia App</div>
      <nav className="regular-text flex-row">
        <a href="#">Play</a>
        <a href="#">Instructions</a>
      </nav>
    </header>
  );
}

export default Header;
