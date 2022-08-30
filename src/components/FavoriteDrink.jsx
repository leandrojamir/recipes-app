import React from 'react';
import { ContextRecipes } from '../context/recipesContext';
import useLocalStorage from '../hook/useLocalStorage';
import Heart from '../images/whiteHeartIcon.svg';
import HeartBlack from '../images/blackHeartIcon.svg';

export default function FavoriteDrink() {
  const { recipe } = ContextRecipes();
  const [recipeDrink, setRecipeDrink] = useLocalStorage('favoriteRecipes', []);
  const handleClickFavoriteDrinks = () => {
    const favoriteDrink = {
      id: recipe?.idDrink,
      type: 'drink',
      nationality: '',
      category: recipe?.strCategory,
      alcoholicOrNot: recipe?.strAlcoholic,
      name: recipe?.strDrink,
      image: recipe?.strDrinkThumb,
    };

    setRecipeDrink([
      ...recipeDrink,
      favoriteDrink,
    ]);
    // let favoriteRecipes = JSON.parse(
    //   localStorage.getItem('favoriteRecipes'),
    // );
    // if (!favoriteRecipes) {
    //   favoriteRecipes = [];
    // }
    // localStorage.setItem(
    //   'favoriteRecipes', JSON.stringify([...favoriteRecipes, favoriteDrink]),
    // );
  };

  const handleClickRemoveFavoritesRecipes = () => {
    const filterFavorite = recipeDrink
      .filter((item) => item.id !== recipe.idDrink);
    setRecipeDrink(filterFavorite);
  };
  return (
    <div>
      { recipeDrink.some((recipeID) => recipeID.id === recipe.idDrink) ? (
        <button
          type="button"
          onClick={ handleClickRemoveFavoritesRecipes }
        >
          <img
            src={ HeartBlack }
            alt="coracao"
            data-testid="favorite-btn"
          />
        </button>

      ) : (
        <button
          type="button"
          onClick={ handleClickFavoriteDrinks }
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
