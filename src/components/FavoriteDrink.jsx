import React from 'react';
import { ContextRecipes } from '../context/recipesContext';
// import useLocalStorage from '../hook/useLocalStorage';
import Heart from '../images/whiteHeartIcon.svg';

export default function FavoriteDrink() {
  const { recipe } = ContextRecipes();

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
    let favoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    if (!favoriteRecipes) {
      favoriteRecipes = [];
    }
    localStorage.setItem(
      'favoriteRecipes', JSON.stringify([...favoriteRecipes, favoriteDrink]),
    );
  };
  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleClickFavoriteDrinks }
      >
        drinks
        <img src={ Heart } alt="coracao" />
      </button>
    </div>
  );
}
