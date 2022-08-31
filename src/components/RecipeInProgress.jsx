import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const [recipe, setRecipe] = useState();
  const [checkedList, setCheckedList] = useState([]);
  // const [ingredientes, setIngredientes] = useState();
  // const [keyId, setKeyId] = useState('');

  // logica para pegar o id da Receita e o tipo da receita
  const history = useHistory();
  const { location: { pathname } } = history;
  const maxNumber = 6;
  const id = pathname.replace(/[^0-9]/g, '');
  const type = pathname.slice(1, maxNumber);
  // console.log(type);

  const getInProgress = async (url, key) => {
    const response = await fetch(`${url}${id}`);
    const data = await response.json();
    setRecipe(data[key][0]);
  };

  // verificar se a chave foi criada do LocalStorage
  // verificar se o id está presente na chave
  // const createKeyFoodOrDrink = () => {
  //   const get = localStorage.getItem('inProgressRecipes');
  //   // const inProgressObj = {
  //   //   cocktails: {},
  //   //   meals: {},
  //   // };
  //   if (type === 'food') {
  //     setKeyId('meals');
  //   } else {
  //     setKeyId('cocktails');
  //   }
  //   if (!get) {
  //     localStorage.setItem('inProgressRecipes', { cocktails: {}, meals: {} });
  //   } else {
  //     setIngredientes(get[keyId][id]);
  //   }
  //   console.log('keyId', get.keyId);
  //   // if (get[keyId].contains(id)) {
  //   //   setIngredientes(get[keyId][id]);
  //   // }
  // };

  useEffect(() => {
    if (type === 'foods') {
      getInProgress('https://www.themealdb.com/api/json/v1/1/lookup.php?i=', 'meals');
    } else {
      getInProgress('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=', 'drinks');
    }
    // createKeyFoodOrDrink();
  }, []);

  const arrIngredients = [];
  console.log(recipe);

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

  console.log('arrIngredients', arrIngredients);

  const isCheckedItem = (item) => {
    if (checkedList.length !== 0 && checkedList.includes(item)) {
      console.log('checked');
      return 'checked';
    }
    console.log('no-checked');
    return 'noChecked';
  };

  const handleChecked = ({ target }) => {
    const { checked, value } = target;
    if (checked) {
      // quando clicar acrescentar a classe a todos da lista de checkeds
      setCheckedList([...checkedList, value]);
    } else {
      // retirar o item da lista de checked
      setCheckedList(checkedList.filter((item) => item !== value));
    }
  };

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
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="compartilhar" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favoritar" />
      </button>
      { arrIngredients && arrIngredients.map((item, index) => (
        <div
          key={ index }
          data-testid={ `${index}-ingredient-step` }
        >
          <p className={ isCheckedItem(item) }>{`${item}`}</p>
          <label htmlFor="checkRecipe">
            <input
              type="checkbox"
              id="checkRecipe"
              name={ recipe?.idMeal || recipe?.idDrink }
              value={ item }
              onChange={ handleChecked }
              // checked={ onChecked }
            />
          </label>
        </div>
      )) }
      <p>Instruções</p>
      <p data-testid="instructions">{recipe?.strInstructions}</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Finalizar
      </button>
    </div>
  );
}

export default RecipeInProgress;
