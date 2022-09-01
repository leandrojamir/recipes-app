import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './recipesButton.css';

function StartContinueButton({ type }) {
  const [showStartBtn, setShowStartBtn] = useState(true);
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.replace(/[^0-9]/g, '');

  function handleStartRecipe() {
    return (type === 'meals'
      ? history.push(`/foods/${id}/in-progress`)
      : history.push(`/drinks/${id}/in-progress`)
    );
  }

  function getCheck() {
    const getProgress = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || { meals: {}, cocktails: {} };
    if (getProgress.meals && getProgress.meals[id]) {
      return setShowStartBtn(false);
    }
    if (getProgress.cocktails && getProgress.cocktails[id]) {
      return setShowStartBtn(false);
    }
  }

  useEffect(() => {
    getCheck();
  }, []);

  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="start-button"
      onClick={ handleStartRecipe }
    >
      { showStartBtn ? 'Start Recipe' : 'Continue Recipe'}
    </button>
  );
}

StartContinueButton.propTypes = {
  type: PropTypes.string.isRequired,
};

export default StartContinueButton;
