import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hook/useLocalStorage';
import Heart from '../images/whiteHeartIcon.svg';
import HeartBlack from '../images/blackHeartIcon.svg';

function FavoriteRecipeInProgress({ typeFavorite, idRecipe }) {
  const [recipesFood, setRecipesFood] = useLocalStorage('favoriteRecipes', []);
  const [recipe, setRecipe] = useState();

  const getInProgress = async (url, key) => {
    const response = await fetch(`${url}${idRecipe}`);
    const data = await response.json();
    setRecipe(data[key][0]);
  };

  useEffect(() => {
    if (typeFavorite === 'food') {
      getInProgress('https://www.themealdb.com/api/json/v1/1/lookup.php?i=', 'meals');
    } else {
      getInProgress('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=', 'drinks');
    }
  }, []);

  const handleClickFavoriteMeals = () => {
    const favorite = {
      id: idRecipe,
      type: typeFavorite,
      nationality: recipe?.strArea || '',
      category: recipe?.strCategory,
      alcoholicOrNot: recipe?.strAlcoholic || '',
      name: recipe?.strMeal || recipe?.strDrink,
      image: recipe?.strMealThumb || recipe?.strDrinkThumb,
    };
    setRecipesFood([
      ...recipesFood,
      favorite,
    ]);
  };

  const handleClickRemoveFavoriteRecipe = () => {
    const filterFavorite = recipesFood
      .filter((item) => item.id !== idRecipe);
    setRecipesFood(filterFavorite);
  };

  return (
    <div>
      { recipesFood?.some((recipeId) => recipeId.id === idRecipe) ? (
        <button
          type="button"
          onClick={ handleClickRemoveFavoriteRecipe }
        >

          <img
            data-testid="favorite-btn"
            src={ HeartBlack }
            alt="coracao"
          />
        </button>
      ) : (
        <button
          type="button"
          onClick={ handleClickFavoriteMeals }
        >
          <img
            data-testid="favorite-btn"
            src={ Heart }
            alt="coracao"
          />
        </button>

      )}
    </div>
  );
}

FavoriteRecipeInProgress.propTypes = {
  typeFavorite: PropTypes.string.isRequired,
  idRecipe: PropTypes.string.isRequired,
};

export default FavoriteRecipeInProgress;
