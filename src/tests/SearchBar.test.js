import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { fireEvent } from '@testing-library/react';

import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
// import aquamarine from './mocks/Aquamarine';
// import penne from './mocks/Penne';
import onion from './mocks/Onion';

describe('Teste da Header', () => {
  // https://stackoverflow.com/questions/62405645/how-to-mock-fetch-when-testing-a-react-app
  // afterEach(() => jest.restoreAllMocks());

  it('Test1 40% requisito 11 e 12 + bebida unica', async () => {
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

    userEvent.type(searchInput, 'Aquamarine');
    userEvent.click(name);
    userEvent.click(execBtn);
    // expect(fetch).toHaveBeenCalled();
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });
  });

  it('teste branch e busca', async () => {

    console.log('aqui começa segundo teste');

    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    
    const searchInput = screen.getByTestId(/search-input/i);    
    userEvent.type(searchInput, 'onion');
    
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    userEvent.click(firstLetter);
    
    const execBtn = screen.getByTestId(/exec-search-btn/i);
    userEvent.click(execBtn);
    
    expect(window.alert).toBeDefined();
    
  });

  it('Type foods + filtro comida unica', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const searchBtn = screen.getByTestId(/search-top-btn/i);
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId(/search-input/i);
    const name = screen.getByTestId(/name-search-radio/i);
    const execBtn = screen.getByTestId(/exec-search-btn/i);

    userEvent.click(name);
    userEvent.type(searchInput, 'Penne');
    userEvent.click(execBtn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/foods/52771');
    });
  });

  it('testar ingrediente separado do alert', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(onion),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchBtn = screen.getByTestId(/search-top-btn/i);
    userEvent.click(searchBtn);
    const execBtn = screen.getByTestId(/exec-search-btn/i);
    const searchInput = screen.getByTestId(/search-input/i);
    const igredient = screen.getByTestId(/ingredient-search-radio/i);
    userEvent.click(igredient);
    expect(igredient).toBeChecked();
    expect(execBtn).toBeInTheDocument();
    expect(searchInput).toBeDefined();

    userEvent.type(searchInput, 'onion');
    userEvent.click(igredient);
    userEvent.click(execBtn);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?i=onion',
    );
  });
});
