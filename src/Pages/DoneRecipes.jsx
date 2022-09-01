import React from 'react';
import { Link } from 'react-router-dom';
// https://www.npmjs.com/package/copy-to-clipboard
import copy from 'clipboard-copy';
import Header from '../components/Header';
// import SearchBar from '../components/SearchBar';
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
      {doneRecipes.map((element, index) => (
        <div key={ element.id }>
          <Link
            to={ `${element.type}s${element.id}` }
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
