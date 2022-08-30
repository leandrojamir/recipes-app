import React from 'react';
import { ContextRecipes } from '../context/recipesContext';
import Heart from '../images/whiteHeartIcon.svg';

export default function FavoriteMeal() {
  const { recipe } = ContextRecipes();
  console.log(recipe);
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
    let favoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    if (!favoriteRecipes) {
      favoriteRecipes = [];
    }
    localStorage.setItem(
      'favoriteRecipes', JSON.stringify([...favoriteRecipes, favoriteMeal]),
    );
  };
  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleClickFavoriteMeals }
      >

        <img src={ Heart } alt="coracao" />
      </button>
    </div>
  );
}
