import React from "react";

function Category() {
  const categories = [
    "Geography",
    "Movies",
    "Music",
    "History",
    "Science/Tech",
    "Random",
  ];

  const categoryButtons = categories.map((category) => (
    <button>{category}</button>
  ));
  return (
    <div className="center-col">
      <div className="large-text">Select a category to get started</div>
      <div className="btn-container">{categoryButtons}</div>
    </div>
  );
}

export default Category;
