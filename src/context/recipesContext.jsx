import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const RecipesContext = createContext({});

export const RecipesProvider = ({ children }) => {
  const [type, setType] = useState('');
  const [arrResults, setArrResults] = useState([]);
  const [dataFood, setDataFood] = useState([]);

  const value = {
    type,
    setType,
    arrResults,
    setArrResults,
    setDataFood,
    dataFood,
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
