// por enquanto testes da DoneRecipes estão cobertos pelo SearchBar, assim que tiver localStorage refaço eles

// -----------------------------|---------|----------|---------|---------|-----------------------------
// File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s           
// -----------------------------|---------|----------|---------|---------|-----------------------------
// All files                    |   42.64 |    33.33 |   45.45 |    42.6 |                             
//  src                         |   58.33 |      100 |   58.33 |   58.33 |                             
//   App.jsx                    |   63.63 |      100 |   63.63 |   63.63 | 22,24,38-42                 
//   RecipesInProgress.jsx      |       0 |      100 |       0 |       0 | 4                           
//  src/Pages                   |    84.9 |    91.66 |   66.66 |    84.9 |                             
//   DoneRecipes.jsx            |     100 |      100 |     100 |     100 |                   

import React from "react";
import { screen } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import App from "../App";
import DoneRecipes from "../Pages/DoneRecipes";

const doneRecipes = JSON.stringify([
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
]);

describe('Aqui será o test da doneRecipes quando incluir req 48 e 49 e localStorage', () => {
  it('por enquanto já esta sendo coberto 100% pelo SearchBar.test', () => {

  });
  it(' Titulo e direcionamento profile', () => {
    const { history } =  renderWithRouter(<App />);
    history.push('/done-recipes');
    // <h1 data-testid="page-title">Favorite Recipes</h1>
    const tituloHeader = screen.getByTestId(/page-title/i)
    expect(tituloHeader).toBeInTheDocument();
    expect(tituloHeader).toHaveTextContent(/Done Recipes/i)
   
    // <button type="button" data-testid="profile-top-btn" src="./images/profileIcon.svg"><img src="/static/media/profileIcon.44eb3608f431845fe2fc2d2a23d758ae.svg" alt="Profile"></button>
    const profileBtn = screen.getByTestId(/profile-top-btn/i);        
    expect (profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
  });

  it('Verifica o filtros', async () => {
    localStorage.setItem('doneRecipes', doneRecipes);
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const foodFilter = await screen.findByTestId(/filter-by-food-btn/i);
    userEvent.click(foodFilter);
    // <h3 data-testid="0-horizontal-name">Spicy Arrabiata Penne</h3>
    const horizontalNames = await screen.findAllByTestId(/horizontal-name/);
    // expect(recipesTitles).toHaveTextContent(/Spicy Arrabiata Penne/i)
    expect(horizontalNames.length).toBe(1);
 
    const drinkBtn = await screen.findByTestId('filter-by-drink-btn');
    userEvent.click(drinkBtn);
    // <h3 data-testid="0-horizontal-name">Aquamarine</h3>
    expect(horizontalNames.length).toBe(1);
  });

  it('testa all', async () => {
    localStorage.setItem('doneRecipes', doneRecipes);
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
    // <img data-testid="0-horizontal-favorite-btn" src="/static/media/blackHeartIcon.083cb006913d197c95857ebfa2161db7.svg" alt="back heart"></img>
    // const favoriteBtn0 = await screen.findByTestId('0-horizontal-favorite-btn');
    // userEvent.click(favoriteBtn0);

    const horizontalNames = await screen.findAllByTestId(/horizontal-name/);
    // expect(horizontalNames.length).toBe(1);
    
    const allBtn = await screen.findByTestId('filter-by-all-btn');
    userEvent.click(allBtn);
    expect(horizontalNames.length).toBe(2);
  });

  it('remove localStorage', async () => {
    localStorage.removeItem('doneRecipes');
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const horizontalNames = screen.queryByTestId('0-horizontal-name');
    expect(horizontalNames).not.toBeInTheDocument();
  });

  it('linha 159-160 link copiado DoneRecipes', () => {
    localStorage.setItem('doneRecipes', doneRecipes);
    const { history } = renderWithRouter(<DoneRecipes />);
    history.push('/done-recipes');
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    const shareBtn1 = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(shareBtn1);
    expect(window.navigator.clipboard.writeText).toHaveBeenCalled();
    expect(window.navigator.clipboard.writeText).toHaveBeenCalledWith(
      'http://localhost:3000/foods/52771'
    );
    const shareBtn2 = screen.getByTestId('1-horizontal-share-btn');
    userEvent.click(shareBtn2);
    expect(window.navigator.clipboard.writeText).toHaveBeenCalled();
  });
});