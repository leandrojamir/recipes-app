import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { ContextRecipes } from '../context/recipesContext';

function RecipeInProgress() {
  const { inProgressList } = ContextRecipes();

  console.log('inProgress', inProgressList);
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressList));

  return (
    <div>
      <h1 data-testid="recipe-title">Titulo</h1>
      {/* <img data-testid="recipe-photo" src={} alt={} /> */}
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button data-testid="share-btn" type="button">
        <img src={ whiteHeartIcon } alt="favoritar" />
      </button>
      <p data-testid="recipe-category">Categoria</p>
      {/* <p data-testid="${index}-ingredient-step">Ingredientes</p> */}
      <label htmlFor="checkRecipe">
        <input type="checkbox" id="checkRecipe" name="checkRecipe" />
      </label>
      <p data-testid="instructions">Instruções</p>
      <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
    </div>
  );
}

export default RecipeInProgress;
