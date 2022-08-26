import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Heart from '../images/whiteHeartIcon.svg';
import ShareButton from './ShareButton';
import StartContinueButton from './StartContinueButton';

function RecipeDetails({ type }) {
  const history = useHistory();
  const [recipe, setRecipe] = useState();
  // const [sugestions, setSugestions] = useState([]);
  const { location: { pathname } } = history;
  const id = pathname.replace(/[^0-9]/g, '');

  const getRecipe = async (url) => {
    const result = await fetch(`${url}${id}`);
    const data = await result.json();
    setRecipe(data[type][0]);
  };

  // const getSugestions = async (url) => {
  //   const maxNumber = 6;
  //   const variavel = 0.5;
  //   const result = await fetch(url);
  //   const data = await result.json();
  //   const dataSugestions = data[type];
  //   // embaralhar as sugestões vinda da api
  //   const sugestionsSort = dataSugestions
  //     .sort(() => Math.random() - variavel)
  //     .slice(0, maxNumber);
  //   setSugestions(sugestionsSort);
  // };

  useEffect(() => {
    if (type === 'meals') {
      getRecipe('https://www.themealdb.com/api/json/v1/1/lookup.php?i=');
      // getSugestions('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else {
      getRecipe('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=');
      // getSugestions('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
  }, []);

  const arrIngredients = [];
  const arrQuantidades = [];

  if (recipe) {
    const arrRecipes = Object.entries(recipe);
    arrRecipes.forEach((e) => {
      if (e[0].includes('strIngredient') && e[1] !== null && e[1] !== '') {
        arrIngredients.push(e[1]);
      }
      if (e[0].includes('strMeasure') && e[1] !== null && e[1] !== '') {
        arrQuantidades.push(e[1]);
      }
    });
  }

  return (
    <div>
      { recipe && (
        <>
          <h1 data-testid="recipe-title">
            { type === 'meals'
              ? recipe?.strMeal
              : recipe?.strDrink }
          </h1>
          <h2 data-testid="recipe-category">
            { type === 'meals'
              ? recipe?.strCategory
              : recipe?.strAlcoholic }
          </h2>
          <img
            data-testid="recipe-photo"
            src={ type === 'meals'
              ? recipe?.strMealThumb
              : recipe?.strDrinkThumb }
            alt={ type === 'meals'
              ? recipe?.strMeal
              : recipe?.strDrink }
          />
          <div>
            <ShareButton />
            <button type="button" data-testid="favorite-btn">
              <img src={ Heart } alt="coracao" />
            </button>
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
          {/* <p>Sugestions</p>
          { sugestions.map((e, index) => (
            <p
              key={ index }
              data-testid={ `${index}-recomendation-card` }
            >
              { type === 'meals' ? e.strMeal : e.strDrink }
            </p>
          )) } */}
          <video
            width="400"
            controls="controls"
            data-testid="video"
          >
            <track kind="captions" src={ recipe?.strYoutube } controls="controls" />
          </video>
        </>
      ) }
      <StartContinueButton />
    </div>
  );
}

RecipeDetails.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeDetails;
