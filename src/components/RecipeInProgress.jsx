import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import FavoriteRecipeInProgress from './FavoriteRecipeInProgress';
// import SalveDoneRecipes from '../service/salveLocalStorage';

import './RecipeInProgress.css';

const copy = require('clipboard-copy');

function RecipeInProgress() {
  const [recipe, setRecipe] = useState();
  const [checkedList, setCheckedList] = useState([]);
  const [copyLink, setCopyLink] = useState('');

  // logica para pegar o id da Receita e o tipo da receita
  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const maxNumber = 6;
  const id = pathname.replace(/[^0-9]/g, '');
  const type = pathname.slice(1, maxNumber);
  console.log(type);

  const handleClickShare = () => {
    setCopyLink('Link copied!');
    return (type === 'drink'
      ? copy(`${window.location.origin}/drinks/${id}`)
      : copy(`${window.location.origin}/foods/${id}`));
  };

  const getInProgress = async (url, key) => {
    const response = await fetch(`${url}${id}`);
    const data = await response.json();
    setRecipe(data[key][0]);
  };

  const arrIngredients = [];

  // logica para pegar os valores dos ingredientes e quantidades do Recipe
  if (recipe) {
    const arrRecipes = Object.entries(recipe);
    arrRecipes.forEach((e) => {
      // '' and null -> false
      if (e[0].includes('strIngredient') && e[1]) {
        arrIngredients.push(e[1]);
      }
    });
  }

  // lógica para deixar dinamica a chave de acesso do LocalStorage
  const checkAcessKey = pathname.includes('drink') ? 'cocktails' : 'meals';

  // check se a chave do localStorage existe
  const checkLocalStorage = () => (
    !localStorage.getItem('inProgressRecipes')
      && localStorage
        .setItem('inProgressRecipes', JSON.stringify({ meals: {}, cocktails: {} })));

  // chave do localStorage
  const getProgress = JSON
    .parse(localStorage.getItem('inProgressRecipes')) || { meals: {}, cocktails: {} };

  // atualiza o localStorage
  const getLocalStorage = () => {
    const obj = {
      ...getProgress,
      [checkAcessKey]: {
        ...getProgress[checkAcessKey],
        [id]: checkedList,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  };

  useEffect(() => {
    if (type === 'foods') {
      getInProgress('https://www.themealdb.com/api/json/v1/1/lookup.php?i=', 'meals');
    } else {
      getInProgress('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=', 'drinks');
    }
    checkLocalStorage();
    // manter atualizado a lista de checked
    setCheckedList(getProgress[checkAcessKey][id] || []);
  }, []);

  // retorna a class que deixa os ingredientes riscados
  const isCheckedItem = (item) => {
    if (checkedList.length !== 0 && checkedList.includes(item)) {
      return 'checked';
    }
    return 'noChecked';
  };

  // ao clicar acrescenta a classeRiscada a todos da lista de checkeds
  const handleChecked = ({ target }) => {
    const { checked, value } = target;
    return (checked
      ? setCheckedList([...checkedList, value])
      : setCheckedList(checkedList.filter((item) => item !== value)));
  };

  // lógica para manter o checked caso esteja no localStorage
  const onChecked = (item) => (checkedList.some((e) => e === item));

  // logica para habilitar o button quando todos os checkeds forem habilitados
  const finishRecipe = () => (
    arrIngredients.length === checkedList.length ? false : 1);

  const salveDoneRecipes = () => {
    const getDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const dateFormatter = new Intl.DateTimeFormat('pt-BR');
    const done = {
      id: recipe?.idMeal || recipe?.idDrink,
      type,
      nationality: recipe?.strArea || '',
      category: recipe?.strCategory,
      alcoholicOrNot: recipe?.strAlcoholic || '',
      name: recipe?.strMeal || recipe?.strDrink,
      image: recipe?.strMealThumb || recipe?.strDrinkThumb,
      doneDate: dateFormatter.format(new Date()),
      tags: [recipe?.strTags],
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...getDone, done]));
    return history.push('/done-recipes');
  };

  useEffect(() => {
    getLocalStorage();
  }, [checkedList]);

  return (
    <div>
      <h1 data-testid="recipe-title">{ recipe?.strMeal || recipe?.strDrink }</h1>
      <h2 data-testid="recipe-category">
        { recipe?.strCategory || recipe?.strAlcoholic }
      </h2>
      <img
        data-testid="recipe-photo"
        src={ recipe?.strMealThumb || recipe?.strDrinkThumb }
        alt={ recipe?.strMeal || recipe?.strDrink }
      />
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleClickShare }
      >
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <p>{copyLink}</p>
      {/* componente que favorita as receitas */}
      <FavoriteRecipeInProgress
        typeFavorite={ type === 'foods' ? 'food' : 'drink' }
        idRecipe={ id }
      />
      { arrIngredients && arrIngredients.map((item, index) => (
        <div
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <label htmlFor={ index }>
            <input
              type="checkbox"
              id={ index }
              name={ item }
              value={ item }
              onChange={ handleChecked }
              checked={ onChecked(item) }
            />
            <span className={ isCheckedItem(item) }>{`${item}`}</span>
          </label>
        </div>
      )) }
      <p>Instruções</p>
      <p data-testid="instructions">{recipe?.strInstructions}</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ finishRecipe() }
        onClick={ salveDoneRecipes }
      >
        Finalizar
      </button>
    </div>
  );
}

export default RecipeInProgress;
