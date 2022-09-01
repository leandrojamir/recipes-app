import React from 'react';
import FavoriteRecipes from '../components/FavoriteRecipes';
import Header from '../components/Header';

function Favorites() {
  return (
    <>
      <Header titulo="Favorite Recipes" showBtn={ false } />
      <FavoriteRecipes />
    </>
  );
}

export default Favorites;
