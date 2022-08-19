import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const RecipesContext = createContext({});

export const RecipesProvider = ({ children }) => (
  <RecipesContext.Provider value={ {} }>{children}</RecipesContext.Provider>
);

export function ContextRecipes() {
  const context = useContext(RecipesContext);
  return context;
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
