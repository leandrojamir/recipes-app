import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const RecipesContext = createContext({});

export const RecipesProvider = ({ children }) => {
  const [type, setType] = useState('');

  const [arrResults, setArrResults] = useState([]);

  const [foodsList, setFoodsList] = useState();
  const [drinksList, setDrinksList] = useState();
  // const [drinks, setDrinks] = useState([]);
  const [getCategoryFoods, setGetCategoryFoods] = useState([]);
  const [getCategoryDrinks, setGetCategoryDrinks] = useState([]);

  const value = {
    type,
    setType,
    arrResults,
    setArrResults,
    foodsList,
    setFoodsList,
    drinksList,
    setDrinksList,
    setGetCategoryFoods,
    setGetCategoryDrinks,
    getCategoryFoods,
    getCategoryDrinks,
  };

  return (
    <RecipesContext.Provider value={ value }>{children}</RecipesContext.Provider>
  );
};

export function ContextRecipes() {
  const context = useContext(RecipesContext);
  return context;
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
