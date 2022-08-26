import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchAllMeals } from '../service/api';

function RecipeDetails({ type }) {
  const history = useHistory();
  const [recipe, setRecipe] = useState();
  // const [ingredients, setIngredients] = useState([]);
  const { location: { pathname } } = history;
  const id = pathname.replace(/[^0-9]/g, '');
  // console.log(id);

  const getRecipe = async (url) => {
    const result = await fetch(`${url}${id}`);
    const data = await result.json();
    setRecipe(data[type][0]);
    console.log(data[type][0]);
    console.log(await fetchAllMeals());
  };

  useEffect(() => {
    if (type === 'meals') {
      getRecipe('https://www.themealdb.com/api/json/v1/1/lookup.php?i=');
    } else {
      getRecipe('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=');
    }
  }, []);

  console.log('Recipe', recipe);

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

  console.log(arrIngredients);
  console.log(arrQuantidades);

  return (
    <div>
      { recipe && (
        <>
          <h1 data-testid="recipe-title">{ recipe?.strMeal }</h1>
          <img
            data-testid="recipe-photo"
            src={ recipe?.strMealThumb }
            alt={ recipe?.strArea }
          />
          <p data-testid="recipe-category">{recipe?.strCategory}</p>
          { arrIngredients.map((e, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${e} - ${arrQuantidades[index]}`}
            </p>
          )) }
          <p data-testid="instructions">{recipe?.strInstructions}</p>
          <p data-testid="${0}-recomendation-card">{recipe?.strTags}</p>
          <video
            width="400"
            controls="controls"
            data-testid="video"
          >
            <track kind="captions" src={ recipe?.strYoutube } controls="controls" />
          </video>
        </>
      ) }
    </div>
  );
}

export default RecipeDetails;
