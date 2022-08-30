import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './recipesButton.css';
import { ContextRecipes } from '../context/recipesContext';

function StartContinueButton({ type }) {
  const { recipe } = ContextRecipes();
  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.replace(/[^0-9]/g, '');
  console.log('typeBtn', type);
  console.log('id', id);
  console.log(recipe);

  const arrIngredients = [];

  // logica para pegar os valores dos ingredientes e quantidades do Recipe
  if (recipe) {
    const arrRecipes = Object.entries(recipe);
    arrRecipes.forEach((e) => {
      if (e[0].includes('strIngredient') && e[1]) {
        arrIngredients.push(e[1]);
      }
    });
  }

  const salveInKeyInProgress = () => {
    const get = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log('get', get);
    if (type === 'meals') {
      const obj = {
        ...get,
        meals: {
          ...get.meals,
          [id]: arrIngredients,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    } else {
      const obj = {
        ...get,
        cocktails: {
          ...get.cocktails,
          [id]: arrIngredients,
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
  };

  salveInKeyInProgress();

  function handleStartRecipe() {
    // const get = JSON.parse(localStorage.getItem('inProgressRecipes')) || [];
    // console.log('typeStart', type);

    // localStorage.setItem('obj', JSON.stringify(obj));

    // verificar se a chave já possui no localStore ->  window.localStorage
    // localStorage.setItem('inProgressRecipes', JSON.stringify([...get, recipe]));

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
