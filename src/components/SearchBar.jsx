import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ContextRecipes } from '../context/recipesContext';
import { fetchIngredients, fetchName, fetchLetter } from '../service/api';

function SearchBar() {
  const {
    type,
    setFood,
    setDrinks,
    setListRecipes,
    category,
    setCategory,
  } = ContextRecipes();
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('');
  const history = useHistory();

  useEffect(() => {
    const handlePath = () => {
      if (type === 'Foods') {
        setCategory('/foods/');
      } else {
        setCategory('/drinks/');
      }
    };
    handlePath();
  }, []);

  const handleSearch = ({ target: { value } }) => setSearch(value);

  const handleRadio = ({ target: { value } }) => setRadio(value);

  const getIdRecipes = (results) => {
    const { meals, drinks } = results;
    const obj = type === 'Foods' ? meals : drinks;
    const id = type === 'Foods' ? meals[0].idMeal : drinks[0].idDrink;

    if (obj === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    if (obj.length > 1) {
      setListRecipes(obj);
    } else if (obj.length === 1) {
      history.push(`${category}${id}`);
    }
  };

  const searchApi = async (param) => {
    if (radio === 'first-letter') {
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const results = await fetchLetter(search, param);
      getIdRecipes(results);
    }
    if (radio === 'ingredient') {
      const results = await fetchIngredients(search, param);
      getIdRecipes(results);
    }
    if (radio === 'name') {
      const results = await fetchName(search, param);
      getIdRecipes(results);
      console.log(results);
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
