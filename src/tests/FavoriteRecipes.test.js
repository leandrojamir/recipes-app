import React from "react";
import { screen, waitFor } from '@testing-library/react'
import renderWithRouter from "./helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';
import App from "../App";
// import FavoriteRecipes from "../pages/FavoriteRecipes";

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


describe('Testes FavoriteRecipes', () => {
  it(' Titulo e direcionamento profile', () => {
    const { history } =  renderWithRouter(<App />);
    history.push('/favorite-recipes');
    // <h1 data-testid="page-title">Favorite Recipes</h1>
    const tituloHeader = screen.getByTestId(/page-title/i)
    expect(tituloHeader).toBeInTheDocument();
    expect(tituloHeader).toHaveTextContent(/Favorite Recipes/i)
   
    // <button type="button" data-testid="profile-top-btn" src="./images/profileIcon.svg"><img src="/static/media/profileIcon.44eb3608f431845fe2fc2d2a23d758ae.svg" alt="Profile"></button>
    const profileBtn = screen.getByTestId(/profile-top-btn/i);        
    expect (profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');

  });

  it('Verifica o filtros', async () => {
    localStorage.setItem('favoriteRecipes', favoriteRecipes);
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');

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

  it('apaga food e sobre 1 para all', async () => {
    localStorage.setItem('favoriteRecipes', favoriteRecipes);
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    // <img data-testid="0-horizontal-favorite-btn" src="/static/media/blackHeartIcon.083cb006913d197c95857ebfa2161db7.svg" alt="back heart"></img>
    const favoriteBtn0 = await screen.findByTestId('0-horizontal-favorite-btn');
    userEvent.click(favoriteBtn0);

    const horizontalNames = await screen.findAllByTestId(/horizontal-name/);
    expect(horizontalNames.length).toBe(1);
    
    const allBtn = await screen.findByTestId('filter-by-all-btn');
    userEvent.click(allBtn);
    expect(horizontalNames.length).toBe(1);
  });

  it('remove localStorage', async () => {
    localStorage.removeItem('favoriteRecipes');
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');

    const horizontalNames = screen.queryByTestId('0-horizontal-name');
    expect(horizontalNames).not.toBeInTheDocument();
  });

  // it('Verifica se a mensagem correta é exibida na tela ao clicar no botão share', () => {
  //   localStorage.setItem('favoriteRecipes', favoriteRecipes);
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/favorite-recipes');
  //   // <img data-testid="0-horizontal-share-btn" src="/static/media/shareIcon.87def1bd1dff9af9263f046c3b9bd31a.svg" alt="share"></img>
  //   const imageBtn = screen.getByTestId('0-horizontal-share-btn');
  //   expect(imageBtn).toBeInTheDocument();
  //   userEvent.click(imageBtn);
  //   // Link copied!
  //   // http://localhost:3000/foods/52771
  //   // <button type="button" data-testid="especial-teste-grupo17"><img data-testid="0-horizontal-share-btn" src="/static/media/shareIcon.87def1bd1dff9af9263f046c3b9bd31a.svg" alt="share"></button>
  //   const shareBtn = screen.getByRole('button', {  name: /link copied/i})
  //   // expect(shareBtn).toHaveTextContent(/Link copied/i)
  //   // const shareBtn = screen.getByText('Link copied!')
  //   expect(shareBtn).toBeInTheDocument();
  // });
});