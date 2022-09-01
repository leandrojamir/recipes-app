import React from 'react';
import { ContextRecipes } from '../context/recipesContext';
import useLocalStorage from '../hook/useLocalStorage';
import Heart from '../images/whiteHeartIcon.svg';
import HeartBlack from '../images/blackHeartIcon.svg';

export default function FavoriteMeal() {
  const { recipe } = ContextRecipes();
  const [recipesFood, setRecipesFood] = useLocalStorage('favoriteRecipes', []);

  // useEffect(() => {
  //   setRecipesFood(JSON.parse(localStorage.getItem('favoriteRecipes')));
  // }, []);
  // console.log(recipesFood);
  const handleClickFavoriteMeals = () => {
    const favoriteMeal = {
      id: recipe?.idMeal,
      type: 'food',
      nationality: recipe?.strArea,
      category: recipe?.strCategory,
      alcoholicOrNot: '',
      name: recipe?.strMeal,
      image: recipe?.strMealThumb,
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

  const handleClickRemoveFavoriteRecipe = () => {
    const filterFavorite = recipesFood
      .filter((item) => item.id !== recipe.idMeal);
    setRecipesFood(filterFavorite);
  };

  return (
    <div>
      { recipesFood?.some((recipeId) => recipeId.id === recipe.idMeal) ? (
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
