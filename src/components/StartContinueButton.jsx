import React from 'react';
import './recipesButton.css';

function StartContinueButton() {
  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="start-button"
    >
      Start Recipe
    </button>
  );
}

export default StartContinueButton;
