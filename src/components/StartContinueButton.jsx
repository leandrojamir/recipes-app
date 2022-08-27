import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './recipesButton.css';
import { ContextRecipes } from '../context/recipesContext';

function StartContinueButton({ type }) {
  const { recipe } = ContextRecipes();
  const [inProgressList, setInProgressList] = useState({});
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.replace(/[^0-9]/g, '');

  function handleStartRecipe() {
    if (type === 'meals') {
      const { idMeal } = recipe;
      setInProgressList({
        ...inProgressList,
        [idMeal]: recipe,
      });
      console.log('entrou', idMeal);
    } else {
      const { idDrink } = recipe;
      setInProgressList({
        ...inProgressList,
        [idDrink]: recipe,
      });
      console.log('entrou', idDrink);
    }
    console.log('recipe', recipe.idMeal);
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressList));
    // setInProgressList(recipe);
    console.log(inProgressList);
    return (type === 'meals'
      ? history.push(`/foods/${id}/in-progress`)
      : history.push(`/drinks/${id}/in-progress`)
    );
  }
  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="start-button"
      onClick={ handleStartRecipe }
    >
      Start Recipe
    </button>
  );
}

StartContinueButton.propTypes = {
  type: PropTypes.string.isRequired,
};
export default StartContinueButton;
