import React from "react";

function Instructions() {
  return (
    <div className="regular-text instructions">
      <h1>Instructions</h1>
      <div>
        With just a few simple steps, you'll be on your way to becoming a trivia
        champion:
      </div>
      <ul>
        <li>
          <h3>Select a Category:</h3> Choose from a variety of categories. Click
          on your category choice, and click the “Submit” button to lock in your
          category.
        </li>
        <li>
          <h3>Answer Questions:</h3> You’ll be presented with a question in the
          category of your choice with 4 answer choices.
        </li>
        <li>
          <h3>Choose your Answer:</h3> Click on the answer you believe is
          correct.
        </li>
        <li>
          <h3>Submit your Answer:</h3> After selecting your answer, click the
          “Submit” button to lock in your choice.
        </li>
        <li>
          <h3>See the Result:</h3> You’ll see if your answer was correct or not.
          Keep your eyes on the screen for the reveal.
        </li>
        <li>
          <h3>Earn Points for Correct Answers:</h3> If you’re right, you’ll earn
          100 points, and have the option to continue or end the game with your
          current score.
        </li>
        <li>
          <h3>Game Over for Incorrect Answers:</h3> If your answer is incorrect,
          you will lose all your points, and you will have the option to start
          over in the same category or in a new category.
        </li>
      </ul>
    </div>
  );
}

export default Instructions;
