import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState();
  // const [checked, setChecked] = useState();

  // logica para pegar o id da Receita e o tipo da receita
  const history = useHistory();
  const { location: { pathname } } = history;
  const maxNumber = 6;
  const id = pathname.replace(/[^0-9]/g, '');
  const type = pathname.slice(1, maxNumber);

  // const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // const recipe = recipesInProgress[0];
  // console.log(recipesInProgress[0]);

  const getInProgress = async (url, key) => {
    const response = await fetch(`${url}${id}`);
    const data = await response.json();
    console.log(data[key][0]);
    setRecipe(data[key][0]);
  };

  useEffect(() => {
    if (type === 'foods') {
      getInProgress('https://www.themealdb.com/api/json/v1/1/lookup.php?i=', 'meals');
    } else {
      getInProgress('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=', 'drinks');
    }
  }, []);

  console.log(recipe);

  const arrIngredients = [];

  if (recipe) {
    const arrRecipes = Object.entries(recipe);
    arrRecipes.forEach((e) => {
      if (e[0].includes('strIngredient') && e[1] !== null && e[1] !== '') {
        arrIngredients.push(e[1]);
      }
    });
  }

  const handleChecked = ({ target }) => {
    const { checked, value, name } = target;
    console.log(checked);
    console.log(value);
    console.log(name);
  };

  return (
    <div>
      <h1 data-testid="recipe-title">{ recipe?.strMeal || recipe?.strDrink }</h1>
      <h2 data-testid="recipe-category">
        { recipe?.strCategory || recipe?.strAlcoholic }
      </h2>
      <img
        data-testid="recipe-photo"
        src={ recipe?.strMealThumb || recipe?.strDrinkThumb }
        alt={ recipe?.strMeal || recipe?.strDrink }
      />
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favoritar" />
      </button>
      { arrIngredients.map((item, index) => (
        <div
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <p>{`${item}`}</p>
          <label htmlFor="checkRecipe">
            <input
              type="checkbox"
              id="checkRecipe"
              name={ recipe?.idMeal || recipe?.idDrink }
              value={ item }
              onChange={ handleChecked }
            />
          </label>
        </div>
      )) }
      <p>Instruções</p>
      <p data-testid="instructions">{recipe?.strInstructions}</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Finalizar
      </button>
    </div>
  );
}

export default RecipeInProgress;
