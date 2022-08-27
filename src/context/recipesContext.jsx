import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useResponseFilter from '../hook/useResponseFilter';

const FOOD = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const CATEGORY_FOOD = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const CATEGORY_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const RecipesContext = createContext({});

export const RecipesProvider = ({ children }) => {
  const [type, setType] = useState('');

  const [arrResults, setArrResults] = useState([]);
  const [foodsList, setFoodsList] = useState();
  const [drinksList, setDrinksList] = useState();
  const [selectedButtonCategory, setSelectedButtonCategory] = useState('');
  const [getCategoryFoods, setGetCategoryFoods] = useState([]);
  const [getCategoryDrinks, setGetCategoryDrinks] = useState([]);
  const [filterCategoryFoods, setFilterCategoryFoods] = useState([]);
  const [filterCategoryDrinks, setFilterCategoryDrinks] = useState([]);
  const [showRecipes, setShowRecipes] = useState(true);
  const [recipe, setRecipe] = useState();
  const [inProgressList, setInProgressList] = useState();

  // setando o estado inicial conforme o que esta salvo na chave 'inProgressRecipes'
  // const key = JSON.parse(localStorage.getItem('inProgressRecipes'));
  // console.log('keyLocal', key);
  const keyName = window.localStorage;
  console.log('keyName', keyName);

  const initialKey = () => {
    if (window.localStorage.inProgressRecipes === 'undefined') {
      setInProgressList('');
    } else {
      console.log('Local', JSON.parse(localStorage.getItem('inProgressRecipes')));
      const key = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setInProgressList(key);
    }
  };

  useEffect(() => {
    initialKey();
  }, []);

  useResponseFilter(CATEGORY_FOOD, setGetCategoryFoods, 'meals');
  useResponseFilter(CATEGORY_DRINK, setGetCategoryDrinks, 'drinks');

  const handleClickCategoryFood = async ({ target }) => {
    const { name } = target;
    setSelectedButtonCategory(name);
    if (name !== selectedButtonCategory) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
      const data = await response.json();
      const resultsCategoryFoods = data.meals;
      setFilterCategoryFoods(resultsCategoryFoods);
      setShowRecipes(false);
    }
    if (name === selectedButtonCategory) {
      const response = await fetch(FOOD);
      const data = await response.json();
      const resultsCategoryFoods = data.meals;
      setFilterCategoryFoods(resultsCategoryFoods);
      setShowRecipes(false);
    }
  };

  const handleClickCategoryDrink = async ({ target }) => {
    const { name } = target;
    setSelectedButtonCategory(name);
    if (name !== selectedButtonCategory) {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`);
      const data = await response.json();
      const resultsCategoryDrinks = data.drinks;
      setFilterCategoryDrinks(resultsCategoryDrinks);
      setShowRecipes(false);
    }
    if (name === selectedButtonCategory) {
      const response = await fetch(DRINK);
      const data = await response.json();
      const resultsCategoryDrinks = data.drinks;
      setFilterCategoryDrinks(resultsCategoryDrinks);
      setShowRecipes(false);
    }
  };

  const handleClickBtnAllFoods = async () => {
    try {
      const response = await fetch(FOOD);
      const data = await response.json();
      const resultsBtnAllFoods = data.meals;
      setFilterCategoryFoods(resultsBtnAllFoods);
      setShowRecipes(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickBtnAllDrinks = async () => {
    try {
      const response = await fetch(DRINK);
      const data = await response.json();
      const resultsBtnAllDrinks = data.drinks;
      setFilterCategoryDrinks(resultsBtnAllDrinks);
      setShowRecipes(false);
    } catch (error) {
      console.log(error);
    }
  };

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
    filterCategoryFoods,
    filterCategoryDrinks,
    handleClickCategoryFood,
    handleClickCategoryDrink,
    handleClickBtnAllFoods,
    handleClickBtnAllDrinks,
    showRecipes,
    setShowRecipes,
    recipe,
    setRecipe,
    inProgressList,
    setInProgressList,
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
