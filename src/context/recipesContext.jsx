import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const RecipesContext = createContext({});

export const RecipesProvider = ({ children }) => {
  const [type, setType] = useState('');
  const [food, setFood] = useState('');
  const [drinks, setDrinks] = useState('');
  const [listRecipes, setListRecipes] = useState([]);
  const [category, setCategory] = useState('');

  const value = {
    type,
    setType,
    drinks,
    food,
    setFood,
    setDrinks,
    setListRecipes,
    listRecipes,
    setCategory,
    category,
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
