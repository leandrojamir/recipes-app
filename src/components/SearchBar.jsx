import React, { useState } from 'react';
import { ContextRecipes } from '../context/recipesContext';
import { fetchIngredients, fetchName, fetchLetter } from '../service/api';

function SearchBar() {
  const { type } = ContextRecipes();
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('');

  console.log('type:', type);

  const handleSearch = ({ target: { value } }) => setSearch(value);

  const handleRadio = ({ target: { value } }) => setRadio(value);

  const searchApi = async (param) => {
    console.log('radio:', radio);
    if (radio === 'first-letter') {
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      console.log(await fetchLetter(search, param));
    }
    if (radio === 'ingredient') {
      console.log(await fetchIngredients(search, param));
    }
    if (radio === 'name') {
      console.log(await fetchName(search, param));
    }
  };

  return (
    <div>
      <label htmlFor="search">
        <input
          type="text"
          data-testid="search-input"
          id="search"
          value={ search }
          onChange={ handleSearch }
        />
      </label>
      <label
        htmlFor="ingredient-search"
        onChange={ handleRadio }
      >
        Busca por ingrediente
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient-search"
          value="ingredient"
        />
      </label>
      <label
        htmlFor="name-search"
        onChange={ handleRadio }
      >
        Busca por nome
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name-search"
          value="name"
        />
      </label>
      <label
        htmlFor="first-letter-search"
        onChange={ handleRadio }
      >
        Busca da primeira letra
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter-search"
          value="first-letter"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => searchApi(type === 'Drinks' ? 'thecocktaildb' : 'themealdb') }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
