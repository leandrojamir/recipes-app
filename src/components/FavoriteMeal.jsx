import React from 'react';
import PropTypes from 'prop-types';
import { ContextRecipes } from '../context/recipesContext';
import useLocalStorage from '../hook/useLocalStorage';
import Heart from '../images/whiteHeartIcon.svg';
import HeartBlack from '../images/blackHeartIcon.svg';

export default function FavoriteMeal({ typeFavorite }) {
  const { recipe } = ContextRecipes();
  const [recipesFood, setRecipesFood] = useLocalStorage('favoriteRecipes', []);
  // useEffect(() => {
  //   setRecipesFood(JSON.parse(localStorage.getItem('favoriteRecipes')));
  // }, []);
  // console.log(recipesFood);
  const handleClickFavoriteMeals = () => {
    const favoriteMeal = {
      id: recipe.idMeal || recipe.idDrink,
      type: typeFavorite,
      nationality: recipe?.strArea || '',
      category: recipe?.strCategory,
      alcoholicOrNot: recipe?.strAlcoholic || '',
      name: recipe?.strMeal || recipe?.strDrink,
      image: recipe?.strMealThumb || recipe?.strDrinkThumb,
    };
    // let favoriteRecipes = JSON.parse(
    //   localStorage.getItem('favoriteRecipes'),
    // );
    // if (!favoriteRecipes) {
    //   favoriteRecipes = [];
    // }

    // localStorage.setItem(
    //   'favoriteRecipes', JSON.stringify([...favoriteRecipes, favoriteMeal]),
    // );
    setRecipesFood([
      ...recipesFood,
      favoriteMeal,
    ]);
  };
  console.log('recipe', recipe);
  console.log('favorite', recipesFood);

  const verifiqueId = (typeFavorite === 'drink' ? recipe?.idDrink : recipe?.idMeal);

  const handleClickRemoveFavoriteRecipe = () => {
    const filterFavorite = recipesFood
      .filter((item) => item.id !== verifiqueId);
    setRecipesFood(filterFavorite);
  };

  return (
    <div>
      { recipesFood?.some((recipeId) => recipeId.id === verifiqueId) ? (
        <button
          type="button"
          onClick={ handleClickRemoveFavoriteRecipe }
        >

          <img
            data-testid="favorite-btn"
            src={ HeartBlack }
            // { HeartBlack }
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

FavoriteMeal.propTypes = {
  typeFavorite: PropTypes.string.isRequired,
};
