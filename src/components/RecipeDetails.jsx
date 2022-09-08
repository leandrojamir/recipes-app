import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ShareButton from './ShareButton';
// import FavoriteDrink from './FavoriteDrink';
import StartContinueButton from './StartContinueButton';
import { ContextRecipes } from '../context/recipesContext';
import FavoriteMeal from './FavoriteMeal';

function RecipeDetails({ type }) {
  const history = useHistory();
  const { recipe, setRecipe } = ContextRecipes();
  const [showDone, setShowDone] = useState(true);

  const { location: { pathname } } = history;
  const id = pathname.replace(/[^0-9]/g, '');

  const getRecipe = async (url) => {
    const result = await fetch(`${url}${id}`);
    const data = await result.json();
    setRecipe(data[type][0]);
  };

  function checkDone() {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setShowDone(getDoneRecipes.some((done) => done.id === id));
  }

  useEffect(() => {
    if (type === 'meals') {
      getRecipe('https://www.themealdb.com/api/json/v1/1/lookup.php?i=');
      // getSugestions('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else {
      getRecipe('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=');
      // getSuge.php?s=');
    }
    checkDone();
  }, []);

  const arrIngredients = [];
  const arrQuantidades = [];

  // logica para pegar os valores dos ingredientes e quantidades do Recipe
  if (recipe) {
    const arrRecipes = Object.entries(recipe);
    arrRecipes.forEach((e) => {
      // '' and null -> false
      if (e[0].includes('strIngredient') && e[1]) {
        arrIngredients.push(e[1]);
      }
      if (e[0].includes('strMeasure') && e[1]) {
        arrQuantidades.push(e[1]);
      }
    });
  }

  return (
    <div>
      { recipe && (
        <>
          <h1 data-testid="recipe-title">
            { recipe?.strMeal || recipe?.strDrink }
          </h1>
          <h2 data-testid="recipe-category">
            { type === 'meals' ? recipe?.strCategory : recipe?.strAlcoholic }
          </h2>
          <img
            data-testid="recipe-photo"
            src={ recipe?.strMealThumb || recipe?.strDrinkThumb }
            alt={ recipe?.strMeal || recipe?.strDrink }
          />
          <div>
            <ShareButton />

            <FavoriteMeal typeFavorite={ type === 'meals' ? 'food' : 'drink' } />

          </div>
          { arrIngredients.map((e, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${e} - ${arrQuantidades[index]}`}
            </p>
          )) }
          <p data-testid="instructions">{recipe?.strInstructions}</p>
          <video
            width="400"
            controls="controls"
            data-testid="video"
          >
            <track kind="captions" src={ recipe?.strYoutube } controls="controls" />
          </video>
        </>
      ) }
      { !showDone && <StartContinueButton type={ type } /> }
    </div>
  );
}

RecipeDetails.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeDetails;
