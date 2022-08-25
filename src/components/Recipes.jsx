import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContextRecipes } from '../context/recipesContext';
import { fetchAllDrinks, fetchAllMeals } from '../service/api';
import FoodCard from './RecipesCards/FoodCard';
import DrinkCard from './RecipesCards/DrinkCard';

function Recipes({ titulo }) {
  const { setDrinksList, setFoodsList, foodsList } = ContextRecipes();

  useEffect(() => {
    const getRecipes = async () => {
      const drinkApi = await fetchAllDrinks();
      setDrinksList(drinkApi);
      const foodApi = await fetchAllMeals();
      setFoodsList(foodApi);
      console.log(foodApi);
    };
    getRecipes();
    console.log(foodsList);
  }, []);

  return (
    <div>
      { titulo === 'Foods' ? <FoodCard /> : <DrinkCard /> }
    </div>
  );
}

Recipes.propTypes = {
  titulo: PropTypes.string.isRequired,
};

export default Recipes;
