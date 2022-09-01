import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ContextRecipes } from '../context/recipesContext';
import { fetchIngredients, fetchName, fetchLetter } from '../service/api';

function SearchBar() {
  const { type, arrResults, setArrResults, setShowRecipes } = ContextRecipes();
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [radio, setRadio] = useState('');

  const handleSearch = ({ target: { value } }) => setSearch(value);

  const handleRadio = ({ target: { value } }) => setRadio(value);

  // função que redireciona para página caso o item seja único
  const productUnique = () => {
    const rota = type.toLowerCase();
    if (type === 'Drinks') {
      const { idDrink } = arrResults[0];
      history.push(`/${rota}/${idDrink}`);
    } else {
      const { idMeal } = arrResults[0];
      history.push(`/${rota}/${idMeal}`);
    }
  };

  // atualiza os estados conforme a chamada de api
  const searchApi = async (param, key) => {
    if (radio === 'first-letter') {
      if (search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      const resultLetter = await fetchLetter(search, param);
      setArrResults(resultLetter[key]);
    }
    if (radio === 'ingredient') {
      const resultIngredients = await fetchIngredients(search, param);
      setArrResults(resultIngredients[key]);
    }
    if (radio === 'name') {
      const resultName = await fetchName(search, param);
      console.log(resultName[key]);
      setArrResults(resultName[key]);
    }
  };

  console.log('arrResults', arrResults);

  // Atualiza o estado
  const onclickBtn = (param) => {
    setShowRecipes(false);
    if (type === 'Drinks') {
      searchApi(param, 'drinks');
    } else {
      searchApi(param, 'meals');
    }
  };

  // check se array nulo
  const checkArrayNull = () => {
    const error = 'Sorry, we haven\'t found any recipes for these filters.';
    return (arrResults === null ? global.alert(error) : arrResults);
  };

  // Checa se a pesquisa trouxe um item apenas
  const checkUnique = () => {
    if (arrResults && arrResults.length === 1) {
      productUnique();
    }
    return arrResults;
  };

  useEffect(() => {
    checkUnique();
    checkArrayNull();
  }, [arrResults]);

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
          name="Ingredient"
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
          name="Name"
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
          name="Letter"
          id="first-letter-search"
          value="first-letter"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => onclickBtn(type === 'Drinks' ? 'thecocktaildb' : 'themealdb') }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
