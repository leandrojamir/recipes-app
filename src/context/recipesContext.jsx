import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import useResponseFilter from '../hook/useResponseFilter';

// const FOOD = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
// const DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const CATEGORY_FOOD = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const CATEGORY_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const RecipesContext = createContext({});

export const RecipesProvider = ({ children }) => {
  const [type, setType] = useState('');

  const [arrResults, setArrResults] = useState([]);
  const [foodsList, setFoodsList] = useState();
  const [drinksList, setDrinksList] = useState();
  const [getCategoryFoods, setGetCategoryFoods] = useState([]);
  const [getCategoryDrinks, setGetCategoryDrinks] = useState([]);
  // const [ filterCategoryFoods, setFilterCategoryFoods] = useState([]);
  // const [ filterCategoryDrinks, setFilterCategoryDrinks] = useState([]);

  useResponseFilter(CATEGORY_FOOD, setGetCategoryFoods, 'meals');
  useResponseFilter(CATEGORY_DRINK, setGetCategoryDrinks, 'drinks');

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
