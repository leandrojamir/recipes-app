import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Teste da Header', () => {
  it('40% requisito 11 e 12', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchBtn = screen.getByTestId(/search-top-btn/i);
    expect(searchBtn).toBeInTheDocument();
    userEvent.click(searchBtn);

    const execBtn = screen.getByTestId(/exec-search-btn/i);
    const igredient = screen.getByTestId(/ingredient-search-radio/i);
    const name = screen.getByTestId(/name-search-radio/i);
    const firstLetter = screen.getByTestId(/first-letter-search-radio/i);

    expect(execBtn).toBeInTheDocument();
    expect(igredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(await screen.findByTestId(/search-input/i)).toBeInTheDocument();
  });

  it('teste branch e busca', async () => {
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
    expect(global.alert).toBeDefined();
  });
});
