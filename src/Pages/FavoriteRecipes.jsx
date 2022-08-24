import React from 'react';
import Header from '../components/Header';
import RecipeDetails from '../components/RecipeDetails';

function FavoriteRecipes() {
  return (
    <div>
      <Header titulo="Favorite Recipes" showBtn={ false } />
      <RecipeDetails />
    </div>
  );
}

export default FavoriteRecipes;
