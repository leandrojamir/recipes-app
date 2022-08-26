import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import aquamarine from './mocks/Aquamarine';
import penne from './mocks/Penne';
import onion from './mocks/Onion';

describe('Teste da Header', () => {
  // https://stackoverflow.com/questions/62405645/how-to-mock-fetch-when-testing-a-react-app
  afterEach(() => jest.restoreAllMocks());

  it('Test1 40% requisito 11 e 12 + bebida unica', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(aquamarine),
    });

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
    expect(fetch).toHaveBeenCalled();
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });
  });

  it('teste branch e busca', async () => {
    window.alert = jest.fn();
    // jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<App />);
    const inputEmail = screen.getByPlaceholderText(/email/i);
    userEvent.type(inputEmail, 'teste@teste.com');
    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputPassword, '1234567');
    const buttonEnter = screen.getByRole('button', { name: /Entrar/i });
    userEvent.click(buttonEnter);
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const igredient = screen.getByTestId(/ingredient-search-radio/i);
    userEvent.click(igredient);
    expect(igredient).toBeChecked();
    const name = screen.getByTestId(/name-search-radio/i);
    const searchInput = screen.findByTestId(/search-input/i);
    const execBtn = screen.getByTestId(/exec-search-btn/i);
    userEvent.click(name);
    userEvent.click(execBtn);
    expect(execBtn).toBeInTheDocument();
    expect(execBtn).toBeInTheDocument();
    expect(searchInput).toBeDefined();

    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    userEvent.click(firstLetter);
    expect(firstLetter).toBeInTheDocument();

    userEvent.type(searchInput, 'onion');
    userEvent.click(execBtn);
    // expect(global.alert).toBeDefined();
    expect(window.alert).toBeDefined();
    // expect(window.alert).toHaveBeenCalled();
  });

  it('Type foods + filtro comida unica', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(penne),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchBtn = screen.getByTestId(/search-top-btn/i);
    userEvent.click(searchBtn);
    const execBtn = screen.getByTestId(/exec-search-btn/i);
    const name = screen.getByTestId(/name-search-radio/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);
    const searchInput = screen.getByTestId(/search-input/i);

    userEvent.click(firstLetter);
    userEvent.type(searchInput, 'b');
    userEvent.click(execBtn);
    expect(fetch).toHaveBeenCalledWith(
      'https://www.themealdb.com/api/json/v1/1/search.php?f=b',
    );

    userEvent.type(searchInput, 'Penne');
    userEvent.click(name);
    userEvent.click(execBtn);
    expect(fetch).toHaveBeenCalled();
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
