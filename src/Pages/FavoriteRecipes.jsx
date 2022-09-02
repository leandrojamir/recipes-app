import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Share from '../images/shareIcon.svg';
import Header from '../components/Header';

const FavoriteRecipes = () => {
  const [favorites, setFavorites] = useState([]);
  const [buttonShare, setButtonShare] = useState(false);

  const handleClickRemoveFavorite = (index) => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipesID = favorite[index].id;
    const filteredRecipes = favorite.filter((item) => item.id !== favoriteRecipesID);
    setFavorites(filteredRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredRecipes));
  };

  useEffect(() => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavoriteRecipes) setFavorites(getFavoriteRecipes);
  }, []);

  const handleClickShare = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setButtonShare(true);
  };

  const handleClickFilterFoods = () => {
    const favoriteFood = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filterFood = favoriteFood.filter((item) => item.type === 'food');
    setFavorites(filterFood);
  };

  const handleClickFilterDrinks = () => {
    const favoriteDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filterDrink = favoriteDrink.filter((item) => item.type === 'drink');
    setFavorites(filterDrink);
  };

  const handleClickAll = () => {
    const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(allFavorites);
  };

  return (
    <main>
      <Header titulo="Favorite Recipes" showBtn={ false } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClickAll }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleClickFilterFoods }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClickFilterDrinks }
        >
          Drink
        </button>
      </div>
      { buttonShare && <h1>Link copied!</h1>}
      { favorites.map((item, index) => (
        <div
          key={ item?.id }
        >
          { console.log(item?.image, 'hello') }
          <Link
            to={
              item.type === 'food'
                ? `/foods/${item.id}`
                : `/drinks/${item.id}`
            }
          >
            <img
              style={ { width: '100px' } }
              data-testid={ `${index}-horizontal-image` }
              src={ item?.image }
              alt={ item?.name }
            />
          </Link>
          <div>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {
                item.type === 'food'
                  ? `${item.nationality} - ${item.category}`
                  : item.alcoholicOrNot
              }
            </p>
            <button
              type="button"
              onClick={ () => handleClickShare(item.type, item.id) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ Share }
                alt="share"
              />
            </button>
            <button
              type="button"
              onClick={ () => handleClickRemoveFavorite(index) }
            >
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="back heart"
              />
            </button>
          </div>
          <Link
            to={
              item.type === 'food'
                ? `/foods/${item.id}`
                : `/drinks/${item.id}`
            }
          >
            <h3 data-testid={ `${index}-horizontal-name` }>
              { item.name }
            </h3>

          </Link>

        </div>
      ))}
    </main>
  );
};

export default FavoriteRecipes;
