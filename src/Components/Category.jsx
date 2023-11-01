import React, { useEffect } from "react";
import SoundButton from "./SoundButton";

function Category({ category, setCategory, submitCategory, soundEnabled }) {
  const categories = [
    "Geography",
    "Movies",
    "Music",
    "History",
    "Science/Tech",
    "Random",
  ];

  function handleSubmitCategory() {
    if (category == null) {
      // TODO: error message
    } else {
      submitCategory();
    }
  }

  const categoryButtons = categories.map((curCategory, index) => (
    <SoundButton
      soundEnabled={soundEnabled}
      className={category == curCategory ? "selected-btn" : ""}
      key={index}
      onClick={() => setCategory(curCategory)}
    >
      {curCategory}
    </SoundButton>
  ));
  return (
    <div className="center-col">
      <h1>Select a category to get started</h1>
      <div className="btn-container">{categoryButtons}</div>
      <div>
        <SoundButton
          soundEnabled={soundEnabled}
          className="wide-btn"
          onClick={handleSubmitCategory}
        >
          Submit
        </SoundButton>
      </div>
    </div>
  );
}

export default Category;
