import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RecipesProvider } from './context/recipesContext';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <RecipesProvider>
      <App />
    </RecipesProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
