// -----------------------------|---------|----------|---------|---------|--------------------------
// File                         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s        
// -----------------------------|---------|----------|---------|---------|--------------------------
                      
//   RecipeDetails.jsx          |   73.33 |    26.66 |   57.14 |   75.86 | 60-66,101    

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Teste para RecipeDetail', () => {
  it('testes para requisitos 29 e 36', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const execBtn = screen.getByTestId(/exec-search-btn/i);
    const igredient = screen.getByTestId(/ingredient-search-radio/i);
    const name = screen.getByTestId(/name-search-radio/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const searchInput = screen.getByTestId(/search-input/i);
    expect(execBtn).toBeInTheDocument();
    expect(igredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();

    userEvent.click(name);
    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(execBtn);
    
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });

    expect(await screen.findByText(/aquamarine/i)).toBeInTheDocument();
    expect(screen.getByText(/Hpnotiq - 2 oz/i)).toBeInTheDocument();
    expect(screen.getByText(/Pineapple Juice - 1 oz/i)).toBeInTheDocument();
    expect(screen.getByText(/Banana Liqueur - 1 oz/i)).toBeInTheDocument();
    expect(screen.getByText(/Shake well in a shaker/i)).toBeInTheDocument();

    //   RecipeDetails.jsx          |   96.66 |    83.33 |   85.71 |     100 | 76-97  

    // <h2 data-testid="recipe-category">Alcoholic</h2>
    const strAlcoholic = screen.getByTestId(/recipe-category/i);
    expect(strAlcoholic).toBeInTheDocument();
    expect(strAlcoholic).toHaveTextContent(/Alcoholic/i)
    // <img data-testid="recipe-photo" src="https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg" alt="Aquamarine">
    const strDrinkThumb = screen.getByTestId(/recipe-photo/i);
    expect(strDrinkThumb).toBeInTheDocument();
    // <div data-testid="0-recomendation-card" class="card"><img data-testid="0-card-img" src="https://www.themealdb.com/images/media/meals/58oia61564916529.jpg" alt="Corba" class="foto"><h5 data-testid="0-recomendation-title">Corba</h5></div>
    
    const primeiroCarrossel = screen.findByTestId(/0-recomendation-card/i);
    expect(await primeiroCarrossel).toBeInTheDocument();
    userEvent.click(await primeiroCarrossel);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52977');
    });

    // RecipeDetails.jsx          |   96.66 |      100 |   85.71 |     100 | 

    expect(await screen.findByText(/Lentils - 1 cup/i)).toBeInTheDocument();
    expect(screen.getByText(/Onion - 1 large/i)).toBeInTheDocument();
    expect(screen.getByText(/Carrots - 1 large/i)).toBeInTheDocument();
    expect(screen.getByText(/Tomato Puree - 1 tbs/i)).toBeInTheDocument();
  });
});