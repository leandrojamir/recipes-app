import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// https://www.npmjs.com/package/copy-to-clipboard
import copy from 'clipboard-copy';
import Header from '../components/Header';
// import SearchBar from '../components/SearchBar';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  // criando localStorage para fazer 48
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const getDone = JSON.parse(localStorage.getItem('doneRecipes'));
    // console.log('getDone', getDone);
    if (getDone) setDoneRecipes(getDone);
  }, []);

  // usando doneRecipes que vi o cypress usar no teste (linha 5 a 29) enquanto não descubro onde sera salvo
  // const doneRecipes = [
  //   {
  //     id: '52771',
  //     type: 'food',
  //     nationality: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //     doneDate: '23/06/2020',
  //     tags: ['Pasta', 'Curry'],
  //   },
  //   {
  //     id: '178319',
  //     type: 'drink',
  //     nationality: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'Aquamarine',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //     doneDate: '23/06/2020',
  //     tags: [],
  //   },
  // ];

  //   48 - Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros

  // Observações técnicas
  // Os nomes dos botões devem ser "Food", "Drinks" e "All", respectivamente.
  // Ao clicar no botão "Food", as receitas devem ser filtradas por comidas;

  const handleClickFilterFoods = () => {
    const getFood = JSON.parse(localStorage.getItem('doneRecipes'));
    const filterFood = getFood.filter((item) => item.type === 'food');
    setDoneRecipes(filterFood);
  };

  // Ao clicar no botão "Drinks", as receitas devem ser filtradas por bebidas;
  const handleClickFilterDrinks = () => {
    const getDrink = JSON.parse(localStorage.getItem('doneRecipes'));
    const filterDrink = getDrink.filter((item) => item.type === 'drink');
    setDoneRecipes(filterDrink);
  };

  // Ao clicar no botão "All", o filtro deve ser removido.
  const handleClickAll = () => {
    const getAll = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(getAll);
  };

  //   44 - Implemente os elementos da tela de receitas feitas respeitando os atributos descritos no protótipo
  // Observações técnicas
  // Todos os data-testids estão presentes:

  //   45 - Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela deve possuir: a foto da receita, nome, categoria, nacionalidade, a data em que a pessoa fez a receita, as 2 primeiras tags retornadas pela API e um botão de compartilhar
  // Observações técnicas
  // O ícone do botão de compartilhar pode ser encontrado em src/images/shareIcon.svg.

  const noMagicNumber = 3;
  return (
    <div>
      <Header titulo="Done Recipes" showBtn={ false } />
      {/* O botão de filtro All deve ter o atributo data-testid="filter-by-all-btn"; */}
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ handleClickAll }
      >
        All
      </button>
      {/* O botão de filtro Food deve ter o atributo data-testid="filter-by-food-btn"; */}
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ handleClickFilterFoods }
      >
        Food
      </button>
      {/* O botão de Drinks deve ter o atributo data-testid="filter-by-drink-btn"; */}
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ handleClickFilterDrinks }
      >
        Drinks
      </button>
      {doneRecipes.map((element, index) => (
        <div key={ element.id }>
          {/* CypressError
          Timed out retrying after 10050ms: cy.click() failed because the center of this element is hidden from view:
          <img data-testid="0-horizontal-image" alt="imagem" src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg">
          Fix this problem, or use {force: true} to disable error checking. */}
          {/* 49 - Redirecione para a tela de detalhes da receita caso seja clicado na foto ou no nome da receita
          Este requisito também inclui testes de cobertura da página DoneRecipes.js.
          Se ao clicar no nome da receita, a rota muda para a tela de detalhes daquela receita;
          */}
          {/* Se ao clicar na foto da receita, a rota muda para a tela de detalhes daquela receita; */}
          {console.log(element.type)}
          <Link to={ `${element.type}/${element.id}` }>
            {/* O imagem do card de receita deve ter o atributo data-testid="${index}-horizontal-image"; */}
            <img
              style={ { width: '100px' } }
              data-testid={ `${index}-horizontal-image` }
              alt="imagem"
              src={ element.image }
            />
          </Link>
          <Link to={ `${element.type}/${element.id}` }>
            {/* O texto do nome da receita deve ter o atributo data-testid="${index}-horizontal-name"; */}
            <div data-testid={ `${index}-horizontal-name` }>
              {element.name}
            </div>
          </Link>
          {/* O texto da categoria da receita deve ter o atributo data-testid="${index}-horizontal-top-text"; */}
          <div data-testid={ `${index}-horizontal-top-text` }>
            { `${element.nationality} - ${element.category}` }
            {element.alcoholicOrNot}
          </div>
          {/* O texto da data que a receita foi feita deve ter o atributo data-testid="${index}-horizontal-done-date"; */}
          <div data-testid={ `${index}-horizontal-done-date` }>
            {element.doneDate}
          </div>
          {/* O elemento de compartilhar a receita deve ter o atributo data-testid="${index}-horizontal-share-btn"; */}
          {/* 47 - Desenvolva a solução de modo que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard
          O que será verificado
          Ao clicar no botão de compartilhar deve aparecer a mensagem "Link copied!";
          Se a URL da tela de detalhes da receita é copiada para o clipboard. */}
          {/* expected <div> to have attribute src */}
          {/* tentei reaproveitar o <ShareButton /> para ficar mais clean porem por conta da 45 que pede src além do data-testId ficar duplicando
          a imagem do compartilhar sendo uma fake e outra clicacael, também não completa a 47 mesmo aparecendo a mensagem contains Link copied!
          pois meu "crtl+c" não esta guardando o valor esperado do caminho ${window.location.origin}${history.location.pathname}
          possivelmente vai funcionar quando pegar atraves do localStorage, por enquanto usando um hook pronto chamado clipboard-copy
          https://www.npmjs.com/package/copy-to-clipboard  */}
          {/* <div data-testid={ `${index}-horizontal-share-btn` }>
            <SearchBar />
          </div> */}
          <button
            type="button"
            onClick={ (event) => {
              copy(`http://localhost:3000/${element.type}s/${element.id}`);
              event.target.innerHTML = 'Link copied!';
            } }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              alt="compartilhar"
              src={ shareIcon }
            />
          </button>
          {/* As tags da receita devem possuir o atributo data-testid=${index}-${tagName}-horizontal-tag; */}
          { element.tags.map((t, i) => (
            index < noMagicNumber
              && <p key={ i } data-testid={ `${index}-${t}-horizontal-tag` }>{t}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
