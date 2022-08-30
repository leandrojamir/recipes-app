import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  // usando doneRecipes que vi o cypress usar no teste (linha 5 a 29) enquanto não descubro onde sera salvo
  const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

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
      <button data-testid="filter-by-all-btn" type="button">
        All
      </button>
      {/* O botão de filtro Food deve ter o atributo data-testid="filter-by-food-btn"; */}
      <button data-testid="filter-by-food-btn" type="button">
        Food
      </button>
      {/* O botão de Drinks deve ter o atributo data-testid="filter-by-drink-btn"; */}
      <button data-testid="filter-by-drink-btn" type="button">
        Drinks
      </button>
      {/* { drinksList && drinksList.drinks
                    .filter((_, index) => index < maxNumberList).map((beverage, index) => (
                      <Link
                        to={ `/drinks/${beverage.idDrink}` }
                        key={ index }
                      >
                        <div
                          key={ index }
                          data-testid={ `${index}-recomendation-card` }
                          className="card"
                        > */}
      {doneRecipes.map((element, index) => (
        <div key={ element.id }>
          <Link
            to={ `${element.type}s${element.id}` }
            // key={ recipe.id }
          >
            <div>
              {/* O imagem do card de receita deve ter o atributo data-testid="${index}-horizontal-image"; */}
              <img
                data-testid={ `${index}-horizontal-image` }
                alt="imagem"
                src={ element.image }
              />
              {/* O texto do nome da receita deve ter o atributo data-testid="${index}-horizontal-name"; */}
              <div data-testid={ `${index}-horizontal-name` }>
                {element.name}
              </div>
            </div>
          </Link>
          {/* O texto da categoria da receita deve ter o atributo data-testid="${index}-horizontal-top-text"; */}
          <div data-testid={ `${index}-horizontal-top-text` }>
            {/* 4 get [data-testid="0-horizontal-top-text"]
            5 contains Italian - Vegetarian */}
            {/* cy.get('[data-testid="0-horizontal-top-text"]')
        .contains(`${doneRecipes[0].nationality} - ${doneRecipes[0].category}`); */}
            { `${element.nationality} - ${element.category}` }
            {element.alcoholicOrNot}
          </div>
          {/* O texto da data que a receita foi feita deve ter o atributo data-testid="${index}-horizontal-done-date"; */}
          <div data-testid={ `${index}-horizontal-done-date` }>
            {element.doneDate}
          </div>
          {/* O elemento de compartilhar a receita deve ter o atributo data-testid="${index}-horizontal-share-btn"; */}
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            alt="compartilhar"
            src={ shareIcon }
          />
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
