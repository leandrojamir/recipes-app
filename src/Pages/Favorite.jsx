import React from 'react';
import Header from '../components/Header';
import FavoriteRecipes from '../components/FavoriteRecipes';

function Favorite() {
  return (
    <div>
      <Header titulo="Favorite Recipes" showBtn={ false } />
      <FavoriteRecipes />
    </div>
  );
}

export default Favorite;
