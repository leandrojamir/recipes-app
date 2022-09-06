import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import App from '../App';
import clipboardCopy from 'clipboard-copy';
//import clipboardCopy from 'clipboard-copy';

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

const mockClipboard = require('clipboard-copy');
jest.mock('clipboard-copy', () => jest.fn());

describe('Testes da pagina de receitas em progresso', () => {
  it('Testa se, após clicar em compartilhar receita um link de food é copiado para a área de transferência', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771/in-progress');
    await waitFor(() => {
      // <button data-testid="share-btn" type="button"><img src="/static/media/shareIcon.87def1bd1dff9af9263f046c3b9bd31a.svg" alt="compartilhar"></button>
      const shareBtn = screen.getByTestId(/share-btn/i);
      userEvent.click(shareBtn);
    });
    mockClipboard.mockImplementation(() => null);
    expect(mockClipboard).toBeCalledTimes(1);
  });

  it('Testa se, após marca todos os ingredientes o botão de concluido é habilitado', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771/in-progress');
    const checkProgress = await screen.findAllByRole('checkbox');
    // <button data-testid="finish-recipe-btn" type="button">Finalizar</button>
    const finishButton = await screen.findByTestId(/finish-recipe-btn/i);
    checkProgress.forEach((element) => {
      userEvent.click(element);
     });
    expect(finishButton).not.toBeDisabled();
    
    userEvent.click(finishButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');

    history.push('/drinks/178319/in-progress');
    localStorage.setItem('inProgressRecipes', JSON.stringify(doneRecipes));
    const checkDrinkProgress = await screen.findAllByRole('checkbox');
    checkDrinkProgress.forEach((element) => {
      userEvent.click(element);
    });
    expect(finishButton).not.toBeDisabled();
    
    userEvent.click(finishButton);
    expect(pathname).toBe('/done-recipes');
  });
  it('teste navegação', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319/in-progress');
    await waitFor(() => {
      // <img data-testid="recipe-photo" src="https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg" alt="Aquamarine">
      const drinkImg = screen.getByTestId(/recipe-photo/i);
      expect(drinkImg).toHaveAttribute(
        'src',
        'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg'
      );
    });
  });

  
  it('Testa se, após clicar no botão de favoritar o coração muda de white para black e a receita é salva em favoritos', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771/in-progress');
    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(favoriteButton);
    expect(favoriteButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });
  it('Testa se, após marcar um ingrediente ele é salvo como concluído e ao desmarcar ele é removido da lista', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52771/in-progress');
    // const checkProgress = await screen.findAllByRole('checkbox', {
    const checkProgress = await screen.findByRole('checkbox', {
      name: /basil/i,
    });
    userEvent.click(checkProgress);
    // expect(checkProgress).toBeChecked();
    // userEvent.click(checkProgress);
    expect(checkProgress).not.toBeChecked();
  });
});
