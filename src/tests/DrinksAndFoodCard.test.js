// src/components/RecipesCards   |      60 |       50 |   33.33 |      60 |                          
// DrinkCard.jsx                 |      60 |       50 |   33.33 |      60 | 14-15                    
// FoodCard.jsx                  |      60 |       50 |   33.33 |      60 | 14-15       

import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import FavoriteRecipes from '../Pages/FavoriteRecipes';
import App from '../App';

const favoriteRecipes = JSON.stringify([
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot:  'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ]);
  
  jest.mock('clipboard-copy', () => jest.fn());
  const copy = require('clipboard-copy'); 

describe('cobertura drink e meal', () => {

  it('Verifica se a mensagem correta é exibida na tela ao clicar no botão share', async () => {
    copy.mockImplementation(() => null);
   
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', favoriteRecipes);
    history.push('/favorite-recipes');

    // <img data-testid="0-horizontal-share-btn" src="/static/media/shareIcon.87def1bd1dff9af9263f046c3b9bd31a.svg" alt="share"></img>
    const imageBtn = await screen.findByTestId('0-horizontal-share-btn');
    expect(imageBtn).toBeInTheDocument();
    userEvent.click(imageBtn);
    expect(copy).toHaveBeenCalled(); 
    expect(copy).toHaveBeenCalledWith('http://localhost:3000/foods/52771');

    // <button type="button" data-testid="especial-teste-grupo17"><img data-testid="0-horizontal-share-btn" src="/static/media/shareIcon.87def1bd1dff9af9263f046c3b9bd31a.svg" alt="share"></button>
    // const shareBtn = await screen.findByRole('heading', {  level: 1, name: /link copied/i})
    const shareBtn2 = await screen.findByText('Link copied!')
    // expect(shareBtn).toHaveTextContent(/Link copied/i)
    // const shareBtn = screen.getByText('Link copied!')
    // expect(shareBtn).toBeInTheDocument();
    expect(shareBtn2).toBeInTheDocument();
  });

  it('remover', () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    history.push('/favorite-recipes');
    const arrabiata = screen.getByText(/arrabiata/i);
    expect(arrabiata).toBeInTheDocument();
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(favoriteBtn);
    expect(arrabiata).not.toBeInTheDocument();
  });

  it ('Teste food', async () => {
    const testEmail = 'teste@teste.com';
    const testPassword = '1234567';
    renderWithRouter(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, testEmail);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, testPassword);

    const buttonEnter = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(buttonEnter);
    
    const item = await screen.findByTestId('0-recipe-card');
    const item1 = screen.getByTestId('1-recipe-card');
    const item2 = screen.getByTestId('2-recipe-card');
    const item3 = screen.getByTestId('3-recipe-card');

    expect(item).toBeInTheDocument();
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
  });

  it ('Teste drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    
    const item = await screen.findByTestId('0-recipe-card');
    const item1 = screen.getByTestId('1-recipe-card');
    const item2 = screen.getByTestId('2-recipe-card');
    const item3 = screen.getByTestId('3-recipe-card');

    expect(item).toBeInTheDocument();
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
  });

  it ('caminho completo + all', async () => {
    const testEmail = 'teste@teste.com';
    const testPassword = '1234567';
    renderWithRouter(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, testEmail);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, testPassword);

    const buttonEnter = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(buttonEnter);

    userEvent.click(screen.getByTestId('All-category-filter'));
    await waitFor(() => {
      expect(screen.getByText(/corba/i)).toBeInTheDocument();
    })
  })
});

// -------------------------------|---------|----------|---------|---------|--------------------
// File                           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s  
// -------------------------------|---------|----------|---------|---------|--------------------
// All files                      |   85.71 |    81.73 |   88.81 |   85.38 |                    
//  src                           |     100 |      100 |     100 |     100 |                    
//   App.jsx                      |     100 |      100 |     100 |     100 |                    
//  src/Pages                     |   97.08 |      100 |   95.34 |   96.87 |                    
//   DoneRecipes.jsx              |   91.66 |      100 |      90 |   90.47 | 159-160            
//   Drinks.jsx                   |   85.71 |      100 |      75 |   85.71 | 67                 
//   DrinksID.jsx                 |     100 |      100 |     100 |     100 |                    
//   FavoriteRecipes.jsx          |     100 |      100 |     100 |     100 |                    
//   Foods.jsx                    |     100 |      100 |     100 |     100 |                    
//   FoodsID.jsx                  |     100 |      100 |     100 |     100 |                    
//   Login.jsx                    |     100 |      100 |     100 |     100 |                    
//   Profile.jsx                  |     100 |      100 |     100 |     100 |                    
//  src/components                |    89.6 |    82.66 |   85.33 |   89.43 |                    
//   DrinksRecommendation.jsx     |      90 |      100 |     100 |      90 | 15                 
//   FavoriteDrink.jsx            |       0 |        0 |       0 |       0 | 8-44               
//   FavoriteMeal.jsx             |      60 |    21.42 |      20 |      60 | 16-35,46-48,53     
//   FavoriteRecipeInProgress.jsx |     100 |      100 |     100 |     100 |                    
//   FoodsRecommendation.jsx      |     100 |      100 |     100 |     100 |                    
//   Footer.jsx                   |     100 |      100 |     100 |     100 |                    
//   Header.jsx                   |     100 |      100 |     100 |     100 |                    
//   RecipeCard.jsx               |     100 |      100 |     100 |     100 |                    
//   RecipeDetails.jsx            |     100 |    96.42 |     100 |     100 | 26                 
//   RecipeInProgress.jsx         |     100 |       90 |     100 |     100 | 27,114-116,119-120 
//   Recipes.jsx                  |     100 |      100 |     100 |     100 |                    
//   SearchBar.jsx                |   93.75 |       90 |     100 |   93.47 | 36-38              
//   ShareButton.jsx              |      75 |      100 |      50 |      75 | 12-13              
//   StartContinueButton.jsx      |   78.57 |    64.28 |      75 |   78.57 | 13,23,26           
//  src/components/RecipesCards   |     100 |      100 |     100 |     100 |                    
//   DrinkCard.jsx                |     100 |      100 |     100 |     100 |                    
//   FoodCard.jsx                 |     100 |      100 |     100 |     100 |                    
//  src/context                   |   50.72 |        0 |      50 |   50.72 |                    
//   recipesContext.jsx           |   50.72 |        0 |      50 |   50.72 | 45-59,64-78,95-100 
//  src/hook                      |    91.3 |       60 |     100 |    91.3 |                    
//   useLocalStorage.js           |   85.71 |     62.5 |     100 |   85.71 | 6,13               
//   useResponseFilter.js         |     100 |       50 |     100 |     100 | 10                 
//  src/service                   |   79.16 |      100 |      80 |   79.16 |                    
//   api.js                       |   79.16 |      100 |      80 |   79.16 | 17,22-25           
// -------------------------------|---------|----------|---------|---------|--------------------
