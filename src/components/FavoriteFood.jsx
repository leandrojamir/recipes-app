import React from 'react';
import { ContextRecipes } from '../context/recipesContext';
// import useLocalStorage from '../hook/useLocalStorage';
import Heart from '../images/whiteHeartIcon.svg';

export default function FavoriteFood() {
  const { recipe } = ContextRecipes();
  const handleClickFavoriteFood = () => {
    const favoriteFood = {
      id: recipe?.idMeal,
      type: 'food',
      nationality: recipe?.strArea,
      category: recipe?.strCategory,
      alcoholicOrNot: '',
      name: recipe?.strMeal,
      image: recipe?.strMealThumb,
    };
    console.log(favoriteFood);

    let favoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    if (!favoriteRecipes) {
      favoriteRecipes = [];
    }
    console.log(favoriteRecipes);
    localStorage.setItem(
      'favoriteRecipes', JSON.stringify([...favoriteRecipes, favoriteFood]),
    );
  };
  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleClickFavoriteFood }
      >
        <img src={ Heart } alt="coracao" />
      </button>
    </div>
  );
}
