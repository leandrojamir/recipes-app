import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  // const [recipes, setRecipes] = useState();
  // receber dados do localStore
  const recipes = JSON.parse(localStorage.getItem('recipeInProgress'));
  console.log(recipes);
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
      <p data-testid="${index}-ingredient-step">Ingredientes</p>
      <p data-testid="instructions">Instruções</p>
      <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
    </div>
  );
}

export default RecipeInProgress;
