import React from "react";
import SoundButton from "./SoundButton";
import categories from "../utils/categories";

// Displays the Category Selection Screen
// Handles users clicking on category buttons, and submitting the category choice
function Category({ category, setCategory, setGameState }) {
  const submitCategory = () => setGameState("question");
  const handleSubmitCategory = () => category && submitCategory();

  const categoryClass = (curCategory) =>
    category == curCategory ? "selected-btn" : "";

  const categoryButtons = categories.map((curCategory, index) => (
    <SoundButton
      className={categoryClass(curCategory)}
      key={index}
      onClick={() => setCategory(curCategory)}
    >
      {curCategory}
    </SoundButton>
  ));

  const submitButton = (
    <SoundButton
      className="wide-btn"
      onClick={handleSubmitCategory}
      testID="submit-btn"
    >
      Submit
    </SoundButton>
  );

  return (
    <div className="center-col" data-testid="category-component">
      <h1>Select a category to get started</h1>
      <div className="btn-container">{categoryButtons}</div>
      <div>{submitButton}</div>
    </div>
  );
}

export default Category;
