import React from "react";

function Category({ category, setCategory, submitCategory }) {
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
    <button
      className={category == curCategory ? "selected-btn" : ""}
      key={index}
      onClick={() => setCategory(curCategory)}
    >
      {curCategory}
    </button>
  ));
  return (
    <div className="center-col">
      <div className="large-text">Select a category to get started</div>
      <div className="btn-container">{categoryButtons}</div>
      <div>
        <button className="wide-btn" onClick={handleSubmitCategory}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Category;
