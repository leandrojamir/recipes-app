import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './recipesButton.css';
import { ContextRecipes } from '../context/recipesContext';

function StartContinueButton({ type }) {
  const { recipe } = ContextRecipes();
  const [acessKey, setAcessKey] = useState('');
  const [showStartBtn, setShowStartBtn] = useState(true);

  const history = useHistory();
  const { location: { pathname } } = history;
  const id = pathname.replace(/[^0-9]/g, '');

  const arrIngredients = [];

  // logica para pegar os valores dos ingredientes e quantidades do Recipe
  if (recipe) {
    const arrRecipes = Object.entries(recipe);
    arrRecipes.forEach((e) => {
      if (e[0].includes('strIngredient') && e[1]) {
        arrIngredients.push(e[1]);
      }
    });
  }

  // vai setar a chave de Acesso para o LocalStorage
  const checkAcessKey = () => (
    type === 'drinks' ? setAcessKey('cocktails') : setAcessKey('meals'));

  // cria a chave inProgressRecipes assim que a page inicia
  const checkLocalStorage = () => (
    !localStorage.getItem('inProgressRecipes')
    && localStorage
      .setItem('inProgressRecipes', JSON.stringify({ meals: {}, cocktails: {} })));

  useEffect(() => {
    checkLocalStorage();
    checkAcessKey();
  }, []);

  // constante global para pegar os dados da chave do LocalStorage
  const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

  // salva os dados de comida ou bebidas na chave do LocalStorage
  const salveInKeyInProgress = () => {
    // console.log(acessKey);
    const obj = {
      ...getStorage,
      [acessKey]: {
        ...getStorage[acessKey],
        [id]: arrIngredients,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  };

  // função clickButton StartRecipe
  function handleStartRecipe() {
    salveInKeyInProgress();
    return (type === 'meals'
      ? history.push(`/foods/${id}/in-progress`)
      : history.push(`/drinks/${id}/in-progress`)
    );
  }

  // função altera o texto do btn para Continuar Receita após a receita ser salva no LS
  // const getCheck = () => ([acessKey][id] && setShowStartBtn(false));
  function getCheck() {
    if (acessKey[id]) {
      setShowStartBtn(false);
    }
  }

  useEffect(() => {
    getCheck();
  }, []);

  return (
    <button
      data-testid="start-recipe-btn"
      type="button"
      className="start-button"
      onClick={ handleStartRecipe }
    >
      { showStartBtn ? 'Start Recipe' : 'Continue Recipe'}
    </button>
  );
}

StartContinueButton.propTypes = {
  type: PropTypes.string.isRequired,
};

export default StartContinueButton;

// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
// import './recipesButton.css';
// import { ContextRecipes } from '../context/recipesContext';

// function StartContinueButton({ type }) {
//   const { recipe } = ContextRecipes();
//   const [showStartBtn, setShowStartBtn] = useState(true);
//   const history = useHistory();
//   const { location: { pathname } } = history;
//   const id = pathname.replace(/[^0-9]/g, '');
//   const arrIngredients = [];
//   const inProgressObj = {
//     cocktails: {},
//     meals: {},
//   };
//   const getProgress = JSON
//     .parse(localStorage.getItem('inProgressRecipes')) || inProgressObj;
//   function handleStartRecipe() {
//     // vai alterar o estado da lista que recebe as receitas em progresso
//     const { meals, cocktails } = getProgress;

//     const arrRecipes = Object.entries(recipe);
//     arrRecipes.forEach((e) => {
//       if (e[0].includes('strIngredient') && e[1] !== null && e[1] !== '') {
//         arrIngredients.push(e[1]);
//       }
//     });
//     // localStorage.setItem('inProgressRecipes', JSON.stringify([...getProgress, recipe]
//     if (type === 'meals') {
//       history.push(`/foods/${id}/in-progress`);
//       const mealsObj = { meals: {
//         ...meals,
//         [id]: [...arrIngredients],
//       },
//       cocktails: {
//         ...cocktails,
//       } };
//       localStorage.setItem('inProgressRecipes', JSON.stringify(mealsObj));
//     } else {
//       history.push(`/drinks/${id}/in-progress`);
//       const drinksObj = {
//         meals: {
//           ...meals,
//         },
//         cocktails: {
//           ...cocktails,
//           [id]: [...arrIngredients],
//         },
//       };
//       localStorage.setItem('inProgressRecipes', JSON.stringify(drinksObj));
//     }
//   }
//   function getCheck() {
//     const { meals, cocktails } = getProgress;
//     if (type === 'meals') {
//       if (meals[id]) {
//         setShowStartBtn(false);
//       }
//     } else if (cocktails[id]) {
//       setShowStartBtn(false);
//     }
//   }
//   useEffect(() => {
//     getCheck();
//   }, []);
//   return (
//     <button
//       data-testid="start-recipe-btn"
//       type="button"
//       className="start-button"
//       onClick={ handleStartRecipe }
//     >
//       { showStartBtn ? 'Start Recipe' : 'Continue Recipe'}
//     </button>
//   );
// }
// StartContinueButton.propTypes = {
//   type: PropTypes.string.isRequired,
// };
// export default StartContinueButton;
