import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './recipesButton.css';
import { ContextRecipes } from '../context/recipesContext';

function StartContinueButton({ type }) {
  const { recipe, setInProgressList, inProgressList } = ContextRecipes();
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.replace(/[^0-9]/g, '');

  function handleStartRecipe() {
    // vai alterar o estado da lista que recebe as receitas em progresso
    setInProgressList([
      ...inProgressList,
      recipe,
    ]);

    return (type === 'meals'
      ? history.push(`/foods/${id}/in-progress`)
      : history.push(`/drinks/${id}/in-progress`)
    );
  }

  console.log('Recipes', recipe);
  console.log('inProgress', inProgressList);

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
